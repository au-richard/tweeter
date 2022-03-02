/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const tweetData = {
//   "user": {
//     "name": "Newton",
//     "avatars": "https://i.imgur.com/73hZDYK.png",
//     "handle": "@SirIsaac"
//   },
//   "content": {
//     "text": "If I have seen further it is by standing on the shoulders of giants"
//   },
//   "created_at": 1461116232227
// };

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
];


function createTweetElement(obj) {
  const name = obj.user.name;
  const avatar = obj.user.avatars;
  const handle = obj.user.handle;
  const message = obj.content.text;
  const timeAgo = obj.created_at;
  const $tweet = `
 <article class="posted-tweet">
 <div class="tweet-header">
   <div id="image-name">
     <img src="${avatar}">
     <p>${name}</p>
   </div>
   <div>${handle}</div>
 </div>
 <div class="tweet-body">
   <p>${message}</p>
 </div>
 <div class="divider"></div>
 <div class="tweet-footer">
   <div>${timeago.format(timeAgo)}</div>
   <div class="footer-icons">
     <i class="fa-solid fa-flag"></i>
     <i class="fa-solid fa-retweet"></i>
     <i class="fa-solid fa-heart"></i>
   </div>
 </div>
</article>
 `;

  return $tweet;
}

const renderTweets = function (tweets) {
  // loops through tweets
  for (const tweet of tweets) {
    // calls createTweetElement for each tweet
    const tweetElement = createTweetElement(tweet);
    // takes return value and appends it to the tweets container
    $('#tweets-container').prepend(tweetElement);
  }



};

$(document).ready(function () {
  renderTweets(data);
});