var mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017/myDatabase",
  { useNewUrlParser: true }
);

var Schema = mongoose.Schema;

var personSchema = new Schema({
  name: { type: String, required: true },
  age: Number
});

module.exports = mongoose.model("Person", personSchema);
