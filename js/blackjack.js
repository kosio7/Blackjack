/**
 * This is a simple Blackjack card game without real rules. It is created with HTML canvas and the CreateJS suite.
 *
 * Rules: The cards from 2 to 10 have their respective face value as scoring value. The J, K, and Q are worth 10 points
 * each, the Ace is worth 11 points. There is also one Joker in the deck.
 * Scoring: If both cards in the player's hand are the same value, the value of both of the cards is added to the
 * player's score. If the value of one the cards in the player's hand is equal to a value of a card in the dealer's hand,
 * only the value of the player's hand card is added to the player's score. If the cards in the players's hand have a
 * different value, but both have equal value with two of the dealers hand cards, both the player card 1 and the player
 * card 2 values are added to the player's score. If the Joker appears in the player hand, the player loses 20 points
 * if the joker is drawn in the dealer's hand, the player loses nothing but also has only two cards that can match in
 * the dealer's deck. To win the game, the player must have at least 100 points score. To
 * win the big jackpot the player must have at least 200 points, in that case the player's score will be multiplied by 2.
 * When the HIT button is triggered two new cards are placed in the player's hand.
 */

let stage;
let dlrHand = [];
let plrHand = [];
let arrRemoved = [];
let win = 0;
let winTxt;
let won;
let back1, back2, back3, back4;
let plrBitmap;
let hitBtn;
let bText;
let hitClicked = false;
let load;

/**
 * The next function sets up the stage and preloads all assets before the game reveal screen using the PreloadJS library.
 */
const preloadAssets = () => {
    stage = new createjs.Stage("canvas");
    createjs.Touch.enable(stage);
    createjs.Ticker.addEventListener("tick", function() {
        stage.update();
    });
    let queue = new createjs.LoadQueue();
    createjs.Sound.initializeDefaultPlugins();
    queue.installPlugin(createjs.Sound);
    queue.addEventListener("progress", loading);
    queue.addEventListener("complete", gameReveal);
    queue.loadManifest(cardArr);
    queue.loadManifest([
        {src:"sounds/86854__milton__cardfall.wav", id: "draw"},
        {src:"sounds/button.wav", id: "button"},
        {src:"sounds/86866__milton__losev.wav", id: "lose"},
        {src:"sounds/86880__milton__winnv.wav", id: "win"},
        {src:"sounds/86860__milton__intro-game.wav", id: "intro"}
    ]);
    resize();
};

/**
 * This function draws loading text during the assets preload.
 */
const loading = () => {
    stage.removeChild(load);
    load = new createjs.Text("LOADING...", "100px Times", "#000000");
    load.regX = load.getMeasuredWidth() / 2;
    load.regY = load.getMeasuredHeight() / 2;
    load.x = stage.canvas.width / 2;
    load.y = stage.canvas.height / 2;
    load.shadow = new createjs.Shadow("#000000", 5, 5, 10);
    stage.addChild(load);
};

/**
 * This function draws the bounds where the cards should go when dealt from the deck.
 */
const cardPlaces = () => {
    let dlrPlace1, dlrPlace2, dlrPlace3, plrPlace1, plrPlace2;
    let rect = new createjs.Graphics().beginLinearGradientFill(["#000000","#737373"], [0, 1], 100, 40, -10, 40).drawRoundRect(0,0,150,225,6);

    dlrPlace1 = new createjs.Shape(rect);
    dlrPlace1.x = 200;
    dlrPlace1.y = 35;
    dlrPlace1.alpha = .2;

    dlrPlace2 = new createjs.Shape(rect);
    dlrPlace2.x = 400;
    dlrPlace2.y = 35;
    dlrPlace2.alpha = .2;

    dlrPlace3 = new createjs.Shape(rect);
    dlrPlace3.x = 600;
    dlrPlace3.y = 35;
    dlrPlace3.alpha = .2;

    plrPlace1 = new createjs.Shape(rect);
    plrPlace1.x = 300;
    plrPlace1.y = 300;
    plrPlace1.alpha = .2;

    plrPlace2 = new createjs.Shape(rect);
    plrPlace2.x = 500;
    plrPlace2.y = 300;
    plrPlace2.alpha = .2;

    stage.addChild(dlrPlace1, dlrPlace2, dlrPlace3, plrPlace1, plrPlace2);
};

/**
 * This function draws the back of the deck.
 */
