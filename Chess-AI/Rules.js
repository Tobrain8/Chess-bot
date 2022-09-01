
  let specialPawnTile = [];

function tileClick(i) {
  //let visualTile = document.getElementById(i);
  let boardTreeTile = boardTree.currentPosition[i];
  //console.log(boardTreeTile);
  if (i == activePiece)
    return clearHighlights();
  if (!isOwnPiece(boardTreeTile) && !boardTreeTile.isHighlighted)
    return clearHighlights();
  if (isOwnPiece(boardTreeTile)) {
    clearHighlights();
    return highlightPiece(i);
  }

  if (!isOwnPiece(boardTreeTile) && boardTreeTile.isHighlighted) {
    let tempActivePiece = activePiece;//the active piece is cleared in the following function so we need to store it.
    clearHighlights();
    makeMove(tempActivePiece, i);
    setTimeout(aiStartMove, 500);
  }

}

function isOwnPiece(boardTreeTile, isWhitesTurn = whitesTurn) {
  if (isWhitesTurn && boardTreeTile.color == "white")
    return true;
  if (!isWhitesTurn && boardTreeTile.color == "black")
    return true;
  return false;
}

function clearHighlights() {
  console.log("clearing")
  activePiece = null;
  for (let i = 0; i < 64; i++) {
    boardTree.currentPosition[i].isHighlighted = false;
    boardTree.currentPosition[i].specialMove = false;
    let tile = document.getElementById(i);
    if (tile.children.length == 2 || (tile.children.length == 1 && boardTree.currentPosition[i].piece == null))
      tile.removeChild(tile.lastChild);
    boardTree.currentPosition[i].isHighlighted = false;
  }
}

function makeMove(start, destination) {
  console.log("moving");
  let isGameOver = false;
  let dataStartTile = boardTree.currentPosition[start];
  let dataDestinationTile = boardTree.currentPosition[destination];
  let visualStartTile = document.getElementById(start);
  let visualDestinationTile = document.getElementById(destination);

  if(dataDestinationTile.piece == "king")
    isGameOver = true;
  
  if (
    dataStartTile.piece == "pawn" &&
    dataDestinationTile.pawnSpecialColor != null
  )
    enPassont(start, destination);
  
  removeAllChildren(visualDestinationTile);
  moveData(dataStartTile, dataDestinationTile);
  movePiece(visualStartTile, visualDestinationTile);
  dataStartTile.hasMoved = true;
  dataDestinationTile.hasMoved = true;
  clearData(dataStartTile);debugger;
  if(specialPawnTile.length > 0)
    clearSpecialPawnMove();
  switchTurns();
  //if the pawn moves 2 spaces, it marks the skipped tile for the next move.
  if (
    dataDestinationTile.piece == "pawn" &&
    Math.abs(start - destination) == 16
  ){debugger;
    let skippedTile = destination + (start - destination) / 2;
    boardTree.currentPosition[skippedTile].pawnSpecialColor = whiteOrBlackMove();
    specialPawnTile.push(skippedTile);
  }
  if (
    dataDestinationTile.piece == "pawn" &&
    (dataDestinationTile.row == 1 ||
      dataDestinationTile.row == 8)
  ){
    clearData(dataDestinationTile);
    removeAllChildren(visualDestinationTile);
    placePieceOnTile((whitesTurn ? "q":"Q"), destination);
    adjustData((whitesTurn ? "q":"Q"), destination);
  }
  if(
    dataDestinationTile.piece == "king" &&
    Math.abs(start - destination) == 2
  )
    castle(start, destination);
  if(isGameOver)
    gameOver(dataDestinationTile);
}

function gameOver(destinationTile){
  let text = destinationTile.color + " wins!!!";
  document.getElementById("heading").innerHTML = capitalizeFirstLetter(text);
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function adjustData(letter, index){
  let color = "black";
  if(letter.toUpperCase() == letter){
    color = "white";
  }
  let dataTile = boardTree.currentPosition[index]
  dataTile.value = (color == "white" ? -9 : 9);
  dataTile.piece = "queen";
  dataTile.color = color;
}

function clearSpecialPawnMove() {debugger;
  specialPawnTile.forEach(tile => {
  boardTree.currentPosition[tile].pawnSpecialColor = null;});
  specialPawnTile = [];
}

function castle(start, destination){
  switchTurns();
  switch(start - destination){
    case 2:
      //left
      makeMove(start - 4, start - 1);
      break;
    case -2:
      //right
      makeMove(start + 3, start + 1);
      break;
  }
  
  clearData(dataStartTile);
}

function enPassont(start, destination){
  let num = start - destination;
  let visualDestinationTile;
  let dataStartTile;
  switch(num){
    case 7:
    case -9:
      visualDestinationTile = document.getElementById(start + 1);
      dataStartTile = boardTree.currentPosition[start + 1];
      clearData(dataStartTile);
      visualDestinationTile.removeChild(visualDestinationTile.firstChild);
      break;
    case -7:
    case 9:
      visualDestinationTile = document.getElementById(start - 1);
      dataStartTile = boardTree.currentPosition[start - 1];
      clearData(dataStartTile);
      visualDestinationTile.removeChild(visualDestinationTile.firstChild);
      
  }
}

function whiteOrBlackMove() {
  if(whitesTurn)
    return "white";
  return "black";
}

function highlightPiece(i) {
  console.log("highlighting")
  activePiece = i;
  let tilesToHighlight = possibleMovesForTile(i, boardTree.currentPosition);
  tilesToHighlight.push(i);

  for (let j = 0; j < tilesToHighlight.length; j++) {
    let tile = document.getElementById(tilesToHighlight[j]);
    tile.appendChild(highlightCircle.cloneNode(true));
    boardTree.currentPosition[tilesToHighlight[j]].isHighlighted = true;
  }
}

function moveData(startDataTile, destinationDataTile) {
  destinationDataTile.value = startDataTile.value;
  destinationDataTile.piece = startDataTile.piece;
  destinationDataTile.color = startDataTile.color;
}

function movePiece(visualStartTile, visualDestinationTile) {
  let piece = visualStartTile.removeChild(visualStartTile.firstChild);
  visualDestinationTile.appendChild(piece);
}

function clearData(dataTile) {
  dataTile.value = 0;
  dataTile.piece = null;
  dataTile.color = null;
  dataTile.specialMove = false;
}

function removeAllChildren(visualTile) {
  while (visualTile.firstChild) {
    visualTile.removeChild(visualTile.firstChild);
  }
}

function switchTurns() {
  if (whitesTurn)
    return whitesTurn = false;
  return whitesTurn = true;
}

