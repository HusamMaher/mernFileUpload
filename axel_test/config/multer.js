const multer = require("multer");
const path = require("path");
const { resolve } = require("path");
const excelFilter = (req, file, cb) => {
	if (
		file.mimetype.includes("excel") ||
		file.mimetype.includes("spreadsheetml")
	) {
		cb(null, true);
	} else {
		cb("Please upload only excel file.", false);
	}
};
var storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, resolve(__dirname, "..", "public/filesUploads"));
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname}`);
	},
});

var uploadFile = multer({ storage: storage, fileFilter: excelFilter });
module.exports = uploadFile;
