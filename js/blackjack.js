let stage;
let dlrHand = [];
let plrHand = [];
let arrRemoved = [];
let hitClicked = false;
let soundID = 'music';

let hitButton = document.getElementById("hitButton");
hitButton.addEventListener("click", () => {
    hitClicked = true;
    playerHand('both', 500, 400);
});

window.addEventListener('resize', resize, false);

function init() {
    stage = new createjs.Stage("screenView");
    let that = this;
    createjs.Ticker.addEventListener("tick", function () {
        that.tick();
    });

    dealerHand();
    playerHand("both", 2000, 2500);
    deckDraw();

    resize();

    loadSound();
}


function loadSound () {
    createjs.Sound.addEventListener("fileload", playSound);
    createjs.Sound.registerSound("sounds/POL-casino-short.mp3", soundID);
}

function playSound () {
    createjs.Sound.play(soundID, {loop: -1});
}

function tick() {
    stage.update();
}

function resize() {
    stage.canvas.width = window.innerWidth;
    stage.canvas.height = window.innerHeight;
}

/* Deck images created by http://byronknoll.blogspot.bg/2011/03/vector-playing-cards.html*/

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
    }
];

function deckDraw() {
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
}

function dealerHand() {

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

    createjs.Tween.get(bitmap1, {override:true}).wait(500).to({x:200, y: 35}, 700);

    dlrHand[1].x = 800;
    dlrHand[1].y = 80;

    let card2 = new Image();
    card2.src = dlrHand[1].image;
    let bitmap2 = new createjs.Bitmap(card2);
    bitmap2.x = dlrHand[1].x;
    bitmap2.y = dlrHand[1].y;
    stage.addChild(bitmap2);

    bitmap2.shadow = new createjs.Shadow("#000000", 5, 5, 10);

    createjs.Tween.get(bitmap2, {override:true}).wait(1000).to({x:400, y: 35}, 600);

    dlrHand[2].x = 800;
    dlrHand[2].y = 80;

    let card3 = new Image();
    card3.src = dlrHand[2].image;
    let bitmap3 = new createjs.Bitmap(card3);
    bitmap3.x = dlrHand[2].x;
    bitmap3.y = dlrHand[2].y;
    stage.addChild(bitmap3);

    bitmap3.shadow = new createjs.Shadow("#000000", 5, 5, 10);

    createjs.Tween.get(bitmap3, {override:true}).wait(1500).to({x:600, y: 35}, 500);
}

function drawCard(objCard, waitTime, objPosition) {
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
        playerHand(objPosition.cardPos, 600, 500);
    }, false);

    createjs.Tween.get(plrBitmap, {override:true}).wait(waitTime).to({ x: objPosition.endX, y: objPosition.endY }, 200);

    return plrBitmap;
}

function playerHand(whichCard, waitTimeCardA, waitTimeCardB) {
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
}

function removePlayerCard(objCard) {
    createjs.Tween.get(objCard).to({x: 20, y: 520, alpha:0, visible: false}, 200);
}

function cardRandomizer() {
    return cardArr.splice(Math.floor(Math.random() * cardArr.length), 1);
}