<?php
session_start();

$settingsFile = __DIR__ . '/../data/settings.json';
$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $inputPassword = $_POST['password'] ?? '';
    
    $hash = null;
    if (file_exists($settingsFile)) {
        $settings = json_decode(file_get_contents($settingsFile), true);
        $hash = $settings['admin']['passwordHash'] ?? null;
    }

    $isValid = false;
    if ($hash) {
        $isValid = password_verify($inputPassword, $hash) || $inputPassword === 'admin123' || $inputPassword === 'zahrah2005';
    } else {
        $isValid = ($inputPassword === 'admin123' || $inputPassword === 'zahrah2005' || $inputPassword === 'admin');
    }

    if ($isValid) {
        $_SESSION['zahrah_admin_logged_in'] = true;
        header('Location: index.php');
        exit;
    } else {
        $error = 'Kata sandi salah! Coba gunakan: zahrah2005 atau admin123';
    }
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login Admin - Surat Ulang Tahun Zahrah</title>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Poppins', sans-serif;
      background: radial-gradient(circle at 50% 20%, #111a42 0%, #080d24 60%, #030511 100%);
      color: #fff;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .login-card {
      background: rgba(14, 21, 53, 0.85);
      border: 1px solid rgba(212, 175, 55, 0.4);
      box-shadow: 0 15px 40px rgba(0,0,0,0.6);
      border-radius: 16px;
      padding: 35px 30px;
      max-width: 400px;
      width: 100%;
      text-align: center;
      backdrop-filter: blur(10px);
    }
    .login-icon { font-size: 2.5rem; margin-bottom: 12px; }
    h2 { font-size: 1.5rem; color: #ffd700; margin-bottom: 6px; }
    p { font-size: 0.85rem; color: #a4b2d1; margin-bottom: 24px; }
    .form-group { margin-bottom: 20px; text-align: left; }
    label { font-size: 0.85rem; color: #ddd; display: block; margin-bottom: 6px; }
    input[type="password"] {
      width: 100%;
      padding: 12px 14px;
      border-radius: 8px;
      border: 1px solid rgba(212, 175, 55, 0.4);
      background: rgba(255,255,255,0.06);
      color: #fff;
      font-size: 1rem;
      outline: none;
    }
    input[type="password"]:focus {
      border-color: #ffd700;
      box-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
    }
    .btn-login {
      width: 100%;
      padding: 12px;
      border-radius: 50px;
      background: linear-gradient(135deg, #ffd700 0%, #d4af37 100%);
      color: #1a1200;
      border: none;
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      margin-top: 10px;
    }
    .error-msg {
      background: rgba(230, 57, 70, 0.2);
      border: 1px solid #e63946;
      color: #ffb4a2;
      padding: 10px;
      border-radius: 8px;
      font-size: 0.85rem;
      margin-bottom: 16px;
    }
    .back-link {
      display: inline-block;
      margin-top: 20px;
      font-size: 0.85rem;
      color: #a4b2d1;
      text-decoration: none;
    }
    .back-link:hover { color: #ffd700; }
  </style>
</head>
<body>
  <div class="login-card">
    <div class="login-icon">🔐</div>
    <h2>Panel Admin</h2>
    <p>Masuk untuk mengelola surat, foto, ucapan, dan musik untuk Zahrah</p>

    <?php if ($error): ?>
      <div class="error-msg"><?php echo htmlspecialchars($error); ?></div>
    <?php endif; ?>

    <form method="POST">
      <div class="form-group">
        <label for="password">Kata Sandi Admin</label>
        <input type="password" id="password" name="password" placeholder="Masukkan password..." required autofocus>
      </div>
      <button type="submit" class="btn-login">Masuk ke Panel 🚀</button>
    </form>

    <a href="../" class="back-link">← Kembali ke Halaman Utama</a>
  </div>
</body>
</html>
