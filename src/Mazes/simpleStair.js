export const stairs = (grid) => {
    let newGrid = grid.slice();
    let col = 0;
    let row = 29;
    let wallsToAnimate = [];
    while(col < newGrid[0].length && row > 0){
      newGrid[row][col].isWall = true;
      wallsToAnimate.push(newGrid[row][col]);
        row--;
        col++;
    }
    while(row < newGrid.length && col < 50){
      newGrid[row][col].isWall = true;
      wallsToAnimate.push(newGrid[row][col]);
        row++;
        col++;
    }
    return wallsToAnimate;
  };