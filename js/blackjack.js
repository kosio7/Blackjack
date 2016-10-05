let stage;
let dlrHand = [];
let plrHand = [];


window.addEventListener('resize', resize, false);

function init() {
    stage = new createjs.Stage("screen-view");
    let that = this;
    createjs.Ticker.addEventListener("tick", function () {
        that.tick();
    });

    resize();

    dealerHand();
    playerHand();
    deckDraw();

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
}

function dealerHand() {

    for (let i = 0; i < 3; i++)
    {
        let x = cardArr.splice(Math.floor(Math.random() * cardArr.length), 1);
        dlrHand.push(x[0]);
    }

    dlrHand[0].x = 200;
    dlrHand[0].y = 35;

    let card1 = new Image();
    card1.src = dlrHand[0].image;
    let bitmap1 = new createjs.Bitmap(card1);
    bitmap1.x = dlrHand[0].x;
    bitmap1.y = dlrHand[0].y;
    stage.addChild(bitmap1);


    let cardObject2 = dlrHand[1];
    cardObject2.x = 400;
    cardObject2.y = 35;

    let card2 = new Image();
    card2.src = cardObject2.image;
    let bitmap2 = new createjs.Bitmap(card2);
    bitmap2.x = cardObject2.x;
    bitmap2.y = cardObject2.y;
    stage.addChild(bitmap2);

    let cardObject3 = dlrHand[2];
    cardObject3.x = 600;
    cardObject3.y = 35;

    let card3 = new Image();
    card3.src = cardObject3.image;
    let bitmap3 = new createjs.Bitmap(card3);
    bitmap3.x = cardObject3.x;
    bitmap3.y = cardObject3.y;
    stage.addChild(bitmap3);
}

function playerHand() {

    for (let i = 0; i < 2; i++)
    {
        let x = cardArr.splice(Math.floor(Math.random() * cardArr.length), 1);
        plrHand.push(x[0]);
    }

    let plrCardObject1 = plrHand[0];
    plrCardObject1.x = 300;
    plrCardObject1.y = 300;
    
    let plrCard1 = new Image();
    plrCard1.src = plrCardObject1.image;
    let plrBitmap1 = new createjs.Bitmap(plrCard1);
    plrBitmap1.x = plrCardObject1.x;
    plrBitmap1.y = plrCardObject1.y;
    stage.addChild(plrBitmap1);

    let plrCardObject2 = plrHand[1];
    plrCardObject2.x = 500;
    plrCardObject2.y = 300;

    let plrCard2 = new Image();
    plrCard2.src = plrCardObject2.image;
    let plrBitmap2 = new createjs.Bitmap(plrCard2);
    plrBitmap2.x = plrCardObject2.x;
    plrBitmap2.y = plrCardObject2.y;
    stage.addChild(plrBitmap2);

}

function cardRandomizer() {
    return cardArr[Math.floor(Math.random() * cardArr.length)];
}

