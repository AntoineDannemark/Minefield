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
        for (var xCoord = 0; xCoord < 16; xCoord++) {
            //Loop through Y
            for (var yCoord = 0; yCoord < 16; yCoord++) {
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



            //Research and (destroy) set "X" value in grid
            document.getElementById(bCoord).innerHTML = "X";

        } else {
            // décompte un tour si pas de X placé
            n--;
        };             

        //Incr. loop 
        n++;   
    };

    console.log(bCoord);
    console.log(nArray);


    //Splits bombed array to [x, y, x, y, etc.]


    //Add points to neighbour cells
    /*for (var i = 0; i < 65; i++) {
        bombed[i]
    } */   









        
        








    










});