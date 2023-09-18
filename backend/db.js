const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/inotebook?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.6";

const connectToMongo = async () => {

  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to MongoDB Successfully");
  } catch(error) {
    console.log("Error connecting to MongoDB", error);
  }

}

module.exports = connectToMongo;

