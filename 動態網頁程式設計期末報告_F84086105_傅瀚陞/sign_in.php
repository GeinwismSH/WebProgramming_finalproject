<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>登入</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    body {
      text-align: center;
      background-color: black;
      margin-top: 100px;
    }

    .form-container {
      width: 300px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f2f2f2;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      position: relative;
    }

    .form-container h2 {
      margin-bottom: 20px;
    }

    .register-button {
      background-color: transparent;
      border: none;
      color: rgb(19, 19, 19);
      text-decoration: underline;
      cursor: pointer;
      position: absolute;
      right: 10px;
      bottom: 10px;
    }

    .login-button {
      margin-top: 10px;
    }
  </style>
</head>
<body>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
    <h1 style="color:white; font-family: Fantasy, sans-serif; font-size: 56px;">
      Warrior Legend
    </h1>

    <div class="container">
        <div class="form-container">
        <h2>登入</h2>
        <?php
            $username = "";
            $password = "";
            $isError = false;
            $usernameErrorR = false;
            $passwordErrorR = false;
            $formErrors = array("usernameError" => false, "passwordError" => false);

            if ($_SERVER["REQUEST_METHOD"] === "POST") {
                $username = $_POST["username"];
                $password = $_POST["password"];

                if (empty($username) || !preg_match("/^[a-zA-Z0-9]{6,}$/", $username)) {
                  $formErrors["usernameError"] = true;
                  $isError = true;
              }
      
              if (empty($password) || !preg_match("/^[a-zA-Z0-9]{8,}$/", $password)) {
                  $formErrors["passwordError"] = true;
                  $isError = true;
              }

                if (!$isError) {
                  // 連到mySQL
                  $mysqli = new mysqli("localhost", "geinwismsh", "0000", "my_data");

                  // 檢查
                  if ($mysqli->connect_errno) {
                      die("Could not connect to database: " . $mysqli->connect_error);
                  }

                  // 建立 SQL SELECT 語句，查詢帳號和密碼是否存在且正確
                  $query = "SELECT * FROM `game_account` WHERE `Username` = ?";
                  $stmt = $mysqli->prepare($query);

                  // 綁定參數，$username 是使用者輸入的帳號
                  $stmt->bind_param("s", $username);

                  // 執行查詢
                  $stmt->execute();

                  // 獲取結果
                  $result = $stmt->get_result();

                  // 檢查是否有匹配的記錄
                  if ($result->num_rows > 0) {
                      // 取得查詢結果的第一筆資料
                      $row = $result->fetch_assoc();
                      $hashedPassword = $row['Password'];

                      // 驗證密碼
                      if (password_verify($password, $hashedPassword)) {
                        // 密碼驗證通過

                        $playername = $row['Playername'];
                        $lv = $row['Level'];
                        $exp = $row['Experience'];
                        $str = $row['Strength'];
                        $hp = $row['HP'];
                        $career = $row['Career'];
                        $money = $row['Money'];
                        $progress = $row['Progress'];
                        $skin = $row['Skin'];
                        $skill_1 = $row['Skill_1'];
                        $skill_2 = $row['Skill_2'];
                        $skill_3 = $row['Skill_3'];

                        // 將資料組成陣列
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
                          "skill_1" => $skill_1,
                          "skill_2" => $skill_2,
                          "skill_3" => $skill_3
                      );

                      // 將資料轉換為 JSON 字串
                      $jsonData = json_encode($data);
                      // $encodedData = urlencode($jsonData);
                      // 將資料存入 Cookie
                      setcookie("playerdata", $jsonData, time() + 3600, "/");
                        //進入主介面
                        header("Location: ./mainpage.html");
                        exit();

                      } else {
                          // 密碼驗證失敗
                          $passwordErrorR = true;
                      }
                  } else {
                      // 帳號不存在
                      $usernameErrorR = true;
                  }

                  // 關閉連線
                  $stmt->close();
                  $mysqli->close();
  
                }
            }
        ?>

        <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
            <div class="mb-3">
                <label for="username" class="form-label">帳號</label>
                <input type="text" class="form-control" id="username" name="username" placeholder="請輸入帳號" value="<?php echo htmlspecialchars($username); ?>" required>
                <!-- 有錯動態產生訊息 -->
                <?php
                    if ($formErrors["usernameError"]) {
                        echo '<div class="text-danger">帳號只能包含英數且6個字元以上</div>';
                    }
                ?>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">密碼</label>
                <input type="password" class="form-control" id="password" name="password" placeholder="請輸入密碼" value="<?php echo htmlspecialchars($password); ?>" required>
                <?php
                    if ($formErrors["passwordError"]) {
                        echo '<div class="text-danger">密碼只能包含英數且8個字元以上</div>';
                    }
                    if ($usernameErrorR){
                      echo'<div class="text-danger">帳號不存在，請註冊</div>';
                    }
                    if ($passwordErrorR){
                      echo'<div class="text-danger">密碼驗證失敗</div>';
                    }
                ?>
            </div>
            <button type="submit" class="btn btn-primary login-button">登入</button>
            <a href="./register.php">
                <button type="button" class="btn btn-link register-button">註冊</button>
            </a>
        </form>
        </div>
    </div>


</body>
</html>
