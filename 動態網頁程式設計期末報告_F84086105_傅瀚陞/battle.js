
window.addEventListener( "load", function(){start();}, false );

var raw_playdata = [];
var playdata = {};
var player_name;
var player_HP = 0;
var player_initial_HP;
var player_attack;
var player_exp ;
var player_career ;
var player_money = 0;
var player_level = 1; //Players read-in level
var player_exp_level; //Players level which their exp should be




var monster_dict_temp = monster_dict;

var skill_set = {};

var skill1_name;
var skill2_name;
var skill3_name;

var skill_1;
var skill_2;
var skill_3;

var skill_1_damage;
var skill_2_damage;
var skill_3_damage;

var skill_1_times;
var skill_2_times;
var skill_3_times;

var enemy_name;
var enemy_HP;
var enemy_initial_HP;
var enemy_attack = 3;
var enemy_exp = 10;
var enemy_money = 10;
var enemy_skill;

var warrior_HP_step = 3;
var warrior_atk_step = 2;

var crazy_warrior_HP_step = 2;
var crazy_warrior_atk_step = 3;

var holy_warrior_HP_step = 4;
var holy_warrior_atk_step = 1;

var level_1_threshold = 10;
var level_threshold_increment = 15;
var lenel_n_threshold = level_1_threshold + level_threshold_increment * (player_level - 1);

var player_poison_counter = 0; 
var player_stun_counter = 0; 
var player_burn_counter = 0;
var player_freeze_counter = 0;
var player_add_blood_counter = 0;
var player_add_atk_counter = 0;
var player_sub_atk_counter = 0;

var player_poison_damage = 0; 
var player_is_stun = 0; 
var player_burn_damage = 0;
var player_freeze_damage = 0;

var heal_point = 0;

var enemy_poison_counter = 0; 
var enemy_stun_counter = 0; 
var enemy_burn_counter = 0;
var enemy_freeze_counter = 0;
var enemy_add_blood_counter = 0;
var enemy_add_atk_counter = 0;
var enemy_sub_atk_counter = 0;

var enemy_poison_damage = 0; 
var enemy_is_stun = 0; 
var enemy_burn_damage = 0;
var enemy_freeze_damage = 0;

var player_blood_temp;
var player_add_atk_temp;
var player_sub_atk_temp;
var player_blood_increment;
var player_add_atk_increment;
var player_sub_atk_increment;
var player_was_add_atk;
var player_was_sub_atk;
var player_was_add_HP;

var enemy_blood_temp;
var enemy_add_atk_temp;
var enemy_sub_atk_temp;
var enemy_blood_increment;
var enemy_add_atk_increment;
var enemy_sub_atk_increment;
var enemy_was_add_atk;
var enemy_was_sub_atk;
var enemy_was_add_HP;

var can_use_skill = 1; // Determine if enemy can use skill
var current_map = ""; //現在的地圖

function start(){
        //cookie還在就能保持登入狀態
    var queryString = window.location.search; 
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

	//抓選擇地圖時傳過來的地圖名稱
	var queryString = window.location.search;
	var params = new URLSearchParams(queryString);
	current_map = params.get("value");

    initialize_player_profile();
    initialize_enemy_profile();

    var normal_attack_button = document.getElementById("player_default_attack");
    var skill1_button = document.getElementById("player_1st_skill");
    var skill2_button = document.getElementById("player_2nd_skill");
    var skill3_button = document.getElementById("player_3rd_skill");
    var next_monster_button = document.getElementById("next_monster");
    var back_to_map_button = document.getElementById("back_to_map");

    var save_button = document.getElementById("save_button");

    normal_attack_button.addEventListener("click", function() {
		normal_attack_button.disabled = true;
		skill1_button.disabled = true;
		skill2_button.disabled = true;
		skill3_button.disabled = true;
		check_if_debuff(player_name);
		check_if_debuff(enemy_name);
	    if (player_HP <=0 || enemy_HP <=0) {
			end_game();
	    }
		if (player_is_stun) {  //被暈了
			if_stun(player_name);
			if (enemy_HP != 0){
				setTimeout(() => {
				  player_HP = battle(enemy_name, enemy_attack, player_name, "player", player_initial_HP, player_HP, "舌舔");
				  normal_attack_button.disabled = false;
				  skill1_button.disabled = false;
				  skill2_button.disabled = false;
				  skill3_button.disabled = false;
			  }, 1000);
			}
		} else {
			normal_attack();
			if (player_HP <=0 || enemy_HP <=0) {
				end_game();
			}

		}
    }, true); 

    skill1_button.addEventListener("click", function() {
		normal_attack_button.disabled = true;
		skill1_button.disabled = true;
		skill2_button.disabled = true;
		skill3_button.disabled = true;
		check_if_debuff(player_name);
		check_if_debuff(enemy_name);
		if (player_HP <=0 || enemy_HP <=0) {
			end_game();
		}

		if (player_is_stun) {
			if_stun(player_name);
			if (enemy_HP != 0){
				setTimeout(() => {
				  player_HP = battle(enemy_name, enemy_attack, player_name, "player", player_initial_HP, player_HP, "舌舔");
				  normal_attack_button.disabled = false;
				  skill1_button.disabled = false;
				  skill2_button.disabled = false;
				  skill3_button.disabled = false;
			  }, 1000);
			}
		} else {
			skill_1_attack();
			if (player_HP <=0 || enemy_HP <=0) {
				end_game();
			}

		}

    }, false); 
    skill2_button.addEventListener("click", function() {
		normal_attack_button.disabled = true;
		skill1_button.disabled = true;
		skill2_button.disabled = true;
		skill3_button.disabled = true;
		check_if_debuff(player_name);
		check_if_debuff(enemy_name);
	    if (player_HP <=0 || enemy_HP <=0) {
			end_game();
		}
        if (player_is_stun) {
			if_stun(player_name);
			if (enemy_HP != 0){
				setTimeout(() => {
				  player_HP = battle(enemy_name, enemy_attack, player_name, "player", player_initial_HP, player_HP, "舌舔");
				  normal_attack_button.disabled = false;
				  skill1_button.disabled = false;
				  skill2_button.disabled = false;
				  skill3_button.disabled = false;
			  }, 1000);
			}
		} else {
			skill_2_attack();
			if (player_HP <=0 || enemy_HP <=0) {
				end_game();
			}

		}

    }, false); 
    skill3_button.addEventListener("click", function() {
		normal_attack_button.disabled = true;
		skill1_button.disabled = true;
		skill2_button.disabled = true;
		skill3_button.disabled = true;
		check_if_debuff(player_name);
		check_if_debuff(enemy_name);
		if (player_HP <=0 || enemy_HP <=0) {
			end_game();
		}
		if (player_is_stun) {  
			if_stun(player_name);
			if (enemy_HP != 0){
				setTimeout(() => {
				  player_HP = battle(enemy_name, enemy_attack, player_name, "player", player_initial_HP, player_HP, "舌舔");
				  normal_attack_button.disabled = false;
				  skill1_button.disabled = false;
				  skill2_button.disabled = false;
				  skill3_button.disabled = false;
			  }, 1000);
			}
		} else {
			skill_3_attack();
			if (player_HP <=0 || enemy_HP <=0) {
				end_game();
			}

		}

    }, false); 

    next_monster_button.addEventListener("click", new_monster, false);
    // save_button.addEventListener("click", saveCookieToDatabase, false);

    back_to_map_button.addEventListener("click", function() {
        window.location.href = "map.html";
    });
}

