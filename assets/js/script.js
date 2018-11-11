                                                                                                // Scripts initialisation de la page

// Empêcher le menu contextuel du clic droit
window.onload = function() {
    document.addEventListener("contextmenu", function(e){
      e.preventDefault();
    }, false);
};


//-----------------------------------------------------------------------------------------------------------------------------------
                                                                                                // Index Variables globales

let cols;       // nombre de colonnes de la grille
let rows;       // nombre de lignes de la grille
let cells;      // nombre de cellules de la grille

let diff;       // difficulté de la partie
                //  * "easy"
                //  * "medium" 
                //  * "hard"
                
const diffArray = ["easy", "medium", "hard"]; // Array choix difficulté

// Phrases de confirmation lors de la sélection d'un niveau de difficulté
const cPhrases = ["Difficulty level: EASY\nYou little coward baby!\nStill time to change your mind little pussy!",
                  "Difficulty level: MEDIUM\nAre you scared ?\nStill time to prove you're brave!\nClick CANCEL and select HARD !!",      
                  "Difficulty level: HARD\nKill it you crazy bastard!"];                

// Boutons sélection niveau de difficulté                  
const levbtns = "<button class='btn' style='width: 200px' id='easy'> - - EASY - - <br/>Don't push me too hard!" +
                "</button><button class='btn' style='width: 200px' id='medium'> - - MEDIUM - - <br/>I'm average shit</button>" +
                "<button class='btn' style='width: 200px' id='hard'> - - HARD - - <br/>Do me hardcore!</button>";  
                
let yC;         // coordonnées Y pour boucle dans la grille
let xC;         // coordonnées X pour boucle dans la grille
//let coord;      // coordonnées concaténées x,y  
    

//------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------GAME


                                                                                                // 1. CHARGEMENT DE LA PARTIE

