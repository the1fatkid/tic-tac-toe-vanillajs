const board= document.querySelector(".board");
const squares = document.querySelectorAll(".square");
const gameStatus= document.querySelector(".status");
const reset= document.getElementById("reset");
const gameOver= document.querySelector(".gameOver");

let isXnext= true;
let gameBoard=Array(9).fill(null);

function winner(){
    const lines=[
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    for(let i=0; i<lines.length; i++){
        let [a,b,c]= lines[i];
        if(gameBoard[a]==gameBoard[b] && gameBoard[a]==gameBoard[c] && gameBoard[a]){
            return [gameBoard[a] ,a,b,c]; //it will return either 'X' or 'O'
        }
    }
    return null;
}

function isBoardFull(){
    for(let i=0; i<gameBoard.length; i++){
        if(gameBoard[i]==null){
            return false;
        }
    }
    return true;
}

board.addEventListener("click", (event)=>{
    console.log(event.target);
    console.log(event.target.id);
    // let squareClicked= document.getElementById(event.target.id);
    let squareClicked=event.target;

    // console.log(typeof squareClicked.innerText);//empty string
    if(squareClicked.innerText=="" && !winner()){
        if(isXnext){
            squareClicked.innerText="X"; 
            //event.target.id gives you the id of the button clicked which is also same as the index of that particular button's value stored in the gameBoard array
            gameBoard[event.target.id]="X";
        }else{
            squareClicked.innerText="O";  
            gameBoard[event.target.id]="O";
        }
        isXnext= !isXnext;

        if(winner()){// if winner() does not return a null value
            gameStatus.innerText=`Winner is: ${winner()[0]}`;

            //Adding the "Game Over" text
            // let gameOver= document.createElement("span");
            // gameOver.innerText="GAME OVER!!!";
            // gameOver.classList.add("gameOver");
            // gameStatus.append(gameOver);
            gameOver.style.visibility= "visible";
           
            //Making the winning line text pink
            let box1= document.getElementById(winner()[1]);
            let box2= document.getElementById(winner()[2]);
            let box3= document.getElementById(winner()[3]);
            box1.classList.add("pink");
            box2.classList.add("pink");
            box3.classList.add("pink");
        }
        else {// if winner() returns a null value
            if(isBoardFull()){
                gameStatus.innerText="It's a tie!!";
            }else{
                gameStatus.innerText=`Next Player Up: ${isXnext?'X': 'O'}`;
            }
            
        }
        
    }  
})

reset.addEventListener('click', ()=>{
    gameBoard=Array(9).fill(null);
    for(let i=0; i< 9; i++){
        let sq= document.getElementById(i);
        sq.innerText= null;
        sq.classList.remove('pink');
    }
    isXnext= true;
    gameStatus.innerText="Start Playing";
    gameOver.style.visibility= "hidden";
})

/*
NOTE: We could have added event listeners separately on all the buttons as well
squares.forEach((square)=>{
    square.addEventListener('click', (evt)=>{
        console.log(evt.target.id);
        let sqClicked=evt.target;
        sqClicked.innerText="B"
    })
})
*/    