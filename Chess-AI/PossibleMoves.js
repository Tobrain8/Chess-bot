function possibleKnightMoves(index, position) {
  let possibleMoves = [];
  let tile = position[index];
  let column = index % 8 + 1;
  let row = Math.ceil(index / 8);
  let isWhitesTurn = false;
  if (tile.color == "white")
    isWhitesTurn = true;
  let tempTileIndex = index - 17;
  if (
    row > 2 &&
    column > 1 &&
    !isOwnPiece(position[tempTileIndex], isWhitesTurn)
  )
    possibleMoves.push(tempTileIndex);

  tempTileIndex = index - 15;
  if (
    row > 2 &&
    column < 8 &&
    !isOwnPiece(position[tempTileIndex], isWhitesTurn)
  )
    possibleMoves.push(tempTileIndex);

  tempTileIndex = index - 10;
  if (
    row > 1 &&
    column > 2 &&
    !isOwnPiece(position[tempTileIndex], isWhitesTurn)
  )
    possibleMoves.push(tempTileIndex);

  tempTileIndex = index - 6;
  if (
    row > 1 &&
    column < 7 &&
    !isOwnPiece(position[tempTileIndex], isWhitesTurn)
  )
    possibleMoves.push(tempTileIndex);

  tempTileIndex = index + 6;
  if (
    row < 8 &&
    column > 2 &&
    !isOwnPiece(position[tempTileIndex], isWhitesTurn)
  )
    possibleMoves.push(tempTileIndex);

  tempTileIndex = index + 10;
  if (
    row < 8 &&
    column < 7 &&
    !isOwnPiece(position[tempTileIndex], isWhitesTurn)
  )
    possibleMoves.push(tempTileIndex);

  tempTileIndex = index + 15;
  if (
    row < 7 &&
    column > 1 &&
    !isOwnPiece(position[tempTileIndex], isWhitesTurn)
  )
    possibleMoves.push(tempTileIndex);

  tempTileIndex = index + 17;
  if (
    row < 7 &&
    column < 8 &&
    !isOwnPiece(position[tempTileIndex], isWhitesTurn)
  )
    possibleMoves.push(tempTileIndex);

  return possibleMoves;
}

