// Importing the module 
const express=require("express") 

// Creating express Router 
const router=express.Router() 


var games = {games:[]}


class RPS {
    //create an appriopriate constructor
    constructor() {
        this.moves = [];
        this.players = [];
    }
    // Add a player to the game
    addPlayer(player) {
        this.players.push(player);
    }
    // Make a move
    makeMove(player, move) {
        this.moves.push({player: player, move: move});
    }
    // Check if the game is over
    isGameOver() {
        return this.moves.length >= 2;
    }
    // Get the winner
    getWinner() {
        const move1 = this.moves[0].move;
        const move2 = this.moves[1].move;
        if (move1 === move2) {
            return "draw";
        } else if (move1 === "rock" && move2 === "scissors") {
            return this.moves[0].player;
        } else if (move1 === "rock" && move2 === "paper") {
            return this.moves[1].player;
        } else if (move1 === "scissors" && move2 === "rock") {
            return this.moves[1].player;
        } else if (move1 === "scissors" && move2 === "paper") {
            return this.moves[0].player;
        } else if (move1 === "paper" && move2 === "rock") {
            return this.moves[0].player;
        } else if (move1 === "paper" && move2 === "scissors") {
            return this.moves[1].player;
        }
    }
}

// Handling login request 
router.get("/login",(req,res,next)=>{ 
res.send("This is the login request\n") 
}) 

router.get('/', (req, res) => {
    res.send('Hello, World!\n');
});

//create new game 
//Generate new game ID and set player 1 to 
//be player of name "name" from request
router.post('/games', (req, res) => {
    const {name}= req.body;
    if (name !== '') {
        const id = "id" + Math.random().toString(16).slice(2);
        games = {...games, name : {"player1" : name}};
        games = {games: [...(games.games), {id:id, players: [name]}]}
        res.status(201).send(`Game created with ID: ${id} and player ${name}\n`);
    }
    else {
        res.status(404).send('Request failed\n');
    }
    const object = { a: 1, b: 2, c: 3 };
    for (const game in object) {
        console.log(`${game}`);
    }
});


// Return state of the game.
router.get('/games/:id', (req, res) => {
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
router.patch('/games/:id/join', (req,res) => {
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

router.post('/games/:id/move', (req, res) => {
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

module.exports=router
