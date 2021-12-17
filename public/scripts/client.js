/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [];

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function (tweeterData) {
  const $tweet = $('<article>').addClass('tweet');
  let name = tweeterData.user.name;
  let avatar = tweeterData.user.avatars;
  let handle = tweeterData.user.handle;
  let content = tweeterData.content.text;
  let time = timeago.format(tweeterData.created_at);

  const tweetFormat = `<header class="tweet-header">
<div class="img-name">
  <img src=${avatar} alt="" class="user-img">
  <span>${name}</span>
</div>
<span class="username">${handle}</span>
</header>
<div class="tweet-body">
<span class="tweet-p">${escape(content)}</span>
</div>
<footer class="tweet-footer">
<time datetime="2021-12-12T17:50:21.000Z">${time}</time>
<span class="icons">
<i class="fas fa-flag"></i>
<i class="fas fa-retweet"></i>
<i class="fas fa-heart"></i>
</span>
</footer>`

  let newTweet = $tweet.append(tweetFormat);
  return newTweet;
};

const renderTweets = function (tweets) {
  for (let element of tweets) {
    const postTweets = createTweetElement(element);
    $('.tweet-container').prepend(postTweets);
  }
};


function loadedTweets() {
  $.ajax("/tweets", { method: 'GET' })
    .then(arrayOfTweets => {
      renderTweets(arrayOfTweets)
    })
}



$(document).ready(function () {
  $('.error-msg').hide();

  $('form').on('submit', function (event) {
    event.preventDefault();

    const tweetBox = $(this).children('#tweet-text');
    const tweetBoxVal = tweetBox.val();
    const data = $('.tweet-form').serialize();
    const charCount = $(this).children('div').children('div').children('.counter');
    const btn = $(this).children('div').children('div').children('.tweet-btn');

    //create API request using AJAX
    if (!tweetBoxVal) {
      $(btn).prop('disabled', true);
      $('#error-one').show(() => {
        $('#error-one').slideDown()
      });
    }
    if (tweetBoxVal.length > 140) {
      $(btn).prop('disabled', true);
      $('#error-two').show(() => {
        $('#error-two').slideDown()
      });
    } else {
      $.ajax("/tweets", { method: 'POST', data: data })
        .then((result) => {
          loadedTweets()
          $(tweetBox).val('')
          $(charCount).val('140')
        })
    }
  })
  loadedTweets();
});