const deckDraw = () => {
    let cards, cards1, cards2, cards3;

    cards = new Image();
    cards.src = "images/back.png";
    back1 = new createjs.Bitmap(cards);
    back1.x = 800;
    back1.y = 80;

    cards1 = new Image();
    cards1.src = "images/back.png";
    back2 = new createjs.Bitmap(cards1);
    back2.x = 805;
    back2.y = 85;

    cards2 = new Image();
    cards2.src = "images/back.png";
    back3 = new createjs.Bitmap(cards2);
    back3.x = 810;
    back3.y = 90;

    cards3 = new Image();
    cards3.src = "images/back.png";
    back4 = new createjs.Bitmap(cards3);
    back4.x = 815;
    back4.y = 95;

    stage.addChild(back1, back2, back3, back4);
    back3.shadow = new createjs.Shadow("#000000", 5, 5, 10);
};

/**
 * This function removes the back of the deck.
 */
const deckRemove = () => {
    if (cardArr.length === 4) {
        stage.removeChild(back3, back4);
    }
    if (cardArr.length < 4) {
        stage.removeChild(back1, back2);
    }
};

/**
 * This function draws the first three cards which are in the dealer's hand.
 */
const dealerHand = () => {
    let card1, card2, card3, bitmap1, bitmap2, bitmap3;

    for (let i = 0; i < 3; i++)
    {
        let x = cardRandomizer();
        dlrHand.push(x[0]);
    }

    dlrHand[0].x = 800;
    dlrHand[0].y = 80;

    card1 = new Image();
    card1.src = dlrHand[0].src;
    bitmap1 = new createjs.Bitmap(card1);
    bitmap1.x = dlrHand[0].x;
    bitmap1.y = dlrHand[0].y;

    bitmap1.shadow = new createjs.Shadow("#000000", 5, 5, 10);

    dlrHand[1].x = 800;
    dlrHand[1].y = 80;

    card2 = new Image();
    card2.src = dlrHand[1].src;
    bitmap2 = new createjs.Bitmap(card2);
    bitmap2.x = dlrHand[1].x;
    bitmap2.y = dlrHand[1].y;

    bitmap2.shadow = new createjs.Shadow("#000000", 5, 5, 10);

    dlrHand[2].x = 800;
    dlrHand[2].y = 80;

    card3 = new Image();
    card3.src = dlrHand[2].src;
    bitmap3 = new createjs.Bitmap(card3);
    bitmap3.x = dlrHand[2].x;
    bitmap3.y = dlrHand[2].y;

    bitmap3.shadow = new createjs.Shadow("#000000", 5, 5, 10);

    stage.addChild(bitmap1, bitmap2, bitmap3);
    createjs.Tween.get(bitmap1, {override:false}).wait(500).to({x:200, y: 35}, 600, createjs.Ease.backOut);
    createjs.Sound.play("draw", {delay:500});
    createjs.Tween.get(bitmap2, {override:false}).wait(1000).to({x:400, y: 35}, 500, createjs.Ease.backOut);
    createjs.Sound.play("draw", {delay:1000});
    createjs.Tween.get(bitmap3, {override:false}).wait(1500).to({x:600, y: 35}, 400, createjs.Ease.backOut);
    createjs.Sound.play("draw", {delay:1500});
};

/**
 *This function draws the player's hand cards.
 * @param objCard Specifies the exact card object from the array.
 * @param waitTime Specifies the delay before card drawing.
 * @param objPosition Specifies X and Y positions on the canvas where the card should be drawn.
 */
