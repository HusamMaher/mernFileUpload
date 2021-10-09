const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const Book = sequelize.define("book", {
	title: {
		type: Sequelize.STRING,
	},
	description: {
		type: Sequelize.STRING,
	},
	publisher: {
		type: Sequelize.STRING,
	},
});

module.exports = Book;
