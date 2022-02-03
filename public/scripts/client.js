$(document).ready(function() {

const renderTweets = function(tweets) {
  $('#tweets-container').empty();
  for (let tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet);
  }
}

const loadTweets = function () {
  $.ajax('/tweets', {method: 'GET'})
  .then(function (tweets) {
    console.log('Success: ', tweets);
    renderTweets(tweets)
  })
}

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

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
      <span class="text">${escape(tweet.content.text)}</span>
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
}

$( "#submit" ).submit(function( event ) {
  console.log("Form submitted");
  event.preventDefault();

  let characterCount = $("form").find("textarea").val().length;
  if (characterCount > 140) {
    alert("Character count exceeds limit");
  } else if (characterCount < 1) {
    alert("Input box cannot be empty");
  } else {
    $.ajax({
      url: "/tweets",
      data: $(this).serialize(),
      method: 'post',
      success: function () {
        $("form").find("textarea").val('');
        loadTweets();
      }
    });
  };
});

loadTweets();

});

