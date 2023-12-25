var csvFile ={};

(function() {
  var $hdnCsvData =$("#hdnCsvData");
  var $btnParse =$("#btnParse");
  var $inpitFile = document.getElementById($( "input:file" ).attr("id"));
  var reader = new FileReader();
  

  function parseCsv() {
    $($hdnCsvData).val('');
    $($btnParse).attr("disabled", true);
    if($inpitFile && $inpitFile.files.length === 1) {
      var curFile = $inpitFile.files[0];
      getAsText(curFile);
    }
  }

  function loadHandler(event) {
    if($hdnCsvData) {
      $($hdnCsvData).val(event.target.result);
      $($btnParse).attr("disabled", false);
    }
  }

  function errorHandler(event) {
    if(event.target.error.name === "NotReadableError") {
      alert("Canno't read file !");
    }
  }

  function getAsText(fileToRead) {
    reader.onload = loadHandler;
    reader.onerror = errorHandler;
    reader.readAsText(fileToRead);
  }

  csvFile.getCsvData = function() {
   parseCsv();
 }

})(jQuery); 

$(document).ready(function (){
 if (window.FileReader) {
  return new Error('FileReader are not supported in this browser.');
}
});