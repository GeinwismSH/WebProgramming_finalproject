window.addEventListener("load", function() {
    start();
  }, false);
  
  function start() {
    animateText();
  }
  
  function animateText() {
    var textElement = document.getElementById("animated-text");
    var text = textElement.innerText;
    textElement.innerText = ""; // 清空原始文本
  
    var index = 0;
    var intervalId = setInterval(function() {
      if (index < text.length) {
        textElement.innerText += text.charAt(index);
        index++;
      } else {
        clearInterval(intervalId);
        showContinueButton();
      }
    }, 10); // 每 100 毫秒添加一個字符
  }
  
  function showContinueButton() {
    var continueButton = document.getElementById("button_frame");
    continueButton.style.display = "block";
  }