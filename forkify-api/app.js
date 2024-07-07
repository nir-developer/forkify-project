const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");
const recipeRouter = require("./routes/recipeRoutes");

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

const app = express();

// if(process.env.NODE_ENV === 'development')
// {
//     console.log(process.env.NODE_ENV);
//     app.use(morgan('dev'))
// }
app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

//CORS
app.use(cors());

//EXPOSE A FOLDER WITH STATIC RESOURCES
app.use("/public", express.static(path.join(__dirname, "public")));

//END POINTS
app.use("/api/v1/recipes", recipeRouter);

app.all("*", (req, res, next) => {
  next(
    new AppError(
      `The resource ${req.originalUrl} not found on the server `,
      404
    )
  );
  //   res.status(404).json({
  //     status: "fail",
  //     message: `The resource ${req.originalUrl} not found on the server `,
  //   });
});

app.use(globalErrorHandler);
module.exports = app;
