const fs = require('fs');
const path = require('path');
const { getPublicUrl, initializeGCS } = require('../../utils/gcs');

class EmployeeProfileController {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async getAllProfiles() {
        const query = 'SELECT * FROM employee_profile ORDER BY created_at DESC';
        const result = await this.db.query(query);
        return result.rows;
    }

    async searchProfiles(query, statusFilter) {
        const term = `%${query}%`;
        const statusCondition = statusFilter === 'inactive' ? "AND ep.employment_status = 'Inactive'" : (statusFilter === 'active' ? "AND ep.employment_status = 'Active'" : '');
        const sql = `
            SELECT DISTINCT ON (ep.employee_id)
                ep.employee_id,
                ep.last_name,
                ep.first_name,
                ep.middle_name,
                ep.birthdate,
                ep.gender,
                ep.civil_status,
                ep.address,
                ep.contact_details,
                ep.email_address,
                ep.emergency_contact,
                ep.emergency_contact_number,
                ep.date_of_hire,
                ep.employment_status,
                ep.sss_number,
                ec.salary_pay_mode,
                ec.salary_amount,
                ec.allowance_pay_mode,
                ec.allowance_amount,
                ec.pay_frequency,
                ec.payout_method,
                os.org_unit_name,
                os.role_title
            FROM employee_profile ep
            LEFT JOIN LATERAL (
                SELECT salary_pay_mode, salary_amount, allowance_pay_mode, allowance_amount, pay_frequency, payout_method
                FROM employee_compensation
                WHERE employee_id = ep.employee_id
                ORDER BY created_at DESC
                LIMIT 1
            ) ec ON true
            LEFT JOIN LATERAL (
                SELECT org_unit_name, role_title
                FROM organizational_structure
                WHERE employee_assigned = ep.employee_id
                ORDER BY created_at DESC
                LIMIT 1
            ) os ON true
            WHERE (ep.last_name ILIKE $1
               OR ep.first_name ILIKE $1
               OR ep.middle_name ILIKE $1
               OR ep.department ILIKE $1)
            ${statusCondition}
            ORDER BY ep.employee_id, ep.created_at DESC
            LIMIT 20
        `;
        const result = await this.db.query(sql, [term]);
        const profiles = result.rows;

        for (const profile of profiles) {
            const photo = await this.findEmployeePhoto(profile.employee_id);
            profile.photo_file_name = photo.photo_file_name;
            profile.photo_url = photo.photo_url;
            profile.folder_name = photo.folder_name;
        }
        return profiles;
    }

    async getActiveEmployeesByDepartment(department) {
        const sql = `
            SELECT * FROM employee_profile
            WHERE department = $1 AND employment_status = 'Active'
            ORDER BY last_name ASC, first_name ASC
        `;
        const result = await this.db.query(sql, [department]);
        return result.rows;
    }

    async getAllActiveEmployees() {
        const sql = `
            SELECT * FROM employee_profile
            WHERE employment_status = 'Active'
            ORDER BY last_name ASC, first_name ASC
        `;
        const result = await this.db.query(sql);
        return result.rows;
    }

