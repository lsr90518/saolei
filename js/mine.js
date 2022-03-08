// version 0.0.1
//properties data
var gameStatus = 0;//1.start 2.over 3.pause
var mapSize = 10;//5*5
var mineCount = 10;
var currentSelectItem;
var mineList = new Array();
var unCoverList = new Array();
var selectList = new Array();
var statusMap = new Array();//mine=-1, covered=0, minecount>0

var timer;
var sec = 0;

$(document).ready(function(){
    $(document).bind("contextmenu", function (e) {
        return false;
    });

    var levelMapSize = [5,7,10];
    var levelMineCount = [5,17,23];

    $('.level-btn').mouseup(function(obj){
        $('.level-btn').removeClass('active');
        var btnList = $('.level-btn');
        for(var i = 0;i<btnList.length;i++){
            if($(obj)[0].currentTarget == btnList[i]){
                $(btnList[i]).addClass('active');
                if(i == 3){
                    var htmlContent = "";
                    //make map size
                    for(var j = 0;j<23;j++){
                        var num = parseInt(j);
                        num = num+1;
                        htmlContent = htmlContent + '<option>'+num+'</option>';
                    }
                    $('#mapSize').html(htmlContent);
                    $('#mineCount').html(htmlContent);
                } else {
                    $('#mapSize').html('<option>' + levelMapSize[i] + '</option>');
                    $('#mineCount').html('<option>' + levelMineCount[i] + '</option>');
                }
            }

        }
    });
});


function loadGameAnimation(){
    loadGame();
    $(".startAnimationBomb").animate({
        width:'0px'
    },4000,'linear',function(){
        $(".startAnimationBomb").css({"width":'0px'});
        $("#operation-well").animate({
            opacity: '0'
        },1000,function(){
            $("#operation-well").hide();
            $(".game-panel").animate({opacity:1},1000,'linear');
            $("#gameArea").animate({opacity:1},1000,'linear',function(){
                timerStart();
            });
        });
    })
}

function timerStart(){
    timer = setInterval(function(){

        $("#timeDiv").html(sec);
        sec++;
    },1000);
}

function loadGame(){

    //not null check
    mapSize = parseInt($('#mapSize').val());
    mineCount = parseInt($('#mineCount').val());
    console.log(mapSize);
    console.log(mineCount);
    $("#mineCountDiv").html(mineCount);

    //generate map
    var htmlContent = "";
    for(var i = 0;i < mapSize;i++){
        htmlContent = htmlContent + '<tr>';
        for(var j = 0;j < mapSize;j++){
            htmlContent = htmlContent + '<td id="'+i+'-'+j+'" class="mapCell"></td>';
        }
        htmlContent = htmlContent + '</tr>';
    }
    $("#gameArea").html(htmlContent);


    //generate mines
    var i = 0;
    while(true) {
        if(i < mineCount) {
            var edge = mapSize*mapSize;
            var location = parseInt(Math.random() * edge);
            var locationX = parseInt(location % mapSize);
            var locationY = parseInt(location / mapSize);
            if (mineList.indexOf(locationX + "-" + locationY) < 0) {
                mineList.push(locationX + "-" + locationY);
//                    $("#"+locationX+"-"+locationY).html("mine");
                i++;
            }
        } else {
            break;
        }
    }
    console.log(mineList);

    //////////////count mine
    //initialize map
    for(i = 0;i < mapSize;i++){
        var rowMap = new Array();
        for(var j = 0;j<mapSize;j++){
            rowMap.push(0);
        }
        statusMap.push(rowMap);
    }

    //locate mines
    for(i = 0;i < mineList.length;i++){
        var tempLocation = new String(mineList[i]);
        var location = tempLocation.split('-');
        statusMap[location[0]][location[1]] = parseInt("-1"); //location mine -1
    }

    //count mine
    for(i = 0;i < statusMap.length;i++){
        for(var j = 0;j < statusMap[i].length;j++){
            var tempMineCount = 0;
            if(statusMap[i][j] == -1){
                continue;
            }
            //left
            if(i-1 >= 0){
                if(statusMap[i-1][j] == -1){
                    tempMineCount++;
                }
            }
            //top left
            if(i-1 >= 0 && j-1 >= 0){
                if(statusMap[i-1][j-1] == -1){
                    tempMineCount++;
                }
            }
            //top
            if(j-1 >= 0){
                if(statusMap[i][j-1] == -1){
                    tempMineCount++;
                }
            }
            //top right
            if(i+1 < mapSize && j-1 >=0){
                if(statusMap[i+1][j-1] == -1){
                    tempMineCount++;
                }
            }
            //right
            if(i+1 < mapSize){
                if(statusMap[i+1][j] == -1){
                    tempMineCount++;
                }
            }
            //bottom right
            if(i+1 < mapSize && j+1 < mapSize){
                if(statusMap[i+1][j+1] == -1){
                    tempMineCount++;
                }
            }
            //bottom
            if(j+1 < mapSize){
                if(statusMap[i][j+1] == -1){
                    tempMineCount++;
                }
            }
            //bottom left
            if(i-1 >= 0 && j+1 < mapSize){
                if(statusMap[i-1][j+1] == -1){
                    tempMineCount++;
                }
            }
            statusMap[i][j] = tempMineCount;
        }
    }
    console.log(statusMap);

    $(".mapCell").mouseup(function(e){
        //check game status
        if(gameStatus == 2){
            return false;
        }

        //clear background image
        $($(this)[0]).css({"background": "white"});
        //get location id
        var tmpIdStr = new String($(this)[0].id);
        var location = tmpIdStr.split("-");

        //right click
        if(e.which == 3){

            if(unCoverList.indexOf($(this)[0].id) > -1){
                return false;
            }
            if(selectList.indexOf($(this)[0].id) < 0){
                //選択されてない場合
                selectList.push($(this)[0].id);
                //check if win
                if(selectList.length == mineList.length){
                    gameStatus = 2;
                    for(i = 0;i<selectList.length;i++){
                        if(mineList.indexOf(selectList[i]) < 0){
                            gameStatus = 1;
                        }
                    }
                    if(gameStatus == 2){
                        $("#faceImg").attr({"src":"../img/win.png"});

                        showMines(3);
                    }
                } else {
                    $($(this)[0]).html("<img height='100%' src='../img/flag.png'>");
                    changeFace("dropFlag");
                }
                var currentMineCount = parseInt($("#mineCountDiv").html());
                currentMineCount--;
                $("#mineCountDiv").html(currentMineCount);
            } else {
                if(currentSelectItem == $(this)[0].id){
                    $($(this)[0]).css({"background":""});
                    $($(this)[0]).html("");
                    var index = selectList.indexOf($(this)[0].id);
                    selectList.splice(index, index+1);
                    currentSelectItem = "";
                    var currentMineCount = parseInt($("#mineCountDiv").html());
                    currentMineCount++;
                    $("#mineCountDiv").html(currentMineCount);
                } else {
                    currentSelectItem = $(this)[0].id;
                }
            }

        } else {
            //others button click
            currentSelectItem = "";
            if(selectList.indexOf($(this)[0].id) < 0) {
                //has not add flag
                if (statusMap[location[0]][location[1]] == -1) {
                    $($(this)[0]).html("<img height='100%' src='../img/clicked.png'>");
                    gameStatus = 2;
                    $("#faceImg").attr({"src":"../img/gameover.png"});
                    showMines(gameStatus);
                } else {
                    changeFace("discover");
                    autoDiscover($(this)[0].id);
                }
            }

        }
    });
}

