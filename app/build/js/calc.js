'use strict';

$(document).ready(function () {

  // Calculator
  function number_format(number, decimals, dec_point, thousands_sep) {
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
      prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
      sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
      dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
      s = '',
      toFixedFix = function (n, prec) {
        var k = Math.pow(10, prec);
        return '' + (Math.round(n * k) / k)
          .toFixed(prec);
      };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
      .split('.');
    if (s[0].length > 3) {
      s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '')
      .length < prec) {
      s[1] = s[1] || '';
      s[1] += new Array(prec - s[1].length + 1)
        .join('0');
    }
    return s.join(dec);
  };

  function calculate() {

    var amount = Number.parseFloat($(".calc__item-summ input[type='range']").val()),
      payment = $(".calc__item-checkbox input[type='checkbox']"),
      refill = Number.parseFloat($(".calc__item-rise input[type='range']").val()),
      totalIncome = 0,
      rate = parseFloat("10.8") / 100,
      month = Number.parseFloat($(".calc__item-time input[type='range']").val());

      if (amount <= 1999999) {

        if (month <= 11) {
          var rateM = parseFloat("10.5");
        } else if (month >= 12 && month <= 23) {
          var rateM = parseFloat("10.5");
        } else if (month >= 24) {
          var rateM = parseFloat("10.5");
        }

    } else if (amount >= 2000000 && amount <= 9999999) {

        if (month <= 11) {
          var rateM = parseFloat("12.5");
        } else if (month >= 12 && month <= 23) {
          var rateM = parseFloat("13");
        } else if (month >= 24) {
          var rateM = parseFloat("13.5");
        }

    } else if (amount >= 10000000 && amount <= 19999999) {

        if (month <= 11) {
          var rateM = parseFloat("13.5");
        } else if (month >= 12 && month <= 23) {
          var rateM = parseFloat("14");
        } else if (month >= 24) {
          var rateM = parseFloat("14.5");
        }

    } else if (amount >= 20000000 && amount <= 29999999) {

        if (month <= 11) {
          var rateM = parseFloat("13.5");
        } else if (month >= 12 && month <= 23) {
          var rateM = parseFloat("15.5");
        } else if (month >= 24) {
          var rateM = parseFloat("16");
        }

    } else if (amount >= 30000000) {

        if (month <= 11) {
          var rateM = parseFloat("13.5");
        } else if (month >= 12 && month <= 23) {
          var rateM = parseFloat("15.5");
        } else if (month >= 24) {
          var rateM = parseFloat("18");
        }
    };




    amount = (amount == 0 || isNaN(amount)) ? 10000 : amount;
    month = (month == 0) ? 3 : month;
    refill = (refill == 0 || isNaN(refill)) ? 0 : refill;

    for (var i = 0; i < month; i++) {
      var newRefill = i * refill;

      var newAmount = amount + newRefill;
      var newAmount1 = amount + newRefill;

      if (!payment.prop('checked') && i) newAmount += totalIncome;

      var income = newAmount * rate * month / 12;
      var percents = income / month;
      totalIncome += percents;
  };

    $(".object-output-percent").html(rateM + ' %');

    $(".calc__total-result").html(number_format(newAmount1 + totalIncome, 0, '.', ' ') + ' ₽');
    $(".calc__total-bottom-summ").html(number_format(newAmount1 + totalIncome, 0, '.', ' ') + ' ₽');
    // $(".object-form__inputs__summ").html(number_format(newAmount1 + totalIncome, 0, '.', ' ') + ' ₽');

    $(".calc__total-profit").text(number_format(totalIncome, 0, '.', ' ') + ' ₽');
    // $(".calc__total-month").text(number_format(totalIncome / month, 0, '.', ' ') + ' ₽');
    $(".calc__total-time").html(month + ' мес.');

  };

  $(".calc__item-value-summ").html(number_format($(".calc__item-summ input[type='range']").val(), 0, '.', ' ') + ' ₽');

  $('.calc__item-invest').html(number_format($(".calc__item-summ input[type='range']").val(), 0, '.', ' ') + ' ₽');

  $(".calc__item-value-time").html($(".calc__item-time input[type='range']").val() + " мес.");

  $(".calc__item-value-rise").html(number_format($(".calc__item-rise input[type='range']").val(), 0, '.', ' ') + ' ₽');

  $(".calc__item-summ input[type='range']").on('input', function () {
    $(".calc__item-value-summ").html(number_format($(".calc__item-summ input[type='range']").val(), 0, '.', ' ') + ' ₽');
    $('.calc__item-invest').html(number_format($(".calc__item-summ input[type='range']").val(), 0, '.', ' ') + ' ₽');
    calculate();
  });

  $(".calc__item-time input[type='range']").on('input', function () {
    $(".calc__item-value-time").html(number_format($(".calc__item-time input[type='range']").val(), 0, '.', ' ') + ' мес');
    calculate();
  });

  $(".calc__item-rise input[type='range']").on('input', function () {
    $(".calc__item-value-rise").html(number_format($(".calc__item-rise input[type='range']").val(), 0, '.', ' ') + ' ₽');
    calculate();
  });

  $(".calc__item-checkbox input[type='checkbox']").on('input', function () {
    calculate();
  });

  calculate();

});
