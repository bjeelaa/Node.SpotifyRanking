const express = require("express");
const app = express();

app.set("view engine", "pug");
app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req, res) => {
    res.render("hi");
});

app.post('/vote', (req, res) => {
    console.log(req.body);
    rSongs = pickRandomItems(songs, 2)
    titles = ["", ""]
    covers = ["", ""]
    res.render('vote', {titles:titles, covers:covers});
});

app.post('/submitVote', (req, res) => {
    res.render('submitted')
});

const server = app.listen(7000, () => {
    console.log(`Express running → PORT ${server.address().port}`);
});



function pickRandomItems(arr, count) {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}