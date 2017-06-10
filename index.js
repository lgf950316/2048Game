/**
 * Created by O'Sullivan on 2017/6/10/010.
 */
var app = new PIXI.Application(window.innerWidth, window.innerHeight, {backgroundColor: 0x54FF9F});
document.body.appendChild(app.view);
var basicText = new PIXI.Text('2048', {fontSize: 200});

basicText.x = app.renderer.width/3.6;
basicText.y = app.renderer.height/9;
app.stage.addChild(basicText);

var grid = [];
for (var i = 0; i < 4; i++) {
    grid[i] = [0, 0, 0, 0]
}

//画网格
for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
        var graphics = new PIXI.Graphics();
        //graphics.lineStyle(2, 0x0000FF, 1);
        graphics.beginFill(0xFFA54F, 1);
        graphics.drawRect(app.renderer.width / 8.5  + 190 * j, app.renderer.height / 8 * 2.5 + 190 * i, 185, 185);
        app.stage.addChild(graphics);
    }
}
