// Skills for warrior
// Data structure: [傷害,次數,{buff:數值}]
//加攻加血降攻都持續2回合
//治癒放完就沒
["加攻","加血","降攻","治癒"]
var warrior_skill_dict = {};
warrior_skill_dict["旋風斬"] = [1.5, 50];    //1等開
warrior_skill_dict["穿心長矛"] = [2, 20];    //3等開
warrior_skill_dict["鬥志咆哮"] = [0, 5 ,{"加攻":0.1}];    //5等開
warrior_skill_dict["巨力震擊"] = [3, 20];    //10等開
warrior_skill_dict["神速血劍"] = [3, 10,{"治癒":0.2}];    //15等開
warrior_skill_dict["乞丐大劍"] = [4.5, 5,{"降攻":0.2}];    //20等開
warrior_skill_dict["天崩地裂"] = [6, 5,{"加攻":0.2}];    //25等開
warrior_skill_dict["霸者之氣"] = [7.5, 5,{"加血":0.2}];    //30等開
warrior_skill_dict["滅龍一擊"] = [10, 3];    //40等開
warrior_skill_dict["霸者斬破"] = [12, 1,{"加攻":0.4}];    //50等開

//Skills for crazy warrior
var crazy_warrior_skill_dict = {};
crazy_warrior_skill_dict["大斧一劈"] = [2, 50];
crazy_warrior_skill_dict["外圈刮"] = [1.5, 20,{"治癒":0.15}];
crazy_warrior_skill_dict["無畏衝鋒"] = [3, 20];
crazy_warrior_skill_dict["震天吼嚎"] = [0, 5,{"加攻":0.2}];
crazy_warrior_skill_dict["狂亂連擊"] = [5, 20];
crazy_warrior_skill_dict["日字衝拳"] = [7, 10];
crazy_warrior_skill_dict["嗜血狂襲"] = [8, 5,{"加血":0.3}];
crazy_warrior_skill_dict["無盡狂潮"] = [10, 5];
crazy_warrior_skill_dict["諸神黃昏"] = [12, 3,{"降攻":0.2}];
crazy_warrior_skill_dict["終極狂戰"] = [15, 1,{"治癒":0.4}];

//Skills for holy warrior
var holy_warrior_skill_dict = {};
holy_warrior_skill_dict["bonk"] = [1.3, 50];
holy_warrior_skill_dict["聖盾打擊"] = [2, 20];
holy_warrior_skill_dict["神聖之光"] = [2, 20,{"治癒":0.2}];
holy_warrior_skill_dict["鐵甲衝鋒"] = [2.5, 5,{"降攻":5}];
holy_warrior_skill_dict["聖光之劍"] = [3, 5,{"加血":0.15}];
holy_warrior_skill_dict["阿拉花瓜"] = [4, 10];
holy_warrior_skill_dict["聖光之泉"] = [0, 10,{"治癒":0.25}];
holy_warrior_skill_dict["神聖審判"] = [5, 3,{"降攻":0.25}];
holy_warrior_skill_dict["聖炎焚天"] = [7, 3];
holy_warrior_skill_dict["聖光神諭"] = [8, 1,{"加血":0.3}];
