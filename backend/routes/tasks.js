const router = require('express').Router();
const TasksController = require('../controllers/tasks.controller');

router.post('/add', TasksController.addNewTask);
router.get('/:id', TasksController.getTaskById);
router.get('/', TasksController.taskList);
router.put('/:id', TasksController.updateTaskById);
router.delete('/:id', TasksController.removeTaskById);

module.exports = router;
