-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2023-06-16 09:16:46
-- 伺服器版本： 10.4.27-MariaDB
-- PHP 版本： 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `my_data`
--

-- --------------------------------------------------------

--
-- 資料表結構 `game_account`
--

CREATE TABLE `game_account` (
  `ID` int(11) NOT NULL,
  `Username` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Playername` varchar(255) NOT NULL,
  `Level` int(11) NOT NULL,
  `Experience` int(11) NOT NULL,
  `Strength` int(11) NOT NULL,
  `HP` int(11) NOT NULL,
  `Career` varchar(255) NOT NULL,
  `Money` int(11) NOT NULL,
  `Progress` varchar(255) NOT NULL,
  `Skin` varchar(255) NOT NULL,
  `Skill_1` varchar(255) NOT NULL DEFAULT '空白',
  `Skill_2` varchar(255) NOT NULL DEFAULT '空白',
  `Skill_3` varchar(255) NOT NULL DEFAULT '空白'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `game_account`
--

INSERT INTO `game_account` (`ID`, `Username`, `Password`, `Email`, `Playername`, `Level`, `Experience`, `Strength`, `HP`, `Career`, `Money`, `Progress`, `Skin`, `Skill_1`, `Skill_2`, `Skill_3`) VALUES
(1, 'geinwismsh', '$2y$10$fwRCYnS4Hq6qz/rFWvU9tuUhVjMQ/d7upqyhUVDt/tGBBu2EjVHXK', 'ades96004@gmail.com', 'GeinwismSH', 20, 109, 48, 129, '戰士', 109, '3-1', './正常的.png', '旋風斬', '乞丐大劍', '神速血劍'),
(3, '1234567890', '$2y$10$kAKVkyvhZ4.2RYV18Vok8.MWNaAMAVR/viS8X8SFelDnV8bvERAK6', 'ades96004@gmail.com', '範馬勇次郎', 7844389, 300, 9999999, 99999999, '狂戰士', 100000019, 'map1_3b', './范馬勇次郎.jpg', '日字衝拳', '外圈刮', '諸神黃昏'),
(29, '33333333333', '$2y$10$rGsrKgAeK/.ID9sNjBNBT.l9dPhwgmN1oGKUgXFZRzYnczXQthc1S', 'ades96004@gmail.com', 'dsadsa', 1, 0, 5, 25, '聖戰士', 0, '1-1', './聖戰士.png', '', '', ''),
(31, '33333333333ewq', '$2y$10$BT.JfnFHAlBkGfS1faYbfuPwLBjQMhKNI5MzaDmrMVCMJzf9NUVQm', 'ades96004@gmail.com', 'gfd', 1, 0, 8, 20, '戰士', 0, '1-1', './戰士.png', '空白', '空白', '空白'),
(32, '321321321321312', '$2y$10$D8Fp0oO/oQ8pzvlXz9/qMucTaHfJ/DXUoBhdL3Jx2IRSLFBT0Pls.', 'ades96004@gmail.com', 'ji3', 1, 0, 8, 20, '戰士', 0, '1-1', './戰士.png', '空白', '空白', '空白'),
(33, 'ewqewqewqewq', '$2y$10$0BF2.piqc4QTDgapD4AgBe0kFVem.38j87gZ.GzBEGA13j9IYriXK', 'ades96004@gmail.com', '我', 1, 0, 5, 25, '聖戰士', 0, '1-1', './聖戰士.png', '空白', '空白', '空白'),
(34, 'dsadsadas', '$2y$10$ek9Fx8oMqtS4spCRwvXnS.J8YxueAEF6bx0rW8urTvWz7Cni.4Aeq', 'ades96004@gmail.com', 'ewq', 1, 0, 10, 15, '狂戰士', 0, '1-1', './狂戰士.png', '空白', '空白', '空白'),
(35, 'dddddddddd', '$2y$10$nM6uuUydxcoTdKdJqeYS7O7jq1PmzdUyKbsxBR.p76wUIg.kJxA6.', 'ades96004@gmail.com', 'gfd', 1, 0, 5, 25, '聖戰士', 0, '1-1', './聖戰士.png', 'bonk', '空白', '空白'),
(36, 'ssssss', '$2y$10$F03unWN5X7SbwVNPhvTHlui7dXTSws2vpK0FZDtPqEBsGqfHMG/PW', 'ades96004@gmail.com', 'www', 1, 0, 4, 20, '戰士', 0, '1-1', './戰士.png', '旋風斬', '空白', '空白'),
(38, 'dsadsadsad', '$2y$10$iyuWDIR9kr8HzNW6bl2Kv.EWs/6LuA5fU.0TJ8Ggjflmm/jYG1w1u', 'ades96004@gmail.com', 'ds', 1, 0, 5, 13, '狂戰士', 0, '1-1', './狂戰士.png', '空白', '空白', '空白'),
(40, 'uiouioewq', '$2y$10$sRLJNgmMTFiOZIUSyuJcderO//ZSIRO/A5s1qcomphok2pqYjC08m', 'ades96004@gmail.com', 'tintin', 1, 0, 4, 18, '戰士', 0, '1-1', './戰士.png', '旋風斬', '空白', '空白');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `game_account`
--
ALTER TABLE `game_account`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `unique_username` (`Username`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `game_account`
--
ALTER TABLE `game_account`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
