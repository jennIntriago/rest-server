const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    //esta linea es necesaria para suprimir una advertencia de versionamiento
    await mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGODB_ATLAS, {
      //   useNewUrlParse: true,
      //   useUnifiedTopology: true,
      //   useCreateIndex: true,
      //   useFindAndModify: false,
    });

    console.log("Base de datos online");
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de iniciar la base de datos");
  }
};

module.exports = {
  dbConnection,
};
