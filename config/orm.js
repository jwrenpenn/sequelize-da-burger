var connection = require('../config/connection.js');

function printQuestionMarks(num) {
	var array = [];

	for (var i = 0; i < num; i++) {
		array.push('?');
	}

	return array.toString();
}

function objToSql(ob) {

	var array = [];

	for (var key in ob) {
		if (ob.hasOwnProperty(key)) {
			array.push(key + '=' + ob[key]);
		}
	}

	return array.toString();
}

var orm = {

	all: function (tableInput, callback) {
		var queryString = 'SELECT * FROM ' + tableInput + ';';
		connection.query(queryString, function (error, result) {
			if (error) throw error;
			callback(result);
		});
	},

	create: function (table, cols, vals, callback) {
		var queryString = 'INSERT INTO ' + table;

		queryString = queryString + ' (';
		queryString = queryString + cols.toString();
		queryString = queryString + ') ';
		queryString = queryString + 'VALUES (';
		queryString = queryString + printQuestionMarks(vals.length);
		queryString = queryString + ') ';

		console.log(queryString);

		connection.query(queryString, vals, function (error, result) {
			if (error) throw error;
			callback(result);
		});
	},

	update: function (table, objColVals, condition, callback) {
		var queryString = 'UPDATE ' + table;

		queryString = queryString + ' SET ';
		queryString = queryString + objToSql(objColVals);
		queryString = queryString + ' WHERE ';
		queryString = queryString + condition;

		console.log(queryString);
		connection.query(queryString, function (error, result) {
			if (error) throw error;
			callback(result);
		});
	},
	
};

module.exports = orm;