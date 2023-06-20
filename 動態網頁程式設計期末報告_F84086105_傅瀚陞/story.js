window.addEventListener( "load", function(){start();}, false );

var playdata = {};  
function start() {
  console.log(document.cookie)
  var specialSection = document.getElementById("special-section");
  //cookie還在就能保持登入狀態
  if (document.cookie) {
    if (specialSection){
    //把cookie們分開
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      //抓名字是playerdata的cookie
      if (cookie.indexOf('playerdata=') === 0) {
        var cookieValue = cookie.substring('playerdata='.length);
        var decodedCookie = decodeURIComponent(cookieValue);
        var decodedData = decodeURIComponent(decodedCookie);
        console.log(decodedData);
        playdata = JSON.parse(decodedData);
        // console.log(playdata);
      }
    }
    }

  } else {
    //cookie沒東西就轉跳到登入頁面
    window.location.href = "./sign_in.php";
  }
  animateText();

}

function animateText() {
  console.log(playdata);

  var textElement = document.getElementById("animated-text");
  var text = textElement.innerText;

  var specialSection = document.getElementById("special-section");


  if(specialSection){
    var choice_text = "";
    console.log("story3");
    if (playdata["career"] == "戰士"){
      choice_text = "你做為戰士的冒險正要展開.......";
    }else if (playdata["career"] == "狂戰士"){
      choice_text = "你做為狂戰士的冒險正要展開.......";
    }else if (playdata["career"] == "聖戰士"){
      choice_text = "你做為聖戰士的冒險正要展開.......";
    }
    text += choice_text;
  }

  //有BossMapStory這個類別就執行這段，bossId會存地圖id，把id送到battle
  $(".BossMapStory").each(function() {
    console.log("bossstory")
    var bossId = $(this).attr("id");
    console.log(bossId)
    $("#continue").data("bossId", bossId);
  });

  $("#continue").click(function() {
    var bossId = $(this).data("bossId");
    var url = "./battle.html" + "?value=" + encodeURIComponent(bossId);
    window.location.href = url;
  });

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