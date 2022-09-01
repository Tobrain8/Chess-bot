var pawnBlack = newImage("Chess_pdt60.png");
var knightBlack = newImage("Chess_ndt60.png");
var bishopBlack = newImage("Chess_bdt60.png");
var rookBlack = newImage("Chess_rdt60.png");
var queenBlack = newImage("Chess_qdt60.png");
var kingBlack = newImage("Chess_kdt60.png");

var pawnWhite = newImage("Chess_plt60.png");
var knightWhite = newImage("Chess_nlt60.png");
var bishopWhite = newImage("Chess_blt60.png");
var rookWhite = newImage("Chess_rlt60.png");
var queenWhite = newImage("Chess_qlt60.png");
var kingWhite = newImage("Chess_klt60.png");

var highlightCircle = newImage("circle.png");

var globalFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"

window.onload = () => {
  setUpBoard(globalFen);
  addOnclickToTiles();
}

function addOnclickToTiles() {
  for(let i=0;i<64;i++){
    let tile = document.getElementById(i);
    tile.onclick = function(){
      tileClick(i);
    }
  }
}

function fenButton(){
  setUpBoard(prompt("Copy or type your FEN", globalFen))
}

function setUpBoard(fen){
  if(fen == null)
    return;
  clearBoard();
  boardTree = new BoardTree();
  globalFen = fen;
  let currentIndex = 0;
  let increaseIndex = false;
  for(let i=0;i<fen.length;i++){
    switch(fen.charAt(i)){
      case "p":;
      case "P":;
      case "r":;
      case "R":;
      case "n":;
      case "N":;
      case "b":;
      case "B":;
      case "q":;
      case "Q":;
      case "k":;
      case "K":
        if(increaseIndex)
          currentIndex++;
        placePieceOnTile(fen.charAt(i), currentIndex);
        boardTree.editStartingPosition(fen.charAt(i), currentIndex)
        increaseIndex = true;
        break;

      case '/':
        increaseIndex = false;
        currentIndex += tilesToNextRank(currentIndex);
        break;

      case "1":;
      case "2":;
      case "3":;
      case "4":;
      case "5":;
      case "6":;
      case "7":;
      case "8":
        if(increaseIndex)
          currentIndex++;
        currentIndex += parseInt(fen.charAt(i))-1;
        increaseIndex = true;
        break;
    }
  }
}

function placePieceOnTile(pieceLetter, tileId){
  let tile = document.getElementById(tileId);
  let color = "Black";
  if(pieceLetter.toUpperCase() == pieceLetter){
    color = "White";
  }
  let piece = window[letterToWord(pieceLetter) + color];
  tile.appendChild(piece.cloneNode(true));
  
}

function newImage(nameOfFile, isPiece = true){
  let image = document.createElement("img");
  image.src = "Graphics/" + nameOfFile;
  if(!isPiece){
    image.className = "circle";
  }
  image.className = "PieceImage"
  return image;
}

function letterToWord(pieceLetter){
  let word = null;
  switch(pieceLetter.toLowerCase()){
    case "p":
      word = "pawn";
      break;
    case "r":
      word = "rook";
      break;
    case "b":
      word = "bishop";
      break;
    case "n":
      word = "knight";
      break;
    case "q":
      word = "queen";
      break;
    case "k":
      word = "king";
      break;
  }
  return word;
}

function tilesToNextRank(currentIndex){
  let numberOfTiles = 8-currentIndex%8;
  if(numberOfTiles == 0)
    numberOfTiles = 8;
  return numberOfTiles;
}

function clearBoard(){
  for(let i=0; i<64; i++){
    let currentTile = document.getElementById(i);
    while(currentTile.firstChild){
      currentTile.removeChild(currentTile.firstChild);
    }
  }
}