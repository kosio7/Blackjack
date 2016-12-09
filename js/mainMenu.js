/**
 * This function is for the game start, it calls the init function. It is also used for the game restart.
 * @param text This parameter is used to draw a label on the button. For new game it is PLAY, for game reset the text is RESET.
 */
const gameInitButton = (text) => {
    let rectangle, bTxt, button;

    rectangle = new createjs.Graphics().beginStroke("#000000").beginLinearGradientFill(["#BF1111","#FF6363"], [0, 1],70, 40, -10, 40).drawRoundRect(0,0,120,80,5);
    button = new createjs.Shape(rectangle);
    button.regX = 60;
    button.x = window.innerWidth / 2;
    button.y = 250;
    button.alpha = 0;
    button.shadow = new createjs.Shadow("#000000", 0, 0, 40);
    createjs.Tween.get(button).to({alpha:1}, 800);
    stage.addChild(button);

    bTxt = new createjs.Text(text, "25px Coffee", "#000000");
    bTxt.regX = bTxt.getMeasuredWidth() / 2;
    bTxt.x = button.x;
    bTxt.y = button.y + 25;
    bTxt.alpha = 0;
    bTxt.shadow = new createjs.Shadow("#000000", 5, 5, 10);
    createjs.Tween.get(bTxt, {loop: true})
        .to({alpha:1}, 700)
        .wait(750)
        .to({alpha: .3}, 700);
    createjs.Tween.get(button, {loop: true})
        .to({alpha:1}, 700)
        .wait(750)
        .to({alpha: .3}, 700);
    stage.addChild(bTxt);

    stage.enableMouseOver();
    button.cursor = "pointer";
    button.on("click", () => {
        createjs.Sound.play("button");
        stage.removeAllChildren();
        init();
    });
};

/**
 * This function draws and animates the game logo on the game reveal screen.
 */
const gameLogo = () => {
    let blackjackLogo = new createjs.Text("BLACKJACK", "120px Coffee", "#000000");
    blackjackLogo.regX = blackjackLogo.getMeasuredWidth() / 2;
    blackjackLogo.regY = blackjackLogo.getMeasuredHeight() / 2;
    blackjackLogo.scaleX = -1;
    blackjackLogo.scaleY = -1;
    blackjackLogo.x = window.innerWidth / 2;
    blackjackLogo.y = 100;
    blackjackLogo.alpha = 0;
    blackjackLogo.shadow = new createjs.Shadow("#000000", 5, 5, 30);
    createjs.Tween.get(blackjackLogo)
        .to({alpha:1}, 1000)
        .to({scaleX: 1, scaleY: 1}, 1000);

    let logoHeart = new createjs.Text("r", "120px Hoyle", "#FF0000");
    logoHeart.regX = logoHeart.getMeasuredWidth() / 2;
    logoHeart.regY = logoHeart.getMeasuredHeight() / 2;
    logoHeart.x = -50;
    logoHeart.y = 100;
    logoHeart.alpha = 0;
    logoHeart.shadow = new createjs.Shadow("#000000", 5, 5, 30);
    createjs.Tween.get(logoHeart).to({alpha:1}, 1000);

    let logoSpade = new createjs.Text("q", "120px Hoyle", "#000000");
    logoSpade.regX = logoSpade.getMeasuredWidth() / 2;
    logoSpade.regY = logoSpade.getMeasuredHeight() / 2;
    logoSpade.x = window.innerWidth + 50;
    logoSpade.y = 100;
    logoSpade.alpha = 0;
    logoSpade.shadow = new createjs.Shadow("#000000", 5, 5, 30);
    createjs.Tween.get(logoSpade).to({alpha:1}, 1000);

    stage.addChild(blackjackLogo, logoHeart, logoSpade);
    createjs.Tween.get(logoHeart).wait(1500)
        .to({x:blackjackLogo.x - 400, y: blackjackLogo.y - 20}, 400, createjs.Ease.backOut);
    createjs.Tween.get(logoSpade).wait(1500)
        .to({x:blackjackLogo.x + 400, y: blackjackLogo.y - 20}, 400, createjs.Ease.backOut);
};

/**
 * This function draws a container with four aces on the stage, then animates them. They are drawn on the game reveal screen.
 */
const drawAcesOnGameReveal = () => {
    let aces, ace1, ace2, ace3, ace4;

    aces = new createjs.Container();
    aces.regX = aces.getBounds() / 2;
    aces.x = window.innerWidth / 2;
    aces.y = 450;

    ace1 = new createjs.Bitmap("images/ace1.png");
    ace1.regX = 75;
    ace1.regY = 113;
    ace1.x = -375;
    ace1.alpha = 0;
    ace1.shadow = new createjs.Shadow("#000000", 5, 5, 10);
    createjs.Tween.get(ace1).wait(2000)
        .to({alpha:1}, 1500)
        .to({rotation:350}, 1000,createjs.Ease.backInOut);

    ace2 = new createjs.Bitmap("images/ace2.png");
    ace2.regX = 75;
    ace2.regY = 113;
    ace2.x = -125;
    ace2.alpha = 0;
    ace2.shadow = new createjs.Shadow("#000000", 5, 5, 10);
    createjs.Tween.get(ace2).wait(1000)
        .to({alpha:1}, 1500)
        .to({rotation:-350}, 1000, createjs.Ease.backInOut).wait(1000)
        .to({x:375, y:-1000}, 1000);

    ace3 = new createjs.Bitmap("images/ace3.png");
    ace3.regX = 75;
    ace3.regY = 113;
    ace3.x = 125;
    ace3.alpha = 0;
    ace3.shadow = new createjs.Shadow("#000000", 5, 5, 10);
    createjs.Tween.get(ace3).wait(1000)
        .to({alpha:1}, 1500)
        .to({rotation:350}, 1000, createjs.Ease.backInOut).wait(1000)
        .to({x:-375, y:-1000}, 1000);

    ace4 = new createjs.Bitmap("images/ace4.png");
    ace4.regX = 75;
    ace4.regY = 113;
    ace4.x = 375;
    ace4.alpha = 0;
    ace4.shadow = new createjs.Shadow("#000000", 5, 5, 10);
    createjs.Tween.get(ace4).wait(2000)
        .to({alpha:1}, 1500)
        .to({rotation:-350}, 1000, createjs.Ease.backInOut);

    aces.addChild(ace1, ace2, ace3, ace4);
    stage.addChild(aces);
};

/**
 * This function starts the game reveal screen. The functions for drawing the PLAY button, logo, and four aces are called.
 */
const gameReveal = () => {
    stage.removeChild(load);
    setTimeout(() => {
        createjs.Sound.play("intro");
    }, 1050);
    createjs.Tween.get(this).wait(200).call(gameLogo);
    createjs.Tween.get(this).wait(600).call(drawAcesOnGameReveal);
    setTimeout(() => {
        gameInitButton("PLAY");
    }, 5500);
    resize();
};