'use strict'
// 1行目に記載している 'use strict' は削除しないでください
const yourColor = "blue"; // あなたのマスの色
const comColor = "red";   // COMのマスの色
const victoryCondition= [ // 勝利条件
    ["0", "1", "2"],
    ["3", "4", "5"],
    ["6", "7", "8"],
    ["0", "3", "6"],
    ["1", "4", "7"],
    ["2", "5", "8"],
    ["0", "4", "8"],
    ["2", "4", "6"]
];

const yourSquare = []; // あなたのマス
const comSquare = [];  // COMのマス

const square = [];     // 各マス
const result = document.getElementById("result"); // 結果表示枠
let winner = false;

function removeEvent() { // イベントの待ち受けを解除
    for (let i = 0; i < 9; i++) {
        square[i].removeEventListener("click", clickSquare);
    }
}

function judgmentYou() { // プレイヤー側の判定
    for (let i = 0; i < victoryCondition.length; i++) {
        let numOfMatches = 0;
        for (let j = 0; j < yourSquare.length; j++) {
            for (let k = 0; k < 3; k++) {
                if (victoryCondition[i][k] === yourSquare[j]) {
                    numOfMatches++;
                }
            }
            if (numOfMatches === 3){
                // console.log("あなたの勝ちです");
                winner = true;
                result.innerHTML = `<font color=${yourColor}>あなたの勝ちです</font>(Ctrl+Rでリスタート)`;
                removeEvent();
                return;
            }
        }
    }
}

function judgmentCom() { // コンピュータ側の判定
    for (let i = 0; i < victoryCondition.length; i++) {
        let numOfMatches = 0;
        for (let j = 0; j < comSquare.length; j++) {
            for (let k = 0; k < 3; k++) {
                if (victoryCondition[i][k] === comSquare[j]) {
                    numOfMatches++;
                }
            }
            if (numOfMatches === 3){
                // console.log("COMの勝ちです");
                winner = true;
                result.innerHTML = `<font color=${comColor}>コンピュータの勝ちです</font>(Ctrl+Rでリスタート)`;
                removeEvent();
                return;
            }
        }
    }
}

function clickSquare() {// あなたの手番
    // console.log(this);
    if (this.style.backgroundColor !== yourColor &&
        this.style.backgroundColor !== comColor) {
        this.style.backgroundColor = yourColor;
        yourSquare.push(this.id);
        // console.log(this.id + ":" + this.style.backgroundColor);
        // console.log(yourSquare);
        judgmentYou();
        if (winner !== true) { // 勝者が決まっていない場合はCOMの番
            comTurn();
        }
        const emptySquare = [];
        for (let i = 0; i < 9; i++) { // 空いているマスを調べる
            if (square[i].style.backgroundColor !== yourColor &&
                square[i].style.backgroundColor !== comColor) {
                    emptySquare.push(square[i].id);
                }
        }
        if (emptySquare.length === 0 && winner !== true) {
            result.innerHTML = `<font color="green">引き分けです</font>(Ctrl+Rでリスタート)`;
            for (let i = 0; i < 9; i++) { // イベントの待ち受けを解除
                square[i].removeEventListener("click", clickSquare);
            }
        }
    }
}

function comTurn() { // COMの手番
    const s = [];
    const emptySquare = [];
    for (let i = 0; i < 9; i++) { // 空いているマスを調べる
        if (square[i].style.backgroundColor !== yourColor && 
            square[i].style.backgroundColor !== comColor) {
                emptySquare.push(square[i].id);
                // console.log(document.getElementsByClassName("square")[i].id);
            }
    }
    // console.log("\n");
    if (emptySquare.length !== 0) {
        let random = Math.floor(Math.random() * emptySquare.length);
        // console.log(emptySquare[random]);
        document.getElementById(emptySquare[random]).style.backgroundColor = comColor;
        comSquare.push(emptySquare[random]);
        judgmentCom();
    }
}

// クリックの待ち受けを作る
for (let i = 0; i < 9; i++) {
    square.push(document.getElementsByClassName("square")[i]);
    square[i].addEventListener("click", clickSquare);
}