function if_stun(victim)
{
	var text_container = document.getElementById("battle_information_container");
	var new_text =  document.createElement("p");
	if (victim == player_name) {
		new_text.textContent = victim + " 暈眩了 無法攻擊 ";
		player_is_stun = 0;
		player_stun_counter--;
		text_container.insertBefore(new_text, text_container.firstChild);
	} else {
		new_text.textContent = victim + " 暈眩了 無法攻擊 ";
		enemy_is_stun = 0;
		enemy_stun_counter--;
		text_container.insertBefore(new_text, text_container.firstChild);
	}
}

function heal(victim)
{
	
	var text_container = document.getElementById("battle_information_container");
	var new_text =  document.createElement("p");
	new_text.textContent = victim + " 治癒了自己 回復" + heal_point + " 點生命值 ";
	text_container.insertBefore(new_text, text_container.firstChild);
	if (victim == player_name) {
		if (player_HP + heal_point > player_initial_HP) {
			player_HP = player_initial_HP;
		} else {
			player_HP += heal_point;
		}
		
		heal_point = 0;
		var display_HP = document.getElementById("player_health");
		display_HP.innerHTML = player_HP + "/" + player_initial_HP;
		var HP_bar = document.getElementById("player_health_bar");
		HP_bar.style.width = 100 * parseFloat(player_HP) / parseFloat(player_initial_HP) + "%";
	} else {
		if (enemy_HP + heal_point > enemy_initial_HP) {
			enemy_HP = enemy_initial_HP;
		} else {
			enemy_HP += heal_point;
		}
		heal_point = 0;
		var display_HP = document.getElementById("enemy_health");
		display_HP.innerHTML = enemy_HP + "/" + enemy_initial_HP;
		var HP_bar = document.getElementById("enemy_health_bar");
		HP_bar.style.width = 100 * parseFloat(enemy_HP) / parseFloat(enemy_initial_HP) + "%";
	}
}

