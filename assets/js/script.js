// Scripts initialisation de la page

// Empêcher le menu contextuel du clic droit
window.onload = function() {
    document.addEventListener("contextmenu", function(e){
      e.preventDefault();
    }, false);
};

//------------------------------------------------------------------------------------------------------------------------------------
                                                                                                // Index Variables globales

let cols;       // nombre de colonnes de la grille
let rows;       // nombre de lignes de la grille
let cells;      // nombre de cellules de la grille

let diff;       // difficulté de la partie
                //  * "easy"
                //  * "medium" 
                //  * "hard"

let diffRatio;
                
const diffArray = ["easy", "medium", "hard"]; // Array choix difficulté
const diffRatioArray = [0.1, 0.2, 0.3];

// Phrases de confirmation lors de la sélection d'un niveau de difficulté
const cPhrases = ["Difficulty level: EASY\nYou little coward baby!\nStill time to change your mind little pussy!",
                  "Difficulty level: MEDIUM\nAre you scared ?\nStill time to prove you're brave!\nClick CANCEL and select HARD !!",      
                  "Difficulty level: HARD\nKill it you crazy bastard!"];                

// Boutons sélection niveau de difficulté                  
const levbtns = "<button class='btn' style='width: 200px' id='easy'> - - EASY - - <br/>Don't push me too hard!" +
                "</button><button class='btn' style='width: 200px' id='medium'> - - MEDIUM - - <br/>I'm average shit</button>" +
                "<button class='btn' style='width: 200px' id='hard'> - - HARD - - <br/>Do me hardcore!</button>";  

var x = 0;
var y = 0;


//------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------GAME


// Lancement d'une partie via bouton
document.getElementById("new").addEventListener("click", function() {

            
    // Suppression ancienne grille
    document.getElementById("game").innerHTML = "";
    
    
    // Demnande taille grille
    cols = prompt('Set colums qty',16);
    rows = prompt('Set rows qty',16);
    cells = cols*rows;
    var gameArray = [];
    var bombArray = [];

    function populateArray (arr, cols, rows) {
        for (y = 0; y < cols; y++) {
            for (x = 0; x < rows; x++) {
                arr.push({
                    "x": x,
                    "y": y,
                    "val": 0,
                    "isBomb": false
                });                
            }    
        }
    }

    function setBombs(diffRatio) {
        var bombQty = Math.floor(cells*diffRatio);
        for (let j = 0; j < bombQty ; j++) {            
            index = Math.floor(Math.random()*256);
            if (gameArray[index].isBomb == true) {
                j--;
            } else {
                gameArray[index].isBomb = true;
                bombArray.push(gameArray[index]); 
            }
        }
        document.getElementById("mCounter").innerHTML = bombQty;
    }

    function getSurrounderIndex(index) {
        let xCoord = gameArray[index].x;
        let yCoord = gameArray[index].y;
        console.log(xCoord, yCoord);
        let obj = gameArray.find(obj => obj.x === (xCoord-1) && obj.y === (yCoord-1));
        let ind = gameArray.indexO-     aaqsqQQ
        f(obj);
        let surrounderArray = []
        surrounderArray.push(ind); 
        console.log(surrounderArray);
    }

    /*
    function calculatePoints () {        
        bombArray.forEach(element => {

            }
        });

    }

    function injectGrid () {

    }   
    */

    function askLevel() {

        // Injecte les boutons dans la balise level
        document.getElementById("level").innerHTML = levbtns;
        
        // Boucle dans l'array de difficulté
        for (let i = 0; i < 3; i++ ) {
            // Ajout écoute boutons
            document.getElementById(diffArray[i]).addEventListener("click", function() {
                // Au clic, demande confirmation
                if(confirm(cPhrases[i])) {    
                    // stocke niveau choisi
                    diff = diffArray[i];
                    diffRatio = diffRatioArray[i];
                    // Nettoye la balise level
                    document.getElementById("level").innerHTML = "";
                    // Créer l'array 
                    populateArray(gameArray, cols, rows);
                    // Mettre les mines
                    setBombs(diffRatio);                  
                    // Exécute fonction InjectGrid
                    //injectGrid();      
                    
                    getSurrounderIndex(39);
          
                };
            });
        }
    };

    askLevel();

    console.log(gameArray);

    console.log(bombArray);


});
