<?php
// 連到mySQL
$mysqli = new mysqli("localhost", "geinwismsh", "0000", "my_data");

// 檢查連接狀態
if ($mysqli->connect_errno) {
    die("Could not connect to database: " . $mysqli->connect_error);
}

// 獲取從JavaScript傳遞過來的cookie資料
$cookieData = $_COOKIE['playerdata'];

// 解JSON
$playdata = json_decode($cookieData, true);

// 建立 SQL UPDATE 語句，存到game_account
$updateQuery = "UPDATE `game_account` SET `Playername` = ?, 
`Level` = ?, `Experience` = ?, `Strength` = ?, `HP` = ?, `Career` = ?, 
`Money` = ?, `Progress` = ?, `Skin` = ? , `Skill_1` = ? , `Skill_2` = ? , `Skill_3` = ? WHERE `Username` = ?";

$stmtUpdate = $mysqli->prepare($updateQuery);

// 綁定參數
$stmtUpdate->bind_param("sssssssssssss", $playdata['playername'], $playdata['lv'], $playdata['exp'], $playdata['str'], $playdata['hp'], $playdata['career'], $playdata['money'], $playdata['progress'], $playdata['skin'],$playdata['skill_1'],$playdata['skill_2'],$playdata['skill_3'], $playdata['username']);

// 執行更新
$stmtUpdate->execute();

// 檢查更新是否成功
if ($stmtUpdate->affected_rows > 0) {
    echo "資料更新成功";
} else {
    echo "資料更新失敗";
}

// 關閉資料庫連接
$mysqli->close();
?>
