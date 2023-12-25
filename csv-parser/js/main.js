
function writeServerRequestLog(csvObj) {
  if (!csvObj.isEmpty) { 
    var count = csvObj.length; 
    for (var i = 0; i < count; ++i) { 
      var row = csvObj.getRow(i); 
      console.log(row["time"] + ' ' + row["result"]);
      if (row.status != 200) {
        console.error("Error: " + row.status);
      }
    } 
  } 

  var matches = csvObj.WhereEquals("result", "OK"); 
  console.log("result = OK:");
  console.log(matches);
  matches = csvObj.WhereGreaterThan("status", 200); 
  console.log("status > 200:");
  console.log(matches);
  matches = csvObj.WhereLessThan("status", 500); 
  console.log("status < 500:");
  console.log(matches);
}

function printHeaders(cols) {
  var $ulHeader = $("#ulHeader");
  $($ulHeader).empty();
  cols.forEach(function(col) { $($ulHeader).append('<li>' + col + '</li>')})
}

function parseCsv() {
  var csvData = $("#hdnCsvData").val();
  
  var csv =  new CsvParser(csvData);
  var headers = csv.getHeaders();
  $("#txtOutput").val(csvData);
  $("#lblIsEmpty").text(csv.isEmpty);
  $("#lblRowsCount").text(csv.length);
  $("#lblColumnsCount").text(headers.length);
  
  printHeaders(headers);
  if(headers.includes('time') && headers.includes('status') && headers.includes('result')) {
    writeServerRequestLog(csv);  
  }
  
}