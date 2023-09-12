const router = require('express').Router();
const UsersController = require('../controllers/users.controller');
const { verifyRefrehToken } = require('../middlewares/jwt');

router.post('/register', UsersController.addUser);
router.post('/login', UsersController.login);
router.get('/refresh-token', verifyRefrehToken, UsersController.refreshToken);

module.exports = router;
