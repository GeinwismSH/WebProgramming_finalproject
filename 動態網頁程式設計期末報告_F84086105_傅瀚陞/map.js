window.addEventListener( "load", function(){start();}, false );

var playdata = {};
function start(){

    // console.log(document.cookie)
    //cookie還在就能保持登入狀態
    if (document.cookie) {
      //把cookie們分開
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
        }
      }
    } else {
      //cookie沒東西就轉跳到登入頁面
      window.location.href = "./sign_in.php";
    }
    //把角色資料放到HTML頁面上
    putCharData();



    //符合條件才開放地圖
    if (playdata["progress"] == "2-1" || playdata["progress"] == "2-2" || playdata["progress"] == "2-3"){
      $("#map2").removeClass("btn-secondary").addClass("btn-warning").prop("disabled", false).text("盜賊地堡");
    }else if(playdata["progress"] == "3-1" || playdata["progress"] == "3-2" || playdata["progress"] == "3-3"){
      $("#map2").removeClass("btn-secondary").addClass("btn-warning").prop("disabled", false).text("盜賊地堡");
      $("#map3").removeClass("btn-secondary").addClass("btn-success").prop("disabled", false).text("死亡森林");
    }else if(playdata["progress"] == "4-1" || playdata["progress"] == "4-2" || playdata["progress"] == "4-3"){
      $("#map2").removeClass("btn-secondary").addClass("btn-warning").prop("disabled", false).text("盜賊地堡");
      $("#map3").removeClass("btn-secondary").addClass("btn-success").prop("disabled", false).text("死亡森林");
      $("#map4").removeClass("btn-secondary").addClass("btn-info").prop("disabled", false).text("大武鬥塔");
    }else if(playdata["progress"] == "5-1" || playdata["progress"] == "5-2" || playdata["progress"] == "5-3"){
      $("#map2").removeClass("btn-secondary").addClass("btn-warning").prop("disabled", false).text("盜賊地堡");
      $("#map3").removeClass("btn-secondary").addClass("btn-success").prop("disabled", false).text("死亡森林");
      $("#map4").removeClass("btn-secondary").addClass("btn-info").prop("disabled", false).text("大武鬥塔");
      $("#map5").removeClass("btn-secondary").addClass("btn-danger").prop("disabled", false).text("英靈聖殿");
    }
    
    //一號地圖顯示
    $("#map1").on("click", function() {
      $("#map_describe").html(`
        <div class="card">
          <div class="card-header">戰士村外 推薦等級Lv1~20</div>
          <div class="card-body">在村子旁邊而已，適合新手練習的好地方，但有時會被走火入魔的戰士攻擊</div>
          <div  class="card-footer">
          <a href="#"><button id="map1-1" type="button" class="btn btn-success btn-sm" style="margin:5px">進入1-1</button></a>
          <a href="./story1_1a.html"><button id="map1-1b" type="button" class="btn btn-success btn-sm" style="margin:5px">挑戰1-1BOSS</button></a>
          </div>
          <div  class="card-footer">
          <a href="#"><button id="map1-2" type="button" class="btn btn-success btn-sm" style="margin:5px">進入1-2</button></a>
          <a href="./story1_2a.html"><button id="map1-2b" type="button" class="btn btn-success btn-sm" style="margin:5px">挑戰1-2BOSS</button></a>
          </div>
          <div  class="card-footer">
          <a href="#"><button id="map1-3" type="button" class="btn btn-success btn-sm" style="margin:5px">進入1-3</button></a>
          <a href="./story1_3a.html"><button id="map1-3b" type="button" class="btn btn-success btn-sm" style="margin:5px">挑戰1-3BOSS</button></a>
          </div>
        </div>
      `);

	  //把現在是哪張圖傳給battle.js
		var map1_1_button = document.getElementById("map1-1");
		var map1_1b_button = document.getElementById("map1-1b");
		var map1_2_button = document.getElementById("map1-2");
		var map1_2b_button = document.getElementById("map1-2b");
		var map1_3_button = document.getElementById("map1-3");
		var map1_3b_button = document.getElementById("map1-3b");
		
		map1_1_button.addEventListener("click", function(){
			var url = "./battle.html" + "?value=" + encodeURIComponent("map1_1");
			window.location.href = url;
		}, false);

		// map1_1b_button.addEventListener("click", function(){
		// 	var url = "./battle.html" + "?value=" + encodeURIComponent("map1_1b");
		// 	window.location.href = url;
		// }, false);

		map1_2_button.addEventListener("click", function(){
			var url = "./battle.html" + "?value=" + encodeURIComponent("map1_1");
			window.location.href = url;
		}, false);

		// map1_2b_button.addEventListener("click", function(){
		// 	var url = "./battle.html" + "?value=" + encodeURIComponent("map1_1b");
		// 	window.location.href = url;
		// }, false);

		map1_3_button.addEventListener("click", function(){
			var url = "./battle.html" + "?value=" + encodeURIComponent("map1_1");
			window.location.href = url;
		}, false);

		map1_3b_button.addEventListener("click", function(){
			var url = "./battle.html" + "?value=" + encodeURIComponent("map1_1b");
			window.location.href = url;
		}, false);
    });
    
    //二號地圖顯示
    $("#map2").on("click", function() {
        $("#map_describe").html(`
          <div class="card">
            <div class="card-header">盜賊地堡 推薦等級Lv20~40</div>
            <div class="card-body">盜賊叢生的堡壘，偉大的戰士們需在此處狩獵人頭方能獨當一面。此處有高金幣掉落率</div> 
            <div  class="card-footer">
            <a href="#"><button id="map2-1" type="button" class="btn btn-success btn-sm" style="margin:5px">進入2-1</button></a>
            <a href="#"><button id="map2-1b" type="button" class="btn btn-success btn-sm" style="margin:5px">挑戰2-1BOSS</button></a>
            </div>
            <div  class="card-footer">
            <a href="#"><button id="map2-2" type="button" class="btn btn-success btn-sm" style="margin:5px">進入2-2</button></a>
            <a href="#"><button id="map2-2b" type="button" class="btn btn-success btn-sm" style="margin:5px">挑戰2-2BOSS</button></a>
            </div>
            <div  class="card-footer">
            <a href="#"><button id="map2-3" type="button" class="btn btn-success btn-sm" style="margin:5px">進入2-3</button></a>
            <a href="#"><button id="map2-3b" type="button" class="btn btn-success btn-sm" style="margin:5px">挑戰2-3BOSS</button></a>
            </div>
          </div>
        `);
      });
    //三號地圖顯示
    $("#map3").on("click", function() {
        $("#map_describe").html(`
          <div class="card">
            <div class="card-header">死亡森林 推薦等級Lv40~60</div>
            <div class="card-body">進入的人九死一生，有各類巨大化野獸，深處似乎潛藏著類人物種</div>

            <div  class="card-footer">
            <a href="#"><button id="map3-1" type="button" class="btn btn-success btn-sm" style="margin:5px">進入3-1</button></a>
            <a href="#"><button id="map3-1b" type="button" class="btn btn-success btn-sm" style="margin:5px">挑戰3-1BOSS</button></a>
            </div>

            <div  class="card-footer">
            <a href="#"><button id="map3-2" type="button" class="btn btn-success btn-sm" style="margin:5px">進入3-2</button></a>
            <a href="#"><button id="map3-2b" type="button" class="btn btn-success btn-sm" style="margin:5px">挑戰3-2BOSS</button></a>
            </div>

            <div  class="card-footer">
            <a href="#"><button id="map3-3" type="button" class="btn btn-success btn-sm" style="margin:5px">進入3-3</button></a>
            <a href="#"><button id="map3-3b" type="button" class="btn btn-success btn-sm" style="margin:5px">挑戰3-3BOSS</button></a>
            </div>
          
          </div>
        `);
      });
    //四號地圖顯示
    $("#map4").on("click", function() {
        $("#map_describe").html(`
          <div class="card">
            <div class="card-header">大武鬥塔 推薦等級Lv60~80</div>
            <div class="card-body">匯集了世界各地的強者，是修練的好地方，在這裡擊敗挑戰者更上層樓</div> 
            <div  class="card-footer">
            <a href="#"><button id="map4-1" type="button" class="btn btn-success btn-sm" style="margin:5px">進入4-1</button></a>
            <a href="#"><button id="map4-1b" type="button" class="btn btn-success btn-sm" style="margin:5px">挑戰4-1BOSS</button></a>
            </div>
            <div  class="card-footer">
            <a href="#"><button id="map4-2" type="button" class="btn btn-success btn-sm" style="margin:5px">進入4-2</button></a>
            <a href="#"><button id="map4-2b" type="button" class="btn btn-success btn-sm" style="margin:5px">挑戰4-2BOSS</button></a>
            </div>
            <div  class="card-footer">
            <a href="#"><button id="map4-3" type="button" class="btn btn-success btn-sm" style="margin:5px">進入4-3</button></a>
            <a href="#"><button id="map4-3b" type="button" class="btn btn-success btn-sm" style="margin:5px">挑戰4-3BOSS</button></a>
            </div>
          </div>
        `);
      });
    //五號地圖顯示
    $("#map5").on("click", function() {
        $("#map_describe").html(`
          <div class="card">
            <div class="card-header">英靈聖殿 推薦等級Lv80~100</div>
            <div class="card-body">偉大戰士的靈魂終能進入聖殿，但此處隱藏著巨大秘密...</div>  
            <div  class="card-footer">
            <a href="#"><button id="map5-1" type="button" class="btn btn-success btn-sm" style="margin:5px">進入5-1</button></a>
            <a href="#"><button id="map5-1b" type="button" class="btn btn-success btn-sm" style="margin:5px">挑戰5-1BOSS</button></a>
            </div>
            <div  class="card-footer">
            <a href="#"><button id="map5-2" type="button" class="btn btn-success btn-sm" style="margin:5px">進入5-2</button></a>
            <a href="#"><button id="map5-2b" type="button" class="btn btn-success btn-sm" style="margin:5px">挑戰5-2BOSS</button></a>
            </div>
            <div  class="card-footer">
            <a href="#"><button id="map5-3" type="button" class="btn btn-success btn-sm" style="margin:5px">進入5-3</button></a>
            <a href="#"><button id="map5-3b" type="button" class="btn btn-success btn-sm" style="margin:5px">挑戰5-3BOSS</button></a>
            </div>
          </div>
        `);
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