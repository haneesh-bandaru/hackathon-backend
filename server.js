const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require("./src/routes/employee.routes");
const projectRoutes = require("./src/routes/project.routes");
const taskRoutes = require("./src/routes/task.routes");
const loginRoutes=require("./src/routes/login.routes");

const app = express();

app.use(bodyParser.json());
app.use(cors());

// app.use('/auth', authRoutes);
app.use("/employees", employeeRoutes);
app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);
app.use("/login",loginRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});