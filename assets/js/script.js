// Scripts initialisation de la page

// Empêcher le menu contextuel du clic droit
window.onload = function() {
    document.addEventListener("contextmenu", function(e){
      e.preventDefault();
    }, false);
};

//------------------------------------------------------------------------------------------------------------------------------------
                                                                                                // Index Variables globales

let cols = 0;       // nombre de colonnes de la grille
let rows = 0;       // nombre de lignes de la grille
let cells = 0;      // nombre de cellules de la grille


let diff;       // difficulté de la partie
                //  * "easy"
                //  * "medium" 
                //  * "hard"

let diffRatio;
                
const diffArray = ["easy", "medium", "hard"]; // Array choix difficulté
const diffRatioArray = [0.0, 0.1, 0.2];

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

var gameArray = [];
var bombArray = [];        
var bombQty = 0;
var animArray = []


function populateArray (arr, cols, rows) {
    let ref = 0;
    for (y = 0; y < rows; y++) {
        for (x = 0; x < cols; x++) {
            arr.push({
                "x": x,
                "y": y,
                "val": 0,
                "status": "H",
                "isBomb": false,
                "ref": ref,
                "listen" : false
            });  
            ref++;              
        }    
    }
}


function setBombs(diffRatio) {
    for (let j = 0; j < bombQty ; j++) {            
        index = Math.floor(Math.random()*cells);
        if (gameArray[index].isBomb == true) {
            j--;
        } else {
            gameArray[index].isBomb = true;
            gameArray[index].val = undefined;
            bombArray.push(gameArray[index]); 
            var filtSurr = getSurrounderIndex(index);
            var filtArrLen = filtSurr.length;
            for (let k = 0; k < filtArrLen; k++) {
                if (!gameArray[filtSurr[k]].isBomb) {
                    gameArray[filtSurr[k]].val += 1;
                }
            };
        }
    }
    document.getElementById("mCounter").innerHTML = bombQty;
}


function injectGrid() {
    for (let id = 0; id < cells; id++) {
        var div = document.createElement("div");
        var game = document.getElementById("game");
        game.appendChild(div);       
        div.id = "id" + id;
        div.classList.add("H");      
        let divid = "id" + id;
        let slot = document.getElementById(divid)
        if (!gameArray[id].val == 0) {
            slot.innerHTML = gameArray[id].val;            
            if (gameArray[id].val == 1) {
                slot.classList.add('one');
            } else if (gameArray[id].val == 2) {
                slot.classList.add('two');
            } else if (gameArray[id].val == 3) {
                slot.classList.add('three');
            } else if (gameArray[id].val == 4) {
                slot.classList.add('four');
            } else if (gameArray[id].val == 5) {
                slot.classList.add('five');
            } else if (gameArray[id].val == 6) {
                slot.classList.add('six');
            };            
        } else if (gameArray[id].isBomb) {
            slot.innerHTML = "X" ;
        } ;
        lClick(divid, id);        
        rClick (divid, id);
    }
}       


function setGridCSS() {   
    //Set grid CSS (cols + rows)
    var width = cols * 40;
    var height = rows * 40;
    var style = "width: " + width + "px; height: " + height + "px; grid-template-columns: repeat(" + cols + ", minmax(40px, 1fr)); grid-template-rows: repeat(" + rows +", minmax(40px, 1fr))";
    document.getElementById("game").setAttribute("style", style);
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

//let div = document.createElement("div");
//div.id = "level";


function start() {

    gameArray = [];
    bombArray = [];        

    let div = document.createElement("div");
    let body = document.body;
    body.appendChild(div);       
    div.id = "level";

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
                bombQty = Math.floor(cells*diffRatio);
                // Nettoye la balise level
                document.getElementById("level").remove();
                // Créer l'array 
                populateArray(gameArray, cols, rows);
                // Mettre les mines
                setBombs(diffRatio);    
                // Exécute fonction InjectGrid
                injectGrid();      
                // Exécute fct setGridCSS
                setGridCSS();        
                anime();

            };
        });
    }
};

function addMouseListening() {
    for (let i = 0; i < cells; i++) {
        gameArray[i].listen = true;
    }  
}

