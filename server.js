import express from "express";
import dotEnv from "dotenv";
//mport { ConnectDB } from "./database/connection";
import cors from "cors";
import { ConnectDB } from "./database/connection.js";
import AuthRouter from "./Routes/AuthRoutes.js";
import ExpenseRouter from "./Routes/ExpenseRouter.js";

dotEnv.config();

const app = express();

const PORT = process.env.PORT || 3000;

ConnectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/v1/auth", AuthRouter);

app.use("/v1/expense", ExpenseRouter);

app.listen(PORT, () => console.log("server started at PORT:", PORT));

app.use(function (err, req, res, next) {
  res.status(500).send({
    status: 500,
    message: err?.message,
    body: {},
  });
});
