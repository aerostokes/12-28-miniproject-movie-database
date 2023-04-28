USE movie_db;
SELECT * FROM movies ORDER BY movie_name;
SELECT * FROM reviews;

SELECT reviews.id, movie_name, review 
FROM reviews LEFT JOIN movies
ON movie_id = movies.id;

DELETE FROM movies WHERE id = 4;

UPDATE reviews 
SET review = "updated review"
WHERE id = 3;