function check_if_debuff(victim)
{
	var text_container = document.getElementById("battle_information_container");
	var new_text =  document.createElement("p");


	if (victim == player_name) {
		var display_HP = document.getElementById("player_health");
		var HP_bar = document.getElementById("player_health_bar");
		if (player_poison_counter) {
			player_HP -= player_poison_damage;
			new_text.textContent = victim + " 中毒了 受到 " + player_poison_damage + " 點傷害 ";
			player_poison_counter--;
			text_container.insertBefore(new_text, text_container.firstChild);
			display_HP.innerHTML = player_HP + "/" + player_initial_HP;
			HP_bar.style.width = 100 * parseFloat(player_HP) / parseFloat(player_initial_HP) + "%";
		}
		if (player_burn_counter) {
			player_HP -= player_burn_damage;
			new_text.textContent = victim + " 燒傷了 受到 " + player_burn_damage + " 點傷害 ";
			player_burn_counter--;
			text_container.insertBefore(new_text, text_container.firstChild);
			display_HP.innerHTML = player_HP + "/" + player_initial_HP;
			HP_bar.style.width = 100 * parseFloat(player_HP) / parseFloat(player_initial_HP) + "%";
		}
		if (player_freeze_counter) {
			player_HP -= player_freeze_damage;
			new_text.textContent = victim + " 凍傷了了 受到 " + player_freeze_damage + " 點傷害 ";
			player_freeze_counter--;
			text_container.insertBefore(new_text, text_container.firstChild);
			display_HP.innerHTML = player_HP + "/" + player_initial_HP;
			HP_bar.style.width = 100 * parseFloat(player_HP) / parseFloat(player_initial_HP) + "%";
		}
		if (!player_add_atk_counter && player_was_add_atk) {
			new_text.textContent = victim + " 的加攻結束了 ";
			text_container.insertBefore(new_text, text_container.firstChild);
			var attack = document.getElementById("player_attack");
			player_attack = player_add_atk_temp;
			attack.innerHTML = player_attack;
			player_was_add_atk = 0;
		}
		if (!enemy_sub_atk_counter && enemy_was_sub_atk) {
			new_text.textContent = victim + " 施加的減攻結束了 ";
			text_container.insertBefore(new_text, text_container.firstChild);
			var attack = document.getElementById("enemy_attack");
			enemy_attack = enemy_sub_atk_temp;
			attack.innerHTML = enemy_attack;
			enemy_was_sub_atk = 0;
		}
		if (!player_add_blood_counter && player_was_add_HP) {
			new_text.textContent = victim + " 的加血結束了 ";
			text_container.insertBefore(new_text, text_container.firstChild);
			player_initial_HP = player_blood_temp;
			var display_HP = document.getElementById("player_health");
			display_HP.innerHTML = player_HP + "/" + player_initial_HP;
			var HP_bar = document.getElementById("player_health_bar");
			HP_bar.style.width = 100 * parseFloat(player_HP) / parseFloat(player_initial_HP) + "%";
			player_was_add_HP = 0;
		}
		if (player_add_atk_counter)
			player_was_add_atk = 1;
		if (enemy_sub_atk_counter)
			enemy_was_sub_atk = 1;
		if (player_add_blood_counter)
			player_was_add_HP = 1;
	} else {
		var display_HP = document.getElementById("enemy_health");
		var HP_bar = document.getElementById("enemy_health_bar");
		if (enemy_poison_counter) {
			enemy_HP -= enemy_poison_damage;
			new_text.textContent = victim + " 中毒了 受到 " + enemy_poison_damage + " 點傷害 ";
			enemy_poison_counter--;
			text_container.insertBefore(new_text, text_container.firstChild);
			display_HP.innerHTML = enemy_HP + "/" + enemy_initial_HP;
			HP_bar.style.width = 100 * parseFloat(enemy_HP) / parseFloat(enemy_initial_HP) + "%";
		}
		if (enemy_burn_counter) {
			enemy_HP -= enemy_burn_damage;
			new_text.textContent = victim + " 燒傷了 受到 " + enemy_burn_damage + " 點傷害 ";
			enemy_burn_counter--;
			text_container.insertBefore(new_text, text_container.firstChild);
			display_HP.innerHTML = enemy_HP + "/" + enemy_initial_HP;
			HP_bar.style.width = 100 * parseFloat(enemy_HP) / parseFloat(enemy_initial_HP) + "%";
		}
		if (enemy_freeze_counter) {
			enemy_HP -= enemy_freeze_damage;
			new_text.textContent = victim + " 凍傷了 受到 " + enemy_freeze_damage + " 點傷害 ";
			enemy_freeze_counter--;
			text_container.insertBefore(new_text, text_container.firstChild);
			display_HP.innerHTML = enemy_HP + "/" + enemy_initial_HP;
			HP_bar.style.width = 100 * parseFloat(enemy_HP) / parseFloat(enemy_initial_HP) + "%";
		}
	}
	if (!enemy_add_atk_counter && enemy_was_add_atk) {
		new_text.textContent = victim + " 的加攻結束了 ";
		text_container.insertBefore(new_text, text_container.firstChild);
		var attack = document.getElementById("enemy_attack");
		enemy_attack = enemy_add_atk_temp;
		attack.innerHTML = enemy_attack;
		enemy_was_add_atk = 0;
	}
	if (!player_sub_atk_counter && player_was_sub_atk) {
		new_text.textContent = victim + " 施加的減攻結束了 ";
		text_container.insertBefore(new_text, text_container.firstChild);
		var attack = document.getElementById("player_attack");
		player_attack = player_sub_atk_temp;
		attack.innerHTML = player_attack;
		player_was_sub_atk = 0;
	}
	if (!enemy_add_blood_counter && enemy_was_add_HP) {
		new_text.textContent = victim + " 的加血結束了 ";
		text_container.insertBefore(new_text, text_container.firstChild);
		enemy_initial_HP = enemy_blood_temp;
		var display_HP = document.getElementById("enemy_health");
		display_HP.innerHTML = enemy_HP + "/" + enemy_initial_HP;
		var HP_bar = document.getElementById("enemy_health_bar");
		HP_bar.style.width = 100 * parseFloat(enemy_HP) / parseFloat(enemy_initial_HP) + "%";
		enemy_was_add_HP = 0;
	}
	if (enemy_add_atk_counter)
		enemy_was_add_atk = 1;
	if (player_sub_atk_counter)
		player_was_sub_atk = 1;
	if (enemy_add_blood_counter)
	enemy_was_add_HP = 1;


}

//player attack once and enemy attack once
function normal_attack()
{
	var normal_attack_button = document.getElementById("player_default_attack");
    var skill1_button = document.getElementById("player_1st_skill");
    var skill2_button = document.getElementById("player_2nd_skill");
    var skill3_button = document.getElementById("player_3rd_skill");
  enemy_HP = battle(player_name, player_attack, enemy_name, "enemy", enemy_initial_HP, enemy_HP, "普攻");
  
  if (enemy_HP != 0){
    setTimeout(() => {
      player_HP = battle(enemy_name, enemy_attack, player_name, "player", player_initial_HP, player_HP, "舌舔");
	  normal_attack_button.disabled = false;
	  skill1_button.disabled = false;
	  skill2_button.disabled = false;
	  skill3_button.disabled = false;
  }, 1000);
  }
}

function check_buff(user, skill) 
{
	var buff_name = Object.keys(skill[2])[0];
	if (buff_name == "加攻") 
		add_atk(user, skill[2][buff_name]);
	else if (buff_name == "加血")
		add_blood(user, skill[2][buff_name]);
	else if (buff_name == "降攻")
		sub_atk(user, skill[2][buff_name]); // 
	else if (buff_name == "治癒") {
		if (user == player_name)
			heal_point = player_initial_HP*skill[2][buff_name];
		else 
			heal_point = enemy_initial_HP*skill[2][buff_name];
		heal(user);
	}	
}

