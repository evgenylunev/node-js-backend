CREATE DATABASE IF NOT EXISTS phone_service;

CREATE TABLE IF NOT EXISTS `calls` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_id VARCHAR(255) NOT NULL,
  to_phone_num VARCHAR(100) NOT NULL,
  from_phone_num VARCHAR(100) NOT NULL,
  duration INT(11) NOT NULL,
  time_when_occured TIMESTAMP NOT NULL,
  is_robocall BOOLEAN DEFAULT false
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `users` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO calls (user_id, name, to_phone_num, from_phone_num, duration, time_when_occured) VALUES
('123', 'name1', '(123)345-67-89', '(879)654-43-21', 120, '2020-09-22 10:00:01');
