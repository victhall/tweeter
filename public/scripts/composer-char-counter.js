$(document).ready(function () {
  console.log('fuck')
  $('#tweet-text').on('input', function () {
    let charCount = this.value.length
    $(".counter").text(140 - charCount);
    if (charCount > 140) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "black");
    }
  })
});
