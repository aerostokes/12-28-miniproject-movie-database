// Import and initialize packages, modules, and variables
const express = require("express");
const router = express.Router();
// const path = require("path");

const mysql = require("mysql2");
const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "password",
        database: "movie_db"
    }
);

// GET api/movies
router.get("/api/movies", (req,res) => {
    db.query("SELECT * FROM movies ORDER BY movie_name;", (err,results) => {
        if (err) { return res.status(500).json({msg: "Error reading database", err})};
        res.json(results);
    });
    // res.sendFile(path.join(__dirname, "../public/notes.html"));
});

// GET api/reviews
router.get("/api/reviews", (req,res) => {
    db.query("SELECT reviews.id, movie_name, review FROM reviews LEFT JOIN movies ON movie_id = movies.id;", (err,results) => {
        if (err) {
            return res.status(500).json({msg: "Error reading database", err});
        } else {
            return res.json(results);
        };
    });
    // res.sendFile(path.join(__dirname, "../public/notes.html"));
});

// POST new movie
router.post("/api/add-movie", (req, res) => {
    const newMovie = req.body.movie_name;
    db.query("INSERT INTO movies(movie_name) VALUES (?);", newMovie, (err, results) => {
        if (err) {
            return res.status(500).json({msg: "Error writing to database", err});
        } else {
            return res.json({msg: `Added ${newMovie} to database`});
        };
    });
});

router.delete("/api/movies/:id", (req, res) => {
    db.query("DELETE FROM movies WHERE id = ?;", req.params.id, (err, results) => {
        if (err) {
            return res.status(500).json({msg: "Error deleting from database", err});
        } else {
            return res.json({msg: `Deleted movie id: ${req.params.id} from database`});
        };
    });
});

router.put("/api/update-review", (req, res) => {
    db.query("UPDATE reviews SET review = ? WHERE id = ?;", [req.body.review, req.body.review_id], (err, results) => {
        if (err) {
            return res.status(500).json({msg: "Error updating review", err});
        } else {
            return res.json({msg: `Updated review id: ${req.body.review_id}`});
        };
    })
});

// Export module
module.exports = router;