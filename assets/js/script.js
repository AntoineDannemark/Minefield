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
                getSurrounderIndex(index)
                var filtSurr = getSurrounderIndex(index);
                var filtArrLen = filtSurr.length;
                for (let j = 0; j < filtArrLen; j++) {
                    gameArray[filtSurr[j]].val += 1;
                };
            }
        }
        document.getElementById("mCounter").innerHTML = bombQty;
    }

    function getSurrounderIndex(index) {
        let xCoord = gameArray[index].x;
        let yCoord = gameArray[index].y;
        let surrounderArray = []
        let obj1 = gameArray.find(obj => obj.x === (xCoord-1) && obj.y === (yCoord-1));
        let obj2 = gameArray.find(obj => obj.x === xCoord && obj.y === (yCoord-1));
        let obj3 = gameArray.find(obj => obj.x === (xCoord+1) && obj.y === (yCoord-1));
        let obj4 = gameArray.find(obj => obj.x === (xCoord+1) && obj.y === yCoord);
        let obj5 = gameArray.find(obj => obj.x === (xCoord+1) && obj.y === (yCoord+1));
        let obj6 = gameArray.find(obj => obj.x === xCoord && obj.y === (yCoord+1));
        let obj7 = gameArray.find(obj => obj.x === (xCoord-1) && obj.y === (yCoord+1));
        let obj8 = gameArray.find(obj => obj.x === (xCoord-1) && obj.y === yCoord);
        let ind1 = gameArray.indexOf(obj1);
        let ind2 = gameArray.indexOf(obj2);
        let ind3 = gameArray.indexOf(obj3);
        let ind4 = gameArray.indexOf(obj4);
        let ind5 = gameArray.indexOf(obj5);
        let ind6 = gameArray.indexOf(obj6);
        let ind7 = gameArray.indexOf(obj7);
        let ind8 = gameArray.indexOf(obj8);
        surrounderArray.push(ind1);
        surrounderArray.push(ind2);
        surrounderArray.push(ind3);
        surrounderArray.push(ind4);
        surrounderArray.push(ind5);
        surrounderArray.push(ind6);
        surrounderArray.push(ind7);
        surrounderArray.push(ind8);
        //Enlever les -1(coord hors grille)
        var filtSurr = surrounderArray.filter(function(element) {
            return element !== -1;
        });
        return filtSurr;
    }

    /*
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

          
                };
            });
        }
    };

    askLevel();

    console.log(gameArray);

    console.log(bombArray);


});
