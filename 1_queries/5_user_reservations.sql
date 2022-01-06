SELECT reservations.*, properties.*, AVG(rating) AS average_rating
FROM properties
JOIN property_reviews ON property_id = properties.id
JOIN reservations ON reservations.property_id = properties.id
JOIN users ON reservations.guest_id = users.id
WHERE users.id = 1
AND end_date < now()::date
GROUP BY properties.id, start_date, reservations.id
ORDER BY start_date
LIMIT 10;