// Lancement d'une partie via bouton
document.getElementById("new").addEventListener("click", function() {

    console.log("testé");

    // Demnande taille grille
    cols = prompt('Set colums qty',16);
    rows = prompt('Set rows qty',16);
    cells = cols*rows;

                                                                                                // Définition fonction askLevel

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
                    // Nettoye la balise level
                    document.getElementById("level").innerHTML = "";
                    // Exécute fonction InjectGrid
                    injectGrid();                
                };
            });
        }
    };

                                                                                                // Définition fonction injectGrid

    function injectGrid() {
    
        // 1. injection des balises <div class="H" id="x, y"> dans la balise <game>   
        
        // Loop coordonnées Y
        for(yC = 0; yC < rows; yC++) {
            // Loop coordonnées X
            for (xC = 0; xC < cols; xC++) {                                
                // définition coordonnées ponctuelles
                let iCoord = xC + "," + yC;     
                // Injection
                document.getElementById("game").innerHTML += "<div class='H' id='" + iCoord + "'></div>";                                    
            };        
        }; 
    
        // Loop coordonnées Y
        for(yC = 0; yC < rows; yC++) {
            // Loope coordonnées X
            for (xC = 0; xC < cols; xC++) {                
                
                // Fonction anonyme 
                (function() {            
                    
                    // définition coordonnées ponctuelles
                    let xCoord = xC + "," + yC;
                    
                    // Ajout écoute clic gauche
                    document.getElementById(xCoord).addEventListener("click", function() {                                                  
                        
                        // Création variable classList de l'élément
                        let cls = document.getElementById(xCoord).classList;
                        
                        // Remplacement des classes
                        switch (true) {
                                case cls.contains('H') :
                                    cls.remove('H');
                                    cls.add('S');
                                    break;
                                case cls.contains('S') : 
                                    break;
                                case cls.contains('F') :
                                    cls.remove('F');
                                    cls.add('S');
                                    break;
                                case cls.contains('Q') :
                                    cls.remove('Q');
                                    cls.add('S');
                                    break;
                            }
                    });
                    
                    // Ajout écoute clic droit
                    document.getElementById(xCoord).addEventListener('contextmenu', function() {

                        // Création variable classList de l'élément
                        let cls = document.getElementById(xCoord).classList;
 
                        // Remplacement des classes
                        switch (true) {
                            case cls.contains('H') :
                                cls.remove('H');
                                cls.add('F');
                                break;
                            case cls.contains('S') : 
                                break;
                            case cls.contains('F') :
                                cls.remove('F');
                                cls.add('Q');
                                break;
                            case cls.contains('Q') :
                                cls.remove('Q');
                                cls.add('H');
                                break;
                        }
                    });
                })();


    var rClick = [];        
    var locClick;                

                     
        };
    }; 


        
        // Set grid CSS
        var style = "grid-template-columns: repeat(" + cols + ", minmax(40px, 1fr)); grid-template-rows: repeat(" + rows +", minmax(40px, 1fr))";
        document.getElementById("game").setAttribute("style", style);


        //Determine bombQty
        if(diff == "easy") {var diffRatio = 0.05} 
        else if (diff == "medium") {var diffRatio = 0.1}
        else {var diffRatio = 0.2}
        var bombQty = Math.floor(diffRatio*(cells))
        document.getElementById("mCounter").innerHTML = "<h2>Mines Left</h2> <p>" + bombQty + "</p>";


        //Init BOMBED array + counter
        var bombed = [];
        var n = 0;

        //Loop set BOMBS!!       
        while (n < bombQty) {
            //Calculate x + y
            var xBomb = Math.floor(Math.random() * cols);
            var yBomb = Math.floor(Math.random() * rows);
            //Format value
            var bCoord = xBomb + "," + yBomb;
            //Check not bombed already
            if (!bombed.includes(bCoord)) {          
                //Load coord. in bombed[]
                bombed.push(bCoord);
                //Set "X" value in grid
                document.getElementById(bCoord).classList.add("X");   
                document.getElementById(bCoord).innerHTML = "X";             
            } else {            
                //Round + 1 if no bomb set
                n--;
            };             
            //Incr. loop 
            n++;   
        };


    //Add points in clear cells
        // Scan x,y 
        for (yCoord = 0; yCoord < rows; yCoord++) {
            for (xCoord = 0; xCoord < cols; xCoord++) {
                //If no bomb, calculate points
                if(document.getElementById(xCoord + "," + yCoord).innerHTML != "X") {
                   //Calculate how many bombs around
                        
                    //Init neighbours var + array                                              
                    var xMinus = xCoord - 1;         
                    var xPlus = xCoord + 1;
                    var yMinus = yCoord - 1;
                    var yPlus = yCoord + 1;
                    var score = 0;
                    document.getElementById(xCoord + "," + yCoord).innerHTML = 0;
                    var nCoord;
                    var xM = 'undefined';
                    var xP = 'undefined';
                    var yM = 'undefined';
                    var yP = 'undefined';                    
                    if (xMinus >= 0) {var xM = xMinus;}                         
                    if (xPlus < cols) {var xP = xPlus;}                         
                    if (yMinus >= 0) {var yM = yMinus;}                        
                    if (yPlus < rows) {var yP = yPlus;} 
                        
                    //Add points to score
                    if(xM !== "undefined") {
                        nCoord = xM + "," + yCoord;                                                 
                        if(document.getElementById(nCoord).innerHTML =="X"){
                            score += 1;
                        };
                    };
                        
                    if(xM !== 'undefined' && yM !== 'undefined') {
                        nCoord = xM + "," + yM;                        
                        if(document.getElementById(nCoord).innerHTML =="X"){
                            score += 1;
                        }; 
                    };       
                        
                    if(xM !==  'undefined' && yP !== 'undefined') {
                        nCoord = xM + "," + yP;                        
                        if(document.getElementById(nCoord).innerHTML =="X"){
                            score += 1;
                        };
                    };

                    if(xP !== 'undefined') {
                        nCoord = xP + "," + yCoord;                        
                        if(document.getElementById(nCoord).innerHTML =="X"){
                            score += 1;
                        };
                    };

                    if (xP !== 'undefined' && yP !== 'undefined') {
                        nCoord = xP + "," + yP;                        
                        if(document.getElementById(nCoord).innerHTML =="X"){
                            score += 1;
                        };
                    };

                    if (xP !== 'undefined' && yM !== 'undefined') {
                        nCoord = xP + "," + yM;                        
                        if(document.getElementById(nCoord).innerHTML =="X"){
                            score += 1;
                        };
                    };                   
                        
                    if (yP !== 'undefined') {
                        nCoord = xCoord + "," + yP;
                        if(document.getElementById(nCoord).innerHTML =="X"){
                            score += 1;
                        };
                    };

                    if (yM !== 'undefined') {
                        nCoord = xCoord + "," + yM;
                        if(document.getElementById(nCoord).innerHTML =="X"){
                            score += 1;
                        };
                    };

                    //write score in cell
                    document.getElementById(xCoord + "," + yCoord).innerHTML = score;
                    document.getElementById(xCoord + "," + yCoord).classList.add(score);
                }; 
            };
        };
    };

    askLevel();



});