function skill_1_attack()
{
	var normal_attack_button = document.getElementById("player_default_attack");
    var skill1_button = document.getElementById("player_1st_skill");
    var skill2_button = document.getElementById("player_2nd_skill");
    var skill3_button = document.getElementById("player_3rd_skill");
	var first_skill_count = document.getElementById("1st_skill_count");
  	if (skill_1_times > 0) {
		if (skill_1.length == 3) {
			if (skill_1_damage == 0) {
				check_buff(player_name, skill_1);
			} else {
				enemy_HP = battle(player_name, player_attack * skill_1_damage, enemy_name, "enemy", enemy_initial_HP, enemy_HP, skill1_name);
				check_buff(player_name, skill_1);
			}
			skill_1_times--;
			first_skill_count.innerHTML = "剩餘次數" + skill_1_times;
		} else {
			enemy_HP = battle(player_name, player_attack * skill_1_damage, enemy_name, "enemy", enemy_initial_HP, enemy_HP, skill1_name);
			skill_1_times--;
			first_skill_count.innerHTML = "剩餘次數" + skill_1_times;

		}
		if (enemy_HP != 0){
			setTimeout(() => {
			  player_HP = battle(enemy_name, enemy_attack, player_name, "player", player_initial_HP, player_HP, "舌舔");
			  normal_attack_button.disabled = false;
			  skill1_button.disabled = false;
			  skill2_button.disabled = false;
			  skill3_button.disabled = false;
		  }, 1000);
	  }
  	} else {
    	alert("技能次數不夠了"); 
		normal_attack_button.disabled = false;
		skill1_button.disabled = false;
		skill2_button.disabled = false;
		skill3_button.disabled = false;
    	return;
 	}
}

function skill_2_attack()
{
	var normal_attack_button = document.getElementById("player_default_attack");
    var skill1_button = document.getElementById("player_1st_skill");
    var skill2_button = document.getElementById("player_2nd_skill");
    var skill3_button = document.getElementById("player_3rd_skill");
	var second_skill_count = document.getElementById("2nd_skill_count");
  	if (skill_2_times > 0) {
		if (skill_2.length == 3) {
			if (skill_2_damage == 0) {
				check_buff(player_name, skill_1);
			} else {
				enemy_HP = battle(player_name, player_attack * skill_2_damage, enemy_name, "enemy", enemy_initial_HP, enemy_HP, skill2_name);
				check_buff(player_name, skill_2);
			}
			skill_2_times--;
			second_skill_count.innerHTML = "剩餘次數" + skill_2_times;
		} else {
			enemy_HP = battle(player_name, player_attack * skill_2_damage, enemy_name, "enemy", enemy_initial_HP, enemy_HP, skill2_name);
			skill_2_times--;
			second_skill_count.innerHTML = "剩餘次數" + skill_2_times;

		}
		if (enemy_HP != 0){
			setTimeout(() => {
			  player_HP = battle(enemy_name, enemy_attack, player_name, "player", player_initial_HP, player_HP, "舌舔");
			  normal_attack_button.disabled = false;
			  skill1_button.disabled = false;
			  skill2_button.disabled = false;
			  skill3_button.disabled = false;
		  }, 1000);
	  }
  	} else {
    	alert("技能次數不夠了"); 
		
		normal_attack_button.disabled = false;
		skill1_button.disabled = false;
		skill2_button.disabled = false;
		skill3_button.disabled = false;
    	return;
 	}
}

