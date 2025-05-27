<?php
// Включаем вывод ошибок для отладки
ini_set('display_errors', 1);
error_reporting(E_ALL);
?>

<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Мой сайт</title>
  <style>
    body {
      font-family: sans-serif;
      background: #f0f0f0;
      padding: 2rem;
    }
    h1 {
      color: #333;
    }
  </style>
</head>
<body>
  <h1>Привет! PHP работает 🎉</h1>
  <p>Добро пожаловать на мой сайт.</p>

  <?php
    echo "<p>Сегодня: " . date("d.m.Y H:i") . "</p>";
  ?>
</body>
</html>