function possibleBishopMoves(index, position) {
  let possibleMoves = [];
  let startTile = position[index];
  let dynamicIndex = index;
  let startRow = null;
  let startColumn = null;
  let destinationRow = null;
  let destinationColumn = null;
  let isWhitesTurn = false;
  if (startTile.color == "white")
    isWhitesTurn = true;
  //1 top right
  do {
    if (dynamicIndex != index)
      possibleMoves.push(dynamicIndex);
    startColumn = dynamicIndex % 8 + 1;
    startRow = Math.ceil((dynamicIndex + 0.1) / 8);
    dynamicIndex = dynamicIndex - 7;
    destinationColumn = dynamicIndex % 8 + 1;
    destinationRow = Math.ceil((dynamicIndex + 0.1) / 8);
  } while (
    startRow - 1 == destinationRow &&
    startColumn + 1 == destinationColumn &&
    (dynamicIndex >= 0 && dynamicIndex < 64) &&
    position[dynamicIndex].piece == null
  );
  if (
    (dynamicIndex >= 0 && dynamicIndex < 64) &&
    startRow - 1 == destinationRow &&
    startColumn + 1 == destinationColumn &&
    !isOwnPiece(position[dynamicIndex], isWhitesTurn) &&
    position[dynamicIndex].piece != null
  )
    possibleMoves.push(dynamicIndex);
  dynamicIndex = index;
  //2 top left
  do {
    if (dynamicIndex != index)
      possibleMoves.push(dynamicIndex);
    startColumn = dynamicIndex % 8 + 1;
    startRow = Math.ceil((dynamicIndex + 0.1) / 8);
    dynamicIndex = dynamicIndex - 9;
    destinationColumn = dynamicIndex % 8 + 1;
    destinationRow = Math.ceil((dynamicIndex + 0.1) / 8);
  } while (
    startRow - 1 == destinationRow &&
    startColumn - 1 == destinationColumn &&
    (dynamicIndex >= 0 && dynamicIndex < 64) &&
    position[dynamicIndex].piece == null
  );
  if (
    (dynamicIndex >= 0 && dynamicIndex < 64) &&
    startRow - 1 == destinationRow &&
    startColumn - 1 == destinationColumn &&
    !isOwnPiece(position[dynamicIndex], isWhitesTurn) &&
    position[dynamicIndex].piece != null
  )
    possibleMoves.push(dynamicIndex);
  dynamicIndex = index;
  //3 bottom left
  do {
    if (dynamicIndex != index)
      possibleMoves.push(dynamicIndex);
    startColumn = dynamicIndex % 8 + 1;
    startRow = Math.ceil((dynamicIndex + 0.1) / 8);
    dynamicIndex = dynamicIndex + 7;
    destinationColumn = dynamicIndex % 8 + 1;
    destinationRow = Math.ceil((dynamicIndex + 0.1) / 8);
  } while (
    startRow + 1 == destinationRow &&
    startColumn - 1 == destinationColumn &&
    (dynamicIndex >= 0 && dynamicIndex < 64) &&
    position[dynamicIndex].piece == null
  );
  if (
    (dynamicIndex >= 0 && dynamicIndex < 64) &&
    startRow + 1 == destinationRow &&
    startColumn - 1 == destinationColumn &&
    !isOwnPiece(position[dynamicIndex], isWhitesTurn) &&
    position[dynamicIndex].piece != null
  )
    possibleMoves.push(dynamicIndex);
  dynamicIndex = index;
  //4 bottom right
  do {
    if (dynamicIndex != index)
      possibleMoves.push(dynamicIndex);
    startColumn = dynamicIndex % 8 + 1;
    startRow = Math.ceil((dynamicIndex + 0.1) / 8);
    dynamicIndex = dynamicIndex + 9;
    destinationColumn = dynamicIndex % 8 + 1;
    destinationRow = Math.ceil((dynamicIndex + 0.1) / 8);
  } while (
    startRow + 1 == destinationRow &&
    startColumn + 1 == destinationColumn &&
    (dynamicIndex >= 0 && dynamicIndex < 64) &&
    position[dynamicIndex].piece == null
  );
  if (
    (dynamicIndex >= 0 && dynamicIndex < 64) &&
    startRow + 1 == destinationRow &&
    startColumn + 1 == destinationColumn &&
    !isOwnPiece(position[dynamicIndex], isWhitesTurn) &&
    position[dynamicIndex].piece != null
  )
    possibleMoves.push(dynamicIndex);
  dynamicIndex = index;

  return possibleMoves;
}

