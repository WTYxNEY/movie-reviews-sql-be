const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const mysql = require('mysql')

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'moviereviews_1'
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api/get', (req, res) => {

    const sqlSelect = 'SELECT * FROM movie_reviews';
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });

})

app.post('/api/insert', (req, res) => {

    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;

    const sqlInsert = 'INSERT INTO movie_reviews (movieName, movieReview) VALUE (?,?)';
    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
        console.log(result)
    });
    res.end();
});

app.delete('/api/delete/:id', (req, res) => {

    const id = req.params.id;

    const sqlDelete = 'DELETE FROM movie_reviews WHERE id = ?';
    db.query(sqlDelete, id, (err, result) => {
        if (err) {
            console.log(err)
        }
    });
    res.end();
});

app.put('/api/update/:id', (req, res) => {

    const id = req.params.id;
    const updateMovieReview = req.body.movieReview;

    const sqlUpdate = 'UPDATE movie_reviews SET movieReview = ? WHERE id = ?';
    db.query(sqlUpdate, [updateMovieReview, id], (err, result) => {
        if (err) {
            console.log(err)
        }
    });
    res.end();
});



app.listen(3001, () => {
    console.log("running on port 3001")
});