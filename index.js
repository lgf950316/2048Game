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

function drawcell(rowIndex, columnIndex) {

    var graphics = new PIXI.Graphics();
    graphics.beginFill(getColorByNumber(grid[rowIndex][columnIndex]), 1);
    graphics.drawRect(columnIndex * 190 + app.renderer.width / 8.5, rowIndex * 190 + app.renderer.height / 8 * 2.5, 185, 185);
    app.stage.addChild(graphics);

    if (grid[rowIndex][columnIndex] !== 0) {
        var number = new PIXI.Text(grid[rowIndex][columnIndex], {fontSize: 150});
        number.anchor.set(0.5);
        number.x = 185 / 2 + app.renderer.width / 8.5 + columnIndex * 190;
        number.y = 185 / 2 + app.renderer.height / 8 * 2.5 + rowIndex * 190;
        app.stage.addChild(number);
    }
}

function getColorByNumber(number) {
    var colorValue = {
        0: 0xFFA54F,
        2: 0x00ffff,
        4: 0x0000ff
    };
    var color = colorValue[number];
    if (color === undefined) {
        color = 0xff0fff;
    }

    return color;
}

function addRandomCell() {
    var rowIndex = randomNumber();
    var columnIndex = randomNumber();
    while (grid[rowIndex][columnIndex] !== 0 ){
        rowIndex = randomNumber();
        columnIndex = randomNumber();
    }
    grid[rowIndex][columnIndex] = 2;
}
addRandomCell();
addRandomCell();
flushUI();

document.addEventListener("keydown", function (event) {
    if (event.keyCode == 39) {//right
        moveCellToRight();
        flushUI();
    }
    if (event.keyCode == 38) {//up
        rotateArray(1);
        moveCellToRight();
        rotateArray(3);
        addRandomCell();
        flushUI();
    }

    if (event.keyCode == 37) {//left
        rotateArray(2);
        moveCellToRight();
        rotateArray(2);
        addRandomCell();
        flushUI();
    }

    if (event.keyCode == 40) {//down
        rotateArray(3);
        moveCellToRight();
        rotateArray(1);
        addRandomCell();
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
            }
            var currentIndex = theEmptyCellIndex === -1 ? columnIndex : theEmptyCellIndex;
            if (grid[rowIndex][currentIndex] === grid[rowIndex][currentIndex + 1]) {
                grid[rowIndex][currentIndex + 1] += grid[rowIndex][currentIndex];
                grid[rowIndex][currentIndex] = 0;
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

function rotateArray(rotateCount ) {
    for (var i = 0 ; i < rotateCount; i ++) {
        grid = rotateArrayToRightOnce(grid);
    }

    function rotateArrayToRightOnce(array) {
        return array.map((row, rowIndex) => {
                return row.map((item, columnIndex) => {
                    return array[3 - columnIndex][rowIndex];
                })
        })
    }
}