// const mongoose = require("mongoose")
// const db=async()=>{
//     await mongoose.connect("mongodb://127.0.0.1:27017")
//     console.log("mongoose connected");
// }
// module.exports=db



const recipe = (req, res, next) => {
  const { name, description, preparationTime, cookingTime, imageUrl, country, veg, } = req.body;
  if (name && description && preparationTime && cookingTime && imageUrl && country && veg) {
    next();
  }
  else {
    res.status(400).send("All fields are required.");
  }
};
module.exports = recipe;
