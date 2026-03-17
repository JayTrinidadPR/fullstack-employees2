import db from "#db/client";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  const employees = [
    ["Alice Kim", "1990-03-12", 64000],
    ["Ben Ortiz", "1987-07-09", 72000],
    ["Carla Singh", "1992-11-24", 69000],
    ["Derek Moss", "1985-01-17", 75000],
    ["Elena Ruiz", "1998-05-30", 61000],
    ["Frank Doyle", "1993-09-11", 58000],
    ["Grace Patel", "1991-12-03", 85000],
    ["Hector Lee", "1989-06-21", 67000],
    ["Iris Novak", "1997-04-15", 62000],
    ["Jordan Kim", "1994-10-29", 70000],
  ];

  for (const [name, birthday, salary] of employees) {
    const sql = `
      INSERT INTO employees (name, birthday, salary)
      VALUES ($1, $2, $3)
    `;
    await db.query(sql, [name, birthday, salary]);
  }
}
