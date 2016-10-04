let stage;
let dlrHand = new Array();
let frontOfCard;
let backOfCard;

/*function gameInit() {
    init();
    createDeck();
    deckShuffle();
    dealerCards();
    playerCards();


}*/

window.addEventListener('resize', resize, false);

function init() {
    stage = new createjs.Stage("screen-view");
    let that = this;
    createjs.Ticker.addEventListener("tick", function () {
        that.tick();
    });
    resize();

    dealerHand();

    console.log(dlrHand.length);

}

function tick() {
    stage.update();
}

function resize() {
    stage.canvas.width = window.innerWidth;
    stage.canvas.height = window.innerHeight;
}

/* Deck images created by http://byronknoll.blogspot.bg/2011/03/vector-playing-cards.html*/

let arr = new Array();
arr.push({  image: "images/ace1.png",
            x: 0,
            y: 0
});
arr.push({  image: "images/ace2.png",
            x: 0,
            y: 0
});
arr.push({  image: "images/ace3.png",
            x: 0,
            y: 0
});
arr.push({ image: "images/ace4.png",
           x: 0,
           y: 0
});


function dealerHand() {
    for(let i = 0; i<3;i++)
    {
        let x = arr[Math.floor(Math.random() * arr.length)];
        dlrHand.push(x);
    }

    let cardObject = dlrHand[0];
    cardObject.x = 800;
    cardObject.y = 200;

    let ace = new Image();
    ace.src = cardObject.image;
    let bitmap = new createjs.Bitmap(ace);
    bitmap.x = cardObject.x;
    bitmap.y = cardObject.y;
    stage.addChild(bitmap);

    let cardObject1 = dlrHand[1];
    cardObject1.x = 600;
    cardObject1.y = 200;

    let ace1 = new Image();
    ace1.src = cardObject1.image;
    let bitmap1 = new createjs.Bitmap(ace1);
    bitmap1.x = cardObject1.x;
    bitmap1.y = cardObject1.y;
    stage.addChild(bitmap1);

    let cardObject2 = dlrHand[2];
    cardObject2.x = 400;
    cardObject2.y = 200;

    let ace2 = new Image();
    ace2.src = cardObject2.image;
    let bitmap2 = new createjs.Bitmap(ace2);
    bitmap2.x = cardObject2.x;
    bitmap2.y = cardObject2.y;
    stage.addChild(bitmap2);
}

function playerHand() {

}

function cardRandomizer() {
    return arr[Math.floor(Math.random() * arr.length)];
}

