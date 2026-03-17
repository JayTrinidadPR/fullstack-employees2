import express from "express";

import {
  createEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
} from "#db/queries/employees";

const REQUIRED_FIELDS = ["name", "birthday", "salary"];
const hasRequiredEmployeeFields = (body) =>
  REQUIRED_FIELDS.every((field) => body?.[field] !== undefined);

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const employees = await getEmployees();
    res.send(employees);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  if (!req.body || !hasRequiredEmployeeFields(req.body)) {
    res.sendStatus(400);
    return;
  }

  try {
    const employee = await createEmployee(req.body);
    res.status(201).send(employee);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const id = Number(req.params.id);

  try {
    const employee = await getEmployee(id);
    if (!employee) {
      res.sendStatus(404);
      return;
    }
    res.send(employee);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  if (!req.body || !hasRequiredEmployeeFields(req.body)) {
    res.sendStatus(400);
    return;
  }

  const id = Number(req.params.id);

  try {
    const updated = await updateEmployee({
      id,
      ...req.body,
    });
    if (!updated) {
      res.sendStatus(404);
      return;
    }
    res.send(updated);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  const id = Number(req.params.id);

  try {
    const employee = await deleteEmployee(id);
    if (!employee) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

export default router;