function possibleRookMoves(index, position) {
  let possibleMoves = [];
  let startTile = position[index];
  let dynamicIndex = index;
  let startRow = null;
  let startColumn = null;
  let destinationRow = null;
  let destinationColumn = null;
  let isWhitesTurn = false;
  if (startTile.color == "white")
    isWhitesTurn = true;
  //1 top
  do {
    if (dynamicIndex != index)
      possibleMoves.push(dynamicIndex);
    startColumn = dynamicIndex % 8 + 1;
    startRow = Math.ceil((dynamicIndex + 0.1) / 8);
    dynamicIndex = dynamicIndex - 8;
    destinationColumn = dynamicIndex % 8 + 1;
    destinationRow = Math.ceil((dynamicIndex + 0.1) / 8);
  } while (
    startRow - 1 == destinationRow &&
    startColumn == destinationColumn &&
    (dynamicIndex >= 0 && dynamicIndex < 64) &&
    position[dynamicIndex].piece == null
  );
  if (
    (dynamicIndex >= 0 && dynamicIndex < 64) &&
    startRow - 1 == destinationRow &&
    startColumn == destinationColumn &&
    !isOwnPiece(position[dynamicIndex], isWhitesTurn) &&
    position[dynamicIndex].piece != null
  )
    possibleMoves.push(dynamicIndex);
  dynamicIndex = index;
  //2 right
  do {
    if (dynamicIndex != index)
      possibleMoves.push(dynamicIndex);
    startColumn = dynamicIndex % 8 + 1;
    startRow = Math.ceil((dynamicIndex + 0.1) / 8);
    dynamicIndex = dynamicIndex + 1;
    destinationColumn = dynamicIndex % 8 + 1;
    destinationRow = Math.ceil((dynamicIndex + 0.1) / 8);
  } while (
    startRow == destinationRow &&
    startColumn + 1 == destinationColumn &&
    (dynamicIndex >= 0 && dynamicIndex < 64) &&
    position[dynamicIndex].piece == null
  );
  if (
    (dynamicIndex >= 0 && dynamicIndex < 64) &&
    startRow == destinationRow &&
    startColumn + 1 == destinationColumn &&
    !isOwnPiece(position[dynamicIndex], isWhitesTurn) &&
    position[dynamicIndex].piece != null
  )
    possibleMoves.push(dynamicIndex);
  dynamicIndex = index;
  //3 bottom 
  do {
    if (dynamicIndex != index)
      possibleMoves.push(dynamicIndex);
    startColumn = dynamicIndex % 8 + 1;
    startRow = Math.ceil((dynamicIndex + 0.1) / 8);
    dynamicIndex = dynamicIndex + 8;
    destinationColumn = dynamicIndex % 8 + 1;
    destinationRow = Math.ceil((dynamicIndex + 0.1) / 8);
  } while (
    startRow + 1 == destinationRow &&
    startColumn == destinationColumn &&
    (dynamicIndex >= 0 && dynamicIndex < 64) &&
    position[dynamicIndex].piece == null
  );
  if (
    (dynamicIndex >= 0 && dynamicIndex < 64) &&
    startRow + 1 == destinationRow &&
    startColumn == destinationColumn &&
    !isOwnPiece(position[dynamicIndex], isWhitesTurn) &&
    position[dynamicIndex].piece != null
  )
    possibleMoves.push(dynamicIndex);
  dynamicIndex = index;
  //4 bottom right
  do {
    if (dynamicIndex != index)
      possibleMoves.push(dynamicIndex);
    startColumn = dynamicIndex % 8 + 1;
    startRow = Math.ceil((dynamicIndex + 0.1) / 8);
    dynamicIndex = dynamicIndex - 1;
    destinationColumn = dynamicIndex % 8 + 1;
    destinationRow = Math.ceil((dynamicIndex + 0.1) / 8);
  } while (
    startRow == destinationRow &&
    startColumn - 1 == destinationColumn &&
    (dynamicIndex >= 0 && dynamicIndex < 64) &&
    position[dynamicIndex].piece == null
  );
  if (
    (dynamicIndex >= 0 && dynamicIndex < 64) &&
    startRow == destinationRow &&
    startColumn - 1 == destinationColumn &&
    !isOwnPiece(position[dynamicIndex], isWhitesTurn) &&
    position[dynamicIndex].piece != null
  )
    possibleMoves.push(dynamicIndex);
  dynamicIndex = index;

  return possibleMoves;
}

