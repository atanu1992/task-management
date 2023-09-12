const { verifyEncryptedCode } = require('../middlewares/bcrypt');
const { CustomError } = require('../middlewares/error-handler');
const { createToken } = require('../middlewares/jwt');
const { mongoose } = require('../middlewares/mongodb-database');
const TasksModel = require('../models/tasks.model');

/**
 * Add new task
 * @param {string} title
 * @param {string} description
 * @param {string} priority
 * @returns object
 */
exports.addNewTask = async (data) => {
  try {
    // insert record
    const newTask = await TasksModel.create(data);
    if (newTask?._id) {
      return newTask;
    } else {
      throw new CustomError('Failed to add task', 500);
    }
  } catch (error) {
    throw error;
  }
};

/**
 * Add new task
 * @param {string} id
 * @returns object
 */
exports.getTaskById = async (id) => {
  try {
    // insert record
    const details = await TasksModel.findOne({
      _id: id,
    });
    if (details?._id) {
      return details;
    } else {
      throw new CustomError('Failed to fetch details', 404);
    }
  } catch (error) {
    throw error;
  }
};

/**
 * Update task details with respect to Id
 * @param {id} string
 * @param {title, description, priority} data
 * @returns
 */
exports.updateTaskById = async (id, data) => {
  try {
    // insert record
    const update = await TasksModel.findByIdAndUpdate(id, data, {
      returnDocument: 'after',
    }).exec();
    if (update) {
      return update;
    } else {
      throw new CustomError('Failed to fetch details and update', 404);
    }
  } catch (error) {
    throw error;
  }
};

/**
 * Get tasks
 * @param {integer} limit default 10
 * @param {integer} offset default 0
 */
exports.tasks = async (limit, offset) => {
  try {
    const details = await TasksModel.aggregate()
      .facet({
        total: [
          {
            $count: 'count',
          },
        ],
        data: [{ $skip: offset }, { $limit: limit }],
      })
      .project({ total: { $arrayElemAt: ['$total.count', 0] }, data: 1 })
      .exec();
    return {
      data: details[0]?.data ? details[0].data : [],
      total: details[0]?.total ? details[0].total : 0,
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Remove task by id
 * @param {string} id
 */
exports.removeTaskById = async (id) => {
  try {
    const deleteTask = await TasksModel.deleteOne({ _id: id }).exec();
    return deleteTask.deletedCount ? true : false;
  } catch (error) {
    throw error;
  }
};
