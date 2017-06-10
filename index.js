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

        drawcell(i, j);
    }
}

//随机生成数字
function randomNumber() {
    return Math.floor(Math.random() * 4);
}

function drawcell(x, y) {
    var color = 0xFFA54F;
    if (grid[x][y] == 2) {
        color = 0xff0000;
    }
    var graphics = new PIXI.Graphics();
    graphics.beginFill(color, 1);
    graphics.drawRect(y * 190 + app.renderer.width / 8.5, x * 190 + app.renderer.height / 8 * 2.5, 185, 185);
    app.stage.addChild(graphics);

    if (grid[x][y] == 2) {
        var number = new PIXI.Text(grid[x][y], {fontSize: 150});
        number.anchor.set(0.5);
        number.x = 185 / 2 + app.renderer.width / 8.5 + y * 190;
        number.y = 185 / 2 + app.renderer.height / 8 * 2.5 + x * 190;
        app.stage.addChild(number);
    }
}

var x = randomNumber();
var y = randomNumber();
grid[x][y] = 2;

drawcell(x, y);
document.addEventListener("keydown", function (event) {
    if (event.keyCode == 39) {
        console.log(event);
    }

})