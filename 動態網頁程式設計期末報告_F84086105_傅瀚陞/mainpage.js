window.addEventListener( "load", function(){start();}, false );

var raw_playdata = [];
var playdata = {};
function start(){
    //要刪cookie再開
    // deleteCookie("playerdata");
    console.log(document.cookie);
    //cookie還在就能保持登入狀態
    if (document.cookie) {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        //抓名字是playerdata的cookie
        if (cookie.indexOf('playerdata=') === 0) {
          var cookieValue = cookie.substring('playerdata='.length);
          var decodedCookie = decodeURIComponent(cookieValue);
          var decodedData = decodeURIComponent(decodedCookie);
          playdata = JSON.parse(decodedData);
          console.log(playdata);
          break;
        }
      }
    } else {
      //cookie沒東西就轉跳到登入頁面
      window.location.href = "./sign_in.php";
    }

    //把角色資料放到HTML頁面上
    putCharData();

    
    $("#save_button").on("click", function() {
        saveCookieToDatabase(playdata);
    })

    //快樂按鈕
    $("#level_up").on("click", function() {
      playdata["lv"] += 1;
      playdata["hp"] += 1;
      playdata["exp"] += 1;
      playdata["money"] += 1;
    
      //存入cookie
      var jsonData = JSON.stringify(playdata);
      var cookieName = "playerdata"; // 設定 Cookie 的名稱
    
      // 設定 Cookie 的到期時間為 1 天後
      var expires = new Date();
      expires.setTime(expires.getTime() + 24 * 60 * 60 * 1000);
    
      // 設定 Cookie 的路徑為根目錄
      var path = "/";
    
      // 構建完整的 Cookie 字串，包括名稱、值、到期時間和路徑
      var cookieString = cookieName + "=" + jsonData + ";expires=" + expires.toUTCString() + ";path=" + path;
    
      // 將 Cookie 字串設定為 Cookie
      document.cookie = cookieString;
      // console.log(jsonData);
      putCharData();
    });
    
}

function putCharData(){
      //把角色資料放到HTML頁面上
      $("#skinImage").attr("src", playdata["skin"]);
      $("#nameSpan").text(playdata["playername"]);
      $("#lvSpan").text(playdata["lv"]);
      $("#careerSpan").text(playdata["career"]);
      $("#moneySpan").text(playdata["money"]);
      $("#expSpan").text(playdata["exp"]);
}

function saveCookieToDatabase(playdata) {
  var jsonData = JSON.stringify(playdata);
  // 使用Ajax POST將cookie資料傳遞到後端，用來存檔
  $.ajax({
    
    url: 'save_cookie.php', // 後端處理
    type: 'POST',
    data: jsonData,
    success: function(response) {
        alert("進度已成功存到資料庫");
    },
    error: function(error) {
        alert("存檔失敗：");
    }
  });
}

function deleteCookie(name) {

  document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
  
}