function possibleQueenMoves(index, position) {
  let possibleMoves = [];
  let startTile = position[index];
  let dynamicIndex = index;
  let startRow = null;
  let startColumn = null;
  let destinationRow = null;
  let destinationColumn = null;
  let isWhitesTurn = false;
  if (startTile.color == "white")
    isWhitesTurn = true;
  //1 top right
  do {
    if (dynamicIndex != index)
      possibleMoves.push(dynamicIndex);
    startColumn = dynamicIndex % 8 + 1;
    startRow = Math.ceil((dynamicIndex + 0.1) / 8);
    dynamicIndex = dynamicIndex - 7;
    destinationColumn = dynamicIndex % 8 + 1;
    destinationRow = Math.ceil((dynamicIndex + 0.1) / 8);
  } while (
    startRow - 1 == destinationRow &&
    startColumn + 1 == destinationColumn &&
    (dynamicIndex >= 0 && dynamicIndex < 64) &&
    position[dynamicIndex].piece == null
  );
  if (
    (dynamicIndex >= 0 && dynamicIndex < 64) &&
    startRow - 1 == destinationRow &&
    startColumn + 1 == destinationColumn &&
    !isOwnPiece(position[dynamicIndex], isWhitesTurn) &&
    position[dynamicIndex].piece != null
  )
    possibleMoves.push(dynamicIndex);
  dynamicIndex = index;
  //2 top left
  do {
    if (dynamicIndex != index)
      possibleMoves.push(dynamicIndex);
    startColumn = dynamicIndex % 8 + 1;
    startRow = Math.ceil((dynamicIndex + 0.1) / 8);
    dynamicIndex = dynamicIndex - 9;
    destinationColumn = dynamicIndex % 8 + 1;
    destinationRow = Math.ceil((dynamicIndex + 0.1) / 8);
  } while (
    startRow - 1 == destinationRow &&
    startColumn - 1 == destinationColumn &&
    (dynamicIndex >= 0 && dynamicIndex < 64) &&
    position[dynamicIndex].piece == null
  );
  if (
    (dynamicIndex >= 0 && dynamicIndex < 64) &&
    startRow - 1 == destinationRow &&
    startColumn - 1 == destinationColumn &&
    !isOwnPiece(position[dynamicIndex], isWhitesTurn) &&
    position[dynamicIndex].piece != null
  )
    possibleMoves.push(dynamicIndex);
  dynamicIndex = index;
  //3 bottom left
  do {
    if (dynamicIndex != index)
      possibleMoves.push(dynamicIndex);
    startColumn = dynamicIndex % 8 + 1;
    startRow = Math.ceil((dynamicIndex + 0.1) / 8);
    dynamicIndex = dynamicIndex + 7;
    destinationColumn = dynamicIndex % 8 + 1;
    destinationRow = Math.ceil((dynamicIndex + 0.1) / 8);
    //console.log(dynamicIndex, startRow, startColumn, destinationRow, destinationColumn)
  } while (
    startRow + 1 == destinationRow &&
    startColumn - 1 == destinationColumn &&
    (dynamicIndex >= 0 && dynamicIndex < 64) &&
    position[dynamicIndex].piece == null
  );
  if (
    (dynamicIndex >= 0 && dynamicIndex < 64) &&
    startRow + 1 == destinationRow &&
    startColumn - 1 == destinationColumn &&
    !isOwnPiece(position[dynamicIndex], isWhitesTurn) &&
    position[dynamicIndex].piece != null
  )
    possibleMoves.push(dynamicIndex);
  dynamicIndex = index;
  //4 bottom right
  do {
    if (dynamicIndex != index)
      possibleMoves.push(dynamicIndex);
    startColumn = dynamicIndex % 8 + 1;
    startRow = Math.ceil((dynamicIndex + 0.1) / 8);
    dynamicIndex = dynamicIndex + 9;
    destinationColumn = dynamicIndex % 8 + 1;
    destinationRow = Math.ceil((dynamicIndex + 0.1) / 8);
  } while (
    startRow + 1 == destinationRow &&
    startColumn + 1 == destinationColumn &&
    (dynamicIndex >= 0 && dynamicIndex < 64) &&
    position[dynamicIndex].piece == null
  );
  if (
    (dynamicIndex >= 0 && dynamicIndex < 64) &&
    startRow + 1 == destinationRow &&
    startColumn + 1 == destinationColumn &&
    !isOwnPiece(position[dynamicIndex], isWhitesTurn) &&
    position[dynamicIndex].piece != null
  )
    possibleMoves.push(dynamicIndex);
  dynamicIndex = index;

  //1 top
  do {
    if (dynamicIndex != index)
      possibleMoves.push(dynamicIndex);
    startColumn = dynamicIndex % 8 + 1;
    startRow = Math.ceil((dynamicIndex + 0.1) / 8);
    dynamicIndex = dynamicIndex - 8;
    destinationColumn = dynamicIndex % 8 + 1;
    destinationRow = Math.ceil((dynamicIndex + 0.1) / 8);
  } while (
    startRow - 1 == destinationRow &&
    startColumn == destinationColumn &&
    (dynamicIndex >= 0 && dynamicIndex < 64) &&
    position[dynamicIndex].piece == null
  );
  if (
    (dynamicIndex >= 0 && dynamicIndex < 64) &&
    startRow - 1 == destinationRow &&
    startColumn == destinationColumn &&
    !isOwnPiece(position[dynamicIndex], isWhitesTurn) &&
    position[dynamicIndex].piece != null
  )
    possibleMoves.push(dynamicIndex);
  dynamicIndex = index;
  //2 right
  do {
    if (dynamicIndex != index)
      possibleMoves.push(dynamicIndex);
    startColumn = dynamicIndex % 8 + 1;
    startRow = Math.ceil((dynamicIndex + 0.1) / 8);
    dynamicIndex = dynamicIndex + 1;
    destinationColumn = dynamicIndex % 8 + 1;
    destinationRow = Math.ceil((dynamicIndex + 0.1) / 8);
  } while (
    startRow == destinationRow &&
    startColumn + 1 == destinationColumn &&
    (dynamicIndex >= 0 && dynamicIndex < 64) &&
    position[dynamicIndex].piece == null
  );
  if (
    (dynamicIndex >= 0 && dynamicIndex < 64) &&
    startRow == destinationRow &&
    startColumn + 1 == destinationColumn &&
    !isOwnPiece(position[dynamicIndex], isWhitesTurn) &&
    position[dynamicIndex].piece != null
  )
    possibleMoves.push(dynamicIndex);
  dynamicIndex = index;
  //3 bottom 
  do {
    if (dynamicIndex != index)
      possibleMoves.push(dynamicIndex);
    startColumn = dynamicIndex % 8 + 1;
    startRow = Math.ceil((dynamicIndex + 0.1) / 8);
    dynamicIndex = dynamicIndex + 8;
    destinationColumn = dynamicIndex % 8 + 1;
    destinationRow = Math.ceil((dynamicIndex + 0.1) / 8);
    //console.log(dynamicIndex, startRow, startColumn, destinationRow, destinationColumn)
  } while (
    startRow + 1 == destinationRow &&
    startColumn == destinationColumn &&
    (dynamicIndex >= 0 && dynamicIndex < 64) &&
    position[dynamicIndex].piece == null
  );
  if (
    (dynamicIndex >= 0 && dynamicIndex < 64) &&
    startRow + 1 == destinationRow &&
    startColumn == destinationColumn &&
    !isOwnPiece(position[dynamicIndex], isWhitesTurn) &&
    position[dynamicIndex].piece != null
  )
    possibleMoves.push(dynamicIndex);
  dynamicIndex = index;
  //4 left
  do {
    if (dynamicIndex != index)
      possibleMoves.push(dynamicIndex);
    startColumn = dynamicIndex % 8 + 1;
    startRow = Math.ceil((dynamicIndex + 0.1) / 8);
    dynamicIndex = dynamicIndex - 1;
    destinationColumn = dynamicIndex % 8 + 1;
    destinationRow = Math.ceil((dynamicIndex + 0.1) / 8);
  } while (
    startRow == destinationRow &&
    startColumn - 1 == destinationColumn &&
    (dynamicIndex >= 0 && dynamicIndex < 64) &&
    position[dynamicIndex].piece == null
  );
  if (
    (dynamicIndex >= 0 && dynamicIndex < 64) &&
    startRow == destinationRow &&
    startColumn - 1 == destinationColumn &&
    !isOwnPiece(position[dynamicIndex], isWhitesTurn) &&
    position[dynamicIndex].piece != null
  )
    possibleMoves.push(dynamicIndex);
  dynamicIndex = index;

  return possibleMoves;
}

