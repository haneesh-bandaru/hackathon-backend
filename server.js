const express = require("express");
const cors = require("cors");

const employeeRoutes = require("./src/routes/employee.routes");
const projectRoutes = require("./src/routes/project.routes");
const taskRoutes = require("./src/routes/task.routes");
const login = require("./src/auth/login");
const verifyToken = require("./src/middleware/middleware");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/protected", verifyToken);
app.use("/protected/employees", employeeRoutes);
app.use("/protected/projects", projectRoutes);
app.use("/protected/tasks", taskRoutes);
app.use("/login", login);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
