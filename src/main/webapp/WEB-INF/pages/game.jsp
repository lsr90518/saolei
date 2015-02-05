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
    <div class="container">
        <nav class="navbar navbar-default navbar-custom">
            <div class="container-fluid">
                <div class="navbar-header">
                    <a class="navbar-brand" href="#">
                        <img alt="Brand" height="100%" src="/saolei/img/brand.png">
                    </a>
                    <p class="navbar-text">マインスイーパー</p>
                </div>
            </div>
        </nav>
        <div class="row">
            <%--<div class="col-md-4 col-sm-1"></div>--%>

            <!-- main col -->
            <div class="col-md-12 col-sm-12">
                <div class="well well-sm" id="operation-well">
                    自分の道を自分で選ぼう！
                    <div class="row operation-panel">
                        <div class="col-sm-4">
                            <div class="btn-group" role="group" aria-label="...">
                                <button type="button" class="btn btn-default active level-btn"><i class="fa fa-gift"> 簡単</i></button>
                                <button type="button" class="btn btn-default level-btn"><i class="fa fa-lightbulb-o"> 普通</i></button>
                                <button type="button" class="btn btn-default level-btn"><i class="fa fa-heartbeat"> 自殺</i></button>
                                <button type="button" class="btn btn-default level-btn"><i class="fa fa-cutlery"> カスタム</i></button>
                            </div>
                        </div>
                        <div class="col-md-4">
                            マップサイズ <select class="form-control input-sm" id="mapSize">
                                <option>5</option>
                            </select>

                        </div>
                        <div class="col-md-4">
                            マイン数 <select class="form-control input-sm" id="mineCount">
                                <option>5</option>
                            </select>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-4" id="startDiv">
                            <button class="btn btn-success btn-block" onclick="loadGameAnimation()"><i class="fa fa-flag"> スタート</i></button>
                        </div>
                        <div class="col-sm-8">
                            <div class="startAnimationBomb"></div>
                            <img class="" id="truckImg" src="/saolei/img/begin.png" height="50px" />
                        </div>
                    </div>
                </div>

                <div class="panel panel-default">
                    <div class="panel-heading">
                        <div class="row panel-title">
                            <div class="col-sm-3">
                                <div class="sideDiv">
                                    残す <span id="mineCountDiv"></span> 個
                                </div>
                            </div>
                            <div class="col-sm-6"><img src="/saolei/img/begin.png" height="50px" /></div>
                            <div class="col-sm-3">
                                <div class="sideDiv">
                                    時間 <span id="timeDiv"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="panel-body game-panel">

                        <table id="gameArea">

                        </table>
                    </div>
                </div>

            </div>


            <%--<div class="col-md-4 col-sm-1"></div>--%>
        </div>
    </div>
</body>

<script type="text/javascript">
loadGame();
</script>


</html>