function possibleKingMoves(index, position) {
  let possibleMoves = [];
  let tile = position[index];
  let startRow = Math.ceil((index + 0.1) / 8);
  let startColumn = index % 8 + 1;
  let isWhitesTurn = false;
  if (tile.color == "white")
    isWhitesTurn = true;

  let t = index - 8,
    tl = index - 9,
    l = index - 1,
    bl = index + 7,
    b = index + 8,
    br = index + 9,
    r = index + 1,
    tr = index - 7;
  let tilesAroundKing = [t, tl, l, bl, b, br, r, tr]

  for (let i = 0; i < tilesAroundKing.length; i++) {
    
    if (tilesAroundKing[i] >= 0 && tilesAroundKing[i] < 64) {
      let dynamicTile = position[tilesAroundKing[i]];
      if (
        Math.pow((dynamicTile.row - startRow), 2) <= 1 &&
        Math.pow((dynamicTile.column - startColumn), 2) <= 1 &&
        !isOwnPiece(dynamicTile, isWhitesTurn)
      ) {
        possibleMoves.push(tilesAroundKing[i]);
      }
    }
  }
  //Checks for possible castle move (direction: right)
  if (
    !position[index].hasMoved &&
    position[index + 1].piece == null &&
    position[index + 2].piece == null &&
    position[index].color == position[index + 3].color &&
    !position[index + 3].hasMoved
  )
    possibleMoves.push(index + 2);

    //Checks for possible castle move (direction: left)
  if (
    !position[index].hasMoved &&
    position[index - 1].piece == null &&
    position[index - 2].piece == null &&
    position[index - 3].piece == null &&
    position[index].color == position[index - 4].color &&
    !position[index - 4].hasMoved
  )
    possibleMoves.push(index - 2);
  
  return possibleMoves;
}

