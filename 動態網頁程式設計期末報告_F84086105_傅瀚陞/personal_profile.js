window.addEventListener( "load", function(){start();}, false );
 
var player_name;
var player_hp = 20;
var player_atk = 8;
var player_exp;
var player_level;
var player_career = "戰士";
var player_money = 0;
var player_avatar = "./戰士.jpg";
var player_progress;

function start() 
{
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
    var name = document.getElementById("name");
    var LV = document.getElementById("LV");
    var HP = document.getElementById("HP");
    var ATK = document.getElementById("ATK");
    var career = document.getElementById("career");
    var money = document.getElementById("money");
    var progress = document.getElementById("progress");
    var avatar = document.getElementById("avatar");
    var home_button = document.getElementById("home_page");
    // var map_button = document.getElementById("map");

    player_name = playdata["playername"];
    player_level = playdata["lv"];
    player_exp = playdata["exp"];
    player_attack = playdata["str"];
    player_hp = playdata["hp"];
    player_career = playdata["career"];
    player_money = playdata["money"];
    player_progress = playdata["progress"];
    player_avatar = playdata["skin"];

    name.innerHTML = player_name;
    LV.innerHTML = player_level;
    HP.innerHTML = player_hp;
    ATK.innerHTML = player_attack;
    career.innerHTML = player_career;
    money.innerHTML = player_money;
    progress.innerHTML = player_progress;
    avatar.setAttribute("src", player_avatar);


    putCharData();

    home_button.addEventListener("click", function() {
        window.location.href = "mainpage.html";
      });
}



function putCharData(){
    //把角色資料放到HTML頁面上
    $("#skinImage").attr("src", playdata["skin"]);
    $("#nameSpan").html(playdata["playername"]);
    $("#lvSpan").html(playdata["lv"]);
    $("#careerSpan").html(playdata["career"]);
    $("#moneySpan").html(playdata["money"]);
    $("#expSpan").html(playdata["exp"]);
}
