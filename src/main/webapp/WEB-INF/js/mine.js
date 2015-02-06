
$(document).ready(function(){
    $(document).bind("contextmenu", function (e) {
        return false;
    });

    var levelMapSize = [5,7,10];
    var levelMineCount = [5,17,25];

    $('.level-btn').mouseup(function(obj){
        $('.level-btn').removeClass('active');
        var btnList = $('.level-btn');
        for(var i = 0;i<btnList.length;i++){
            if($(obj)[0].currentTarget == btnList[i]){
                $(btnList[i]).addClass('active');
                if(i == 3){
                    var htmlContent = "";
                    //make map size
                    for(var j = 0;j<25;j++){
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
            $("#gameArea").show(1000);
        });
    })
}

//properties data
var gameStatus = 0;//1.start 2.over 3.pause
var mapSize = 10;//5*5
var mineCount = 10;
var currentSelectItem;
var mineList = new Array();
var unCoverList = new Array();
var selectList = new Array();
var statusMap = new Array();//mine=-1, covered=0, minecount>0

function loadGame(){


    //not null check
    mapSize = parseInt($('#mapSize').val());
    mineCount = parseInt($('#mineCount').val());

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
            var location = parseInt(Math.random() * 25);
            var locationX = parseInt(location % mapSize);
            var locationY = parseInt(location / 5);
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
                        alert("game win!!");
                    }
                }

                $($(this)[0]).html("<img height='100%' src='/saolei/img/flag.png'>");
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
            //others click
            currentSelectItem = "";
            if(selectList.indexOf($(this)[0].id) < 0) {
                //has not add flag
                if (statusMap[location[0]][location[1]] == -1) {
                    $($(this)[0]).html("<img height='100%' src='/saolei/img/clicked.png'>");
                    gameStatus = 2;
                    showMines(gameStatus);
                } else if (statusMap[location[0]][location[1]] == 0) {
                    unCoverList.push($(this)[0].id);
                } else {
                    $($(this)[0]).html("<img height='100%' src='/saolei/img/" + statusMap[location[0]][location[1]] + ".png' >");
                    unCoverList.push($(this)[0].id);
                }
            }

        }
    });
}

function showMines(gameStatus){
    alert("game over"); 
    for(var i = 0;i<mapSize;i++){
        for(var j = 0;j<mapSize;j++){
            //un covered cell
            if(unCoverList.indexOf(i+"-"+j) < 0) {
                if (statusMap[i][j] == -1) {
                    $("#" + i + "-" + j).html("<img height='100%' src='/saolei/img/clicked.png'>");
                } else if (statusMap[i][j] == 0) {
                    $("#" + i + "-" + j).css({"background": "white"});
                } else {
                    $("#" + i + "-" + j).html("<img height='100%' src='/saolei/img/" + statusMap[i][j] + ".png' >");
                }
            }
        }
    }
}
