export const stairs = (grid) => {
    let newGrid = grid.slice();
    let col = 0;
    let row = 29;
    while(col < 50 && row > 0){
      newGrid[row][col].isWall = true;
        row--;
        col++;
    }
    while(row < 30 && col < 50){
      newGrid[row][col].isWall = true;
        row++;
        col++;
    }
    return newGrid
  };