$(document).ready(function() {
  $("form").find("textarea").keyup(function() {
    const input = $(this).val().length;

    $(this).next().find("output").text(140 - input);

    if (input > 140) {
      $(this).next().find("output").css("color", "red");
    } else {
      $(this).next().find("output").css("color", "#545149");
    }
  });
});