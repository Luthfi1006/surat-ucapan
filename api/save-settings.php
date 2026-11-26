<?php
session_start();
header('Content-Type: application/json');

// Periksa autentikasi admin
if (empty($_SESSION['zahrah_admin_logged_in'])) {
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Akses ditolak. Silakan login terlebih dahulu.']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Format JSON tidak valid']);
    exit;
}

$settingsPath = __DIR__ . '/../data/settings.json';

// Pertahankan hash password yang lama jika tidak dikirim ulang
if (file_exists($settingsPath)) {
    $existing = json_decode(file_get_contents($settingsPath), true);
    if (!isset($data['admin']['passwordHash']) && isset($existing['admin']['passwordHash'])) {
        $data['admin']['passwordHash'] = $existing['admin']['passwordHash'];
    }
}

// Simpan ke settings.json
$saved = file_put_contents($settingsPath, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

if ($saved !== false) {
    echo json_encode(['success' => true, 'message' => 'Pengaturan berhasil disimpan!']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Gagal menulis file data/settings.json. Periksa izin folder.']);
}
?>
