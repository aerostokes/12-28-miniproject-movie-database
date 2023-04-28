USE movie_db;
SELECT * FROM movies;
SELECT * FROM reviews;

SELECT review, movie_name 
FROM reviews LEFT JOIN movies
ON movie_id = movies.id;