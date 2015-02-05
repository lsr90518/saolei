<%--
  Created by IntelliJ IDEA.
  User: Lsr
  Date: 2/5/15
  Time: 11:06 AM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:import url="../htmlframe/headFrame.jsp" />
<html>
<head>
    <title>マインスイーパー</title>
</head>
<body>
    <table id="gameArea">

    </table>
</body>
<script type="text/javascript">
    $(document).ready(function(){
        $(document).bind("contextmenu", function (e) {
            return false;
        });


        //properties data
        var gameStauts = 0;//1.start 2.over 3.pause
        var mapSize = 5;//5*5
        var mineCount = 5;
        var mineList = new Array();


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
                    $("#"+locationX+"-"+locationY).html("mine");
                    i++;
                }
            } else {
                break;
            }
        }
        console.log(mineList);

        //////////////count mine
        //initialize map
        var statusMap = new Array();//mine=-1, empty=0, mine number>0
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

        $(".mapCell").click(function(){
            var tmpIdStr = new String($(this)[0].id);
//            console.log(tmpIdStr);
            var location = tmpIdStr.split("-");
            console.log(statusMap[location[0]][location[1]]);

        });

    });

</script>

</html>
