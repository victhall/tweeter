/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]



const createTweetElement = function (tweeterData) {
  const $tweet = $('<article>').addClass('tweet');
  let name = tweeterData.user.name;
  let avatar = tweeterData.user.avatar;
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
<span class="tweet-p">${content}</span>
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
  return newTweet
}
