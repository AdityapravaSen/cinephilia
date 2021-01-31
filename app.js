const express = require("express");
const ejs = require("ejs");
const fetch = require('node-fetch');
const { response, query } = require("express");
let PORT = process.env.PORT || 3000;

const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));

const apiKey = '8f15dd610db0f3c8fb64da76c86fd488';
const url = 'https://api.themoviedb.org/3/';
const imgUrl = 'https://image.tmdb.org/t/p/w500';

app.get("/", function (req, res) {
    res.render('index');
});

app.get("/search", function (req, res) {
    res.render('search');
});

app.get("/info/:query/:id", function (req, res) {
    //console.log(req.params.id);

    let infoUrl = `${url}${req.params.query}/${req.params.id}?api_key=${apiKey}&language=en-US`;

    //console.log(infoUrl);

    fetch(infoUrl)
        .then(response => {
            return response.json();
        })
        .then(data => {
            //console.log(data);
            let backdropImg = `https://image.tmdb.org/t/p/w500${data.backdrop_path}`;

            let poster = `https://image.tmdb.org/t/p/w500${data.poster_path}`;

            if (req.params.query == 'movie') {

                res.render("info", {
                    backdrop: backdropImg,
                    movie_name: data.title,
                    language: data.original_language,
                    tagline: data.tagline,
                    vote: data.vote_average,
                    popularity: data.popularity,
                    poster: poster,
                    genre: data.genres,
                    overview: data.overview,
                    homepage: data.homepage,
                    movie_id: data.id,
                    type: req.params.query
                })
            }
            else if (req.params.query == 'tv') {
                res.render("info", {
                    backdrop: backdropImg,
                    movie_name: data.name,
                    language: data.original_language,
                    tagline: data.tagline,
                    vote: data.vote_average,
                    popularity: data.popularity,
                    poster: poster,
                    genre: data.genres,
                    overview: data.overview,
                    homepage: data.homepage,
                    movie_id: data.id,
                    type: req.params.query
                })
            }
            //console.log(info);
        })
        .catch(err => {
            console.log(err);
        })
});

//shows
app.get('/shows', function (req, res) {
    res.render('shows');
})

app.listen(PORT, function () {
    console.log(`Server started on port ${PORT}`);
});