function skill_3_attack()
{
	var normal_attack_button = document.getElementById("player_default_attack");
    var skill1_button = document.getElementById("player_1st_skill");
    var skill2_button = document.getElementById("player_2nd_skill");
    var skill3_button = document.getElementById("player_3rd_skill");
	var third_skill_count = document.getElementById("3rd_skill_count");
  	if (skill_3_times > 0) {
		if (skill_3.length == 3) {
			if (skill_3_damage == 0) {
				check_buff(player_name, skill_3);
			} else {
				enemy_HP = battle(player_name, player_attack * skill_3_damage, enemy_name, "enemy", enemy_initial_HP, enemy_HP, skill3_name);
				check_buff(player_name, skill_3);
			}
			skill_3_times--;
			third_skill_count.innerHTML = "剩餘次數" + skill_3_times;
		} else {
			enemy_HP = battle(player_name, player_attack * skill_3_damage, enemy_name, "enemy", enemy_initial_HP, enemy_HP, skill3_name);
			skill_3_times--;
			third_skill_count.innerHTML = "剩餘次數" + skill_3_times;
		}
		if (enemy_HP != 0){
			setTimeout(() => {
			  player_HP = battle(enemy_name, enemy_attack, player_name, "player", player_initial_HP, player_HP, "舌舔");
			  normal_attack_button.disabled = false;
			  skill1_button.disabled = false;
			  skill2_button.disabled = false;
			  skill3_button.disabled = false;
		  }, 1000);
	  }
  	} else {
    	alert("技能次數不夠了"); 
		normal_attack_button.disabled = false;
		skill1_button.disabled = false;
		skill2_button.disabled = false;
		skill3_button.disabled = false;
    	return;
 	}
}


  
// To initialize every abilities of player
function initialize_player_profile() 
{
	
    var name = document.getElementById("player_name");
    var HP = document.getElementById("player_health");
    var HP_bar = document.getElementById("player_health_bar");
    var attack = document.getElementById("player_attack");
	var skill1_button = document.getElementById("player_1st_skill");
    var skill2_button = document.getElementById("player_2nd_skill");
    var skill3_button = document.getElementById("player_3rd_skill");
    var EXP = document.getElementById("player_exp");
	var first_skill_count = document.getElementById("1st_skill_count");
	var second_skill_count = document.getElementById("2nd_skill_count");
	var third_skill_count = document.getElementById("3rd_skill_count");
    player_name = playdata["playername"];
    player_level = playdata["lv"];
    player_exp = parseInt(playdata["exp"]);
    player_attack = playdata["str"];
    player_HP = playdata["hp"];
    player_initial_HP = player_HP;
    player_career = playdata["career"];
    player_money = playdata["money"];
	lenel_n_threshold = level_1_threshold + level_threshold_increment * (player_level - 1);

    // Decide player's skills (To be optimized)
    if (player_career == "戰士") {
        skill_set = warrior_skill_dict;
    } else if (player_career == "狂戰士") {
        skill_set = crazy_warrior_skill_dict;
    } else if (player_career == "聖戰士") {
        skill_set = holy_warrior_skill_dict;
    }

	skill1_name = playdata["skill_1"];
	skill2_name = playdata["skill_2"];
	skill3_name = playdata["skill_3"];
	if (skill1_name == "空白" && skill2_name == "空白" && skill3_name == "空白") {
		var hide_button = document.getElementById("player_1st_skill");
		var hide_text = document.getElementById("1st_skill_count");
		skill_1 = 0;
		skill_1_damage = 0;
		skill_1_times = 0;
		hide_button.style.display = "none";
		hide_text.style.display = "none";
		player_HP = player_initial_HP;
		name.innerHTML = player_name;
		HP.innerHTML = player_HP;
		HP_bar.style.width = "100%";
		attack.innerHTML = player_attack;
		EXP.innerHTML = player_exp;  
		skill1_button.textContent = skill1_name;
		first_skill_count.innerHTML = "剩餘次數" + skill_1_times;
		hide_button = document.getElementById("player_2nd_skill");
		hide_text = document.getElementById("2nd_skill_count");
		skill_2 = 0;
		skill_2_damage = 0;
		skill_2_times = 0;
		hide_button.style.display = "none";
		hide_text.style.display = "none";
		hide_button = document.getElementById("player_3rd_skill");
		hide_text = document.getElementById("3rd_skill_count");
		skill_3 = 0;
		skill_3_damage = 0;
		skill_3_times = 0;
		hide_button.style.display = "none";
		hide_text.style.display = "none";
		putCharData();
		return;
	}
	if (skill2_name == "空白" && skill3_name == "空白") {
		skill_1 = skill_set[skill1_name];
		skill_1_damage = skill_1[0];
		skill_1_times = skill_1[1];
		player_HP = player_initial_HP;
		name.innerHTML = player_name;
		HP.innerHTML = player_HP;
		HP_bar.style.width = "100%";
		attack.innerHTML = player_attack;
		EXP.innerHTML = player_exp;  
		skill1_button.textContent = skill1_name;
		first_skill_count.innerHTML = "剩餘次數" + skill_1_times;
		var hide_button = document.getElementById("player_2nd_skill");
		var hide_text = document.getElementById("2nd_skill_count");
		skill_2 = 0;
		skill_2_damage = 0;
		skill_2_times = 0;
		hide_button.style.display = "none";
		hide_text.style.display = "none";
		hide_button = document.getElementById("player_3rd_skill");
		hide_text = document.getElementById("3rd_skill_count");
		skill_3 = 0;
		skill_3_damage = 0;
		skill_3_times = 0;
		hide_button.style.display = "none";
		hide_text.style.display = "none";
		putCharData();
		return;
	} else if (skill3_name == "空白") {
		
		skill_1 = skill_set[skill1_name];
		skill_1_damage = skill_1[0];
		skill_1_times = skill_1[1];
		
		player_HP = player_initial_HP;
		name.innerHTML = player_name;
		HP.innerHTML = player_HP;
		HP_bar.style.width = "100%";
		attack.innerHTML = player_attack;
		EXP.innerHTML = player_exp;  
		skill1_button.textContent = skill1_name;
		first_skill_count.innerHTML = "剩餘次數" + skill_1_times;
		skill_2 = skill_set[skill2_name];
		skill_2_damage = skill_2[0];
		skill_2_times = skill_2[1];
		skill2_button.textContent = skill2_name;
		second_skill_count.innerHTML = "剩餘次數" + skill_2_times;
		var hide_button = document.getElementById("player_3rd_skill");
		var hide_text = document.getElementById("3rd_skill_count");
		hide_button = document.getElementById("player_3rd_skill");
		hide_text = document.getElementById("3rd_skill_count");
		skill_3 = 0;
		skill_3_damage = 0;
		skill_3_times = 0;
		hide_button.style.display = "none";
		hide_text.style.display = "none";
		putCharData();
		return;
	}

    skill_1 = skill_set[skill1_name];
    skill_2 = skill_set[skill2_name];
    skill_3 = skill_set[skill3_name];

    skill_1_damage = skill_1[0];
    skill_2_damage = skill_2[0];
    skill_3_damage = skill_3[0];
    
    skill_1_times = skill_1[1];
    skill_2_times = skill_2[1];
    skill_3_times = skill_3[1];
	first_skill_count.innerHTML = "剩餘次數" + skill_1_times;
	second_skill_count.innerHTML = "剩餘次數" + skill_2_times;
	third_skill_count.innerHTML = "剩餘次數" + skill_3_times;
    player_HP = player_initial_HP;
    name.innerHTML = player_name;
    HP.innerHTML = player_HP;
    HP_bar.style.width = "100%";
    attack.innerHTML = player_attack;
    EXP.innerHTML = player_exp;  
    
    skill1_button.textContent = skill1_name;
    skill2_button.textContent = skill2_name;
    skill3_button.textContent = skill3_name;
	putCharData();
}

