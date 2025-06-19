const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(process.env.DB_CONNECTION_SECRET, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = { connectDB };
