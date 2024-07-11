function checkKeyPress(event) {
  if (event.keyCode === 32) { 
      goToLocation('/feed');
  }
}

document.addEventListener('keypress', function(event) {
  checkKeyPress(event);
});

document.getElementById('fade_text').addEventListener('click', function() {
  goToLocation('/feed');
});