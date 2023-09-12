const app = require('./app.js');
const { connectMongoDB } = require('./middlewares/mongodb-database.js');
const port = process.env.PORT || 3000;

app.listen(port, async () => {
  try {
    // check database connection
    await connectMongoDB();
  } catch (error) {
    console.log('error ', error.message);
  }
  console.log(`Server Started at ${port}`);
});
