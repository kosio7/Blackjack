/**
 * This function removes all children from the stage, resets the assets and shows play again button.
 */
const gameOver = () => {
    stage.removeAllChildren();
    stage.removeAllEventListeners();
    document.removeEventListener("keydown", keyboardHit);
    cardArr = [
        {
            src: "images/ace1.png",
            value: "11"
        },
        {
            src: "images/ace2.png",
            value: "11"
        },
        {
            src: "images/ace3.png",
            value: "11"
        },
        {
            src: "images/ace4.png",
            value: "11"
        },
        {
            src: "images/two1.png",
            value: "2"
        },
        {
            src: "images/two2.png",
            value: "2"
        },
        {
            src: "images/two3.png",
            value: "2"
        },
        {
            src: "images/two4.png",
            value: "2"
        },
        {
            src: "images/three1.png",
            value: "3"
        },
        {
            src: "images/three2.png",
            value: "3"
        },
        {
            src: "images/three3.png",
            value: "3"
        },
        {
            src: "images/three4.png",
            value: "3"
        },
        {
            src: "images/four1.png",
            value: "4"
        },
        {
            src: "images/four2.png",
            value: "4"
        },
        {
            src: "images/four3.png",
            value: "4"
        },
        {
            src: "images/four4.png",
            value: "4"
        },
        {
            src: "images/five1.png",
            value: "5"
        },
        {
            src: "images/five2.png",
            value: "5"
        },
        {
            src: "images/five3.png",
            value: "5"
        },
        {
            src: "images/five4.png",
            value: "5"
        },
        {
            src: "images/six1.png",
            value: "6"
        },
        {
            src: "images/six2.png",
            value: "6"
        },
        {
            src: "images/six3.png",
            value: "6"
        },
        {
            src: "images/six4.png",
            value: "6"
        },
        {
            src: "images/seven1.png",
            value: "7"
        },
        {
            src: "images/seven2.png",
            value: "7"
        },
        {
            src: "images/seven3.png",
            value: "7"
        },
        {
            src: "images/seven4.png",
            value: "7"
        },
        {
            src: "images/eight1.png",
            value: "8"
        },
        {
            src: "images/eight2.png",
            value: "8"
        },
        {
            src: "images/eight3.png",
            value: "8"
        },
        {
            src: "images/eight4.png",
            value: "8"
        },
        {
            src: "images/nine1.png",
            value: "9"
        },
        {
            src: "images/nine2.png",
            value: "9"
        },
        {
            src: "images/nine3.png",
            value: "9"
        },
        {
            src: "images/nine4.png",
            value: "9"
        },
        {
            src: "images/ten1.png",
            value: "10"
        },
        {
            src: "images/ten2.png",
            value: "10"
        },
        {
            src: "images/ten3.png",
            value: "10"
        },
        {
            src: "images/ten4.png",
            value: "10"
        },
        {
            src: "images/jack1.png",
            value: "10"
        },
        {
            src: "images/jack2.png",
            value: "10"
        },
        {
            src: "images/jack3.png",
            value: "10"
        },
        {
            src: "images/jack4.png",
            value: "10"
        },
        {
            src: "images/queen1.png",
            value: "10"
        },
        {
            src: "images/queen2.png",
            value: "10"
        },
        {
            src: "images/queen3.png",
            value: "10"
        },
        {
            src: "images/queen4.png",
            value: "10"
        },
        {
            src: "images/king1.png",
            value: "10"
        },
        {
            src: "images/king2.png",
            value: "10"
        },
        {
            src: "images/king3.png",
            value: "10"
        },
        {
            src: "images/king4.png",
            value: "10"
        },
        {
            src:"images/joker.png",
            value: "-20"
        }
    ];
    dlrHand = [];
    plrHand = [];
    arrRemoved = [];
    hitClicked = false;
    let txt = new createjs.Text("", "bold 100px Verdana", "#000000");
    txt.shadow = new createjs.Shadow("#000000", 5, 5, 30);

    if (win >= 100 && win < 200) {
        let score = new createjs.Text("Congratulations, you won: " + win, "30px Verdana", "#000000");
        txt.text = "YOU WIN!";
        txt.regX = txt.getMeasuredWidth() / 2;
        txt.x = window.innerWidth / 2;
        txt.y = 50;
        score.regX = score.getMeasuredWidth() / 2;
        score.x = window.innerWidth / 2;
        score.y = 170;
        score.shadow = new createjs.Shadow("#000000", 5, 5, 30);
        stage.addChild(txt);
        stage.addChild(score);
        gameInitButton("RESET");
        createjs.Sound.play("win");

    } else if (win > 200) {
        let jackpot = new createjs.Text("You have won the jackpot! Your total win is: " + win*2, "30px Verdana", "#000000");
        txt.text = "YOU WIN!";
        txt.regX = txt.getMeasuredWidth() / 2;
        txt.x = window.innerWidth / 2;
        txt.y = 50;
        jackpot.regX = jackpot.getMeasuredWidth() / 2;
        jackpot.x = window.innerWidth / 2;
        jackpot.y = 170;
        jackpot.shadow = new createjs.Shadow("#000000", 5, 5, 30);
        stage.addChild(txt);
        stage.addChild(jackpot);
        gameInitButton("RESET");
        createjs.Sound.play("win");
    } else {
        let lost = new createjs.Text("Sorry, you didn't meet the minimum score of 100", "bold 30px Verdana", "#000000");
        txt.text = "YOU LOSE!";
        txt.regX = txt.getMeasuredWidth() / 2;
        txt.x = window.innerWidth / 2;
        txt.y = 50;
        lost.regX = lost.getMeasuredWidth() / 2;
        lost.x = window.innerWidth / 2;
        lost.y = 170;
        lost.shadow = new createjs.Shadow("#000000", 5, 5, 30);
        stage.addChild(txt);
        stage.addChild(lost);
        gameInitButton("RESET");
        createjs.Sound.play("lose");
    }
};