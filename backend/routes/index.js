const { verifyToken } = require('../middlewares/jwt');

const otherRoutesPath = __dirname;
const router = require('express').Router();

const users = require(otherRoutesPath + '/users');
const tasks = require(otherRoutesPath + '/tasks');

router.use('/users', users);
router.use('/tasks', verifyToken, tasks);

module.exports = router;
