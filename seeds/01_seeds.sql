-- users
INSERT INTO users (name, email, password) 
VALUES ('Ron Weasley', 'ronweasley@hogwarts.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Hermione Granger', 'hermionegranger@hogwarts.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Achilles', 'achilles@troy.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Circe', 'circe@aiaia.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

-- properties
INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code)
VALUES (4, 'Lovely remote cabin', 'description', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 1200.00, 0, 2, 4, 'Greece', '1 Aiaia lane', 'Aiaia', 'Aiaia', '0001'),
(1, 'Whimsical character home', 'description', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg', 900.00, 3, 7, 12, 'United Kingdom', '43 Hogsmeade Lane', 'London', 'London', '1213'),
(3, 'Naturally lit house by the beach', 'description', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2080018/pexels-photo-2080018.jpeg', 300.00, 2, 3, 4, 'Greece', '2 Troy Way', 'Troy', 'Troy', '1323'),
(2, 'Idyllic house by the sea', 'description', 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg', 1000.00, 4, 7, 11, 'United Kingdom', '78 Queens Rd', 'London', 'London', '7685');


-- reservations
INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('0002-11-01', '2001-11-01', 1, 4),
('2014-04-21', '2014-05-26', 2, 3),
('2013-05-18', '2014-06-29', 2, 4),
('2021-03-12', '2022-01-04', 1, 2);

-- property_reviews
INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message) 
VALUES (4, 1, 1, 2, 'message'),
(3, 2, 2, 2, 'message'),
(4, 2, 3, 1, 'message'),
(2, 1, 4, 5, 'message');
