$(function () {
  // This controls the custom dropdown for Tablet and Desktop
  $(".custom-select-label").on("click", function () {
    $(".desktop-custom-select").removeClass("is-opened");
    $(this).closest(".desktop-custom-select").toggleClass("is-opened");
  });

  function selectPrintable(interest, input) {
    switch (interest) {
      case "grocery":
        input.val(
          "https://sagomini.link/GroceryPrintable"
        );
        break;
      case "bigtrucks":
        input.val(
          "https://sagomini.link/BigTrucksPrintable"
        );
        break;
      case "icecream":
        input.val(
          "https://sagomini.link/IceCreamPrintable"
        );
        break;
      case "birds":
        input.val(
          "https://sagomini.link/BirdsPrintable"
        );
        break;
      case "outdoors":
        input.val(
          "https://sagomini.link/ForestPrintable"
        );
        break;
      case "resto":
        input.val(
          "https://sagomini.link/BackyardBBQPrintable"
        );
        break;
      case "puppet":
        input.val(
          "https://sagomini.link/FingerPuppetTheater"
        );
        break;
      case "characters":
        input.val(
          "https://sagomini.link/PaperPeoplePrintable"
        );
        break;
    }
  }

  $(".select-item").on("click", function () {
    $(".desktop-custom-select").removeClass("is-opened");
    var $thisSelect = $(this).closest(".desktop-custom-select");

    if ($(this).hasClass("interest-select-item")) {
      $(".select-input.interest-input").val($(this).attr("data-value"));
      $(".custom-select-label.interest-input-label").html($(this).html());
      $(".custom-select-label.interest-input-label").addClass("selected");

      selectPrintable($(this).attr("data-value"), $("input[name=printable]"));

      $(".interest-input-label").removeClass('error');
      $(".interest-select select").removeClass('error');
    } else {
      $(".select-input.age-input").val($(this).attr("data-value"));
      $(".custom-select-label.age-input-label").html($(this).html());
      $(".custom-select-label.age-input-label").addClass("selected");

      $(".age-input-label").removeClass('error');
      $(".age-select select").removeClass('error');
    }

    $(".select-item").removeClass("is-active");
    $(this).addClass("is-active");
    $thisSelect.removeClass("is-opened");
  });

  $(".interest-select .mobile-select").on("change", function() {
    selectPrintable($(this).find(':selected').val(), $("input[name=printable]"));

    $(".interest-input-label").removeClass('error');
    $(".interest-select select").removeClass('error');
  });

  $(".age-select .mobile-select").on("change", function() {
    $(".select-input.age-input").val($(this).find(':selected').val());

    $(".age-input-label").removeClass('error');
    $(".age-select select").removeClass('error');
  });

  $(".subscribe-label").on("click", function () {
    const isChecked = $(".subscribe-checkbox").is(":checked");
    if (isChecked) {
      $(".subscribe-checkbox").prop("checked", false);
      $(".button-download").prop("disabled", true);
    } else {
      $(".subscribe-checkbox").prop("checked", true);
      $(".button-download").prop("disabled", false);
    }
  });

  $("form input[name=email]").on("input", function() {
    $("form input[name=email]").removeClass('error');
    $("form input[name=email]").val($(this).val());
  });

  $('form').submit(function() {
    let valid = true;
    $("form input[name=email]").removeClass('error');
    $(".age-input-label").removeClass('error');
    $(".age-select select").removeClass('error');
    $(".interest-input-label").removeClass('error');
    $(".interest-select select").removeClass('error');

    let emailInput = $("form input[name=email]");
    if (emailInput.val() == '') {
      $("form input[name=email]").addClass('error');
      valid = false;
    }

    let ageInput = $(".select-input.age-input").val();
    if (ageInput == '' || ageInput == 'default') {
      $(".age-input-label").addClass('error');
      $(".age-select select").addClass('error');
      valid = false;
    }

    let printableInput = $("input[name=printable]").val();
    if (printableInput == '' || printableInput == 'https://sagomini.com/printables') {
      $(".interest-input-label").addClass('error');
      $(".interest-select select").addClass('error');
      valid = false;
    }

    const isChecked = $(".subscribe-checkbox").is(":checked");
    if (isChecked && valid) {
      fbq('track', 'Lead', {content_name: 'DownloadButton'});

      if(window.location.pathname == "/meet-world-1" || window.location.pathname == "/meet-school-1"){
        gtag('event', 'Leads_V1');
      }else if(window.location.pathname == "/meet-world-2" || window.location.pathname == "/meet-school-2"){
        gtag('event', 'Leads_V2');
      }

      // hide form. Present simple message
      let forms = $('form');
      for (let i = 0; i < forms.length; i++) {
        let form = forms[i];

        let section = document.createElement('section');
        section.className = 'download-printable-section';
        if (i != 0) { // shrink secondary / mobile views to fit copy
          section.style = 'height: auto !important;';
        }
        let image = $('.download-printable-section img')[0].cloneNode(true);
        section.appendChild(image);
        let h1 = $('.download-printable-section h1')[0].cloneNode(true);
        let span = $('.download-printable-section h1 span')[0].cloneNode(true);
        h1.innerHTML = 'You downloaded a ' + span.outerHTML + ' for your kiddo!<br><br>Enjoy!';
        h1.style.marginBottom = 0;
        section.appendChild(h1);

        form.parentNode.insertBefore(section, form);
      }

      $('form').hide();
    }
    return isChecked && valid;
  });

});