function possiblePawnMoves(index, position) {
  let possibleMoves = [];
  let tile = position[index];
  let startRow = Math.ceil((index + 0.1) / 8);
  let startColumn = index % 8 + 1;
  let isWhitesTurn = false;
  if (tile.color == "white")
    isWhitesTurn = true;
  let direction = 1;
  if (isWhitesTurn)
    direction = -1;
  let movesToTest = [
    index + 8 * direction,
    index + 7 * direction,
    index + 9 * direction,
    index + 16 * direction
  ]
  if (movesToTest[0] >= 0 &&
    movesToTest[0] < 64 &&
    position[movesToTest[0]].piece == null) {
    possibleMoves.push(movesToTest[0])
    if (!tile.hasMoved &&
      movesToTest[3] >= 0 &&
      movesToTest[3] < 64 &&
      position[movesToTest[3]].piece == null) {
      possibleMoves.push(movesToTest[3]);
    }
  }

  let dynamicTile;
  if(movesToTest[1] >= 0 && movesToTest[1]<=63){
    dynamicTile = position[movesToTest[1]];
    if (
      Math.pow((dynamicTile.row - startRow), 2) == 1 &&
      Math.pow((dynamicTile.column - startColumn), 2) == 1 &&
      !isOwnPiece(dynamicTile, isWhitesTurn) &&
      (dynamicTile.piece != null || dynamicTile.pawnSpecialColor == tile.color)
    ) {
      possibleMoves.push(movesToTest[1]);
    }
  }
  if(movesToTest[2] >= 0 && movesToTest[2]<=63){
    dynamicTile = position[movesToTest[2]];
    if (
      Math.pow((dynamicTile.row - startRow), 2) == 1 &&
      Math.pow((dynamicTile.column - startColumn), 2) == 1 &&
      !isOwnPiece(dynamicTile, isWhitesTurn) &&
      (dynamicTile.piece != null || dynamicTile.pawnSpecialColor == tile.color)
    ) {
      possibleMoves.push(movesToTest[2]);
    }
  }



  return possibleMoves;
}