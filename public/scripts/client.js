/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  $("#error-text-zero").hide();
  $("#error-text-over").hide();

  //Escape Function for escaping Cross Site Scripting
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //New Tweet Template 
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
     <p>${escape(name)}</p>
   </div>
   <div>${escape(handle)}</div>
 </div>
 <div class="tweet-body">
   <p>${escape(message)}</p>
 </div>
 <div class="divider"></div>
 <div class="tweet-footer">
   <div>Posted ${timeago.format(timeAgo)}</div>
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

  // Prepending Newest Tweet As Last One On Top
  const renderTweets = function (tweets) {
    let timeStamp = {};
    for (const tweet of tweets) {
      if (tweet.created_at in timeStamp) {
        timeStamp[tweet.created_at] += 1;
      } else {
        timeStamp[tweet.created_at] = 0;
      }
      const tweetElement = createTweetElement(tweet);
      $('#tweets-container').prepend(tweetElement);
    };
  };

  //AJAX Get Request To Load Tweet When Ready 
  const loadTweets = function () {
    $.ajax({
      url: "/tweets",
      method: "GET",
      success: function (data) {
        renderTweets(data);
      }
    });
  };
  // Calling Default Posted Tweets On Server Start

  // Submitting Tweet
  $("#tweet-form").on("submit", function (event) {
    event.preventDefault();
    const req = $(this).serialize();
    const textArea = $("#tweet-text").val().length;
    //Checking Tweet Conditions Input Before Submitting
    if (textArea === 0) {
      $("#error-text-over").hide();
      $("#error-text-zero").slideDown();
    } else if (textArea > 140) {
      $("#error-text-zero").hide();
      $("#error-text-over").slideDown();
    } else {
      $("#error-text-zero").slideUp();
      $("#error-text-over").slideUp();
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: req,
        success: function (res) {
          // Clearing tweet container before posting new tweet
          document.getElementById("tweets-container").innerHTML = "";
          loadTweets();
          $(".counter").text(140);
          $("#tweet-form").trigger("reset");
        }
      });
    }
  });
  loadTweets();
});