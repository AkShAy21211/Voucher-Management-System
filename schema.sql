CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) NOT NULL UNIQUE,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE vouchers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  voucher_code VARCHAR(10) NOT NULL UNIQUE,     -- The actual numeric voucher code
  qr_code_path VARCHAR(255) NOT NULL,           -- The relative path to the QR code image
  generated_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  expiry_date DATETIME NOT NULL,
  user_id INT,                                  -- Foreign key to link with users table
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


CREATE TABLE settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  expiry_days INT NOT NULL,
  width_mm INT NOT NULL,
  height_mm INT NOT NULL,
  title_font INT NOT NULL,
  text_font INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
