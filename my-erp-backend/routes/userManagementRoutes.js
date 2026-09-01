const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userManagementController');
const { authenticateToken, requireRole } = require('../middleware/authMiddleware');

router.post('/register', authenticateToken, requireRole('SUPER_ADMIN'), userController.registerValidation, userController.register);
router.post('/login', userController.loginValidation, userController.login);
router.post('/logout', authenticateToken, (req, res) => res.json({ message: 'Logged out successfully' }));
router.post('/change-password', authenticateToken, userController.changePasswordValidation, userController.changePassword);
router.get('/me', authenticateToken, userController.getMe);
router.put('/me', authenticateToken, userController.updateProfileValidation, userController.updateProfile);
router.get('/', authenticateToken, requireRole('ADMIN', 'SUPER_ADMIN'), userController.getUsers);
router.put('/:id', authenticateToken, requireRole('SUPER_ADMIN'), userController.updateUserValidation, userController.updateUser);
router.delete('/:id', authenticateToken, requireRole('SUPER_ADMIN'), userController.deleteUser);
router.post('/seed', authenticateToken, requireRole('SUPER_ADMIN'), userController.seedSuperAdmin);

module.exports = router;
