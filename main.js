const TicTacToe = (function () {
    const board = {1:" ",2:" ",3:" ",
                   4:" ",5:" ",6:" ",
                   7:" ",8:" ",9:" "};

    function makeplay(space) {
        if (board[space] !== " ") {
            printboard();
            console.log("Invalid Move");
            return {playsuccess:false, gameoutput:"Invalid Move"};
        } 
        board[space] = "X";
        printboard();
        return {playsuccess:true, gameoutput:""};
    }

    function clearboard() {
        for (space in board) {
            board[space] = " ";
        }
    }

    function printboard() {
        console.log(" " + board[1] + " | " + board[2] + " | " + board[3] + "\n"
                  + "-----------\n "
                  + board[4] + " | " + board[5] + " | " + board[6] + "\n"
                  + "-----------\n "
                  + board[7] + " | " + board[8] + " | " + board[9])
    }

    function botplay(){
        let spacesleft = [];
        for (space in board){
            if (board[space] === " "){
                spacesleft.push(space);
            }
        }
        let choice = Math.floor(spacesleft.length*Math.random());
        let randomspace = spacesleft[choice];
        board[randomspace] = "O";
        printboard();
        return randomspace;
    }

    function detectstate() {
        const combos = ["123","456","789","147","258","369","159","357"];
        let win = false;
        let playerwin=false;
        for (line of combos) {
            win = win || ((board[line[0]] === board[line[1]] && 
                           board[line[1]] === board[line[2]] && 
                           board[line[0]] === board[line[2]])
                      && !([board[line[0]],board[line[1]],board[line[2]]].includes(" ")));
            if (win){
                playerwin = playerwin || board[line[0]]==="X";
                break;
            }
        }
        let movesavailable = false;
        for (space in board){
            if (board[space] === " ") {
                movesavailable = true;
            }
        }
        let outcome = win ? (playerwin ? "Player wins." : "Bot wins.") : 
                            (movesavailable ? "Move available." : "Draw.");

        console.log(outcome);
        return outcome;
    }
    return {makeplay, printboard, detectstate, botplay, clearboard};
})();

const domgame = (function () {
    const ngbutton = document.querySelector("button");
    const spacenodes = document.querySelectorAll(".gameboard div");
    const outputelem = document.querySelector("#gameoutput");
    let gamestate = "Move available.";

    spacenodes.forEach((space) => {
        space.addEventListener("click", () => {
            if (gamestate==="Move available.")
                playerupdatespace(space);
                gamestate = TicTacToe.detectstate();
                if (gamestate==="Move available."){
                    botupdatespace();   
                }
                outputelem.innerHTML=gamestate;
        });
    });

    ngbutton.addEventListener("click", () => {
        TicTacToe.clearboard();
        gamestate="Move available.";
        spacenodes.forEach((space) => {
            space.innerHTML='';
        })
        outputelem.innerHTML='';
    })

    function playerupdatespace(space) {
        let {playsuccess, gameoutput}=TicTacToe.makeplay(space.id);
        if (playsuccess) {
            space.innerHTML="X";
        }
        outputelem.innerHTML=gameoutput;
    }

    function botupdatespace(){
        let space = TicTacToe.botplay()-1;
        spacenodes[space].innerHTML="O";
        gamestate=TicTacToe.detectstate();
    }

})();