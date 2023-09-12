const { Schema, mongoose } = require('../middlewares/mongodb-database');
const { generateEncryptedCode } = require('../middlewares/bcrypt');

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      trim: true,
      index: true,
      unique: [true, 'Email already exist'],
      lowercase: true,
      required: [true, 'Email is required'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
  { versionKey: false }
);

// called before save, create
userSchema.pre('save', async function (next) {
  // check if password is modified or not
  if (!this.isModified('password')) {
    return next();
  }
  // encrypt password
  this.password = await generateEncryptedCode(this.password);
  next();
});

const UsersModel = mongoose.model('User', userSchema);
module.exports = UsersModel;
