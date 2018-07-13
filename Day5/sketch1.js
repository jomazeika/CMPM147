function setup() {
    createCanvas(640,480);
    linesToDraw = [];
    addedLines = [];
    heldPoint = null;
}

function mouseClicked(){
    if (heldPoint == null)
    {
        heldPoint = [mouseX,mouseY];
    }
    else {
        linesToDraw.push([mouseX,mouseY,heldPoint[0],heldPoint[1]]);
        heldPoint = null;
      }
}

function draw() {
    background(175);
    stroke(0);
    for (var i = 0; i < linesToDraw.length; i++)
    {
        line(linesToDraw[i][0],linesToDraw[i][1],linesToDraw[i][2],linesToDraw[i][3]);
    }
    for (var i = 0; i < addedLines.length; i++)
    {
        node1 = nodes[addedLines[i][0]];
        node2 = nodes[addedLines[i][1]];
        line(node1[0],node1[1],node2[0],node2[1]);
    }
    if (heldPoint != null)
    {
        line(heldPoint[0],heldPoint[1],mouseX,mouseY);
    }
}

var heldPoint;
var addedLines;
var linesToDraw;
