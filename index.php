<?php
// =============================================================================
// A Birthday Letter for Zahrah - PHP Entry Point
// =============================================================================

// Baca settings jika tersedia
$settingsFile = __DIR__ . '/data/settings.json';
$settings = [];
if (file_exists($settingsFile)) {
    $settings = json_decode(file_get_contents($settingsFile), true);
}

// Render frontend template
include __DIR__ . '/index.html';
?>
