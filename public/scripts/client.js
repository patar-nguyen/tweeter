$(document).ready(function() {

  $("#warning").hide();

  //Loops through tweets and renders them on the top of the list
  const renderTweets = function(tweets) {
    $('#tweets-container').empty();
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    }
  };

  //Gets the tweets, loads it, and renders it on screen
  const loadTweets = function() {
    $.ajax('/tweets', {method: 'GET'})
      .then(function(tweets) {
        console.log('Success: ', tweets);
        renderTweets(tweets);
      });
  };
  
  //Preventing cross-site scripting (XSS) attacks with escape
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //Creating the html and passing in values
  const createTweetElement = function(tweet) {
    let $tweet = `
    <article class="tweets">
      <header>
        <span class="profile">
          <img class="profile-pic" src="${escape(tweet.user.avatars)}"> 
          <span>${escape(tweet.user.name)}</span>
        </span>
        <span class="user">${escape(tweet.user.handle)}</span>
      </header>
        <p class="text">${escape(tweet.content.text)}</p>
      <footer>
        <span class="timestamp">${escape(timeago.format(tweet.created_at))}</span>
          <div class="icons">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
      </footer>
    </article>
  `;
    return $tweet;
  };

  //Handling ajax post request submit and form validation
  $("#submit").submit(function(event) {

    event.preventDefault();
    $("#warning").hide();

    let characterCount = $("form").find("textarea").val();

    if (characterCount.length > 140) {
      return $("#warning").text("Tweet cannot exceed character limit!").slideDown(400);
    } else if (characterCount.length === null || characterCount.length === 0 || characterCount.trim() === "") {
      return $("#warning").text("Tweet cannot be empty!").slideDown(400);
    } else {
      $.ajax({
        url: "/tweets",
        data: $(this).serialize(),
        method: 'post',
        success: function() {
          $("form").find("textarea").val('');
          loadTweets();
        }
      });
    }
  });

  loadTweets();

});