function lClick(divid, idx) {    
    let cls = document.getElementById(divid).classList;
    document.getElementById(divid).addEventListener("click", function () { 
        if(gameArray[idx].listen && !cls.contains('F') && !cls.contains('Q')) {            
            if (gameArray[idx].isBomb) {  
                let audio = new Audio();
                audio.src = "./assets/sounds/explode.wav";
                audio.play();              
                for (let k = 0; k < bombArray.length ; k++) {                    
                    let divid1 = "id"+ bombArray[k].ref;                    
                    if (divid1 !== divid && !document.getElementById(divid1).classList.contains('F')) {
                        document.getElementById(divid1).classList.add('X2');
                        document.getElementById(divid1).classList.remove('H');
                        document.getElementById(divid1).classList.remove('F');
                        document.getElementById(divid1).classList.remove('Q');
                    } else if (divid1 !== divid && document.getElementById(divid1).classList.contains('F')) {
                        document.getElementById(divid1).classList.add('X4');
                        document.getElementById(divid1).classList.remove('H');
                        document.getElementById(divid1).classList.remove('F');
                        document.getElementById(divid1).classList.remove('Q');
                    }
                }                         
                cls.add('X3')
                cls.remove('H');
                cls.remove('F');
                cls.remove('Q'); 
                for (let l = 0; l < cells; l++) {
                    gameArray[l].listen = false; 
                }
            } else if (gameArray[idx].val == 0) {
                let divid = "id" + idx
                cls.add('S');
                cls.remove('H');
                cls.remove('F');
                cls.remove('Q');  
                gameArray[idx].status = "S";               
                removeZeros(idx);
            } else {
                let divid = "id" + idx
                cls.add('S');
                cls.remove('H');
                cls.remove('F');
                cls.remove('Q');
                gameArray[idx].status = "S";  
                document.getElementById(divid).innerHTML = gameArray[idx].val;
            }
        } else if (gameArray[idx].listen && cls.contains('Q')) {
            cls.remove('Q');
            cls.add('H');
            gameArray[idx].status = "H";  
            if (gameArray[idx].val !== 0) {
                var txt = gameArray[idx].val;
            } else {
                    var txt = "";
            }                    
            document.getElementById(divid).innerHTML = txt; 
        }
    });    
}



function rClick (divid, id) {

    let audio = new Audio();
    audio.src = "./assets/sounds/flagged.wav";

    document.getElementById(divid).addEventListener('contextmenu', function() {

        if(gameArray[id].listen) {

            // Création variable classList de l'élément

            let cls = document.getElementById(divid).classList;   
            
            // Remplacement des classes

            switch (true) {

                case cls.contains('H') :
                    cls.remove('H');
                    cls.add('F');

                    audio.play();
                    bombQty -=1;
                    document.getElementById("mCounter").innerHTML = bombQty;
                    gameArray[id].status = "F";                
                    


                    var testwin = true

                    for (let i = 0; i < bombArray.length; i++) {
                        if (gameArray[bombArray[i].ref].isBomb && !(gameArray[bombArray[i].ref].status == 'F')) {
    
                            testwin = false;
                        }
                    }

                    if(bombQty == 0 && testwin) {

                        alert('Good job motherfucker!');


                    // WIN HERE    

                    }
                    break;

                case cls.contains('S') : 
                    break;

                case cls.contains('F') :
                    cls.remove('F');
                    cls.add('Q');
                    bombQty +=1;
                    document.getElementById("mCounter").innerHTML = bombQty;
                    gameArray[id].status = "Q";  
                    document.getElementById(divid).innerHTML = "?"; 
                    break;

                case cls.contains('Q') :
                    cls.remove('Q');
                    cls.add('H');
                    gameArray[id].status = "H";  

                    if (gameArray[id].val !== 0) {
                        var txt = gameArray[id].val;
                    } else {
                            var txt = "";
                    }                    

                    document.getElementById(divid).innerHTML = txt;                    
                    break;
            }
        }
    });   
}


function removeZeros(idx) {
    var filtsurr = getSurrounderIndex(idx)
    for (let i = 0; i < filtsurr.length; i++) {
        if (gameArray[filtsurr[i]].status !== 'S' && gameArray[filtsurr[i]].val == 0) {            
            gameArray[filtsurr[i]].status = 'S';            
            let divid = 'id' + gameArray[filtsurr[i]].ref            
            document.getElementById(divid).classList.add('S');
            document.getElementById(divid).classList.remove('H');
            document.getElementById(divid).classList.remove('F');
            document.getElementById(divid).classList.remove('Q');
            document.getElementById(divid).innerHTML = "";            
            removeZeros(gameArray[filtsurr[i]].ref);
        } else if (gameArray[filtsurr[i]].status !== 'S' && gameArray[filtsurr[i]].val !== undefined) {            
            let divid = 'id' + gameArray[filtsurr[i]].ref            
            document.getElementById(divid).classList.add('S');
            document.getElementById(divid).classList.remove('H');
            document.getElementById(divid).classList.remove('F');
            document.getElementById(divid).classList.remove('Q');
            document.getElementById(divid).innerHTML = gameArray[filtsurr[i]].val
        }
    }
}