// To initialize every abilities of enemy
function initialize_enemy_profile() 
{
	var enemy_pool = monster_dict[current_map];
	var count = Object.keys(enemy_pool).length;
	var random_index = Math.floor(Math.random() * count);
	enemy_name = Object.keys(enemy_pool)[random_index];
	var enemy = enemy_pool[enemy_name];
	enemy_initial_HP = enemy["hp"];
	enemy_skill = enemy["skill"];
	enemy_exp = enemy["exp"];
	enemy_money = enemy["money"];

    var name = document.getElementById("enemy_name");
    var HP = document.getElementById("enemy_health");
    var HP_bar = document.getElementById("enemy_health_bar");
    var attack = document.getElementById("enemy_attack");

    name.innerHTML = enemy_name;
    enemy_HP = enemy_initial_HP;
    HP.innerHTML = enemy_HP;
    HP_bar.style.width = "100%";
    attack.innerHTML = enemy_attack;
}

// To calaulate the result of each battle
function battle(attacker_name, attacker_ATK, defender_name, defender, defender_total_HP, defender_HP, attack_type) 
{
    var text_container = document.getElementById("battle_information_container");
    var new_text =  document.createElement("p");
	
	if (attacker_name == enemy_name) {
		while (1) {
			var skill_count = 1;
			can_use_skill = skill_count;
			if (!can_use_skill) {
				attack_type = "撞擊";
				attacker_ATK = 1;
				break;
			}
			var count = Object.keys(enemy_skill).length;
			var random_index = Math.floor(Math.random() * count);
			var which_skill = Object.keys(enemy_skill)[random_index];
			attack_type = which_skill;
			var selected_skill = enemy_skill[attack_type];
			
			if (typeof(selected_skill[0]) == "number") { //有使用次數的技能
				skill_count = 0;
				for (var key in enemy_skill) 	//把技能的剩餘次數加起來 等於0的話代表技能用完了
					skill_count += enemy_skill[key][1];
				attacker_ATK = selected_skill[0];
				console.log(attacker_ATK);
				selected_skill[1]--;
				if (selected_skill[1] >= 0) {
					break;
				}
			} else {	//有Debuff的技能
				skill_count = 0;
				for (var key in enemy_skill) 
					skill_count += enemy_skill[key][1];
				var debuff_type = Object.keys(selected_skill[0])[0];
				var debuff_damage = selected_skill[0][debuff_type];
				new_text.textContent = attacker_name + "使用 " + which_skill + " 攻擊了 " + defender_name + "，" + defender_name + " " + debuff_type + " 了 ";
				text_container.insertBefore(new_text, text_container.firstChild);
				selected_skill[1]--;
				if (selected_skill[1] >= 0) {
					if (debuff_type == "中毒" || debuff_type == "燒傷" || debuff_type == "凍傷") {
						injure_debuff("player", debuff_damage, debuff_type);
						return defender_HP;
					} else if (debuff_type == "暈眩") { // 暈眩的話要暈他加扁他
						
						stun_type_debuff("player");
						attacker_ATK = debuff_damage;
						break;
					} else if (debuff_type == "治癒") {
						heal_point = debuff_damage;
						heal(attacker_name);
						return defender_HP;
					}
					break;
				}
			}
		}
		
	}

    // Change the defender's health bar when damage occured
    var display_HP = document.getElementById(defender + "_health"); //The html element that will be changed
    var remain_HP = defender_HP - attacker_ATK;
    if (remain_HP < 0)
        remain_HP = 0;
    display_HP.innerHTML = remain_HP + "/" + defender_total_HP;
    var HP_bar = document.getElementById(defender + "_health_bar");
    HP_bar.style.width = 100 * parseFloat(remain_HP) / parseFloat(defender_total_HP) + "%";

    //Update the information container

    new_text.textContent = attacker_name + "使用 " + attack_type + " 攻擊了 " + defender_name + " 造成了 "  + attacker_ATK + " 點傷害 ";
    text_container.insertBefore(new_text, text_container.firstChild);
    return remain_HP;
}

//Debuffs
function injure_debuff(victim, damage, type)  //扣血型的 傳入引數是被套的那個人 傷害和受的是甚麼Debuff
{
	if (victim == "player") {
		switch (type) {
			case "中毒":
				player_poison_damage = damage;
				player_poison_counter = 3;
				break;
			case "燒傷":
				player_burn_damage = damage;
				player_burn_counter = 2;
				break;
			case "凍傷":
				player_freeze_counter = 2;
				player_freeze_damage = damage;
				break;
		}
	}
	else {
		switch (type) {
			case "中毒":
				enemy_poison_counter = 3;
				enemy_poison_damage = damage;
				break;
			case "燒傷":
				enemy_burn_counter = 2;
				enemy_burn_damage = damage;
				break;
			case "凍傷":
				enemy_freeze_counter = 2;
				enemy_freeze_damage = damage;
				break;
		}
	}
}

function stun_type_debuff(victim) //控場類的
{
	if (victim == "player") {
		player_is_stun = 1;
		player_stun_counter = 1;
	} else {
		enemy_is_stun = 1;
		enemy_stun_counter = 1;
	}
}