    async getAllActiveEmployeesWithCompensation() {
        const sql = `
            SELECT 
                ep.employee_id,
                ep.last_name,
                ep.first_name,
                ep.middle_name,
                ep.address,
                ep.contact_details,
                ep.email_address,
                ep.birthdate,
                ep.gender,
                ep.civil_status,
                ep.employment_status,
                ep.date_of_hire,
                ec.department,
                ec.role,
                ec.salary_pay_mode,
                ec.salary_amount,
                ec.allowance_pay_mode,
                ec.allowance_amount,
                ec.pay_frequency,
                ec.payout_method,
                ec.sss_contribution_mode,
                ec.sss_contribution_amount,
                ec.sss_loan_payment_mode,
                ec.sss_loan_amount,
                ec.philhealth_contribution_mode,
                ec.philhealth_contribution_amount,
                ec.pagibig_contribution_mode,
                ec.pagibig_contribution_amount,
                ec.pagibig_loan_payment_mode,
                ec.pagibig_loan_amount,
                ec.yearly_sick_leave,
                ec.yearly_vacation_leave,
                ec.shift_policy
            FROM employee_profile ep
            LEFT JOIN LATERAL (
                SELECT department, role, salary_pay_mode, salary_amount, allowance_pay_mode, allowance_amount, pay_frequency, payout_method, sss_contribution_mode, sss_contribution_amount, sss_loan_payment_mode, sss_loan_amount, philhealth_contribution_mode, philhealth_contribution_amount, pagibig_contribution_mode, pagibig_contribution_amount, pagibig_loan_payment_mode, pagibig_loan_amount, yearly_sick_leave, yearly_vacation_leave, shift_policy
                FROM employee_compensation
                WHERE employee_id = ep.employee_id
                ORDER BY created_at DESC
                LIMIT 1
            ) ec ON true
            WHERE ep.employment_status = 'Active'
            ORDER BY ep.last_name ASC, ep.first_name ASC
        `;
        const result = await this.db.query(sql);
        return result.rows;
    }

    async getLatestCompensation(employeeId) {
        const query = `
            SELECT salary_amount, allowance_amount, salary_pay_mode, allowance_pay_mode, pay_frequency, sss_contribution_amount, sss_loan_amount, philhealth_contribution_amount, pagibig_contribution_amount, pagibig_loan_amount
            FROM employee_compensation
            WHERE employee_id = $1
            ORDER BY created_at DESC
            LIMIT 1
        `;
        const result = await this.db.query(query, [employeeId]);
        return result.rows[0] || {};
    }

    async getProfileById(employeeId) {
        const query = 'SELECT * FROM employee_profile WHERE employee_id = $1';
        const result = await this.db.query(query, [employeeId]);
        return result.rows[0];
    }

    async get13thMonthData(employeeId, year) {
        const profile = await this.getProfileById(employeeId);
        if (!profile) {
            throw new Error('Employee not found');
        }

        const yearInt = parseInt(year, 10);
        if (!yearInt || yearInt < 2000 || yearInt > 2100) {
            throw new Error('Invalid year');
        }

        const startDate = `${yearInt}-01-01`;
        const endDate = `${yearInt}-12-31`;

        const attendanceQuery = `
            SELECT 
                EXTRACT(MONTH FROM date)::int AS month,
                COUNT(*) AS days_worked
            FROM attendance_log
            WHERE employee_id = $1
                AND date >= $2
                AND date <= $3
                AND time_in IS NOT NULL
                AND time_out IS NOT NULL
                AND status NOT IN ('Rejected', 'Pending')
            GROUP BY EXTRACT(MONTH FROM date)
            ORDER BY month ASC
        `;
        const attendanceResult = await this.db.query(attendanceQuery, [employeeId, startDate, endDate]);
        const attendanceByMonth = new Map();
        attendanceResult.rows.forEach(row => {
            attendanceByMonth.set(row.month, Number(row.days_worked) || 0);
        });

        const compensation = await this.getLatestCompensation(employeeId);
        const salaryAmount = Number(compensation.salary_amount) || 0;
        const salaryPayMode = compensation.salary_pay_mode || 'Monthly';
        const dailyRate = salaryPayMode === 'Daily' ? salaryAmount : salaryAmount / 22;

        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        const monthlyData = months.map((name, index) => {
            const monthNum = index + 1;
            const daysWorked = attendanceByMonth.get(monthNum) || 0;
            const salary = salaryAmount;
            const thirteenthMonth = daysWorked * dailyRate / 12;
            return {
                month: name,
                daysWorked,
                salary,
                thirteenthMonth: parseFloat(thirteenthMonth.toFixed(2))
            };
        });

        const totalThirteenthMonth = monthlyData.reduce((sum, row) => sum + row.thirteenthMonth, 0);

        return {
            employee: {
                employee_id: profile.employee_id,
                last_name: profile.last_name,
                first_name: profile.first_name,
                middle_name: profile.middle_name,
                date_of_hire: profile.date_of_hire,
                employment_status: profile.employment_status
            },
            compensation: {
                salary_amount: salaryAmount,
                salary_pay_mode: salaryPayMode,
                daily_rate: parseFloat(dailyRate.toFixed(2))
            },
            photo: await this.findEmployeePhoto(employeeId),
            monthlyData,
            totalThirteenthMonth: parseFloat(totalThirteenthMonth.toFixed(2))
        };
    }

