var APP = {};


(function() {

  var $opr;
  var basicOperators = {'+': '+', '-': '-', '/': '/', '*': '*'};
  var operatorsHash = {
    2: {'^': 'x ^ y', 'root':'x root y'},
    3: {'%': 'x mod y'}
  };

  APP.init = function() {
    $opr = $('#opr');
    addKeyPads();
    addEvents();
  };


  var addKeyPads = function() {
    resetCalc();
    $.each(basicOperators, function(key,val) {
      $opr.append($("<option>", {value: key, text: val}));
    });

    var checkedOpt = $('[type="radio"]:checked').val();
    if(checkedOpt) {
      var extraOperators = operatorsHash[checkedOpt];
      if (extraOperators) {
        $.each(extraOperators, function (key, val) {
          $opr.append($("<option>", {value: key, text: val}));
        });
      }
    }
  };



  var addEvents = function () {
    $('[type="radio"]').click(function() {
      addKeyPads();
    });

    $('[type="text"]').keypress(function(e) {
      if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        return false;
      }
    });

    $('[type="text"]').change(function() {
      calculate();
    });

    $('select').change(function() {
      calculate();
    });
  };

  var calculate = function(operator) {
    var num1 = $('#num1').val();
    var num2 = $('#num2').val();
    var operator = $opr.find("option:selected" ).val();
    var result;
    if(num1 && num2  && operator) {
      switch (operator) {
        case '+':
        case '-':
        case '*':
        case '/':
          result = eval([num1,operator,num2].join(' '));
          break;
        case '^':
          result = Math.pow(num1,num2);
          break;
        case 'root':
          result = Math.pow(num1, 1/num2);
          break;
        case '%':
          result = num1 %num2;
          break;
      }

      $('#res').text(result);
    }
  }

  var resetCalc = function() {
    $opr.find('option').remove();
    $('[type="text"]').each(function(){ console.log($(this).val(''))});
    $('#res').text('');

  }
})(jQuery);

$(document).ready(function (){
  APP.init();
});