function add_blood(user, value)
{
    var text_container = document.getElementById("battle_information_container");
    var new_text =  document.createElement("p");

	if (user == player_name) {
		if (player_add_blood_counter) {
			player_add_blood_counter = 2;
			new_text.textContent = user + " 使用了加血 在未來兩回合獲得額外 " + player_blood_increment + " 點生命值 ";
			text_container.insertBefore(new_text, text_container.firstChild);
			return;
		}
		player_blood_temp = player_initial_HP;
		player_initial_HP += player_initial_HP*value;
		player_blood_increment = player_initial_HP - player_blood_temp;
		player_HP += player_blood_increment;
		new_text.textContent = user + " 使用了加血 在未來兩回合獲得額外 " + player_blood_increment + " 點生命值 ";
		text_container.insertBefore(new_text, text_container.firstChild);
		var display_HP = document.getElementById("player_health");
		display_HP.innerHTML = player_HP + "/" + player_initial_HP;
		var HP_bar = document.getElementById("player_health_bar");
		HP_bar.style.width = 100 * parseFloat(player_HP) / parseFloat(player_initial_HP) + "%";
	} else {
		if (enemy_add_blood_counter) {
			enemy_add_blood_counter = 2;
			new_text.textContent = user + " 使用了加血 在未來兩回合獲得額外 " + player_blood_increment + " 點生命值 ";
			text_container.insertBefore(new_text, text_container.firstChild);
			return;
		}
		enemy_blood_temp = enemy_initial_HP;
		enemy_initial_HP += enemy_initial_HP*value;
		enemy_blood_increment = enemy_initial_HP - enemy_blood_temp;
		enemy_HP += enemy_blood_increment;
		new_text.textContent = user + " 使用了加血 在未來兩回合獲得額外 " + player_blood_increment + " 點生命值 ";
		text_container.insertBefore(new_text, text_container.firstChild);
		var display_HP = document.getElementById("enemy_health");
		display_HP.innerHTML = enemy_HP + "/" + enemy_initial_HP;
		var HP_bar = document.getElementById("enemy_health_bar");
		HP_bar.style.width = 100 * parseFloat(enemy_HP) / parseFloat(enemy_initial_HP) + "%";
	}	
}

function add_atk(user, value)
{
    var text_container = document.getElementById("battle_information_container");
    var new_text =  document.createElement("p");
	
	if (user == player_name) {
		var attack = document.getElementById("player_attack");
		if (player_add_blood_counter) {
			player_add_atk_counter = 2;
			new_text.textContent = user + " 使用了加攻 在未來兩回合獲得額外 " + player_add_atk_increment + " 點攻擊力 ";
			text_container.insertBefore(new_text, text_container.firstChild);
			return;
		}
		player_add_atk_temp = player_attack;
		player_attack += player_attack*value;
		player_add_atk_increment = player_attack - player_add_atk_temp;
		new_text.textContent = user + " 使用了加攻 在未來兩回合獲得額外 " + player_add_atk_increment + " 點攻擊力 ";
		attack.innerHTML = player_attack;
		text_container.insertBefore(new_text, text_container.firstChild);
	} else {
		var attack = document.getElementById("enemy_attack");
		if (enemy_add_atk_counter) {
			enemy_add_atk_counter = 2;
			new_text.textContent = user + " 使用了加攻 在未來兩回合獲得額外 " + enemy_add_atk_increment + " 點攻擊力 ";
			text_container.insertBefore(new_text, text_container.firstChild);
			return;
		}
		enemy_add_atk_temp = enemy_attack;
		enemy_attack += enemy_attack*value;
		enemy_add_atk_increment = enemy_attack - enemy_add_atk_temp;
		new_text.textContent = user + " 使用了加攻 在未來兩回合獲得額外 " + enemy_add_atk_increment + " 點攻擊力 ";
		text_container.insertBefore(new_text, text_container.firstChild);
		attack.innerHTML = enemy_attack;
	}	
}

function sub_atk(user, value)
{
	var text_container = document.getElementById("battle_information_container");
    var new_text =  document.createElement("p");
	
	if (user == player_name) {
		var attack = document.getElementById("enemy_attack");
		if (enemy_sub_atk_counter) {
			enemy_sub_atk_counter = 2;
			new_text.textContent = user + " 使用了減攻 對手在未來兩回合扣除 " + enemy_sub_atk_increment + " 點攻擊力 ";
			text_container.insertBefore(new_text, text_container.firstChild);
			return;
		}
		enemy_sub_atk_temp = enemy_attack;
		enemy_attack -= enemy_attack*value;
		enemy_sub_atk_increment = enemy_sub_atk_temp - enemy_attack;
		new_text.textContent = user + " 使用了減攻 對手在未來兩回合扣除 " + enemy_sub_atk_increment + " 點攻擊力 ";
		attack.innerHTML = enemy_attack;
		text_container.insertBefore(new_text, text_container.firstChild);
	} else {
		var attack = document.getElementById("player_attack");
		if (player_sub_atk_counter) {
			player_sub_atk_counter = 2;
			new_text.textContent = user + " 使用了減攻 對手在未來兩回合扣除 " + player_sub_atk_increment + " 點攻擊力 ";
			text_container.insertBefore(new_text, text_container.firstChild);
			return;
		}
		player_sub_atk_temp = player_attack;
		player_attack -= player_attack*value;
		player_sub_atk_increment = player_sub_atk_temp - player_attack;
		new_text.textContent = user + " 使用了減攻 對手在未來兩回合扣除 " + player_sub_atk_increment + " 點攻擊力 ";
		text_container.insertBefore(new_text, text_container.firstChild);
		attack.innerHTML = player_attack;
	}	
}
//Renew monster
function new_monster()
{

	monster_dict = monster_dict_temp;
	can_use_skill = 1;
    var text_container = document.getElementById("battle_information_container");
    text_container.innerHTML = "";
    
    var normal_attack_button = document.getElementById("player_default_attack");
    var skill1_button = document.getElementById("player_1st_skill");
    var skill2_button = document.getElementById("player_2nd_skill");
    var skill3_button = document.getElementById("player_3rd_skill");
    var back_to_map_button = document.getElementById("back_to_map");
    var next_monster_button = document.getElementById("next_monster");
	var first_skill_count = document.getElementById("1st_skill_count");
	var second_skill_count = document.getElementById("2nd_skill_count");
	var third_skill_count = document.getElementById("3rd_skill_count");
    normal_attack_button.style.display = "inline";
    skill1_button.style.display = "inline";
    skill2_button.style.display = "inline";
    skill3_button.style.display = "inline";  
	first_skill_count.style.display = "inline";
    second_skill_count.style.display = "inline";
    third_skill_count.style.display = "inline"; 
    back_to_map_button.style.display = "none";
    next_monster_button.style.display = "none";
	initialize_player_profile();
    initialize_enemy_profile();


}

