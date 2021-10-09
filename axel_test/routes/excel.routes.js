const express = require("express");

const router = express.Router();
const uploadFile = require("../config/multer");
const { upload, getBooks } = require("../controllers/excel.controller");
router.post("/xlsFile", uploadFile.single("file"), upload);
router.get("/getAllBooks", getBooks);

module.exports = router;
