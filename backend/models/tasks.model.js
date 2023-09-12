const { Schema, mongoose } = require('../middlewares/mongodb-database');

const TasksSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'Title is required'],
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'Description is required'],
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      required: [true, 'Priority is required'],
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
  { versionKey: false }
);

const TasksModel = mongoose.model('Task', TasksSchema);
module.exports = TasksModel;
