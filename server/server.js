const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const movies = require('./movie-model.js');

const app = express();

// Parse JSON bodies
app.use(bodyParser.json());

// Serve static content in directory 'files'
app.use(express.static(path.join(__dirname, 'files')));

// GET all movies, optionally filtered by genre
app.get('/movies', function (req, res) {
    const genre = req.query.genre;
    let movieList = Object.values(movies);

    if (genre) {
        movieList = movieList.filter(function (movie) {
            return movie.Genres.includes(genre);
        });
    }

    res.json(movieList);
});

// GET one movie by imdbID
app.get('/movies/:imdbID', function (req, res) {
    const imdbID = req.params.imdbID;
    const movie = movies[imdbID];

    if (movie) {
        res.send(movie);
    } else {
        res.sendStatus(404);
    }
});

// PUT update/create movie
app.put('/movies/:imdbID', function (req, res) {
    const imdbID = req.params.imdbID;
    const movie = req.body;

    movie.imdbID = imdbID;

    if (movies[imdbID]) {
        movies[imdbID] = movie;
        res.sendStatus(200);
    } else {
        movies[imdbID] = movie;
        res.status(201).send(movie);
    }
});

// GET all unique genres sorted alphabetically
app.get('/genres', function (req, res) {
    const genres = new Set();

    for (const movie of Object.values(movies)) {
        for (const genre of movie.Genres) {
            genres.add(genre);
        }
    }

    res.json(Array.from(genres).sort());
});

app.listen(3000, function () {
    console.log("Server now listening on http://localhost:3000/");
});
