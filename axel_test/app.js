const express = require("express");
const xlsRouter = require("./routes/excel.routes");
const sequelize = require("./config/db");
const cors = require("cors");
const app = express();

app.use(express.static("public"));
app.use("/upload", xlsRouter);
app.use(cors());
app.listen(5000, () => {
	console.log("server is running on port 5000");
	sequelize
		.sync()
		.then((result) => {
			console.log("database connected successfully");
		})
		.catch((err) => {
			console.error(err);
		});
});
