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
    grid[i] = [0, 0,0, 0]
}

function flushUI() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            drawcell(i, j);
        }
    }
}


//随机生成数字
function randomNumber() {
    return Math.floor(Math.random() * 4);
}

function drawcell(x, y) {

    var graphics = new PIXI.Graphics();
    graphics.beginFill(getColorByNumber(grid[x][y]), 1);
    graphics.drawRect(y * 190 + app.renderer.width / 8.5, x * 190 + app.renderer.height / 8 * 2.5, 185, 185);
    app.stage.addChild(graphics);

    if (grid[x][y] !== 0) {
        var number = new PIXI.Text(grid[x][y], {fontSize: 150});
        number.anchor.set(0.5);
        number.x = 185 / 2 + app.renderer.width / 8.5 + y * 190;
        number.y = 185 / 2 + app.renderer.height / 8 * 2.5 + x * 190;
        app.stage.addChild(number);
    }
}

function getColorByNumber(number){
    var colorValue={
        0:0xFFA54F,
        2:0x00ffff,
        4:0x0000ff
    }
    return colorValue[number];
}

var rwoIndex = randomNumber();
var columnIndex = randomNumber();
grid[rwoIndex][columnIndex] = 2;
flushUI();

document.addEventListener("keydown", function (event) {
    if (event.keyCode == 39) {
        moveCellToRight();
        flushUI();
    }

})

function moveCellToRight() {
    for (var rowIndex = 0; rowIndex < 4; rowIndex++) {
        for (var columnIndex = 2; columnIndex >= 0; columnIndex--) {
            if (grid[rowIndex][columnIndex] === 0) continue;

            var theEmptyCellIndex = findTheFirstRightCell(rowIndex, columnIndex);
            if (theEmptyCellIndex !== -1) {
                grid[rowIndex][theEmptyCellIndex] = grid[rowIndex][columnIndex];
                grid[rowIndex][columnIndex] = 0;

                if (grid[rowIndex][theEmptyCellIndex] === grid[rowIndex][theEmptyCellIndex + 1]) {
                    grid[rowIndex][theEmptyCellIndex+ 1] += grid[rowIndex][theEmptyCellIndex];
                    grid[rowIndex][theEmptyCellIndex] = 0;
                }
            }

        }
    }
}

function findTheFirstRightCell(rowIndex, columnIndex) {
    for (var i = 3; i > columnIndex; i--) {
        if (grid[rowIndex][i] === 0) {
            return i;
        }
    }

    return -1;
}