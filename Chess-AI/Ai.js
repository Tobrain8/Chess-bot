var whitesTurn = true;
var boardTree = null;
var activePiece = null;
var simSpecialPawnTile = [];

class BoardTree {
  constructor() {
    this.startingPosition = [];
    this.currentPosition = [];
    this.root = null;
    emptyBoard(this.startingPosition);
  }

  editStartingPosition(letter, currentIndex) {
    let tile = this.startingPosition[currentIndex];
    tile.color = "black";
    if (letter == letter.toUpperCase())
      tile.color = "white";
    tile.piece = letterToWord(letter);
    tile.value = letterToValue(letter);
    this.currentPosition = this.startingPosition;
  }

  creatGameTree(){
    this.root = new Node(null, null, null, (whitesTurn ? "black" : "white"));

  }

  findNodeValue(node){
    if(node.children.length == 0)return;
      let values = [];
      node.children.forEach(childNode => {
        this.findNodeValue(childNode);
        values.push(childNode.evaluation)
      });
      //debugger;
      let childrenValue = (node.color == "white" ? Math.min(...values) : Math.max(...values))
    node.evaluation += childrenValue;
  }

  



  expandNode(node, position){
    let data = getMoves(clone(position), node.color);
    let color = (node.color == "white" ? "black" : "white")
    data.forEach(e => {
      let start = e[0];
      e[1].forEach(move => {
        let evaluation = position[move].value;
        node.children.push(new Node(node, start, move, color, evaluation));
      })

    });
    console.log(node.children.length);
  }
}

class Node {
  constructor(parent, start, end, color, evaluation){
    this.evaluation = evaluation;
    this.parent = parent;
    this.start = start;
    this.end = end;
    this.color = color;
    this.children = [];
  }
}

function simulateMove(start, destination, position){
  let isGameOver = false;
  let dataStartTile = position[start];
  let dataDestinationTile = position[destination];


  if(dataDestinationTile.piece == "king")
    isGameOver = true;
  
  if (
    dataStartTile.piece == "pawn" &&
    dataDestinationTile.pawnSpecialColor != null
  )
    simEnPassont(start, destination, position);
  

  moveData(dataStartTile, dataDestinationTile);

  dataStartTile.hasMoved = true;
  dataDestinationTile.hasMoved = true;
  clearData(dataStartTile);
  if(simSpecialPawnTile != null)
    simClearSpecialPawnMove(position);
  //if the pawn moves 2 spaces, it marks the skipped tile for the next move.
  if (
    dataDestinationTile.piece == "pawn" &&
    Math.abs(start - destination) == 16
  ){
    let skippedTile = destination + (start - destination) / 2;
    position[skippedTile].pawnSpecialColor = (dataDestinationTile.color == "white" ? "black" : "white");
    simSpecialPawnTile.push(skippedTile);
  }
  if (
    dataDestinationTile.piece == "pawn" &&
    (dataDestinationTile.row == 1 ||
      dataDestinationTile.row == 8)
  ){
    clearData(dataDestinationTile);
    simAdjustData((whitesTurn ? "q":"Q"), destination, position);
  }
  if(
    dataDestinationTile.piece == "king" &&
    Math.abs(start - destination) == 2
  )
    simCastle(start, destination, position);
  if(isGameOver){
    //gameOver(dataDestinationTile);
  }

}

function simClearSpecialPawnMove(position) {
  simSpecialPawnTile.forEach(tile => {
    boardTree.currentPosition[tile].pawnSpecialColor = null;});
    simSpecialPawnTile = [];
}

function simCastle(start, destination, position){
  switch(start - destination){
    case 2:
      //left
      simulateMove(start - 4, start - 1, position);
      break;
    case -2:
      //right
      simulateMove(start + 3, start + 1, position);
      break;
  }
  
  clearData(position[start]);
}

function simAdjustData(letter, index, position){
  let color = "black";
  if(letter.toUpperCase() == letter){
    color = "white";
  }
  let dataTile = position[index]
  dataTile.value = (color == "white" ? -9 : 9);
  dataTile.piece = "queen";
  dataTile.color = color;
}

function simEnPassont(start, destination, position){
  let num = start - destination;
  let dataStartTile;
  switch(num){
    case 7:
    case -9:
      dataStartTile = position[start + 1];
      clearData(dataStartTile);
      break;
    case -7:
    case 9:
      dataStartTile = position[start - 1];
      clearData(dataStartTile);  
  }
}

function multiExpand(node, position, levels){
  if(levels == 0) return;
  let simulatedPosition = clone(position);
  boardTree.expandNode(node, position);
  node.children.forEach(e => {
    simulateMove(e.start, e.end, simulatedPosition);
    multiExpand(e, clone(simulatedPosition), levels - 1);
    simulatedPosition = clone(position);
  });
}

function aiStartMove(){debugger;
  boardTree.creatGameTree();
  multiExpand(boardTree.root, clone(boardTree.currentPosition), 4);
  boardTree.findNodeValue(boardTree.root);
  let moves;
  let valueToFind;
  let finalMove;debugger;
  if(whitesTurn){
    valueToFind = Math.max(...boardTree.root.children.map(o => o.evaluation));
  }
  if(!whitesTurn){
    valueToFind = Math.min(...boardTree.root.children.map(o => o.evaluation));
  }
  moves = filter(boardTree.root.children, valueToFind);
  finalMove = moves[Math.floor(Math.random() * moves.length)];
  makeMove(finalMove.start, finalMove.end);
}

function sort(arr){
  return arr.sort((a,b) => {a.evaluation-b.evaluation})
}

function filter(arr, valueToFind){
  let newArr = [];
  arr.forEach(child => {
    if(child.evaluation == valueToFind)
      newArr.push(child);
  })
  return newArr;
}

function timer(levels){
    boardTree.creatGameTree();
    let start = performance.now();
    multiExpand(boardTree.root, clone(boardTree.currentPosition), levels)
    let end = performance.now();
    return end-start;
  }

function clone(arr){
  let copy = JSON.stringify(arr);
  copy = JSON.parse(copy);
  return copy;
}

function getMoves(position, color){//debugger
  let moves = [];
  let index = 0;
  position.forEach(element => {
    if(element.color && element.color != color){//debugger
      moves.push([index, possibleMovesForTile(index, position)])
    }
    index++;
  });
  return moves;
}

function letterToValue(letter) {
  let value = 0;
  switch (letter.toLowerCase()) {
    case "p":
      value = 1;
      break;
    case "r":
      value = 5;
      break;
    case "n":
    case "b":
      value = 3;
      break;
    case "q":
      value = 9;
      break;
    case "k":
      value = 500;
      break;
  }
  if(letter.toUpperCase() == letter){
    value = 0-value;
  }
  return value;
}

function possibleMovesForTile(index, position) {
  let piece = position[index].piece
  switch (piece) {
    case "knight":
      return possibleKnightMoves(index, position);

    case "bishop":
      return possibleBishopMoves(index, position);

    case "rook":
      return possibleRookMoves(index, position);

    case "queen":
      return possibleQueenMoves(index, position);

    case "king":
      return possibleKingMoves(index, position);

    case "pawn":
      return possiblePawnMoves(index, position);
  }
}

function emptyBoard(arr) {
  for (let i = 0; i < 64; i++) {
    arr.push(
      {
        value: 0,
        piece: null,
        color: null,
        isHighlighted: false,
        hasMoved: false,
        pawnSpecialColor: null,
        row: Math.floor(i / 8) + 1,
        column: i % 8 + 1
      }
    )
  }
}