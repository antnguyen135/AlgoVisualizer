export let wallsToAnimateRec = [];
export const recursiveMaze = (grid, rowStart, rowEnd, colStart, colEnd, orientation, outerWalls,gridRow,gridCol) => {
  if(rowEnd < rowStart || colEnd < colStart){
    return;
  }
  
  let newGrid = grid.slice();
  if(outerWalls === false){
    for(let r = 0; r < newGrid.length; r++){
      for(let c = 0; c < newGrid[0].length; c++){
        if (r === 0 || c === 0 || r === gridRow-1 || c === gridCol-1) {
          wallsToAnimateRec.push(newGrid[r][c]);
          newGrid[r][c].isWall = true;
        }
      }
    }
    outerWalls = true;
  }
    if(orientation === "horizontal"){
      let possibleRows = [];
    for (let r = rowStart; r <= rowEnd; r += 2) {
      possibleRows.push(r);
    }
    let possibleCols = [];
    for (let c = colStart - 1; c <= colEnd + 1; c += 2) {
      possibleCols.push(c);
    }
    let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
    let randomColIndex = Math.floor(Math.random() * possibleCols.length);
    let currentRow = possibleRows[randomRowIndex];
    let colRandom = possibleCols[randomColIndex];
    for(let r = 0; r < newGrid.length; r++){
      for(let c = 0; c < newGrid[0].length; c++){
        if (r === currentRow && c !== colRandom && c >= colStart -1 && c <= colEnd + 1) {
          let currNode = newGrid[r][c];
          if(!currNode.isStart && !currNode.isFinish){
            currNode.isWall=true;
            wallsToAnimateRec.push(currNode);
          }
        }
      }
    }
    if (currentRow - 2 - rowStart > colEnd - colStart) {
      recursiveMaze(grid, rowStart, currentRow - 2, colStart, colEnd, orientation, outerWalls);
    } else {
      recursiveMaze(grid, rowStart, currentRow - 2, colStart, colEnd, "vertical", outerWalls);
    }
    if (rowEnd - (currentRow + 2) > colEnd - colStart) {
      recursiveMaze(grid, currentRow + 2, rowEnd, colStart, colEnd, orientation, outerWalls );
    } else {
      recursiveMaze(grid, currentRow + 2, rowEnd, colStart, colEnd, "vertical", outerWalls);
    }

    }

    else{
      let possibleCols = [];
      for (let c = colStart; c <= colEnd; c += 2) {
      possibleCols.push(c);
    }
      let possibleRows = [];
      for (let r = rowStart - 1; r <= rowEnd + 1; r += 2) {
        possibleRows.push(r);
      }
      let randomColIndex = Math.floor(Math.random() * possibleCols.length);
      let randomRowIndex = Math.floor(Math.random() * possibleRows.length);
      let currentCol = possibleCols[randomColIndex];
      let rowRandom = possibleRows[randomRowIndex];
      for(let r = 0; r < newGrid.length; r++){
        for(let c = 0; c < newGrid[0].length; c++){
          if (c === currentCol && r !== rowRandom && r >= rowStart -1 && r <= rowEnd + 1) {
            let currNode = newGrid[r][c];
            if(!currNode.isStart && !currNode.isFinish){
              currNode.isWall=true;
              wallsToAnimateRec.push(currNode);
            }
          }
        }
      }
      if (rowEnd - rowStart > currentCol - 2 - colStart) {
        recursiveMaze(grid, rowStart, rowEnd, colStart, currentCol - 2, "horizontal", outerWalls);
      } else {
        recursiveMaze(grid, rowStart, rowEnd, colStart, currentCol - 2, orientation, outerWalls);
      }
      if (rowEnd - rowStart > colEnd - (currentCol + 2)) {
        recursiveMaze(grid, rowStart, rowEnd, currentCol + 2, colEnd, "horizontal", outerWalls);
      } else {
        recursiveMaze(grid, rowStart, rowEnd, currentCol + 2, colEnd, orientation, outerWalls);
      }

    }
  }; 