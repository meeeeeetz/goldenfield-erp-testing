const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid or expired token' });
        }
        req.user = user;
        next();
    });
};

const requireRole = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: 'Authentication required' });
        }
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Insufficient permissions' });
        }
        next();
    };
};

const USER_ALLOWED_MODULES = new Set([
    'operations-egg-inventory',
    'operations-layer-buildings',
    'operations-shipping-permit',
    'sales-receipt-issuance',
    'sales-product-pricing'
]);

const pathToModuleMap = {
    '/api/receipt-issues': 'sales-receipt-issuance',
    '/api/products': 'sales-product-pricing',
    '/api/price-changes': 'sales-product-pricing',
    '/api/customers': 'sales-product-pricing',
    '/api/layer-buildings-reports': 'operations-layer-buildings'
};

const getModuleFromPath = (reqPath) => {
    for (const [path, module] of Object.entries(pathToModuleMap)) {
        if (reqPath === path || reqPath.startsWith(path + '/')) {
            return module;
        }
    }
    return null;
};

const requireModulePermission = (module) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: 'Authentication required' });
        }
        if (req.user.role === 'SUPER_ADMIN' || req.user.role === 'ADMIN') {
            return next();
        }
        if (module && !USER_ALLOWED_MODULES.has(module)) {
            return res.status(403).json({ error: 'Access denied to this module' });
        }
        next();
    };
};

module.exports = { authenticateToken, requireRole, requireModulePermission };
