'use strict';

class CsvParser {
	constructor(strCsvData)
	{
		//set row data
		this._strCsvData = strCsvData;  
		
		//split raw data by linebreaks
		var rawRowsArr = (this._strCsvData) ? this._strCsvData.split(/\r\n|\n/) : [];
		
		//set file header coloums 
		var headerColsarr = (rawRowsArr.length > 0) ? rawRowsArr.splice(0,1)[0].split(',')  : [];
		this._headerCols = headerColsarr;
		//set rows as arrray of objects [{ col1: val1, col2:val2 ...},{ col1: val1, col2:val2 ...},...]
		this._rows = rawRowsArr.map(function(row) {
			var newRow = {};
			headerColsarr.map(function(val,idx) {
				var value = row.split(',')[idx]; 
				newRow[val.trim()] = (value) ? value.trim() : null;
			});
			return newRow; 
		}) || [] ;
	}

	// return number of rows
	get length(){
		return this._rows.length;
	}

	// return is the parsed data contain valid rows 
	get isEmpty() {
		return (this._rows.length === 0);
	}

	// return the requested line in the file between valid range  
	getRow(lineNumber) {
		return (this.length > 0 && lineNumber >= 0 && lineNumber <= this.length) ? this._rows[lineNumber] : {};  
	}

	// return all the rows in the file
	getAllRows() {
		return this._rows;	
	}

	// return all the headers coloums of the file
	getHeaders() {
		return this._headerCols;
	}

	// return array of rows that requested key is equal to requested value
	WhereEquals(key,value) {
		return this._rows.filter(function(row) { 
				if (row[key] === value) { 
					return row; 
				} 
			});
	}
	
	// return array of rows that requested key is grater then the requested value
	WhereGreaterThan(key,value) {
		return this._rows.filter(function(row) { 
				if (row[key] > parseInt(value)) { 
					return row; 
				} 
			});
	}

	// return array of rows that requested key is less then the requested value
	WhereLessThan(key,value) {
		return this._rows.filter(function(row) { 
				if (row[key] < parseInt(value)) { 
					return row; 
				} 
			});
	}
}