    async addProfile(profileData) {
        const {
            employee_id,
            last_name,
            first_name,
            middle_name,
            address,
            contact_details,
            email_address,
            birthdate,
            gender,
            civil_status,
            emergency_contact,
            emergency_contact_number,
            date_of_hire,
            employment_status,
            sss_number,
            philhealth_number,
            pagibig_number,
            tin_number
        } = profileData;
        const query = `
            INSERT INTO employee_profile
            (employee_id, last_name, first_name, middle_name, address, contact_details, email_address, birthdate, gender, civil_status, emergency_contact, emergency_contact_number, date_of_hire, employment_status, sss_number, philhealth_number, pagibig_number, tin_number)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
            RETURNING *
        `;
        const result = await this.db.query(query, [
            employee_id,
            last_name,
            first_name,
            middle_name,
            address,
            contact_details,
            email_address,
            birthdate,
            gender,
            civil_status,
            emergency_contact,
            emergency_contact_number,
            date_of_hire,
            employment_status,
            sss_number,
            philhealth_number,
            pagibig_number,
            tin_number
        ]);
        return result.rows[0];
    }

    async updateProfile(employeeId, profileData) {
        const allowedFields = [
            'last_name', 'first_name', 'middle_name', 'address', 'contact_details', 'email_address',
            'birthdate', 'gender', 'civil_status', 'emergency_contact', 'emergency_contact_number',
            'date_of_hire', 'employment_status',
            'sss_number', 'philhealth_number', 'pagibig_number', 'tin_number'
        ];
        const updates = [];
        const values = [employeeId];
        let index = 2;
        allowedFields.forEach(field => {
            if (profileData[field] !== undefined && profileData[field] !== null) {
                let value = profileData[field];
                if (value === '') {
                    value = null;
                }
                updates.push(`${field} = $${index}`);
                values.push(value);
                index++;
            }
        });
        if (updates.length === 0) {
            return await this.getProfileById(employeeId);
        }
        updates.push('updated_at = CURRENT_TIMESTAMP');
        const query = `UPDATE employee_profile SET ${updates.join(', ')} WHERE employee_id = $1 RETURNING *`;
        const result = await this.db.query(query, values);
        return result.rows[0];
    }

    async deleteProfile(employeeId) {
        const query = 'DELETE FROM employee_profile WHERE employee_id = $1';
        const result = await this.db.query(query, [employeeId]);
        return result;
    }

    async getNextEmployeeId() {
        const query = 'SELECT employee_id FROM employee_profile ORDER BY employee_id DESC LIMIT 1';
        const result = await this.db.query(query);
        if (result.rows.length > 0) {
            const lastId = result.rows[0].employee_id;
            const match = lastId.match(/GefiEmp-(\d+)/);
            if (match) {
                const nextNum = parseInt(match[1], 10) + 1;
                return 'GefiEmp-' + String(nextNum).padStart(5, '0');
            }
        }
        return 'GefiEmp-00001';
    }

    async getMonthlyNewEmployeeCount() {
        const query = `
            SELECT COUNT(*) AS count
            FROM employee_profile
            WHERE created_at >= date_trunc('month', CURRENT_DATE)
        `;
        const result = await this.db.query(query);
        return result.rows[0] ? result.rows[0].count : 0;
    }

    async getTotalEmployeeCount() {
        const query = 'SELECT COUNT(*) AS count FROM employee_profile';
        const result = await this.db.query(query);
        return result.rows[0] ? result.rows[0].count : 0;
    }

