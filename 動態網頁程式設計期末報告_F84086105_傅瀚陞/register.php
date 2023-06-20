<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>註冊</title>
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
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.0.2/js/bootstrap.min.js"></script>
    
    <div class="container">
        <div class="form-container">
        <h2>註冊</h2>
        <?php
            $username = "";
            $password = "";
            $email = "";
            $isError = false;
            $usernameRepeat = false;
            $formErrors = array("usernameError" => false, "passwordError" => false, "emailError" => false);

            if ($_SERVER["REQUEST_METHOD"] === "POST") {
                $username = $_POST["username"];
                $password = $_POST["password"];
                $email = $_POST["email"];
                //檢查帳號
                if (empty($username) || !preg_match("/^[a-zA-Z0-9]{6,}$/", $username)) {
                  $formErrors["usernameError"] = true;
                  $isError = true;
                }
                //檢查密碼
                if (empty($password) || !preg_match("/^[a-zA-Z0-9]{8,}$/", $password)) {
                    $formErrors["passwordError"] = true;
                    $isError = true;
                }
                //檢查電子郵件，直接用php內建方法
                if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
                  $formErrors["emailError"] = true;
                  $isError = true;
                }
                //都沒錯才上傳到mySQL
                if (!$isError) {
                  // 連到mySQL
                  $mysqli = new mysqli("localhost", "geinwismsh", "0000", "my_data");

                  // 檢查
                  if ($mysqli->connect_errno) {
                      die("Could not connect to database: " . $mysqli->connect_error);
                  }

                  // 寫好插入語句
                  $query = "INSERT INTO `game_account` (`Username`, `Password`, `Email`) VALUES (?, ?, ?)";
                  $stmt = $mysqli->prepare($query);

                  // 用哈希表對密碼加密
                  $hashedpassword = password_hash($password, PASSWORD_DEFAULT);

                  // 放入
                  $stmt->bind_param("sss", $username, $hashedpassword, $email);

                  // 執行
                  $result = $stmt->execute();
                  
                  if ($result) {
                      setcookie("playerdata", $username, time() + 3600, "/"); // 設定名稱為 "playerdata" 的 Cookie，有效期為 1 小時
                      $stmt->close();
                      $mysqli->close();
    
                      //進入主介面
                      header("Location: ./story1.html");
                      exit();
                  } else {
                    if ($stmt->errno == 1062) {
                      // 帳號已存在的錯誤處理
                      $usernameRepeat = true;
                      $stmt->close();
                      $mysqli->close();
                      
                    } 
                  }
                }
            }
        ?>

        <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
            <div class="mb-3">
                <label for="username" class="form-label">帳號</label>
                <input type="text" class="form-control" id="username" name="username" placeholder="請輸入帳號"  value="<?php echo htmlspecialchars($username); ?>"required>
                <?php
                    if ($formErrors["usernameError"]) {
                        echo '<div class="text-danger">帳號只能包含英數且6個字元以上</div>';
                    }
                    if ($usernameRepeat) {
                      echo '<div class="text-danger">帳號已存在，請使用其他帳號註冊</div>';
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
                ?>
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">電子郵件</label>
                <input type="email" class="form-control" id="email" name="email" placeholder="請輸入電子郵件"  value="<?php echo htmlspecialchars($email); ?>"required>
                <?php
                    if ($formErrors["emailError"]) {
                        echo '<div class="text-danger">電子郵件無效</div>';
                    }
                ?>
            </div>
                <button type="submit" class="btn btn-primary login-button">註冊</button>
            <a href="./sign_in.php">
                <button type="button" class="btn btn-link register-button">返回登入</button>
            </a>
        </form>
        </div>
    </div>


</body>
</html>
