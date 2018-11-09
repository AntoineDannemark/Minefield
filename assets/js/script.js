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



// 1. CHARGEMENT DE LA PARTIE

//launch @ click "new game"
document.getElementById("new").addEventListener("click", function() {

    //Clear grid
    document.getElementById("game").innerHTML = "";

    //Ask grid size 
    var cols = prompt('Set colums qty');
    var rows = prompt('Set rows qty');
    var cells = cols*rows;
    var diff;
        
        //Ask difficulty level 
        function askLevel() {

            document.getElementById("level").innerHTML = "<button style='width: 200px' id='easy'>Don't push me too hard!</button><button style='width: 200px' id='medium'>I'm average player</button><button style='width: 200px' id='hard'>Do me hardcore!</button>";                        

            document.getElementById("easy").addEventListener("click", function() {
                diff = "easy";
                alert(diff + "? You little coward baby!");
                document.getElementById("level").innerHTML = "";
                injectGrid();
            });
            document.getElementById("medium").addEventListener("click", function() {
                diff = "medium";
                alert(diff + "? Are you scared ?");
                document.getElementById("level").innerHTML = "";
                injectGrid();
            });
            document.getElementById("hard").addEventListener("click", function() {
                diff = "hard";
                alert(diff + "? Kill it you crazy bastard!");
                document.getElementById("level").innerHTML = "";
                injectGrid();
            });
        };




        function injectGrid() {

    //Inject grid    
    for(var yC = 0; yC < rows; yC++) {
        for (var xC = 0; xC < cols; xC++) {    
            document.getElementById("game").innerHTML += "<div class='slot' id='" + xC + "," + yC + "'></div>";
        };
    };    

    //Set grid CSS (cols + rows)
    var width = cols * 20;
    var height = rows * 20;
    var style = "width: " + width + "px; height: " + height + "px; grid-template-columns: repeat(" + cols + ", 1fr); grid-template-rows: repeat(" + rows +", 1fr)";
    document.getElementById("game").setAttribute("style", style);

    //Determine bombQty
    if(diff == "easy") {var diffRatio = 0.1} 
    else if (diff == "medium") {var diffRatio = 0.2}
    else {var diffRatio = 0.3}
    var bombQty = Math.floor(diffRatio*(cells))
    console.log(bombQty);

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
                }; 
            };
        };
    };


askLevel();


});