    async computeEmployeeFolderName(employee_id) {
        const profile = await this.getProfileById(employee_id);
        const safe = (s = '') => {
            const cleaned = String(s).trim().replace(/[^a-zA-Z0-9_-]/g, '_').replace(/_+/g, '_');
            return cleaned.replace(/^_+|_+$/g, '');
        };
        const last_name = profile ? safe(profile.last_name) : '';
        const first_name = profile ? safe(profile.first_name) : '';
        return `${safe(employee_id)}_${last_name}_${first_name}`;
    }

    async findEmployeePhoto(employee_id) {
        try {
            const { bucket } = initializeGCS();
            const folderName = await this.computeEmployeeFolderName(employee_id);
            const lowerEmpId = String(employee_id).toLowerCase();

            const prefixes = [
                `employee-photos/${folderName}/`,
                `employee-photos/${employee_id}/`
            ];

            console.log(`[findEmployeePhoto] employee_id=${employee_id}, folderName=${folderName}`);

            for (const prefix of prefixes) {
                console.log(`[findEmployeePhoto] Searching prefix: ${prefix}`);
                const [files] = await bucket.getFiles({ prefix });
                console.log(`[findEmployeePhoto] Found ${files.length} files`);
                if (files.length > 0) {
                    console.log(`[findEmployeePhoto] Files:`, files.map(f => f.name));
                    for (const f of files) {
                        const lower = f.name.toLowerCase();
                        const lowerPrefix = prefix.toLowerCase();
                        const startsWithPrefix = lower.startsWith(`${lowerPrefix}${lowerEmpId}`);
                        const includes2x2 = lower.includes('2x2');
                        console.log(`[findEmployeePhoto] Checking ${f.name}: startsWith=${startsWithPrefix}, includes2x2=${includes2x2}`);
                    }
                    const match = files.find(f => {
                        const lower = f.name.toLowerCase();
                        const lowerPrefix = prefix.toLowerCase();
                        return lower.startsWith(`${lowerPrefix}${lowerEmpId}`) && lower.includes('2x2');
                    });
                    if (match) {
                        console.log(`[findEmployeePhoto] Match found:`, match.name);
                        return {
                            photo_file_name: match.name.replace(prefix, ''),
                            photo_url: getPublicUrl(match.name),
                            folder_name: folderName
                        };
                    }
                }
            }

            console.log(`[findEmployeePhoto] No match found for ${employee_id}`);
            return { photo_file_name: null, photo_url: null, folder_name: folderName };
        } catch (e) {
            console.error(`[findEmployeePhoto] Error:`, e.message, e.stack);
            return { photo_file_name: null, photo_url: null, folder_name: null };
        }
    }

    async createEmployeeFolder({ employee_id, last_name, first_name }) {
        if (!employee_id) {
            throw new Error('employee_id is required');
        }

        const safe = (s = '') => {
            const cleaned = String(s).trim().replace(/[^a-zA-Z0-9_-]/g, '_').replace(/_+/g, '_');
            return cleaned.replace(/^_+|_+$/g, '');
        };

        const folderName = `${safe(employee_id)}_${safe(last_name)}_${safe(first_name)}`;
        
        // GCS doesn't need folder creation - folders are auto-created on upload
        return { folderName, fullPath: `employee-photos/${folderName}` };
    }

