$(document).ready(function () {
  console.log("Hello");

  $("#tweet-text").on("input", function (event) {
    console.log("Current message", event.target.value);
    let charsRemain = 140 - event.target.value.length;
    $(".counter").text(charsRemain);
    if (charsRemain < 0) {
      $(".counter").css("color", "#ff0000");
    } else if (charsRemain >= 0) {
      $(".counter").css("color", "#c3c3c1");
    }
  });

  $("#btn").on("click", (event) => {
    console.log(this, event.target); //The this keyword is a reference to the button
  });
});

