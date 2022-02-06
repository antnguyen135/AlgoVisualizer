export const stairs = (grid, gridRow,gridCol) => {
    let newGrid = grid.slice();
    let row = gridRow-1;
    let wallsToAnimate = [];
    let down = false;
    for(let col = 0; col < gridCol; col++){
      if(down === false){
        newGrid[row][col].isWall = true;
        wallsToAnimate.push(newGrid[row][col]);
        row--;
        if(row === 0){
        down = true;
        continue;}
      }
      if(down === true){
        newGrid[row][col].isWall = true;
        wallsToAnimate.push(newGrid[row][col]);
        row++;
        if(row === gridRow-1)
        down = false;
      }
    }
    return wallsToAnimate;
  };