    async getEmployeeDocuments(employee_id) {
        const { bucket } = require('../../utils/gcs').initializeGCS();
        const folderName = await this.computeEmployeeFolderName(employee_id);
        const lowerEmpId = String(employee_id || '').toLowerCase();

        const prefixes = [
            `employee-photos/${folderName}/`,
            `employee-photos/${employee_id}/`
        ];

        let files = [];
        for (const prefix of prefixes) {
            try {
                const [gcsFiles] = await bucket.getFiles({ prefix });
                files = gcsFiles.map(f => ({ name: f.name, prefix }));
                if (files.length > 0) break;
            } catch (e) {
                console.error(`[getEmployeeDocuments] Error listing files with prefix ${prefix}:`, e.message);
            }
        }

        console.log(`[getEmployeeDocuments] Found ${files.length} files`);

        const patterns = {
            '2x2-pic': ['2x2', '2x2_pic', '2x2-pic'],
            'resume': ['resume'],
            'employment-contract': ['employment', 'contract'],
            'birth-certificate': ['birth'],
            'gov-id': ['gov', 'id', 'government'],
            'sss-form': ['sss'],
            'philhealth-form': ['philhealth'],
            'pagibig-form': ['pagibig', 'pag-ibig'],
            'tin-form': ['tin'],
            'nbi-clearance': ['nbi'],
            'pnp-clearance': ['pnp'],
            'medical-results': ['medical'],
            'barangay-certificate': ['barangay', 'certificate']
        };

        const result = [];

        for (const doc of Object.entries(patterns)) {
            const docType = doc[0];
            const keywords = doc[1];
            const found = files.find(f => {
                const lower = f.name.toLowerCase();
                const lowerPrefix = f.prefix.toLowerCase();
                if (!lower.startsWith(`${lowerPrefix}${lowerEmpId}`)) return false;
                return keywords.some(k => lower.includes(k));
            });
            if (found) {
                const labelMap = {
                    '2x2-pic': '2x2 Picture',
                    'resume': 'Resume',
                    'employment-contract': 'Employment Contract',
                    'birth-certificate': 'Birth Certificate',
                    'gov-id': 'Valid Gov ID',
                    'sss-form': 'SSS Form',
                    'philhealth-form': 'PhilHealth Form',
                    'pagibig-form': 'Pag-IBIG Form',
                    'tin-form': 'TIN Form',
                    'nbi-clearance': 'NBI Clearance',
                    'pnp-clearance': 'PNP Clearance',
                    'medical-results': 'Medical Results',
                    'barangay-certificate': 'Barangay Certificate'
                };
                result.push({
                    docType,
                    label: labelMap[docType] || docType,
                    fileName: found.name.replace(found.prefix, ''),
                    publicUrl: getPublicUrl(found.name)
                });
            }
        }
        console.log(`[getEmployeeDocuments] Result:`, result);
        return result;
    }

    async getAllEmployeeSummaries(statusFilter) {
        const whereClause = statusFilter === 'inactive' ? "WHERE ep.employment_status = 'Inactive'" : "WHERE ep.employment_status = 'Active'";
        const query = `
            WITH latest_comp AS (
                SELECT DISTINCT ON (employee_id) *
                FROM employee_compensation
                ORDER BY employee_id, compensation_id DESC
            )
            SELECT 
                ep.employee_id,
                ep.last_name,
                ep.first_name,
                ep.middle_name,
                ep.birthdate,
                ep.gender,
                ep.civil_status,
                ep.address,
                ep.contact_details,
                ep.emergency_contact,
                ep.emergency_contact_number,
                ep.date_of_hire,
                ep.employment_status,
                ep.sss_number,
                ec.salary_pay_mode,
                ec.salary_amount,
                ec.allowance_pay_mode,
                ec.allowance_amount,
                ec.pay_frequency,
                ec.payout_method,
                os.org_unit_name,
                os.role_title
            FROM employee_profile ep
            LEFT JOIN latest_comp ec ON ep.employee_id = ec.employee_id
            LEFT JOIN organizational_structure os ON ep.employee_id = os.employee_assigned
            ${whereClause}
            ORDER BY ep.created_at DESC
        `;
        const result = await this.db.query(query);
        const summaries = result.rows;

        for (const summary of summaries) {
            const photo = await this.findEmployeePhoto(summary.employee_id);
            summary.photo_file_name = photo.photo_file_name;
            summary.photo_url = photo.photo_url;
            summary.folder_name = photo.folder_name;
        }
        return summaries;
    }
}

module.exports = EmployeeProfileController;
