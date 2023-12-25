var csvData = "time,status,result\r\n18:01,200,OK\r\n18:02,404,Not Found\r\n18:04,500,Internal Server Error\r\n18:22,302,Found\r\n18:22,401,Unauthorized\r\n18:32,301,Moved Permanently\r\n18:17,200,OK\r\n18:26,200,OK\r\n18:02,301,Moved Permanently";
var csv =  new CsvParser(csvData);      
QUnit.test( "test is file empty", function( assert ) {
	var csvEmpty =  new CsvParser("foo,bar");
	assert.equal(csvEmpty.isEmpty, true, "csv object should be empty" );
	assert.equal(csv.isEmpty, false, "csv opbect should not be empty" );
});

QUnit.test( "test length", function( assert ) {
	assert.equal(csv.length, 9);
});

QUnit.test( "test getRow", function( assert ) {
	assert.deepEqual(csv.getRow(0), {result:"OK",status:"200",time:"18:01"}, "first row");
	assert.equal(csv.getRow(csv.length-1).status, "301", "last row data");
	assert.deepEqual(csv.getRow(csv.length + 1 ), {}, "row number out of data scope");
});

QUnit.test( "test getAllRow", function( assert ) {
	var csvShortData = "time,status,result\r\n18:01,200,OK\r\n18:02,404,Not Found";
	var csvShort =  new CsvParser(csvShortData);      
	assert.deepEqual(csvShort.getAllRows(), [{result:"OK",status:"200",time:"18:01"},{result:"Not Found",status:"404",time:"18:02"}], "all rows");
	
});

QUnit.test( "test getHeaders", function( assert ) {
	assert.deepEqual(csv.getHeaders(), ["time","status","result"], "all Headers");
	
});

QUnit.test( "test WhereEquals", function( assert ) {
	var matches = csv.WhereEquals("result", "OK"); 
	assert.equal(matches.length, 3 );
	assert.deepEqual(matches[0],{result:"OK",status:"200",time:"18:01"});
});

QUnit.test( "test WhereGreaterThan", function( assert ) {
	var matches =  csv.WhereGreaterThan("status", 200); 
	assert.equal(matches.length, 6 );
	assert.deepEqual(matches[0],{result:"Not Found",status:"404",time:"18:02"});
});

QUnit.test( "test WhereLessThan", function( assert ) {
	var matches =  csv.WhereLessThan("status", 500);  
	assert.equal(matches.length, 8 );
	assert.deepEqual(matches[0],{result:"OK",status:"200",time:"18:01"});
});