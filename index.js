/**
 * Created by O'Sullivan on 2017/6/10/010.
 */
var app = new PIXI.Application(window.innerWidth, window.innerHeight, {backgroundColor: 0x54FF9F});
document.body.appendChild(app.view);

var basicText = new PIXI.Text('2048', {fontSize: 200});
basicText.anchor.set(0.5);
basicText.x = app.renderer.width / 2;
basicText.y = app.renderer.height / 6;
app.stage.addChild(basicText);

var grid = [];
for (var i = 0; i < 4; i++) {
    grid[i] = [0, 0, 0, 0]
}

//画网格
for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
        var graphics = new PIXI.Graphics();
        graphics.beginFill(0xFFA54F, 1);
        graphics.drawRect(app.renderer.width / 8.5 + 190 * j, app.renderer.height / 8 * 2.5 + 190 * i, 185, 185);
        app.stage.addChild(graphics);
    }
}

//随机生成数字
function randomNumber() {
    return Math.floor(Math.random() * 4);
}

var x = randomNumber();
var y = randomNumber();

var graphics = new PIXI.Graphics();
graphics.beginFill(0xFF0000, 1);
graphics.drawRect(x * 190 + app.renderer.width / 8.5, y * 190 + app.renderer.height / 8 * 2.5, 185, 185);
app.stage.addChild(graphics);

var number = new PIXI.Text('2', {fontSize: 150});
number.anchor.set(0.5);
number.x = 185 / 2 + app.renderer.width / 8.5 + x * 190;
number.y = 185 / 2 + app.renderer.height / 8 * 2.5 + y * 190;
app.stage.addChild(number);