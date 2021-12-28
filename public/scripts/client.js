/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [];

const escape = (str) => {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//Helper functions
const createTweetElement = (tweeterData) => {
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

const renderTweets = (tweets) => {
  for (let element of tweets) {
    const postTweets = createTweetElement(element);
    $('.tweet-container').prepend(postTweets);
  }
};

const loadedTweets = () => {
  $.ajax("/tweets", { method: 'GET' })
    .then(arrayOfTweets => {
      renderTweets(arrayOfTweets)
    })
}

//ensures DOM is ready for JavaScript code to execute
$(document).ready(function () {
  //hide html error messages when loading page
  $('.error-msg').hide();
  //catch submit form
  $('form').on('submit', function (event) {
    //prevents form submission
    event.preventDefault();
    //gets tweet value and counter
    const tweetBox = $(this).children('#tweet-text');
    const tweetBoxVal = tweetBox.val();
    const charCount = $(this).children('div').children('div').children('.counter');
    //creates text string from form input
    const data = $('.tweet-form').serialize();

    //conditionals
    //if no tweet submitted, show error msg
    if (!tweetBoxVal) {
      $('#error-one').show(() => {
        $('#error-one').slideDown(1000);
      });
      $.ajax({ url: '/tweets', method: 'POST' })
        .done((results) => { })
        .fail();
    }
    //if tweet submitted over 140 chars, show error msg
    if (tweetBoxVal.length > 140) {
      $('#error-two').show(() => {
        $('#error-two').slideDown(1000);
      });
      $.ajax({ url: '/tweets', method: 'POST' })
        .done((results) => { })
        .fail();
    } else {
      //creates api request using ajax
      $.ajax({ url: '/tweets', method: 'POST', data: data })
        .done((results) => {
          loadedtweets();
          $(tweetBox).val('');
          $(charCount).val('140');
          $('.error-msg').hide();
        })
        .fail((error) => console.log(error))
        .always(() => console.log('request to server done'));
    }
  });
  //shows previous tweets
  const loadedtweets = function () {
    $.ajax({ url: '/tweets', method: 'GET' })
      .done((results) => {
        //empties tweet container
        $('.tweet-container').empty();
        renderTweets(results);
      })
      .fail((error) => console.log(error))
      .always(() => console.log('request to server done'));
  }
  loadedtweets();
})