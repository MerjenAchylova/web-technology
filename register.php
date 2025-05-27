<?php
// Подключение к PostgreSQL
$host = "localhost";
$port = "5432";
$dbname = "postgres";  // укажи своё имя базы, если оно другое
$user = "postgres";
$password = "120105";

$conn = pg_connect("host=localhost dbname=postgres user=postgres password=120105");

// Получаем данные из формы
$email = $_POST['email'];
$password = $_POST['password']; // не забывай хешировать пароль для безопасности!

// Проверяем, есть ли уже такой email
$result = pg_query_params($conn, "SELECT id FROM users WHERE email = $1", array($email));

if (!$result) {
    die("Ошибка базы данных");
}

if (pg_num_rows($result) > 0) {
    // Пользователь с таким email уже есть — сразу переходим на каталог
    header("Location: index.html?registered=1");
    exit();
} else {
    // Пользователя нет — создаём нового

    // Хешируем пароль (рекомендую)
    $password_hash = password_hash($password, PASSWORD_DEFAULT);

    $insert = pg_query_params($conn, "INSERT INTO users (email, password) VALUES ($1, $2)", array($email, $password_hash));

    if (!$insert) {
        die("Ошибка при регистрации");
    }

    // После успешной регистрации — переходим на каталог
    header("Location: index.html?registered=1");
    exit();
}
?>
