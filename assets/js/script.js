    // Double boucle for process x + y 

    /*  var xCoord = 0, yCoord = 0;
            for (xCoord = 0; xCoord < 16; xCoord++) {
        
            for (yCoord = 0; yCoord < 16; yCoord++) {
                return xCoord 
            };
        };
    */



// 1. CHARGEMENT DE LA PARTIE

//launch @ click "new game"
document.getElementById("new").addEventListener("click", function () {

    //Loop Reset Grid
        //Loop through X
        for (var yCoord = 0; yCoord < 16; yCoord++) {
            //Loop through Y
            for (var xCoord = 0; xCoord < 16; xCoord++) {
                //Format value
                var allCoord = xCoord + "," + yCoord;
                //Reset
                document.getElementById(allCoord).innerHTML = "";
                };
        };


    //Init BOMBED array + counter
    var bombed = [];
    var n = 0;

    //Loop set 65 BOMBS!!       
    while (n < 65) {

        //Calculate x + y
        var xBomb = Math.floor(Math.random() * 16);
        var yBomb = Math.floor(Math.random() * 16);

        //Format value
        var bCoord = xBomb + "," + yBomb;

        //Check not bombed already
        if (!bombed.includes(bCoord)) {          

            //Load coord. in bombed[]
            bombed.push(bCoord);

            //Init neighbours var + array
           /* 
            var xBombM = undefined;
            var xBombP = undefined;
            var yBombM = undefined;
            var yBombP = undefined;

            console.log("x bomb" + (xBomb - 1));

            if ((xBomb - 1) >= 0) {
                xBombM = parseInt(xBomb - 1);
            } else {console.log('err1')}; 
            if ((xBomb + 1) < 16) {
                xBombP = parseInt(xBomb + 1);
            } else {console.log('err2')}; 
            if ((yBomb - 1) >= 0) {
                yBombM = yBomb - 1;
            } else {console.log('err3')}; 
            if ((yBomb + 1) < 16) {
                yBombP = yBomb + 1; 
            } else {console.log('err4')};
            
            


            var nArray = [];
            var nCoord;

            if (xBombM) {
                nCoord = xBombM + "," + yBomb;
                var nObj = {coord: nCoord, value: 0};
                nArray.push(nObj);
            };

            if (xBombM && yBombM) {
                var nCoord = xBombM + "," + yBombM;
                var nObj = {coord: nCoord, value: 0};
                nArray.push(nObj);
            };

            if (xBombM && yBombP) {
                var nCoord = xBombM + "," + yBombP;
                var nObj = {coord: nCoord, value: 0};
                nArray.push(nObj);
            };

            if (xBombP) {
                var nCoord = xBombP + "," + yBomb;
                var nObj = {coord: nCoord, value: 0};
                nArray.push(nObj);
            };

            if (xBombP && yBombP) {
                var nCoord = xBombP + "," + yBombP;
                var nObj = {coord: nCoord, value: 0};
                nArray.push(nObj);
            }

            if (xBombP && yBombM) {
                var nCoord = xBombP + "," + yBombM;
                var nObj = {coord: nCoord, value: 0};
                nArray.push(nObj);
            }
            
            if (yBombP) {
                var nCoord = xBomb + "," + yBombP;
                var nObj = {coord: nCoord, value: 0};
                nArray.push(nObj);
            }

            if (yBombM) {
                var nCoord = xBomb + "," + yBombM;
                var nObj = {coord: nCoord, value: 0};
                nArray.push(nObj);
            }

*/

            //Research and (destroy) set "X" value in grid
            document.getElementById(bCoord).innerHTML = "X";

        } else {
            // décompte un tour si pas de X placé
            n--;
        };             

        //Incr. loop 
        n++;   
    };


    // ADD POINTS IN CLEAR CELLS

    // Scan x,y 
        for (yCoord = 0; yCoord < 16; yCoord++) {
            for (xCoord = 0; xCoord < 16; xCoord++) {

                //If no bomb, calculate points
                if(document.getElementById(xCoord + "," + yCoord).innerHTML != "X") {

                   //Calculate how many bombs around

                        //Init neighbours var + array                 
                             
                        var xMinus = xCoord - 1;
                        //console.log(xM);
                        var xPlus = xCoord + 1;
                        var yMinus = yCoord - 1;
                        var yPlus = yCoord + 1;
                        var score = 0;
                        document.getElementById(xCoord + "," + yCoord).innerHTML = 0;
                        var nCoord;
                                 
                        if (xMinus >= 0) {
                            var xM = xMinus;
                            //console.log(xMinus);
                        } //else {console.log('err1')}; 
                        
                        if (xPlus < 16) {
                            var xP = xPlus;
                            //console.log(xPlus);
                        } //else {console.log('err2')}; 
                        
                        if (yMinus >= 0) {
                            var yM = yMinus;
                            //console.log(yMinus);
                        } //else {console.log('err3')}; 
                       
                        if (yPlus < 16) {
                            var yP = yPlus; 
                            //console.log(yPlus);
                        } //else {console.log('err4')};
                        
                        

                        if(xM) {
                            nCoord = xM + "," + yCoord;                      
                            if(document.getElementById(nCoord).innerHTML =="X"){
                                score += 1;
                                console.log("                            1_" + xCoord + "," + yCoord + " " + score + " from " + nCoord)
                            };
                        };

                        if(xM && yM) {
                            nCoord = xM + "," + yM;                        
                            if(document.getElementById(nCoord).innerHTML =="X"){
                                score += 1;
                                console.log("                            2_" + xCoord + "," + yCoord + " " + score + " from " + nCoord)
                            }; 
                        };       
                        
                        if (xM && yP) {
                            nCoord = xM + "," + yP;                        
                            if(document.getElementById(nCoord).innerHTML =="X"){
                                score += 1;
                                console.log("                            3_" + xCoord + "," + yCoord + " " + score + " from " + nCoord)
                            };
                        };

                        if (xP) {
                            nCoord = xP + "," + yCoord;                        
                            if(document.getElementById(nCoord).innerHTML =="X"){
                                score += 1;
                                console.log("                            4_" + xCoord + "," + yCoord + " " + score + " from " + nCoord)
                            };
                        };

                        if (xP && yP) {
                            nCoord = xP + "," + yP;                        
                            if(document.getElementById(nCoord).innerHTML =="X"){
                                score += 1;
                                console.log("                            5_" + xCoord + "," + yCoord + " " + score + " from " + nCoord)
                            };
                        };

                        if (xP && yM) {
                            nCoord = xP + "," + yM;                        
                            if(document.getElementById(nCoord).innerHTML =="X"){
                                score += 1;
                                console.log("                            6_" + xCoord + "," + yCoord + " " + score + " from " + nCoord)
                            };
                        };                   
                        
                        if (yP) {
                            nCoord = xCoord + "," + yP;
                            if(document.getElementById(nCoord).innerHTML =="X"){
                                score += 1;
                                console.log("                            7_" + xCoord + "," + yCoord + " " + score + " from " + nCoord)
                            };
                        };

                        if (yM) {
                            nCoord = xCoord + "," + yM;
                            if(document.getElementById(nCoord).innerHTML =="X"){
                                score += 1;
                                console.log("                            8_" + xCoord + "," + yCoord + " " + score + " from " + nCoord)
                            };

                       
                        
                    };

                        document.getElementById(xCoord + "," + yCoord).innerHTML = xCoord + "," + yCoord + " " + score;
                        console.log("       " + xCoord + "," + yCoord + " scored total " + score);
                        //var nObj;


                    //console.log(typeof xM);
                    //console.log(xP);
                    //console.log(yM);
                    //console.log(yP);

                        /*    
                        nCoord = xM + "," + yCoord;
                        var nObj = {coord: nCoord, value: 0};
                        nArray.push(nObj);
                   
                        nCoord = xM + "," + yM;
                        nObj = {coord: nCoord, value: 0};
                        nArray.push(nObj);
              
                        nCoord = xM + "," + yP;
                        nObj = {coord: nCoord, value: 0};
                        nArray.push(nObj);
               
                        nCoord = xP + "," + yCoord;
                        nObj = {coord: nCoord, value: 0};
                        nArray.push(nObj);
                   
                        nCoord = xP + "," + yP;
                        nObj = {coord: nCoord, value: 0};
                        nArray.push(nObj);
                  
                        nCoord = xP + "," + yM;
                        nObj = {coord: nCoord, value: 0};
                        nArray.push(nObj);
                   
                        nCoord = xCoord + "," + yP;
                        nObj = {coord: nCoord, value: 0};
                        nArray.push(nObj);
                 
                        nCoord = xCoord + "," + yM;
                        nObj = {coord: nCoord, value: 0};
                        nArray.push(nObj);

                        console.log(nArray);
                        */


                       /* if (xM >= 0) {
                            var xMinus = xM;
                            //console.log(xMinus);
                        } //else {console.log('err1')}; 
                        
                        if (xP < 16) {
                            var xPlus = xP;
                            //console.log(xPlus);
                        } //else {console.log('err2')}; 
                        
                        if (yM >= 0) {
                            var yMinus = yM;
                            //console.log(yMinus);
                        } //else {console.log('err3')}; 
                       
                        if (yP < 16) {
                            var yPlus = yP; 
                            //console.log(yPlus);
                        } //else {console.log('err4')};
                        
                        //console.log("yo" + yPlus);
                        //console.log("ya" + xMinus);
                        */


                }; // else do nothing


    








        };
    };


    





        
        








    










});