const drawCard = (objCard, waitTime, objPosition) => {
    if (typeof cardArr !== "undefined" && cardArr.length > 0) {
        let plrCardObject, plrCard;

        plrCardObject = objCard;
        plrCardObject.x = objPosition.startX;
        plrCardObject.y = objPosition.startY;

        plrCard = new Image();
        plrCard.src = plrCardObject.src;
        plrBitmap = new createjs.Bitmap(plrCard);
        plrBitmap.x = plrCardObject.x;
        plrBitmap.y = plrCardObject.y;
        stage.addChild(plrBitmap);

        /**
         * All the greyed out code in this function can be used for interactions with the player's hand cards.
         * It is not used now because of the rules of the game.
         */

        // stage.enableMouseOver();
        // plrBitmap.cursor = "pointer";

        plrBitmap.shadow = new createjs.Shadow("#000000", 5, 5, 10);

        // plrBitmap.addEventListener('click', () => {
        //     deckRemove();
        //     removePlayerCard(plrBitmap);
        //     if (typeof cardArr !== "undefined" && cardArr.length > 0) {
        //         playerHand(objPosition.cardPos, 600, 500);
        //         createjs.Sound.play("draw", {delay: 500});
        //       }
        // }, false);

        createjs.Tween.get(plrBitmap, {override: true}).wait(waitTime).to({
            x: objPosition.endX,
            y: objPosition.endY
        }, 200, createjs.Ease.backInOut);

        // plrBitmap.addEventListener("mouseover", () => {
        //     plrBitmap.x = objPosition.endX - 15;
        //     plrBitmap.y = objPosition.endY - 15;
        //     plrBitmap.shadow = new createjs.Shadow("#000000", 7, 7, 40);
        // });
        // plrBitmap.addEventListener("mouseout", () => {
        //     plrBitmap.x = objPosition.endX;
        //     plrBitmap.y = objPosition.endY;
        //     plrBitmap.shadow = new createjs.Shadow("#000000", 5, 5, 10);
        // });
        return plrBitmap;
    } else {
        createjs.Tween.get(this).wait(1500).call(gameOver);
    }
};

/**
 *This function is for drawing specific card from the player's hand.
 * @param whichCard Which card should be drawn. Both, left or right.
 * @param waitTimeCardA The delay after which the card in position A will be drawn.
 * @param waitTimeCardB The delay after which the card in position B will be drawn.
 */
const playerHand = (whichCard, waitTimeCardA, waitTimeCardB) => {
    if (hitClicked && whichCard === 'both') {
        arrRemoved.forEach((el) => {
            removePlayerCard(el);
        });
        arrRemoved.length = 0;
    }

    for (let i = 0; i < 2; i++)
    {
        let x = cardRandomizer();
        plrHand.push(x[0]);
    }

    let cardA = {};
    let cardB = {};
    if (whichCard === 'both') {
        cardA = drawCard(plrHand[0], waitTimeCardA, { startX: 800, startY: 80, endX: 300, endY: 300, cardPos: 'left' });
        cardB = drawCard(plrHand[1], waitTimeCardB, { startX: 800, startY: 80, endX: 500, endY: 300, cardPos: 'right' });
    } else if (whichCard === 'left') {
        cardA = drawCard(plrHand[0], waitTimeCardA, { startX: 800, startY: 80, endX: 300, endY: 300, cardPos: 'left' });
    } else {
        cardA = drawCard(plrHand[0], waitTimeCardA, { startX: 800, startY: 80, endX: 500, endY: 300, cardPos: 'right' });
    }

    if (typeof cardArr !== "undefined" && cardArr.length > 0) {
        calcWin();
        showCurrentWin();
    }

    arrRemoved.push(cardA);
    arrRemoved.push(cardB);

    plrHand.length = 0;
};

/**
 * This function removes player's card to the designated coordinates using fade effect.
 * @param objCard This parameter specifies which card from the player's hand to be removed.
 */
const removePlayerCard = (objCard) => {
    createjs.Tween.get(objCard).to({x: 20, y: 520, alpha:0, visible: false}, 500, createjs.Ease.backInOut);
};

/**
 * This function cuts random object from the card array and returns it as an array.
 */
const cardRandomizer = () => {
    return cardArr.splice(Math.floor(Math.random() * cardArr.length), 1);
};

/**
 * This function shows the win from the current hand.
 */
