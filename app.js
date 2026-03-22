import express from "express";
import employeeRouter from "#api/employees";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Fullstack Employees API.");
});
app.use("/employees", employeeRouter);

app.use((error, req, res, next) => {
  console.error(error);
  const status = error.status ?? 500;
  const message = error.message ?? "Internal server error.";
  res.status(status).send(message);
});

export default app;