function showMines(gameStatus){

    clearInterval(timer);

    for(var i = 0;i<mapSize;i++){
        for(var j = 0;j<mapSize;j++){
            //un covered cell
            if(unCoverList.indexOf(i+"-"+j) < 0) {
                if (statusMap[i][j] == -1) {
                    if(gameStatus == 3){
                        $("#" + i + "-" + j).html("<img height='100%' src='../img/flag.png'>");
                    } else {
                        $("#" + i + "-" + j).html("<img height='100%' src='../img/clicked.png'>");
                    }
                } else if (statusMap[i][j] == 0) {
                    $("#" + i + "-" + j).css({"background": "white"});
                } else {
                    $("#" + i + "-" + j).html("<img height='100%' src='../img/" + statusMap[i][j] + ".png' >");
                }
            }
        }
    }
}

function changeFace(status){
    $("#faceImg").attr({"src":"../img/"+status+".png"});
    setTimeout(function(){
        $("#faceImg").attr({"src":"../img/face.png"});
    },300)
}

function autoDiscover(idStr){
    //not contains in uncoverList
    if(unCoverList.indexOf(idStr) == -1){
        unCoverList.push(idStr);
        var id = new String(idStr);
        var i = parseInt(id.split('-')[0]);
        var j = parseInt(id.split('-')[1]);

        //number
        if(statusMap[i][j] > 0){
            $("#" + i + "-" + j).html("<img height='100%' src='../img/" + statusMap[i][j] + ".png' >");

        } else if(statusMap[i][j] == 0){
            //top
            if(i>=1){
                var ti = i-1;
                var tmpId = ti+'-'+j;
                autoDiscover(tmpId);
            }
            //top left
            if((i>=1) && (j>=1)){
                var ti = i - 1;
                var tj = j - 1;
                var tmpId = ti+'-'+tj;
                autoDiscover(tmpId);
            }
            //left
            if(j-1 >= 0){
                var tj = j-1;
                var tmpId = i+'-'+tj;
                autoDiscover(tmpId);
            }
            //bottom left
            if((i<=mapSize-2)&&(j-1>=0)){
                var ti = i+1;
                var tj = j-1;
                var tmpId = ti+'-'+tj;
                autoDiscover(tmpId);
            }
            //bottom
            if(i <= mapSize-2){
                var ti = i + 1;
                var tmpId = ti+'-'+j;
                autoDiscover(tmpId);
            }
            //bottom right
            if(i<=mapSize-2 && j<=mapSize-2){
                var ti = i+1;
                var tj = j+1;
                var tmpId = ti+'-'+tj;
                autoDiscover(tmpId);
            }
            //right
            if(j < mapSize-2){
                var tj = j + 1;
                var tmpId = i+'-'+tj;
                autoDiscover(tmpId);
            }
            //top right
            if(i-1 >= 0 && (j < j-2)){
                var ti = i -1;
                var tj = j+1;
                var tmpId = ti+'-'+tj;
                autoDiscover(tmpId);
            }
            $("#" + i + "-" + j).css({"background": "white"});
        }
    }

}
