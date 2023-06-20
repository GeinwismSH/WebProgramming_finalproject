window.addEventListener( "load", function(){start();}, false );
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

    if (playdata["career"] == "戰士"){
        $("#狂戰士").html("");
        $("#聖戰士").html("");
        checkLevelToSkill(warrior);
    }else if (playdata["career"] == "狂戰士"){
        $("#戰士").html("");
        $("#聖戰士").html("");
        checkLevelToSkill(crazy_warrior);
    }else if (playdata["career"] == "聖戰士"){
        $("#戰士").html("");
        $("#狂戰士").html("");
        checkLevelToSkill(holy_warrior);
    }

    for(var i=1;i<=3;i++){
        $("#select_skill_"+i).text(playdata["skill_"+i]);
        if (playdata["skill_"+i] != "空白"){              
            $("#"+playdata["skill_"+i]).removeClass("btn-success").addClass("btn-warning").text("卸下");
        }
    }

    //把角色資料放到HTML頁面上
    putCharData();
    //技能配置按鈕
    $('.skill').click(function() {
        var skill = $(this).attr('id');
        equipSkill(skill);
        console.log(skill);
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

function equipSkill(skill) {
    console.log("技能");
    // 根據有沒有使用更新按鈕文字
    var button = $("#"+skill);
    if (button.text() == "使用") {
        for(var i=1;i<=3;i++){
            if ($("#select_skill_"+i).text() === "空白"){
                playdata["skill_"+i] = skill;
                $("#select_skill_"+i).text(skill);
                button.removeClass("btn-success").addClass("btn-warning").text("卸下");
                break;
            }
        }
    } else if (button.text() == "卸下") {
        console.log("卸下");
        for(var i=1;i<=3;i++){
            if ($("#select_skill_"+i).text() === skill){
                playdata["skill_"+i] = "空白";
                $("#select_skill_"+i).text("空白");
                button.removeClass("btn-warning").addClass("btn-success").text("使用");
                break;
            }
        }
    }
    playdata["skill_1"] = $("#select_skill_1").text();
    playdata["skill_2"] = $("#select_skill_2").text();
    playdata["skill_3"] = $("#select_skill_3").text();
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
  }
function checkLevelToSkill(career_skill_list){
    if (playdata["lv"] < 3){
        for (var i = 1; i < career_skill_list.length; i++) {
            $("#"+career_skill_list[i]).removeClass("btn-success").addClass("btn-secondary").prop("disabled", true).text("未解鎖");
        }
    }else if (playdata["lv"] >= 3 && playdata["lv"] < 5){
        for (var i = 2; i < career_skill_list.length; i++) {
            $("#"+career_skill_list[i]).removeClass("btn-success").addClass("btn-secondary").prop("disabled", true).text("未解鎖");
        }
    }else if (playdata["lv"] >= 5 && playdata["lv"] < 10){
        for (var i = 3; i < career_skill_list.length; i++) {
            $("#"+career_skill_list[i]).removeClass("btn-success").addClass("btn-secondary").prop("disabled", true).text("未解鎖");
        }
    }else if (playdata["lv"] >= 10 && playdata["lv"] < 15){
        for (var i = 4; i < career_skill_list.length; i++) {
            $("#"+career_skill_list[i]).removeClass("btn-success").addClass("btn-secondary").prop("disabled", true).text("未解鎖");
        }
    }else if (playdata["lv"] >= 15 && playdata["lv"] < 20){
        for (var i = 5; i < career_skill_list.length; i++) {
            $("#"+career_skill_list[i]).removeClass("btn-success").addClass("btn-secondary").prop("disabled", true).text("未解鎖");
        }
    }else if (playdata["lv"] >= 20 && playdata["lv"] < 25){
        for (var i = 6; i < career_skill_list.length; i++) {
            $("#"+career_skill_list[i]).removeClass("btn-success").addClass("btn-secondary").prop("disabled", true).text("未解鎖");
        }
    }else if (playdata["lv"] >= 25 && playdata["lv"] < 30){
        for (var i = 7; i < career_skill_list.length; i++) {
            $("#"+career_skill_list[i]).removeClass("btn-success").addClass("btn-secondary").prop("disabled", true).text("未解鎖");
        }
    }else if (playdata["lv"] >= 30 && playdata["lv"] < 40){
        for (var i = 8; i < career_skill_list.length; i++) {
            $("#"+career_skill_list[i]).removeClass("btn-success").addClass("btn-secondary").prop("disabled", true).text("未解鎖");
        }
    }else if (playdata["lv"] >= 40 && playdata["lv"] < 50){
        for (var i = 9; i < career_skill_list.length; i++) {
            $("#"+career_skill_list[i]).removeClass("btn-success").addClass("btn-secondary").prop("disabled", true).text("未解鎖");
        }
    }
}
// 技能們
warrior = ["旋風斬","穿心長矛","鬥志咆哮","巨力震擊","神速血劍","乞丐大劍","天崩地裂","霸者之氣","滅龍一擊","霸者斬破"];
crazy_warrior = ["大斧一劈","外圈刮","無畏衝鋒","震天吼嚎","狂亂連擊","日字衝拳","嗜血狂襲","無盡狂潮","諸神黃昏","終極狂戰"];
holy_warrior = ["bonk","聖盾打擊","神聖之光","鐵甲衝鋒","聖光之劍","阿拉花瓜","聖光之泉","神聖審判","聖炎焚天","聖光神諭"];
// Data structure: [傷害,{buff:數值},次數]
//加攻加血降攻都持續2回合，治癒放完就沒
["加攻","加血","降攻","治癒"]
var warrior_skill_dict = {};
warrior_skill_dict["旋風斬"] = [1.5, 50];    //1等開
warrior_skill_dict["穿心長矛"] = [2, 20];    //3等開
warrior_skill_dict["鬥志咆哮"] = [0,{"加攻":0.1}, 5];    //5等開
warrior_skill_dict["巨力震擊"] = [3, 20];    //10等開
warrior_skill_dict["神速血劍"] = [3,{"治癒":0.2}, 10];    //15等開
warrior_skill_dict["乞丐大劍"] = [4.5,{"降攻":0.2}, 5];    //20等開
warrior_skill_dict["天崩地裂"] = [6,{"加攻":0.2}, 5];    //25等開
warrior_skill_dict["霸者之氣"] = [7.5,{"加血":0.2}, 5];    //30等開
warrior_skill_dict["滅龍一擊"] = [10, 3];    //40等開
warrior_skill_dict["霸者斬破"] = [12,{"加攻":0.4}, 1];    //50等開



//Skills for crazy warrior
var crazy_warrior_skill_dict = {};
crazy_warrior_skill_dict["大斧一劈"] = [2, 50];
crazy_warrior_skill_dict["外圈刮"] = [1.5,{"治癒":0.15}, 20];
crazy_warrior_skill_dict["無畏衝鋒"] = [3, 20];
crazy_warrior_skill_dict["震天吼嚎"] = [0,{"加攻":0.2}, 5];
crazy_warrior_skill_dict["狂亂連擊"] = [5, 20];
crazy_warrior_skill_dict["日字衝拳"] = [7, 10];
crazy_warrior_skill_dict["嗜血狂襲"] = [8,{"加血":0.3}, 5];
crazy_warrior_skill_dict["無盡狂潮"] = [10, 5];
crazy_warrior_skill_dict["諸神黃昏"] = [12,{"降攻":0.2}, 3];
crazy_warrior_skill_dict["終極狂戰"] = [15,{"治癒":0.4}, 1];

//Skills for holy warrior
var holy_warrior_skill_dict = {};
holy_warrior_skill_dict["bonk"] = [1.3, 50];
holy_warrior_skill_dict["聖盾打擊"] = [2, 20];
holy_warrior_skill_dict["神聖之光"] = [2,{"治癒":0.15}, 20];
holy_warrior_skill_dict["鐵甲衝鋒"] = [2.5,{"降攻":0.2}, 5];
holy_warrior_skill_dict["聖光之劍"] = [3,{"加血":0.2}, 5];
holy_warrior_skill_dict["阿拉花瓜"] = [4, 10];
holy_warrior_skill_dict["聖光之泉"] = [0,{"治癒":0.3}, 10];
holy_warrior_skill_dict["神聖審判"] = [5,{"降攻":0.25}, 3];
holy_warrior_skill_dict["聖炎焚天"] = [7, 3];
holy_warrior_skill_dict["聖光神諭"] = [10,{"加血":0.4}, 1];
