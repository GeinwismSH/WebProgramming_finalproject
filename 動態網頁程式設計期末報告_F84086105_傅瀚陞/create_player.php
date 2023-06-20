<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>大男幫</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body id="background_main" style="text-align: center; background-color: black; color: white;">
    <script src="mainpage.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>

    <?php
            $username = "";
            $playername = "";
            $lv = "";
            $exp = "";
            $str = "";
            $hp = "";
            $career = "";
            $money = "";
            $progress = "";          
            $skin = "";

            $isError = false;
            $playernameError = false;

            if ($_SERVER["REQUEST_METHOD"] === "POST") {
                $playername = $_POST["name"];
                $career = $_POST["optradio"];

                if  ($career == "戰士"){
                    $lv = 1;
                    $exp = 0;
                    $str = 4;
                    $hp = 18;
                    $career = "戰士";
                    $money = 0;
                    $progress = "1-1";          
                    $skin = "./戰士.png";
                }else if ($career == "狂戰士"){
                    $lv = 1;
                    $exp = 0;
                    $str = 5;
                    $hp = 13;
                    $career = "狂戰士";
                    $money = 0;
                    $progress = "1-1";          
                    $skin = "./狂戰士.png";
                }else if ($career == "聖戰士"){
                    $lv = 1;
                    $exp = 0;
                    $str = 2;
                    $hp = 22;
                    $career = "聖戰士";
                    $money = 0;
                    $progress = "1-1";          
                    $skin = "./聖戰士.png";
                }

                if (empty($playername) || !preg_match("/^[a-zA-Z0-9\x{4e00}-\x{9fa5}]{1,10}$/u", $playername)) {
                  $playernameError = true;
                  $isError = true;
                }


                if (!$isError) {
                //抓cookie資料
                    if (isset($_COOKIE["playerdata"]) ) {

                        // 使用者已登入，執行相應操作
                        $username = $_COOKIE["playerdata"];
                    
                        // 連到mySQL
                        $mysqli = new mysqli("localhost", "geinwismsh", "0000", "my_data");
                        // 檢查連接狀態
                        if ($mysqli->connect_errno) {
                            die("Could not connect to database: " . $mysqli->connect_error);
                        }

                        // 建立 SQL SELECT 語句，根據使用者名稱檢索相應的資料
                        $query = "SELECT * FROM `game_account` WHERE `Username` = ?";
                        $stmt = $mysqli->prepare($query);

                        // 綁定參數，這裡假設 $username 是使用者的名稱
                        $stmt->bind_param("s", $username);

                        // 執行查詢
                        $stmt->execute();

                        // 獲取結果
                        $result = $stmt->get_result();
                        // 檢查是否有匹配的記錄
                        if ($result->num_rows > 0) {
                            

                            // 建立 SQL UPDATE 語句
                            $updateQuery = "UPDATE `game_account` SET `Playername` = ?, `Level` = ?, `Experience` = ? 
                            , `Strength` = ? , `HP` = ? , `Career` = ? , `Money` = ? 
                            , `Progress` = ? , `Skin` = ? WHERE `Username` = ?";
                            $stmtUpdate = $mysqli->prepare($updateQuery);
                        
                            // 綁定參數
                            $stmtUpdate->bind_param("ssssssssss", $playername , $lv , $exp , $str, $hp ,
                            $career , $money , $progress , $skin , $username );
                        
                            // 執行更新
                            $stmtUpdate->execute();
                        
                            // 檢查更新是否成功
                            if ($stmtUpdate->affected_rows > 0) {
                                echo "資料更新成功";
                            } else {
                                echo "資料更新失敗";
                            }
                        
                            // 關閉預處理語句
                            $stmtUpdate->close();
                            
                            // 將資料組成關聯陣列
                            $data = array(
                                "username" => $username,
                                "playername" => $playername,
                                "lv" => $lv,
                                "exp" => $exp,
                                "str" => $str,
                                "hp" => $hp,
                                "career" => $career,
                                "money" => $money,
                                "progress" => $progress,
                                "skin" => $skin,
                                "skill_1" => "空白",
                                "skill_2" => "空白",
                                "skill_3" => "空白",
                            );

                            // 將資料轉換為 JSON 字串
                            $jsonData = json_encode($data);
                            // $encodedData = urlencode($jsonData);
                            // 將資料存入 Cookie
                            setcookie("playerdata", $jsonData, time() + 3600, "/");
                   
                        }


                        // 關閉連線
                        $stmt->close();
                        $mysqli->close();
                        header("Location: ./story3.html");
                    } else {
                        // 使用者未登入，導向登入頁面或返回錯誤訊息
                        
                        header("Location: ./sign_in.php");
                    }
                }
            }
        ?>


    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
        <ul class="navbar-nav" style="margin-left: auto; margin-right: 15px;">
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">選單</a>
                <ul class="dropdown-menu dropdown-menu-end">
                    <li><a class="dropdown-item" href="./sign_in.php">登出</a></li>
                    <li><a class="dropdown-item" href="#">聯絡我們</a></li>
                </ul>
            </li>
        </ul>
    </nav>

    <div class="container" style="margin-top: 30px;margin-bottom: 10px;">
        <h2>創造角色</h2>
        <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">

            <div class="col-sm-3 offset-sm-3 mx-auto" style="margin: 15px">
                <label for="name" class="form-label">名字</label>
                <input type="text" class="form-control" id="name" name="name" placeholder="請輸入名字" required>
                <?php
                    if ($playernameError) {
                        echo '<div class="text-danger">名字只能為中英數且10個字內</div>';
                    }
                ?>
            </div>

            <div  style="margin: 15px">
                <div class="text-center">
                    <label for="class" class="form-label">選擇職業</label>
                </div>
                <div class="form-check-inline text-center" style = "margin : 10px;">
                    <input type="radio" class="form-check-input" id="radio1" name="optradio" value="戰士" checked>
                    <br>
                    <label class="form-check-label" for="radio1">戰士<br>攻守兼備</label><br>
                    <img src="./戰士.png" width="15%" class="inline"><br>
                </div>
                <div class="form-check-inline text-center" style = "margin : 10px;">
                    <input type="radio" class="form-check-input" id="radio2" name="optradio" value="狂戰士">
                    <br>
                    <label class="form-check-label" for="radio2">狂戰士<br>高攻低防</label><br>
                    <img src="./狂戰士.png" width="15%"><br>
                </div>
                <div class="form-check-inline text-center" style = "margin : 10px;">
                    <input type="radio" class="form-check-input" id="radio3" name="optradio" value="聖戰士">
                    <br>
                    <label class="form-check-label">聖戰士<br>高防低攻</label><br>
                    <img src="./聖戰士.png" width="15%"><br>
                </div>
            </div>
            

            <button type="submit" class="btn btn-primary" style = "margin-bottom: 20px";>創建角色</button>
        </form>
    </div>
</body>
</html>
