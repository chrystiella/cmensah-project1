document.addEventListener('DOMContentLoaded', function() {
  // Fetch feed items from the API endpoint
  fetch('/api/feed')
      .then(response => response.json())
      .then(data => {
          data.forEach(feedItem => {
              displayItem(feedItem);
          });
      });

  // Function to display each feed item
  function displayItem(feedItem) {
      let newsfeedElement = document.getElementById('newsfeed');
      if (newsfeedElement) {
          let itemHTML = `
              <div class="feed-item">
                  <h2 class="small-title"><a href="${feedItem.linkUrl}" target="_blank">${feedItem.title}</a></h2>
                  <p>${feedItem.body}</p>
                  <a href="${feedItem.linkUrl}" target="_blank">
                      <img src="${feedItem.imageUrl}" alt="${feedItem.title}" style="max-width: 150px; max-height: 150px;">
                  </a>
                  <hr>
              </div>
          `;
          newsfeedElement.innerHTML += itemHTML;
      }
  }

  // Event listener for key press (SPACE bar) to navigate to '/feed'
  document.addEventListener('keypress', function(event) {
      if (event.keyCode === 32) { // 32 is the keyCode for SPACE bar
          goToLocation('/feed');
      }
  });

  // Event listener for clicking on 'fade_text' element to navigate to '/feed'
  let fadeTextElement = document.getElementById('fade_text');
  if (fadeTextElement) {
      fadeTextElement.addEventListener('click', function() {
          goToLocation('/feed');
      });
  }

  // Function to navigate to a specified URL
  function goToLocation(url) {
      window.location.href = url;
  }
});
