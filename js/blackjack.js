let stage;
let dlrHand = [];
let plrHand = [];
let hitClicked = false;

let hitButton = document.getElementById("hitButton");
hitButton.addEventListener("click", () => {
    hitClicked = true;
    playerHand(1000, 2000);
});

window.addEventListener('resize', resize, false);

function init() {
    stage = new createjs.Stage("screenView");
    let that = this;
    createjs.Ticker.addEventListener("tick", function () {
        that.tick();
    });

    resize();

    dealerHand();
    playerHand(4000, 5000);
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

    createjs.Tween.get(bitmap1, {override:true}).wait(1000).to({x:200, y: 35}, 1000);

    let cardObject2 = dlrHand[1];
    cardObject2.x = 800;
    cardObject2.y = 80;

    let card2 = new Image();
    card2.src = cardObject2.image;
    let bitmap2 = new createjs.Bitmap(card2);
    bitmap2.x = cardObject2.x;
    bitmap2.y = cardObject2.y;
    stage.addChild(bitmap2);

    createjs.Tween.get(bitmap2, {override:true}).wait(2000).to({x:400, y: 35}, 1000);

    let cardObject3 = dlrHand[2];
    cardObject3.x = 800;
    cardObject3.y = 80;

    let card3 = new Image();
    card3.src = cardObject3.image;
    let bitmap3 = new createjs.Bitmap(card3);
    bitmap3.x = cardObject3.x;
    bitmap3.y = cardObject3.y;
    stage.addChild(bitmap3);

    createjs.Tween.get(bitmap3, {override:true}).wait(3000).to({x:600, y: 35}, 1000);
}

function playerHand(waitTime1, waitTime2) {

    for (let i = 0; i < 2; i++)
    {
        let x = cardRandomizer();
        plrHand.push(x[0]);
    }

    let plrCardObject1 = plrHand[0];
    plrCardObject1.x = 800;
    plrCardObject1.y = 80;
    
    let plrCard1 = new Image();
    plrCard1.src = plrCardObject1.image;
    let plrBitmap1 = new createjs.Bitmap(plrCard1);
    plrBitmap1.x = plrCardObject1.x;
    plrBitmap1.y = plrCardObject1.y;
    stage.addChild(plrBitmap1);

    createjs.Tween.get(plrBitmap1, {override:true}).wait(waitTime1).to({x:300, y: 300}, 1000);

    let plrCardObject2 = plrHand[1];
    plrCardObject2.x = 800;
    plrCardObject2.y = 80;

    let plrCard2 = new Image();
    plrCard2.src = plrCardObject2.image;
    let plrBitmap2 = new createjs.Bitmap(plrCard2);
    plrBitmap2.x = plrCardObject2.x;
    plrBitmap2.y = plrCardObject2.y;
    stage.addChild(plrBitmap2);

    createjs.Tween.get(plrBitmap2, {override:true}).wait(waitTime2).to({x:500, y: 300}, 1000);


    plrHand.length = 0;

    if (hitClicked) {
        let arrRemoved = [plrBitmap1, plrBitmap2];
        arrRemoved.forEach((el) => {
            removePlayerCard(el);
        });
    }
}

function removePlayerCard(objCard) {
    createjs.Tween.get(objCard).to({alpha:0, visible:false}, 1000);
}

function cardRandomizer() {
    return cardArr.splice(Math.floor(Math.random() * cardArr.length), 1);
}

