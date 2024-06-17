function writeServerRequestLog(csvObj) {
  if (!csvObj.isEmpty) {
    var count = csvObj.length;
    for (var i = 0; i < count; ++i) {
      var row = csvObj.getRow(i);
      console.log(row["time"] + " " + row["result"]);
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
  cols.forEach(function (col, idx) {
    $($ulHeader).append(
      "<li>" + (col.length === 0 ? "col #" + (idx + 1) : col) + "</li>"
    );
  });
}

function toHtmlTable(cols, data) {
  var $htmlTbl = $("#tbl");
  $($htmlTbl).empty();
  $($htmlTbl).append("<thead><tr></tr></thead>");

  cols.forEach(function (col, idx) {
    $($htmlTbl)
      .find("thead tr")
      .append(
        "<th>" + (col.length === 0 ? "col #" + (idx + 1) : col) + "</th>"
      );
  });
  $($htmlTbl).append("<tbody></tbody>");

  data.forEach(function (row) {
    $($htmlTbl).find("tbody").append("<tr>");
    Object.values(row).forEach(function (val, idx) {
      $($htmlTbl)
        .find("tr:last")
        .append("<td>" + val + "</td>");
    });
  });
}
function parseCsv() {
  var csvData = $("#hdnCsvData").val();

  var csv = new CsvParser(csvData);
  var headers = csv.getHeaders();
  $("#txtOutput").val(csvData);
  $("#lblIsEmpty").text(csv.isEmpty);
  $("#lblRowsCount").text(csv.length);
  $("#lblColumnsCount").text(headers.length);

  printHeaders(headers);
  toHtmlTable(headers, csv._rows);
  if (
    headers.includes("time") &&
    headers.includes("status") &&
    headers.includes("result")
  ) {
    writeServerRequestLog(csv);
  }
}
