const Book = require("../models/books");
const readXlsxFile = require("read-excel-file/node");
const path = require("path");
const upload = async (req, res) => {
	try {
		if (req.file == undefined) {
			return res.status(400).send("Please upload an excel file!");
		}

		let dirpath =
			path.normalize(__dirname + "/.." + "/public/filesUploads/") +
			req.file.filename;

		readXlsxFile(dirpath).then((rows, errors) => {
			if (errors)
				return res.send({ error: errors, message: "something went wrong" });
			rows.shift();

			let books = [];

			rows.forEach((row) => {
				let book = {
					id: row[0],
					title: row[1],
					description: row[2],
					publisher: row[3],
				};

				books.push(book);
			});

			Book.bulkCreate(books)
				.then(() => {
					res.status(200).send({
						message: "Uploaded the file successfully: " + req.file.originalname,
					});
				})
				.catch((error) => {
					res.status(500).send({
						message: "Fail to import data into database!",
						error: error.message,
					});
				});
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({
			message: "Could not upload the file: " + req.file.originalname,
		});
	}
};

const getBooks = (req, res) => {
	Book.findAll()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while retrieving tutorials.",
			});
		});
};

module.exports = { upload, getBooks };
