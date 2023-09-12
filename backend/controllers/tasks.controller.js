const {
  addTaskValidationSchema,
  updateTaskSchema,
  taskIdValidationSchema,
} = require('../utils/validations/tasks.validation');
const {
  addNewTask,
  getTaskById,
  tasks,
  removeTaskById,
  updateTaskById,
} = require('../services/tasks.service');

/**
 * add new task
 * @param {title, description, priority} req
 * @param {*} res
 * @param {*} next
 * @returns object
 */
exports.addNewTask = async (req, res, next) => {
  try {
    const { value, errors } = addTaskValidationSchema(req.body);
    if (errors) {
      return res.status(422).json({ status: false, errors: errors });
    }
    const addTaskDetails = await addNewTask(value);
    return res.status(201).json({ status: true, details: addTaskDetails });
  } catch (error) {
    next(error);
  }
};

/**
 * Get details by task id
 * @param {id} req
 * @param {*} res
 * @param {*} next
 * @returns object
 */
exports.getTaskById = async (req, res, next) => {
  try {
    const { value, errors } = taskIdValidationSchema(req.params);
    if (errors) {
      return res.status(422).json({ status: false, errors: errors });
    }
    const details = await getTaskById(value.id);
    return res.status(200).json({ status: true, details: details });
  } catch (error) {
    next(error);
  }
};

/**
 * Get task list with pagination and filtering
 * @param {limit, offset} req
 * @param {*} res
 * @param {*} next
 * @returns object
 */
exports.taskList = async (req, res, next) => {
  try {
    let { limit, offset } = req.query;
    limit = limit ? parseInt(limit) : 10;
    offset = offset && parseInt(offset) > 1 ? limit * (offset - 1) : 0;

    const details = await tasks(limit, offset);
    return res.status(200).json({ status: true, details: details });
  } catch (error) {
    next(error);
  }
};

/**
 * Update task details by task id
 * @param {id} req.params
 * @param {title, description, priority} req.body
 * @param {*} res
 * @param {*} next
 * @returns object
 */
exports.updateTaskById = async (req, res, next) => {
  try {
    let data = { ...req.body, ...req.params };
    const { value, errors } = updateTaskSchema(data);
    if (errors) {
      return res.status(422).json({ status: false, errors: errors });
    }

    const { id, ...otherDetails } = value;
    const updatedTask = await updateTaskById(id, otherDetails);
    return res.status(200).json({ status: true, details: updatedTask });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete task
 * @param {id} req
 * @param {*} res
 * @param {*} next
 * @returns boolean
 */
exports.removeTaskById = async (req, res, next) => {
  try {
    const { value, errors } = taskIdValidationSchema(req.params);
    if (errors) {
      return res.status(422).json({ status: false, errors: errors });
    }

    const removeStatus = await removeTaskById(value.id);
    return res.status(200).json({ status: removeStatus });
  } catch (error) {
    next(error);
  }
};
