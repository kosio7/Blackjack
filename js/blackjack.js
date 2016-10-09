let stage;
let dlrHand = [];
let plrHand = [];
let arrRemoved = [];
let hitClicked = false;
let soundID = 'draw';

//Contains all card objects. Deck images created by http://byronknoll.blogspot.bg/2011/03/vector-playing-cards.html
let cardArr = [
    {
        image: "images/ace1.png",
        id: "ace1",
        x: 0,
        y: 0
    },
    {
        image: "images/ace2.png",
        id: "ace2",
        x: 0,
        y: 0
    },
    {
        image: "images/ace3.png",
        id: "ace3",
        x: 0,
        y: 0
    },
    {
        image: "images/ace4.png",
        id: "ace4",
        x: 0,
        y: 0
    },
    {
        image: "images/two1.png",
        id: "two1",
        x: 0,
        y: 0
    },
    {
        image: "images/two2.png",
        id: "two2",
        x: 0,
        y: 0
    },
    {
        image: "images/two3.png",
        id: "two3",
        x: 0,
        y: 0
    },
    {
        image: "images/two4.png",
        id: "two4",
        x: 0,
        y: 0
    },
    {
        image: "images/three1.png",
        id: "three1",
        x: 0,
        y: 0
    },
    {
        image: "images/three2.png",
        id: "three2",
        x: 0,
        y: 0
    },
    {
        image: "images/three3.png",
        id: "three3",
        x: 0,
        y: 0
    },
    {
        image: "images/three4.png",
        id: "three4",
        x: 0,
        y: 0
    },
    {
        image: "images/four1.png",
        id: "four1",
        x: 0,
        y: 0
    },
    {
        image: "images/four2.png",
        id: "four2",
        x: 0,
        y: 0
    },
    {
        image: "images/four3.png",
        id: "four3",
        x: 0,
        y: 0
    },
    {
        image: "images/four4.png",
        id: "four4",
        x: 0,
        y: 0
    },
    {
        image: "images/five1.png",
        id: "five1",
        x: 0,
        y: 0
    },
    {
        image: "images/five2.png",
        id: "five2",
        x: 0,
        y: 0
    },
    {
        image: "images/five3.png",
        id: "five3",
        x: 0,
        y: 0
    },
    {
        image: "images/five4.png",
        id: "five4",
        x: 0,
        y: 0
    },
    {
        image: "images/six1.png",
        id: "six1",
        x: 0,
        y: 0
    },
    {
        image: "images/six2.png",
        id: "six2",
        x: 0,
        y: 0
    },
    {
        image: "images/six3.png",
        id: "six3",
        x: 0,
        y: 0
    },
    {
        image: "images/six4.png",
        id: "six4",
        x: 0,
        y: 0
    },
    {
        image: "images/seven1.png",
        id: "seven1",
        x: 0,
        y: 0
    },
    {
        image: "images/seven2.png",
        id: "seven2",
        x: 0,
        y: 0
    },
    {
        image: "images/seven3.png",
        id: "seven3",
        x: 0,
        y: 0
    },
    {
        image: "images/seven4.png",
        id: "seven4",
        x: 0,
        y: 0
    },
    {
        image: "images/eight1.png",
        id: "eight1",
        x: 0,
        y: 0
    },
    {
        image: "images/eight2.png",
        id: "eight2",
        x: 0,
        y: 0
    },
    {
        image: "images/eight3.png",
        id: "eight3",
        x: 0,
        y: 0
    },
    {
        image: "images/eight4.png",
        id: "eight4",
        x: 0,
        y: 0
    },
    {
        image: "images/nine1.png",
        id: "nine1",
        x: 0,
        y: 0
    },
    {
        image: "images/nine2.png",
        id: "nine2",
        x: 0,
        y: 0
    },
    {
        image: "images/nine3.png",
        id: "nine3",
        x: 0,
        y: 0
    },
    {
        image: "images/nine4.png",
        id: "nine4",
        x: 0,
        y: 0
    },
    {
        image: "images/ten1.png",
        id: "ten1",
        x: 0,
        y: 0
    },
    {
        image: "images/ten2.png",
        id: "ten2",
        x: 0,
        y: 0
    },
    {
        image: "images/ten3.png",
        id: "ten3",
        x: 0,
        y: 0
    },
    {
        image: "images/ten4.png",
        id: "ten4",
        x: 0,
        y: 0
    },
    {
        image: "images/jack1.png",
        id: "jack1",
        x: 0,
        y: 0
    },
    {
        image: "images/jack2.png",
        id: "jack2",
        x: 0,
        y: 0
    },
    {
        image: "images/jack3.png",
        id: "jack3",
        x: 0,
        y: 0
    },
    {
        image: "images/jack4.png",
        id: "jack4",
        x: 0,
        y: 0
    },
    {
        image: "images/queen1.png",
        id: "queen1",
        x: 0,
        y: 0
    },
    {
        image: "images/queen2.png",
        id: "queen2",
        x: 0,
        y: 0
    },
    {
        image: "images/queen3.png",
        id: "queen3",
        x: 0,
        y: 0
    },
    {
        image: "images/queen4.png",
        id: "queen4",
        x: 0,
        y: 0
    },
    {
        image: "images/king1.png",
        id: "king1",
        x: 0,
        y: 0
    },
    {
        image: "images/king2.png",
        id: "king2",
        x: 0,
        y: 0
    },
    {
        image: "images/king3.png",
        id: "king3",
        x: 0,
        y: 0
    },
    {
        image: "images/king4.png",
        id: "king4",
        x: 0,
        y: 0
    }
];

