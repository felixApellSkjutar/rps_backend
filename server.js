import {app} from "index.mjs";

// const express = require('express');
// const app = express();
// const PORT = process.env.PORT || 8080;

// const bodyParser = require('body-parser');



// // Body-parser middleware
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json())

// const cors = require('cors');
// app.use(cors());

// const morgan = require('morgan');
// app.use(morgan('dev'));


var games = {games:[]}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

//create new game 
//Generate new game ID and set player 1 to 
//be player of name "name" from request
app.post('/games', (req, res) => {
    const name = req.body.name;
    console.log(name)
    if (name !== '') {
        const id = "id" + Math.random().toString(16).slice(2);
        games = {...games, name : {"player1" : name}};
        games = {games: [...(games.games), {id:id, players: [name]}]}
        res.status(201).send(`Game created with ID: ${id} and player ${name}\n`);
    }
    else {
        res.status(404).send('Request failed\n');
    }
    console.log(games)
});


// Return state of the game.
app.get('/games/:id', (req, res) => {
    const gameId = req.params.id;
    game = games.games.find(p => p.id === gameId);
    if (game !== undefined) {
        if (game.moves && game.moves.length() == 2) {
            res.status(201).send(`This game is called ${gameId}\nPlayers: ${game.players}\nWinner: winner`);
        }
        res.status(201).send(`DONE:This game is called ${gameId}\nPlayers: ${game.players}`);
    } else {
        res.status(501).send(`Could not find game with id: ${gameId}`);
    }
});


// Player joins game (if existing)
app.patch('/games/:id/join', (req,res) => {
    const gameId = req.params.id;
    const name = req.body.name;

    const game = games.games.find(p => p.id === gameId);
    if (game !== undefined) {
        game.players = [...(game.players), name];
        res.status(201).send(`player ${name} successfully joined game ${gameId}`);
    } else {
        res.status(501).send(`could not find game ${gameId}`);
    }
});

app.post('/games/:id/move', (req, res) => {
    const gameId = req.params.id;
    const name = req.body.name;
    const move = req.body.move;

    const game = games.games.find(p => p.id === gameId);
    if (game !== undefined) {
        if (game.moves) {
            game.moves = [...(game.moves), {"name":name, "move":move}];
        } else {
            game.moves = [{"name":name, "move":move}];
        }
        res.status(201).send(`Player: ${name} makes move: ${move}`);
    } else {
        res.status(501).send(`Could not make move: ${move}`);
    }
});
