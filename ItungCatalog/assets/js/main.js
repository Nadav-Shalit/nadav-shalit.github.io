/* 2019072622214*/

function Init(ytongCalcObj) {
    $('#alert').hide();
    $('#results').empty();

    Load();

    
    
    $('button').bind('click', function () {
        $('#results').empty();  
        var thick = parseInt($('#drpThickness').val());
        var height = parseInt($('#drpHeight').val());
        var length = parseInt($(this).data('value'));

        if (!!thick && !!height && !!length) {
            ytongCalcObj.arrOptions.forEach(function (option) {
                if (option.thick === thick && option.height === height && option.length === length) {
                    $('#blogPostTemplate').tmpl(option).appendTo('#results');
                    return;
                }
            });
        }

    });


}

    function Load(){
        reset();     
        $('#drpThickness').empty();
        $('#drpThickness').append($('<option></option>').attr('value',0).text('בחר')); 
        
        var arrValues = yc.arrOptions.map(function(item){ 
            return parseInt(item.thick);
            });
            $.unique(arrValues.sort((a, b) => a - b)).forEach(function(item) {
                $('#drpThickness').append($('<option></option>').attr('value',item).text(item)); 
            });
            
            $('#drpThickness').bind('change',function(){
                $('#drpHeight').prop('disabled',parseInt($(this).val()) === 0);             
                LoadHeight($(this).val());
            })   

    }

    function LoadHeight(thickValue){
        reset();     
        $('#drpHeight').empty();
        $('#drpHeight').append($('<option></option>').attr('value',0).text('בחר'));
        var arrValues = yc.arrOptions.map(function(item){                   
            if(thickValue == item.thick) {                
                return parseInt(item.height);     
            }              
        }); 
        arrValues = arrValues.filter(function (el) {
            return el != null;
          })
        $.unique(arrValues.sort((a, b) => a - b)).forEach(function(item) {         
                $('#drpHeight').append($('<option></option>').attr('value',item).text(item)); 
        });
         $('#drpHeight').bind('change',function(){
            LoadLength( $('#drpThickness').val(),$(this).val());
         })
    }

        function LoadLength(thickValue,heightValue){  
        reset();     
        var arrValues = yc.arrOptions.map(function(item){                   
            if(thickValue == item.thick && heightValue == item.height) {
                return parseInt(item.length);     
            }              
        }); 
        arrValues = arrValues.filter(function (el) {
            return el != null;
        })
    arrValues =  $.unique(arrValues.sort((a, b) => a - b));
    
    if(arrValues.length ===1){
        $('button[data-value="' + arrValues[0] + '"]').prop('disabled',false);            
        $('button[data-value="' + arrValues[0] + '"]').click();
    } else {
        $('button').prop('disabled',false);
    }
    
}
 function reset(){
    $('#results').empty();
    $('button').prop('disabled',true);
 }