/**
 * The next 2 functions are for the card draw sound using the SoundJS library.
 */
const loadSound = () => {
    createjs.Sound.addEventListener("fileload", playSound);
    createjs.Sound.registerSound("sounds/draw.wav", soundID);
};

const playSound = () => {
    createjs.Sound.play(soundID, {delay: 150});
    createjs.Sound.play(soundID, {delay: 800});
    createjs.Sound.play(soundID, {delay: 1200});
    createjs.Sound.play(soundID, {delay: 1700});
    createjs.Sound.play(soundID, {delay: 2200});
};

const tick = () => {
    stage.update();
};

/**
 * This function draws the deck and the back of the deck.
 */
const deckDraw = () => {
    for (let i = 0; i <= cardArr.length - 1; i++) {
        let cards = new Image();
        cards.src = cardArr[i].image;
        let bitmapC = new createjs.Bitmap(cards);
        bitmapC.x = 800;
        bitmapC.y = 80;
        stage.addChild(bitmapC);
    }
    let cards = new Image();
    cards.src = "images/back.png";
    let bitmapC = new createjs.Bitmap(cards);
    bitmapC.x = 800;
    bitmapC.y = 80;
    stage.addChild(bitmapC);

    let cards1 = new Image();
    cards1.src = "images/back.png";
    let bitmapC1 = new createjs.Bitmap(cards1);
    bitmapC1.x = 805;
    bitmapC1.y = 80;
    stage.addChild(bitmapC1);

    let cards2 = new Image();
    cards2.src = "images/back.png";
    let bitmapC2 = new createjs.Bitmap(cards2);
    bitmapC2.x = 810;
    bitmapC2.y = 80;
    stage.addChild(bitmapC2);

    bitmapC2.shadow = new createjs.Shadow("#000000", 5, 5, 10);
};

const dealerHand = () => {
    for (let i = 0; i < 3; i++)
    {
        let x = cardRandomizer();
        dlrHand.push(x[0]);
    }

    dlrHand[0].x = 800;
    dlrHand[0].y = 80;

    let card1 = new Image();
    card1.src = dlrHand[0].image;
    let bitmap1 = new createjs.Bitmap(card1);
    bitmap1.x = dlrHand[0].x;
    bitmap1.y = dlrHand[0].y;
    stage.addChild(bitmap1);

    bitmap1.shadow = new createjs.Shadow("#000000", 5, 5, 10);

    createjs.Tween.get(bitmap1, {override:true}).wait(500).to({x:200, y: 35}, 600);

    dlrHand[1].x = 800;
    dlrHand[1].y = 80;

    let card2 = new Image();
    card2.src = dlrHand[1].image;
    let bitmap2 = new createjs.Bitmap(card2);
    bitmap2.x = dlrHand[1].x;
    bitmap2.y = dlrHand[1].y;
    stage.addChild(bitmap2);

    bitmap2.shadow = new createjs.Shadow("#000000", 5, 5, 10);

    createjs.Tween.get(bitmap2, {override:true}).wait(1000).to({x:400, y: 35}, 500);

    dlrHand[2].x = 800;
    dlrHand[2].y = 80;

    let card3 = new Image();
    card3.src = dlrHand[2].image;
    let bitmap3 = new createjs.Bitmap(card3);
    bitmap3.x = dlrHand[2].x;
    bitmap3.y = dlrHand[2].y;
    stage.addChild(bitmap3);

    bitmap3.shadow = new createjs.Shadow("#000000", 5, 5, 10);

    createjs.Tween.get(bitmap3, {override:true}).wait(1500).to({x:600, y: 35}, 400);
};

