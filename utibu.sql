CREATE DATABASE IF NOT EXISTS utibu_health;
CREATE USER IF NOT EXISTS 'admin'@'localhost' IDENTIFIED BY '  ';
GRANT ALL PRIVILEGES ON `utibu_health`.* to 'admin'@'localhost';
FLUSH PRIVILEGES;
