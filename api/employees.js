import express from "express";

import {
  createEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
} from "#db/queries/employees";

const router = express.Router();

const REQUIRED_FIELDS = ["name", "birthday", "salary"];

const hasRequiredEmployeeFields = (body) =>
  REQUIRED_FIELDS.every((field) => body?.[field] !== undefined);

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
    next({ status: 400, message: "Name, birthday, and salary are required." });
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
  try {
    const employee = await getEmployee(Number(req.params.id));

    if (!employee) {
      next({ status: 404, message: "Employee not found." });
      return;
    }

    res.send(employee);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  if (!req.body || !hasRequiredEmployeeFields(req.body)) {
    next({ status: 400, message: "Name, birthday, and salary are required." });
    return;
  }

  try {
    const employee = await updateEmployee({
      id: Number(req.params.id),
      ...req.body,
    });

    if (!employee) {
      next({ status: 404, message: "Employee not found." });
      return;
    }

    res.send(employee);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const employee = await deleteEmployee(Number(req.params.id));

    if (!employee) {
      next({ status: 404, message: "Employee not found." });
      return;
    }

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

export default router;