/**
 *This function draws the player's hand cards.
 * @param objCard Specifies the exact card object from the array.
 * @param waitTime Specifies the delay before card drawing.
 * @param objPosition Specifies X and Y positions on the canvas where the card should be drawn.
 */
const drawCard = (objCard, waitTime, objPosition) => {
    let plrCardObject = objCard;
    plrCardObject.x = objPosition.startX;
    plrCardObject.y = objPosition.startY;

    let plrCard = new Image();
    plrCard.src = plrCardObject.image;
    let plrBitmap = new createjs.Bitmap(plrCard);
    plrBitmap.x = plrCardObject.x;
    plrBitmap.y = plrCardObject.y;
    stage.addChild(plrBitmap);

    plrBitmap.shadow = new createjs.Shadow("#000000", 5, 5, 10);

    plrBitmap.addEventListener('click', () => {
        removePlayerCard(plrBitmap);
        if (typeof cardArr !== "undefined" && cardArr.length > 0) {
            playerHand(objPosition.cardPos, 600, 500);
            createjs.Sound.play(soundID, {delay: 500});
        } else {
            let txt = new createjs.Text();
            txt.x = 400;
            txt.y = 550;
            txt.font = "bold 96px Indie Flower";
            txt.color = "#000000";
            txt.text = "Game Over!";
            stage.addChild(txt);
            txt.shadow = new createjs.Shadow("#000000", 5, 5, 10);
        }
    }, false);

    createjs.Tween.get(plrBitmap, {override:true}).wait(waitTime).to({ x: objPosition.endX, y: objPosition.endY }, 200);

    return plrBitmap;
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

    arrRemoved.push(cardA);
    arrRemoved.push(cardB);

    plrHand.length = 0;
};

/**
 * This function removes player's card to the designated coordinates using fade effect.
 * @param objCard This parameter specifies which card from the players hand to be removed.
 */
const removePlayerCard = (objCard) => {
    createjs.Tween.get(objCard).to({x: 20, y: 520, alpha:0, visible: false}, 200);
};

/**
 * This function cuts random object from the card array and returns it as an array.
 */
const cardRandomizer = () => {
    return cardArr.splice(Math.floor(Math.random() * cardArr.length), 1);
};

/**
 * This function can be used for scaling contents on different screen sizes.
 */
const resize = () => {
    stage.canvas.width = window.innerWidth;
    stage.canvas.height = window.innerHeight;
};

let hitButton = document.getElementById("hitButton");
hitButton.addEventListener("click", () => {
    hitClicked = true;
    if (typeof cardArr !== "undefined" && cardArr.length > 0) {
        playerHand('both', 500, 400);
        createjs.Sound.play(soundID, {delay: 250});
        createjs.Sound.play(soundID, {delay: 450});
    } else {
        let txt = new createjs.Text();
        txt.x = 400;
        txt.y = 550;
        txt.font = "bold 96px Indie Flower";
        txt.color = "#000000";
        txt.text = "Game Over!";
        stage.addChild(txt);
        txt.shadow = new createjs.Shadow("#000000", 5, 5, 10);
    }
});

window.addEventListener('resize', resize, false);

let init = () => {
    stage = new createjs.Stage("screenView");
    createjs.Ticker.addEventListener("tick", () => {
        tick();
    });
    dealerHand();
    playerHand("both", 2000, 2500);
    deckDraw();
    resize();
    loadSound();
};