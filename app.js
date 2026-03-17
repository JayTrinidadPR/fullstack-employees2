import express from "express";
import employeeRouter from "./routes/employees.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Fullstack Employees API.");
});
app.use("/employees", employeeRouter);

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

export default app;