var alt = true;
var lo = 10

function anime() {
    let len = animArray.length;
    let id = Math.floor(Math.random()*len)    
    let divid = "id" + animArray[id];
    animArray.splice(id, 1);
    if (len > 0) {
        if (alt) {
            document.getElementById(divid).classList.add('animLeft');
            alt =!alt;            
            setTimeout (function () {               
                anime();
            }, 1);
            //}, (Math.log(lo)*1.5));
            lo+=10
        }           
        else {
            document.getElementById(divid).classList.add('animRight');
            alt =!alt;
            setTimeout (function () {               
                anime();
            }, 1);
            //}, (Math.log(lo)*3));
            lo+=10
        }
    } else {
        setTimeout (function() {
            addMouseListening();
        }, 1000);            
    }          
}  





//------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------GAME
var testout = 0;

// Lancement d'une partie via bouton START
document.getElementById("new").addEventListener("click", function() {
    
    if (testout > 0) {
  


        // Création array des index 
        let spiralArray = []
        let n = cols - 1;
        let p = rows - 1;
        let sIndex = 0;
        cols = parseInt(cols);
        rows = parseInt(rows);
        let nn = n;
        for (sIndex; sIndex <= n ; sIndex ++) {
            spiralArray.push(sIndex);
        }
        sIndex -= 1;
        while (nn >= 1) {    
            for (let z = p; z > 0; z--) {
                sIndex += cols;
                spiralArray.push(sIndex);
            }
            p -= 1;
            for (let z = n; z > 0; z--) {
                sIndex -= 1;
                spiralArray.push(sIndex);
            }
            n -= 1;
            for (let z = p; z > 0; z--) {
                sIndex -= cols;
                spiralArray.push(sIndex);
            }
            p -= 1;
            for (let z = n; z > 0; z--) {
                sIndex += 1;
                spiralArray.push(sIndex);
            }
            n -= 1;
            nn -= 2
        }

        for (let i = 0; i < cells; i++) {
            gameArray[i].listen = false;
        }


    function cleangrid() {
    
        document.getElementById("game").innerHTML = "";

    }


    let proof = 0
    let sIdx = 0;
    let len = spiralArray.length;   
    let lastdivid = "id" + spiralArray[len-1];  

    function spiral () {
        //


        let divid = "id" + spiralArray[0];   
        let lastdivid = "id" + spiralArray[len-1];  
        spiralArray[0] 
        

        proof++;
        document.getElementById(divid).classList.add('goAway');
        
        spiralArray.shift();

        //document.getElementById(lastdivid).classList.add('X3')

        sIdx++;

        if (sIdx < len) {
            setTimeout( function() {                 
                spiral();
                setTimeout(function() {
                    //console.log(divid)
                    document.getElementById(divid).innerHTML = "";
                    document.getElementById(divid).classList.remove('H');
                    document.getElementById(divid).classList.remove('S');
                    document.getElementById(divid).classList.remove('F');
                    document.getElementById(divid).classList.remove('Q');
                    document.getElementById(divid).classList.remove('X2');
                    document.getElementById(divid).classList.remove('X3');
                    document.getElementById(divid).classList.remove('X4');
                    document.getElementById(divid).classList.remove('explode');
                    document.getElementById(divid).classList.remove('animRight');
                    document.getElementById(divid).classList.remove('animLeft');
                    document.getElementById(divid).classList.remove('goAway');
                    document.getElementById(divid).classList.add('hidden');


        
                }, 900);   
            }, 3);
        } else {
            setTimeout( function() {
                cleangrid()
            }, 900);
        }
    }

    spiral();
   
    }
  
    
    // Demande taille grille
    cols = prompt('Set colums qty',16);
    rows = prompt('Set rows qty',16);
    cells = cols*rows;
    for (let i = 0; i < cells; i++) {
        animArray.push(i)
    }

    // Demande niveau difficulté et chargement grille
    start();

    testout +=1 ;

});