/*
     
        // 2. Injection de l'écoute sur les cellules de la grille


       
        // Loop coordonées Y        
        for(yC = 0; yC < rows; yC++) {
            //Loop coordonnées X
            for (xC = 0; xC < cols; xC++) {
                // fct° anonyme 
                (function() {            
                    // Assignation coordonées
                    coord = xC + "," + yC;

                    // Assignation écoute clic gauche 
                    document.getElementById(coord).addEventListener("click", function() {                          
                        // Modification style case
                        document.getElementById(coord).style.color = "black";
                        document.getElementById(coord).style.background = "grey";
                        });

                    // Assignation écoute clic droit
                    document.getElementById(coord).addEventListener('contextmenu', function() {
                        
                        // Fonction anonyme    
                        (function() { 
                            
                            if (locClick % 2 == 0) {

                                // Modification style de case
                                document.getElementById(coord).style.background = "pink";
                                document.getElementById(coord).style.color = "pink";

    
                                //--> REMPLACER DANS L'ARRAY 
    
    
                            } else {
                                document.getElementById(coord).style.backgroundImage = "radial-gradient(circle at center, rgb(187, 178, 178) 35%, grey)";
                                document.getElementById(coord).style.color = "rgb(165, 164, 164)";

                            }
    
                            return false;
                            })();
                    });                 
                })();                       
            };
        }; 
    
    
        //Set grid CSS (cols + rows)
        var width = cols * 40;
        var height = rows * 40;
        var style = "width: " + width + "px; height: " + height + "px; grid-template-columns: repeat(" + cols + ", minmax(40px, 1fr)); grid-template-rows: repeat(" + rows +", minmax(40px, 1fr))";
        document.getElementById("game").setAttribute("style", style);
    
    
         //Determine bombQty
        if(diff == "easy") {var diffRatio = 0.05} 
        else if (diff == "medium") {var diffRatio = 0.1}
        else {var diffRatio = 0.2}
        var bombQty = Math.floor(diffRatio*(cells))
        document.getElementById("mCounter").innerHTML = "<h2>Mines Left</h2> <p>" + bombQty + "</p>";

    
        //Init BOMBED array + counter
        var bombed = [];
        var n = 0;
    
        //Loop set BOMBS!!       
        while (n < bombQty) {
            //Calculate x + y
            var xBomb = Math.floor(Math.random() * cols);
            var yBomb = Math.floor(Math.random() * rows);
            //Format value
            var bCoord = xBomb + "," + yBomb;
            //Check not bombed already
            if (!bombed.includes(bCoord)) {          
                //Load coord. in bombed[]
                bombed.push(bCoord);
                // Injecte texte "X" aux cellules minées
                document.getElementById(bCoord).innerHTML = "X";
                // Injecte class="X" aux cellules minées
                document.getElementById(bCoord).classList.add("X");
                
            } else {            
                //Round + 1 if no bomb set
                n--;
            };             
            //Incr. loop 
            n++;   
        };
    
    
        //Add points in clear cells
            // Scan x,y 
            for (yC = 0; yC < rows; yC++) {
                for (xC = 0; xC < cols; xC++) {
                    //If no bomb, calculate points
                    if(document.getElementById(coord).innerHTML != "X") {
                       //Calculate how many bombs around
                            
                        //Init neighbours var + array                                              
                        var xMinus = xC - 1;         
                        var xPlus = xC + 1;
                        var yMinus = yC - 1;
                        var yPlus = yC + 1;
                        var score = 0;
                        document.getElementById(coord).innerHTML = 0;
                        var nCoord;
                        var xM = 'undefined';
                        var xP = 'undefined';
                        var yM = 'undefined';
                        var yP = 'undefined';                    
                        if (xMinus >= 0) {var xM = xMinus;}                         
                        if (xPlus < cols) {var xP = xPlus;}                         
                        if (yMinus >= 0) {var yM = yMinus;}                        
                        if (yPlus < rows) {var yP = yPlus;} 
                            
                        //Add points to score
                        if(xM !== "undefined") {
                            nCoord = xM + "," + yC;                                                 
                            if(document.getElementById(nCoord).innerHTML =="X"){
                                score += 1;
                            };
                        };
                            
                        if(xM !== 'undefined' && yM !== 'undefined') {
                            nCoord = xM + "," + yM;                        
                            if(document.getElementById(nCoord).innerHTML =="X"){
                                score += 1;
                            }; 
                        };       
                            
                        if(xM !==  'undefined' && yP !== 'undefined') {
                            nCoord = xM + "," + yP;                        
                            if(document.getElementById(nCoord).innerHTML =="X"){
                                score += 1;
                            };
                        };
    
                        if(xP !== 'undefined') {
                            nCoord = xP + "," + yC;                        
                            if(document.getElementById(nCoord).innerHTML =="X"){
                                score += 1;
                            };
                        };
    
                        if (xP !== 'undefined' && yP !== 'undefined') {
                            nCoord = xP + "," + yP;                        
                            if(document.getElementById(nCoord).innerHTML =="X"){
                                score += 1;
                            };
                        };
    
                        if (xP !== 'undefined' && yM !== 'undefined') {
                            nCoord = xP + "," + yM;                        
                            if(document.getElementById(nCoord).innerHTML =="X"){
                                score += 1;
                            };
                        };                   
                            
                        if (yP !== 'undefined') {
                            nCoord = xC + "," + yP;
                            if(document.getElementById(nCoord).innerHTML =="X"){
                                score += 1;
                            };
                        };
    
                        if (yM !== 'undefined') {
                            nCoord = xC + "," + yM;
                            if(document.getElementById(nCoord).innerHTML =="X"){
                                score += 1;
                            };
                        };
    
                        //write score in cell
                        document.getElementById(coord).innerHTML = score;
                        document.getElementById(coord).classList.add(score);
                    }; 
                };
            };
        };
    
    

                                                                                                // Appel fonction askLevel 

    askLevel();



});
*/














































   
   // Double boucle for process x + y 

    /*  var yCoord = 0, yCoord = 0;
            for (yCoord = 0; yCoord < 16; yCoord++) {
        
            for (xCoord = 0; xCoord < 16; xCoord++) {
               
            };
        };
    */

    //GENERATE DIVS

    /*  //Loop through Y
        for (var yC = 0; yC < 16; yC++) {
            //Loop through X
            for (var xC = 0; xC < 16; xC++) {
                //Format value
                var allC = xC + "," + yC;
                console.log("<div class='slot' id='" + allC + "'></div>");
        };
    };
    */


    //Clear grid
    //  document.getElementById("game").innerHTML = "";




 