const showCurrentWin = () => {
        stage.removeChild(won);

    if (plrHand[0].value === plrHand[1].value) {
        won = new createjs.Text("You won: " + (parseInt(plrHand[0].value) + parseInt(plrHand[1].value)), "20px Times", "#000000");
        won.x = -100;
        won.y = 80;
        won.shadow = new createjs.Shadow("#000000", 5, 5, 10);
        createjs.Tween.get(won)
            .to({alpha:0}, 2000)
            .to({x:50, y:80}, 300, createjs.Ease.backOut).wait(500)
            .to({x:50, y: -50}, 3000, createjs.Ease.backOut);
        stage.addChild(won);
    } else if (plrHand[0].value === dlrHand[0].value || plrHand[0].value === dlrHand[1].value || plrHand[0].value === dlrHand[2].value) {
        won = new createjs.Text("You won: " + plrHand[0].value, "20px Times", "#000000");
        won.x = -100;
        won.y = 80;
        won.shadow = new createjs.Shadow("#000000", 5, 5, 10);
        createjs.Tween.get(won)
            .to({alpha:0}, 2000)
            .to({x:50, y:80}, 300, createjs.Ease.backOut).wait(500)
            .to({x:50, y: -50}, 3000, createjs.Ease.backOut);
        stage.addChild(won);
    }

     if (plrHand[1].value === dlrHand[0].value && plrHand[1].value !== plrHand[0].value) {
         setTimeout(() => {
             won = new createjs.Text("You won: " + dlrHand[0].value, "20px Times", "#000000");
             won.x = -100;
             won.y = 80;
             won.shadow = new createjs.Shadow("#000000", 5, 5, 10);
             createjs.Tween.get(won)
                 .to({alpha:0}, 2000)
                 .to({x:50, y:80}, 300, createjs.Ease.backOut).wait(1100)
                 .to({x:50, y: -50}, 3000, createjs.Ease.backOut);
             stage.addChild(won);
         }, 800);

    } else if (plrHand[1].value === dlrHand[1].value && plrHand[1].value !== plrHand[0].value) {
         setTimeout(() => {
             won = new createjs.Text("You won: " + dlrHand[1].value, "20px Times", "#000000");
             won.x = -100;
             won.y = 80;
             won.shadow = new createjs.Shadow("#000000", 5, 5, 10);
             createjs.Tween.get(won)
                 .to({alpha:0}, 2000)
                 .to({x:50, y:80}, 300, createjs.Ease.backOut).wait(1100)
                 .to({x:50, y: -100}, 3000, createjs.Ease.backOut);
             stage.addChild(won);
         }, 800);
    } else if (plrHand[1].value === dlrHand[2].value && plrHand[1].value !== plrHand[0].value) {
         setTimeout(() => {
             won = new createjs.Text("You won: " + dlrHand[2].value, "20px Times", "#000000");
             won.x = -100;
             won.y = 80;
             won.shadow = new createjs.Shadow("#000000", 5, 5, 10);
             createjs.Tween.get(won)
                 .to({alpha:0}, 2000)
                 .to({x:50, y:80}, 300, createjs.Ease.backOut).wait(1100)
                 .to({x:50, y: -100}, 3000, createjs.Ease.backOut);
             stage.addChild(won);
         }, 800);
    }

    if (plrHand[0].value === "-20" || plrHand[1].value === "-20") {
        setTimeout(() => {
            won = new createjs.Text("You lost: 20", "20px Times", "#000000");
            won.x = -100;
            won.y = 80;
            won.shadow = new createjs.Shadow("#000000", 5, 5, 10);
            createjs.Tween.get(won)
                .to({alpha:0}, 2000)
                .to({x:50, y:80}, 300, createjs.Ease.backOut).wait(1100)
                .to({x:50, y: -100}, 3000, createjs.Ease.backOut);
            stage.addChild(won);
        }, 500);
    }

};

/**
 * This function calculates the winnings and displays total won during the current game.
 */
const calcWin = () => {
    stage.removeChild(winTxt);

    winTxt = new createjs.Text("Win: " + win, "30px Times", "#000000");
    winTxt.x = 50;
    winTxt.y = 50;
    winTxt.shadow = new createjs.Shadow("#000000", 5, 5, 10);
    stage.addChild(winTxt);

    if (plrHand[0].value !== plrHand[1].value) {
        if (plrHand[0].value === dlrHand[0].value || plrHand[0].value === dlrHand[1].value ||
            plrHand[0].value === dlrHand[2].value) {
            win += parseInt(plrHand[0].value);
        }

        if (plrHand[1].value === dlrHand[0].value || plrHand[1].value === dlrHand[1].value ||
            plrHand[1].value === dlrHand[2].value) {
            win += parseInt(plrHand[1].value);
        }
    }  else {
        win += parseInt(plrHand[0].value) * 2;
    }

    if (plrHand[0].value === "-20" || plrHand[1].value === "-20") {
        win += -20;
    }
};

/**
 * This function can be used for scaling contents on different screen sizes.
 */
const resize = () => {
    stage.canvas.width = window.innerWidth;
    stage.canvas.height = window.innerHeight;
};

/**
 * The next function is for the game HIT button. When triggered it removes the cards from the player's hand and draws new ones from the deck.
 */
