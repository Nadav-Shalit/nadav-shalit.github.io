var newGame = null;
var pageTimeOut = null;

function SetPlayer(btn, sign) {
   
    if (document.getElementById("tblTikTacToe").rows.length == 0) {
        var playername = prompt("Player name for sign:" + sign);

        if (playername != null && playername.length > 0) {
            btn.value = playername + " [" + sign + "]";
            btn.attributes["playername"].value = playername;
        }
        else SetPlayer(btn, sign);


    }
}

function StartGame() {

    newGame = new TikTakToe();
    newGame.startGame();
    if (newGame.getActivePlayer() != null)
        newGame.printgameBoard();
}

function ResetGame() {
    newGame.clearBoard();
    localStorage.clear();
    LoadWinners();
}

var Player = function (name, sign) {
    if (this === window)
        return new Player(name, sign);
    this._name = name;
    this._sign = sign;
    this.getSign = function () {
        return this._sign;
    }
    this.getName = function () {
        return this._name;
    }
}

var TikTakToe = function () {

    if (this === window) {
        console.log("this === window");
        return new TikTakToe();
    }
    var self = this;
    self._gameBoard = [[null, null, null], [null, null, null], [null, null, null]];
    self._winnigCheck = [new Array(
                        new Array(new Array(["0-0", "0-1", "0-2"], ["0-0", "1-0", "2-0"], ["0-0", "1-1", "2-2"])), //0-0
                        new Array(new Array(["0-0", "0-1", "0-2"], ["0-1", "1-1", "2-1"])),                            //0-1
                        new Array(new Array(["0-0", "0-1", "0-2"], ["0-2", "1-2", "2-2"], ["0-2", "1-1", "2-0"]))     //0-2
                                )

                        ,
                        new Array(
                        new Array(new Array(["1-0", "1-1", "1-2"], ["0-0", "1-0", "2-0"])),                        //1-0
                        new Array(new Array(["0-0", "1-1", "2-2"], ["0-1", "1-1", "2-1"], ["0-2", "1-1", "2-0"], ["1-0", "1-1", "1-2"])), // 1-1
                        new Array(new Array(["0-2", "1-2", "2-2"], ["1-0", "1-1", "1-2"]))                             //1-2    
                        )
                        ,
                        new Array(
                        new Array(new Array(["0-0", "1-0", "2-0"], ["2-0", "2-1", "2-2"], ["2-0", "1-1", "0-2"])),  //2-0
                        new Array(new Array(["2-0", "2-1", "2-2"], ["0-1", "1-1", "2-1"])),                            //2-1     
                        new Array(new Array(["2-0", "2-1", "2-2"], ["0-2", "1-2", "2-2"], ["0-0", "1-1", "2-2"]))  //2-2
                        )]
    ;
    self._arrObjPlayres = null;
    self._activePlayer = null;
    self._winnerPlayer = null;
	self._winMoveArr = new Array();

    this.getgameBoard = function () {
        return self._gameBoard;
    }

    this.startGame = function () {
        newGame = new TikTakToe();

        var arrInputPlayers = document.getElementById("players").getElementsByTagName("input");

        var firstPlayer = Math.floor(Math.random() * 2)
        console.log("firstPlayer: " + firstPlayer)
        var arrObjPlayers = [];

        for (var idx = 0; idx < arrInputPlayers.length; idx++) {
            if (arrInputPlayers[idx].attributes["playername"].value == "") {

                newGame.setMsg("please enter valid name for [" + arrInputPlayers[idx].attributes["sign"].value + "] player", "err");
                return newGame;

            }
            var plyr = new Player(arrInputPlayers[idx].attributes["playername"].value, arrInputPlayers[idx].attributes["sign"].value);

            arrObjPlayers.push(plyr);
            //document.getElementById(arrInputPlayers[idx].id).disabled = true;
            console.log("name: " + arrInputPlayers[idx].attributes["playername"].value + "; sign" + arrInputPlayers[idx].attributes["sign"].value + " idx:" + idx);
        }
        console.log(" firstPlayer:" + firstPlayer);
        newGame.setPlayers(arrObjPlayers);
        newGame.setActivePlayer(firstPlayer);
		newGame.setWinner(null);

        //document.getElementById(arrInputPlayers[firstPlayer].id).disabled = false;
        newGame.setMsg('Player "' + arrInputPlayers[firstPlayer].attributes["playername"].value + '" will start first', "");
        console.log("arrObjPlayers.length: " + newGame.getPlayers().length);
		
        return newGame;
    }

    this.setActivePlayer = function (activePlayer) {
        self._activePlayer = activePlayer;
    }

    this.getActivePlayer = function () {
        return self._activePlayer;
    }

    this.setPlayers = function (arrObjPlayres) {
        self._arrObjPlayres = arrObjPlayres;
    }

    this.getPlayers = function () {
        return self._arrObjPlayres;
    }

    this.SetMove = function (move) {


        var curPlayer = new Player("", "");
        curPlayer = self.getPlayers()[self.getActivePlayer()];
        var idx = new String(move).split('-')[0];
        var idy = new String(move).split('-')[1];

        if (self.getWinner() == null) {
            if ((self._gameBoard[idx][idy] == null)) {
                self._gameBoard[idx][idy] = curPlayer.getSign();
                self.printgameBoard();
                if (self.isWinnerMove(move) == false) {
                    self.switchPlayer(curPlayer);
                }
                else
                    self.decalreWinner();
            }
            else
                self.setMsg("Illegal move!", "err");
        }
        else
            self.setMsg('We have a winner press "Play" to start a new game!', "err");
    }

	this.getWinMoveArr = function () {
		
        return self._winMoveArr;
    }
	this.setWinMoveArr = function (WinMoveArr) {
	
        self._winMoveArr = WinMoveArr;
    }
    this.switchPlayer = function (curPlayer) {
        var arrInputPlayers = document.getElementById("players").getElementsByTagName("input");

        for (var idx = 0; idx < arrInputPlayers.length; idx++) {
            var plyr = new Player(arrInputPlayers[idx].playername, arrInputPlayers[idx].sign);

            console.log("name: " + arrInputPlayers[idx].playername + "; sign" + arrInputPlayers[idx].sign + " idx:" + idx);
            if (arrInputPlayers[idx].id != "player_" + curPlayer.getSign()) {
                self.setActivePlayer(idx);
            }
        }
    }

    this.isWinnerMove = function (move) {
        var idx = new String(move).split('-')[0];
        var idy = new String(move).split('-')[1];

        var singToChek = self.getPlayers()[self.getActivePlayer()].getSign();


        var signCount = 0;
        var arrMoveCheck = self._winnigCheck[idx][idy];
        for (var idxFt = 0 ; idxFt < arrMoveCheck.length; idxFt++) {
            for (var idxNd = 0; idxNd < arrMoveCheck[idxFt].length; idxNd++) {
                signCount = 0;
                for (var idxRd = 0; idxRd < arrMoveCheck[idxFt][idxNd].length; idxRd++) {

                    console.log("arrMoveCheck[" + idxFt + "][" + idxNd + "][" + idxRd + "]" + arrMoveCheck[idxFt][idxNd][idxRd]);
                    var idxCheck = arrMoveCheck[idxFt][idxNd][idxRd].split('-')[0];
                    var idyCheck = arrMoveCheck[idxFt][idxNd][idxRd].split('-')[1];
                    if (self.getgameBoard()[idxCheck][idyCheck] == singToChek) {
                        signCount++;
                        console.log("self.getgameBoard[" + idxCheck + "][" + idyCheck + "]" + self.getgameBoard()[idxCheck][idyCheck] + " ;signCount:" + signCount );
                        if (signCount == 3) {
							self.setWinMoveArr(arrMoveCheck[idxFt][idxNd]);
							console.log("WINNER !!  win row: " + self.getWinMoveArr());						
                            return true;
							}
                    }
                }

            }
        }
        return false;


    }

    this.printgameBoard = function () {
        self.clearBoard();
        var tblGame = document.getElementById("tblTikTacToe");


        for (idx = 0; idx < this._gameBoard.length; idx++) {
            var tr = document.createElement('tr');

            for (idy = 0; idy < this._gameBoard[idx].length; idy++) {
                var td = document.createElement('td');
                var textbox = self.addBoarddButton(idx + "-" + idy, this._gameBoard[idx][idy]);
                td.appendChild(textbox);
                console.log("[" + idx + "][" + idy + "]" + this._gameBoard[idx][idy]);
                tr.appendChild(td);
            }


            tblGame.appendChild(tr);

            console.log("New row" + "[" + idx + "][" + idy + "]");


        }
        console.log("tblGame.rows.length:" + tblGame.rows.length);
    }

    this.clearBoard = function () {
        var tblGame = document.getElementById("tblTikTacToe");
        console.log("tblGame.rows.length:" + tblGame.rows.length);
        while (tblGame.rows.length > 0) {
            tblGame.deleteRow(0);
        }
    }
    this.addBoarddButton = function (id, value) {
        var element = document.createElement("input");

        element.type = "button";
        element.value = value;
        element.id = id;
        element.className = "btnMove" + ((value != null) ? " player" + value : "");
        element.onclick = function () {
            newGame.SetMove(this.id);
        };
        return element;

    }

    this.decalreWinner = function () {

        self.setWinner(self.getPlayers()[self.getActivePlayer()]);

        self.setMsg('Player "' + self.getWinner().getName() + '" Wins', "player" + self.getWinner().getSign())
		console.log("self.getWinMoveArr().length: " + self.getWinMoveArr().length);
		for(var idx = 0 ; idx < self.getWinMoveArr().length ; idx++) {
			console.log("self.getWinMoveArr()[" + idx + "]" + self.getWinMoveArr()[idx]);
			document.getElementById(self.getWinMoveArr()[idx]).className = "btnMove playerWin";
		
		}
		
		


    }

    this.getWinner = function () {
        return self._winnerPlayer;
    }

    this.setWinner = function (winPlayer) {		
        self._winnerPlayer = winPlayer;
		if(winPlayer != null) {
        winingDate = self.getNowDateTime();        
        localStorage.setItem(localStorage.length, winingDate + "-" + JSON.stringify(winPlayer));
        LoadWinners();
		}        
    }

	this.getNowDateTime = function (){
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth() + 1; //January is 0!

		var yyyy = today.getFullYear();
		if (dd < 10) {
			dd = '0' + dd
		}
		if (mm < 10) {
			mm = '0' + mm
		}
		var today = dd + '/' + mm + '/' + yyyy + " " + today.toLocaleTimeString() ;
		return today;
	}
    this.setMsg = function (txt, cls) {

        var lbl = document.getElementById("lblMsg")
        lbl.innerHTML = txt;
        lbl.className = "msg" + ((cls != "msg") ? " " + cls : "");
        pageTimeOut = window.setTimeout(function () { self.setMsg('', "msg") }, 2000);
        if (txt.length == 0)
            window.clearTimeout(pageTimeOut);

    }
}



function LoadWinners() {
    
    var OrderList = document.getElementById("ListHallOfFame");
    localStorage.removeItem("ruulzIndex");
    while (OrderList.hasChildNodes()) {
        OrderList.removeChild(OrderList.children[0]);
    }
    for (var idx = 0; idx < localStorage.length; idx++) {
        var rowIdx = localStorage.key(idx);
        var date = localStorage.getItem(rowIdx).split('-')[0];
		var playerData = localStorage.getItem(rowIdx).split('-')[1];
		
		if(playerData!= "null") {		
			var player = new Player(JSON.parse((localStorage.getItem(rowIdx).split('-')[1]))._name, JSON.parse((localStorage.getItem(rowIdx).split('-')[1]))._sign);
			var liElemet = document.createElement("li");
			liElemet.innerHTML = date + " >> " + player.getName() + " [" + player.getSign() + "]";
			liElemet.className = "player" + player.getSign();
			OrderList.appendChild(liElemet);
		}
    }
    
}
