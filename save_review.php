<?php
header('Content-Type: application/json');

$conn = pg_connect("host=localhost dbname=postgres user=postgres password=120105");
if (!$conn) {
    echo json_encode(['success' => false, 'message' => 'Ошибка подключения к базе']);
    exit;
}

$author = trim($_POST['author'] ?? '');
$text = trim($_POST['text'] ?? '');
$rating = (int)($_POST['rating'] ?? 0);

if ($author === '' || $text === '' || $rating < 1 || $rating > 5) {
    echo json_encode(['success' => false, 'message' => 'Заполните все поля правильно']);
    exit;
}

$query = "INSERT INTO reviews (author, text, rating) VALUES ($1, $2, $3)";
$result = pg_query_params($conn, $query, [$author, $text, $rating]);

if ($result) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Ошибка при сохранении']);
}
?>
