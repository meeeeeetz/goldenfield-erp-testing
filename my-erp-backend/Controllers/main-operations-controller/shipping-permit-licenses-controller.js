const { uploadFile, deleteFile, getPublicUrl } = require('../../utils/supabaseStorage');

class ShippingPermitLicensesController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async getAllLicenses(search = '') {
        let query = 'SELECT * FROM shipping_permit_licenses';
        const values = [];
        let counter = 1;

        if (search) {
            query += ` WHERE license_name ILIKE $${counter++} OR license_id ILIKE $${counter++} OR reg_no ILIKE $${counter++}`;
            values.push(`%${search}%`, `%${search}%`, `%${search}%`);
        }

        query += ' ORDER BY created_at DESC';
        const result = await this.db.query(query, values);
        const licenses = result.rows;
        // Add public URL for each license
        return licenses.map(l => ({
            ...l,
            file_url: l.file_path ? getPublicUrl(l.file_path) : null
        }));
    }

    async getLicenseById(licenseId) {
        const query = 'SELECT * FROM shipping_permit_licenses WHERE license_id = $1';
        const result = await this.db.query(query, [licenseId]);
        const license = result.rows[0];
        if (license) {
            license.file_url = license.file_path ? getPublicUrl(license.file_path) : null;
        }
        return license;
    }

    async getNextLicenseId() {
        const query = "SELECT MAX(CAST(SUBSTRING(license_id FROM '\\d+') AS INTEGER)) as max_num FROM shipping_permit_licenses";
        const result = await this.db.query(query);
        const maxNum = result.rows[0]?.max_num || 0;
        return 'ShLiID-' + (maxNum + 1);
    }

    generateFileName(regNo, expirationDate) {
        const sanitizedRegNo = regNo.replace(/[^a-zA-Z0-9]/g, '_');
        const dateStr = expirationDate ? expirationDate.replace(/-/g, '') : 'noexp';
        return `licenses/${sanitizedRegNo}_${dateStr}.webp`;
    }

    async uploadLicensePhoto(fileBuffer, regNo, expirationDate) {
        const fileName = this.generateFileName(regNo, expirationDate);
        const result = await uploadFile(fileBuffer, fileName, {
            contentType: 'image/webp'
        });
        return result.fileName;
    }

    async deleteLicensePhoto(filePath) {
        if (filePath) {
            await deleteFile(filePath);
        }
    }

    async createLicense(licenseData, fileBuffer = null) {
        const {
            license_id,
            license_name,
            reg_no,
            issued_date,
            expiration_date,
            status,
            created_by
        } = licenseData;

        let filePath = null;
        if (fileBuffer) {
            filePath = await this.uploadLicensePhoto(fileBuffer, reg_no, expiration_date);
        }

        const query = `
            INSERT INTO shipping_permit_licenses
            (license_id, license_name, reg_no, issued_date, expiration_date, status, file_path, created_by)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
        `;
        const result = await this.db.query(query, [
            license_id,
            license_name,
            reg_no,
            issued_date || null,
            expiration_date || null,
            status || 'Active',
            filePath,
            created_by || null
        ]);
        const license = result.rows[0];
        license.file_url = license.file_path ? getPublicUrl(license.file_path) : null;
        return license;
    }

    async updateLicense(licenseId, licenseData, fileBuffer = null) {
        const {
            license_name,
            reg_no,
            issued_date,
            expiration_date,
            status,
            created_by
        } = licenseData;

        const existing = await this.getLicenseById(licenseId);
        if (!existing) {
            return null;
        }

        let filePath = existing.file_path;
        if (fileBuffer) {
            if (existing.file_path) {
                await this.deleteLicensePhoto(existing.file_path);
            }
            filePath = await this.uploadLicensePhoto(fileBuffer, reg_no || existing.reg_no, expiration_date || existing.expiration_date);
        }

        const query = `
            UPDATE shipping_permit_licenses
            SET license_name = $1, reg_no = $2, issued_date = $3, expiration_date = $4, status = $5, file_path = $6, created_by = $7, updated_at = CURRENT_TIMESTAMP
            WHERE license_id = $8
            RETURNING *
        `;
        const result = await this.db.query(query, [
            license_name,
            reg_no,
            issued_date || null,
            expiration_date || null,
            status,
            filePath,
            created_by || null,
            licenseId
        ]);
        const license = result.rows[0];
        if (license) {
            license.file_url = license.file_path ? getPublicUrl(license.file_path) : null;
        }
return license;
    }

    async deleteLicense(licenseId) {
        const existing = await this.getLicenseById(licenseId);
        if (!existing) {
            return false;
        }

        if (existing.file_path) {
            await this.deleteLicensePhoto(existing.file_path);
        }

        const query = 'DELETE FROM shipping_permit_licenses WHERE license_id = $1';
        const result = await this.db.query(query, [licenseId]);
        return result.rowCount > 0;
    }
}

module.exports = ShippingPermitLicensesController;