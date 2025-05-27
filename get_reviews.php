<?php
header('Content-Type: application/json');

$conn = pg_connect("host=localhost port=5432 dbname=postgres user=postgres password=120105");
if (!$conn) {
    echo json_encode([]);
    exit;
}

$result = pg_query($conn, "SELECT author, rating, text, date FROM reviews ORDER BY date DESC");
$reviews = [];

while ($row = pg_fetch_assoc($result)) {
    $reviews[] = $row;
}

echo json_encode($reviews);
?>