const hitButton = () => {
    let circle = new createjs.Graphics().beginStroke("#000000").beginRadialGradientFill(["#FF1111", "#35CC21"], [.3, 1], 0, 0, 0, 0, 0, 50).drawCircle(0,0,50);
    hitBtn = new createjs.Shape(circle);
    hitBtn.regX = 25;
    hitBtn.regY = 25;
    hitBtn.x = 850;
    hitBtn.y = 450;
    hitBtn.alpha = 0;
    createjs.Tween.get(hitBtn).to({alpha:1}, 800);
    stage.addChild(hitBtn);
    hitBtn.shadow = new createjs.Shadow("#000000", 0, 0, 40);

    bText = new createjs.Text("HIT", "25px Coffee", "#000000");
    bText.regX = bText.getMeasuredWidth() / 2;
    bText.regY = bText.getMeasuredHeight() / 2;
    bText.x = 825;
    bText.y = 425;
    bText.alpha = 0;
    createjs.Tween.get(bText).to({alpha:1}, 2000);
    stage.addChild(bText);

    let playTxt = new createjs.Text("Touch or click the HIT button \n or press Spacebar.", "20px Times", "#000000");
    playTxt.textAlign = "center";
    playTxt.x = 150;
    playTxt.y = 400;
    playTxt.shadow = new createjs.Shadow("#000000", 0, 0, 10);
    stage.addChild(playTxt);

    stage.enableMouseOver();
    hitBtn.cursor = "pointer";

    document.addEventListener("keydown", keyboardHit);
    hitBtn.addEventListener("click", () => {
        deckRemove();
        hitClicked = true;
        if (typeof cardArr !== "undefined" && cardArr.length > 0) {
            hitBtn.mouseEnabled = false;
            document.removeEventListener("keydown", keyboardHit);
            hitBtn.graphics.clear().beginFill("#BF1111").drawCircle(0, 0, 50);
            createjs.Tween.get(hitBtn).to({alpha: .5}, 100);
            playerHand('both', 600, 500);
            setTimeout(() => {
                hitBtn.graphics.clear().beginRadialGradientFill(["#FF1111", "#35CC21"], [.3, 1], 0, 0, 0, 0, 0, 50).drawCircle(0, 0, 50);
                createjs.Tween.get(hitBtn).to({alpha: 1}, 100);
                document.addEventListener("keydown", keyboardHit);
                hitBtn.mouseEnabled = true;
                hitBtn.cursor = "pointer";
            }, 750);
            if (typeof cardArr !== "undefined" && cardArr.length >= 1) {
                createjs.Sound.play("draw", {delay: 500});
                createjs.Sound.play("draw", {delay: 600});
                createjs.Sound.play("button");
            }
        }
    });
};

/**
 * This function triggers the HIT button by keyboard input.
 */
const keyboardHit = (e) => {
    if (e.keyCode == "32") {
        deckRemove();
        hitClicked = true;
        if (typeof cardArr !== "undefined" && cardArr.length > 0) {
            hitBtn.mouseEnabled = false;
            document.removeEventListener("keydown", keyboardHit);
            hitBtn.graphics.clear().beginFill("#BF1111").drawCircle(0, 0, 50);
            createjs.Tween.get(hitBtn).to({alpha: .5}, 100);
            playerHand('both', 600, 500);
            setTimeout(() => {
                hitBtn.graphics.clear().beginRadialGradientFill(["#FF1111", "#35CC21"], [.3, 1], 0, 0, 0, 0, 0, 50).drawCircle(0, 0, 50);
                createjs.Tween.get(hitBtn).to({alpha: 1}, 100);
                hitBtn.mouseEnabled = true;
                document.addEventListener("keydown", keyboardHit);
                hitBtn.cursor = "pointer";
            }, 750);
            if (typeof cardArr !== "undefined" && cardArr.length >= 1) {
                createjs.Sound.play("draw", {delay: 500});
                createjs.Sound.play("draw", {delay: 600});
                createjs.Sound.play("button");
            }
        }
    }
};

/**
 * This function initializes the gameplay. It is the main game function.
 */
let init = () => {
    win = 0;
    cardPlaces();
    createjs.Tween.get(this).wait(2500).call(hitButton);
    dealerHand();
    playerHand("both", 2000, 2500);
    createjs.Sound.play("draw", {delay: 2000});
    createjs.Sound.play("draw", {delay: 2500});
    deckDraw();
    resize();
};