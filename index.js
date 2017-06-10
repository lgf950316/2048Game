/**
 * Created by O'Sullivan on 2017/6/10/010.
 */
var app = new PIXI.Application(window.innerWidth, window.innerHeight, {backgroundColor: 0x1099bb});
document.body.appendChild(app.view);
var basicText = new PIXI.Text('2048', {fontSize: 200});

basicText.x = app.renderer.width/3.5;
basicText.y = app.renderer.height/8;
app.stage.addChild(basicText);

var grid = [];
for (var i = 0; i < 4; i++) {
    grid[i] = [0, 0, 0, 0]
}

//画网格
for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
        var graphics = new PIXI.Graphics();
        graphics.lineStyle(2, 0x0000FF, 1);
        graphics.beginFill(0xFF700B, 1);
        graphics.drawRect(app.renderer.width / 5.5  + 155 * j, app.renderer.height / 8 * 2.5 + 155 * i, 150, 150);
        app.stage.addChild(graphics);
    }
}
