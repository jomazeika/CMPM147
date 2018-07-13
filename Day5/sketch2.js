function setup() {
    createCanvas(640,480);
    nodeCount = random([10,11,12,13,14,15,16,17,18]);
    nodes = [];
    nodeSize = 20;
    for (var i = 0 ; i < nodeCount; i++)
    {
        var newNode = [random(nodeSize,640-nodeSize), random(nodeSize,480-nodeSize)];
        while(isTooClose(newNode,nodes,nodeSize))
        {
            newNode = [random(nodeSize,640-nodeSize), random(nodeSize,480-nodeSize)];
        }
        nodes.push(newNode);
    }
    linesToDraw = [];
    addedLines = [];
    heldPoint = null;
    heldNode = null;
}

function getClickedNode(mouseX,mouseY)
{
    for(var i = 0; i < nodeCount; i++)
    {
        if (abs(mouseX - nodes[i][0]) < nodeSize && abs(mouseY - nodes[i][1]) < nodeSize)
        {
            console.log(nodes[i][0]);
            console.log(nodes[i][1]);
            return i;
        }
    }
    return null;
}

function mouseClicked()
{
    if (heldNode == null)
    {
        heldNode = getClickedNode(mouseX,mouseY);
    }
    else {
      var newNode = getClickedNode(mouseX,mouseY);
      if (newNode != null)
      {
          addedLines.push([heldNode,newNode]);
      }
      heldNode = null;
    }
}

/*function mouseClicked(){
    if (heldPoint == null)
    {
        heldPoint = [mouseX,mouseY];
    }
    else {
        linesToDraw.push([mouseX,mouseY,heldPoint[0],heldPoint[1]]);
        heldPoint = null;
      }
}*/

function isTooClose(node,nodeList,nodeSize)
{
    var rVal = false;
    for(var i = 0; i < nodeList.length; i++)
    {
        //1.5 scale factor to add juuuuust enough distance
        if ((abs(node[0] - nodeList[i][0]) < 1.5*nodeSize) && (abs(node[1] - nodeList[i][1]) < 1.5*nodeSize))
        {
            rVal = true;
        }
    }
    return rVal
}

function draw() {
    background(255);
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
    if(heldNode != null)
    {
        line(nodes[heldNode][0],nodes[heldNode][1],mouseX,mouseY);
    }
    for (var i = 0; i < nodeCount; i++)
    {
        stroke(0,200,175);
        if (heldNode == i)
        {
          stroke(255,0,0);
        }
        fill('orange');
        strokeWeight(2);
        ellipse(nodes[i][0],nodes[i][1],nodeSize);
    }
}

var heldPoint;
var addedLines;
var linesToDraw;
var nodes;
var nodeCount;
var nodeSize;
var heldNode;