function end_game()
{
    var normal_attack_button = document.getElementById("player_default_attack");
    var skill1_button = document.getElementById("player_1st_skill");
    var skill2_button = document.getElementById("player_2nd_skill");
    var skill3_button = document.getElementById("player_3rd_skill");
    var back_to_map_button = document.getElementById("back_to_map");
    var next_monster_button = document.getElementById("next_monster");
	var first_skill_count = document.getElementById("1st_skill_count");
	var second_skill_count = document.getElementById("2nd_skill_count");
	var third_skill_count = document.getElementById("3rd_skill_count");

    normal_attack_button.style.display = "none";
    skill1_button.style.display = "none";
    skill2_button.style.display = "none";
    skill3_button.style.display = "none";  
	first_skill_count.style.display = "none";
    second_skill_count.style.display = "none";
    third_skill_count.style.display = "none"; 
    // back_to_map_button.style.display = "inline";
    // next_monster_button.style.display = "inline";

	if(current_map[6] == "b" && player_HP > 0 ){
		$("#continue").css("display", "inline");
		//加上打boss的劇情連結
		$("#continue").click(function() {
		  var url = "./story"+current_map.slice(-4)+".html"; // 取map後四個字
		  window.location.href = url;
		  var normal_attack_button = document.getElementById("player_default_attack");
		  var skill1_button = document.getElementById("player_1st_skill");
		  var skill2_button = document.getElementById("player_2nd_skill");
		  var skill3_button = document.getElementById("player_3rd_skill");
		  normal_attack_button.disabled = false;
		  skill1_button.disabled = false;
		  skill2_button.disabled = false;
		  skill3_button.disabled = false;
		});
	  }else{
		back_to_map_button.style.display = "inline";
		next_monster_button.style.display = "inline";
		var normal_attack_button = document.getElementById("player_default_attack");
		var skill1_button = document.getElementById("player_1st_skill");
		var skill2_button = document.getElementById("player_2nd_skill");
		var skill3_button = document.getElementById("player_3rd_skill");
		normal_attack_button.disabled = false;
		skill1_button.disabled = false;
		skill2_button.disabled = false;
		skill3_button.disabled = false;
	  }

    if (player_HP <= 0) {
        var text_container = document.getElementById("battle_information_container");
        var new_text =  document.createElement("h2");
        new_text.textContent = "你輸了" + "經驗值扣 20%";
        player_exp *= 0.8;
        text_container.insertBefore(new_text, text_container.firstChild);
    } else {
        var text_container = document.getElementById("battle_information_container");
        var new_text =  document.createElement("h2");
		let pattern = /b/;
		if (pattern.test(current_map));
			playdata["progress"] = current_map;
        new_text.textContent = "你贏了 獲得 " + enemy_exp + " 點經驗值 " + enemy_money + " 點金錢 ";
        text_container.insertBefore(new_text, text_container.firstChild);
        player_exp += enemy_exp;
        player_money += enemy_money;
        if (player_exp >= lenel_n_threshold) {
            player_exp -= lenel_n_threshold;
            player_level++;
            update(player_career);
            new_text.textContent = "你升級了 " + enemy_exp + " 點經驗值 " + enemy_money + " 點金錢 ";
            text_container.insertBefore(new_text, text_container.firstChild);
        }
    }
    playdata["exp"] = parseInt(player_exp);
    playdata["money"] = player_money;
    playdata["lv"] = player_level;
    store_to_cookie();
    putCharData();
    // saveCookieToDatabase(playdata);
}

function update(career)
{
    var text_container = document.getElementById("battle_information_container");
    var new_text =  document.createElement("h2");
    if (career == "戰士") {
        player_initial_HP += warrior_HP_step;
        player_HP = player_initial_HP;
        player_attack += warrior_atk_step;
        new_text.textContent = "你升級了 獲得 " + warrior_HP_step + " 點生命 " + warrior_atk_step + " 點攻擊 ";
    } else if (career == "狂戰士") {
        player_initial_HP += crazy_warrior_HP_step;
        player_HP = player_initial_HP;
        player_attack += crazy_warrior_atk_step;
        new_text.textContent = "你升級了 獲得 " + crazy_warrior_HP_step + " 點生命 " + crazy_warrior_atk_step + " 點攻擊 ";
    } else if (career == "聖戰士") {
        player_initial_HP += holy_warrior_HP_step;
        player_HP = player_initial_HP;
        player_attack += holy_warrior_atk_step;
        new_text.textContent = "你升級了 獲得 " + holy_warrior_HP_step + " 點生命 " + holy_warrior_atk_step + " 點攻擊 ";
    }
    playdata["hp"] = player_initial_HP;
    playdata["str"] = player_attack;

    
    
    text_container.insertBefore(new_text, text_container.firstChild);
}

function store_to_cookie() {
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
    console.log("更新")
}

function putCharData(){
    //把角色資料放到HTML頁面上
    $("#skinImage").attr("src", playdata["skin"]);
    $("#nameSpan").html(playdata["playername"]);
    $("#lvSpan").html(playdata["lv"]);
    $("#careerSpan").html(playdata["career"]);
    $("#moneySpan").html(playdata["money"]);
    $("#expSpan").html(playdata["exp"] + "/" +lenel_n_threshold);
}
