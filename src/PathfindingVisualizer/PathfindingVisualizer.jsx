import React, {Component} from 'react';
import Node from './Node/Node';
import {dijkstra, getNodesInShortestPathOrder} from '../algorithms/dijkstra';
import {DFS, getNodesInShortestPathOrderDFS} from '../algorithms/DFS';
import {BFS, getNodesInShortestPathOrderBFS} from '../algorithms/BFS';
import {stairs} from '../Mazes/simpleStair';
import { mazeGenerate } from '../animate/mazeAnimate';
import './PathfindingVisualizer.css';
import { recursiveMaze, wallsToAnimateRec} from '../Mazes/recursiveMaze';

const gridRow = 31;
const gridCol = 60;
const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

export let speedAnimatePath = 50;
export let speedAnimatealgo = 10;
export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      weightOn: false
    };
  }
  getStairGrid(){
    let wallsToAnimate = stairs(this.state.grid,gridRow,gridCol);
    mazeGenerate(wallsToAnimate);
  }
   getRecursiveMaze(Orientation){ //(grid, rowStart, rowEnd, colStart, colEnd, orientation, outerWalls)
    recursiveMaze(this.state.grid,2,gridRow-3,2,gridCol-3,Orientation, false, gridRow, gridCol);
    mazeGenerate(wallsToAnimateRec);
   }
  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({grid});
  }
  resetBoard(){
    const newGrid = resetGrid(this.state.grid);
    this.setState({grid:newGrid});
  }
  // resetBoardPaths(){
  //   const newGrid = resetPaths(this.state.grid);
  //   this.setState({grid:newGrid});
  // }
  resetBoardWeightsAndWalls(){
    const newGrid = resetWeightsAndWall(this.state.grid);
    this.setState({grid:newGrid});
  }

  toggleWeightOn(){
    const reverseWeight = !this.state.weightOn
    this.setState({weightOn: reverseWeight})
  }
  handleMouseDown(row, col) {
    if(!this.state.weightOn){
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid, mouseIsPressed: true});}
    else{
      const newGrid = getNewGridWithWeightToggled(this.state.grid, row, col);
      this.setState({grid: newGrid, mouseIsPressed: true});

    }
  }

  handleMouseEnter(row, col) {
    if(!this.state.weightOn)
   { if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid});}
    else{
      if (!this.state.mouseIsPressed) return;
      const newGrid = getNewGridWithWeightToggled(this.state.grid, row, col);
    this.setState({grid: newGrid});
    }
  }

  handleMouseUp() {

    this.setState({mouseIsPressed: false});

  }

  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, speedAnimatealgo * i);
        return;
      }
      if(visitedNodesInOrder[i].isFinish || visitedNodesInOrder[i].isStart){
        setTimeout(() => {
          const node = visitedNodesInOrder[i];
          document.getElementById(`node-${node.row}-${node.col}`).className =
          document.getElementById(`node-${node.row}-${node.col}`).className;
        }, speedAnimatealgo * i);
      }
      else{
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, speedAnimatealgo * i);
    }
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      if(nodesInShortestPathOrder[i].isFinish || nodesInShortestPathOrder[i].isStart){
        setTimeout(() => {
          const node = nodesInShortestPathOrder[i];
          document.getElementById(`node-${node.row}-${node.col}`).className =
          document.getElementById(`node-${node.row}-${node.col}`).className;
        }, speedAnimatealgo * i);
      }
      else{setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, speedAnimatePath * i);}
    }
  }

  visualizeDijkstra() {
    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }
  visualizeDFS() {
    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = DFS(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrderDFS(finishNode);
    this.animateDFS(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  animateDFS(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, speedAnimatealgo * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, speedAnimatealgo * i);
    }
  }
  setSpeedFast(){
    speedAnimatePath = 50;
    speedAnimatealgo = 10;
  }
  setSpeedSlow(){
    speedAnimatePath = 75;
    speedAnimatealgo = 25;
  }
  setSpeedSuperSlow(){
    speedAnimatePath = 100;
    speedAnimatealgo = 40;
  }
  visualizeBFS() {
    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = BFS(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrderBFS(finishNode);
    this.animateBFS(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  animateBFS(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, speedAnimatealgo * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, speedAnimatealgo * i);
    }
  }

  render() {
    const {grid, mouseIsPressed} = this.state;

    return (
      <>
        <div className = "allButtons">
        <div className = "topButtons">
        <button className = "button" onClick={ () => this.visualizeDijkstra()}>
          Visualize Dijkstra's Algorithm
        </button>
        <button className = "button" onClick={() => this.visualizeDFS()}>
          Visualize DFS
        </button>
        <button className = "button" onClick={() => this.visualizeBFS()}>
          Visualize BFS
        </button>
        </div>
        <div className = "mazeButtons">
          <button className = "button" onClick={() => this.getStairGrid()}>
          Simple Stair
        </button>
        <button className = "button" onClick={() => this.getRecursiveMaze("horizontal")}>
          Horizontal Recursive Maze
        </button>
        <button className = "button" onClick={() => this.getRecursiveMaze("vertical")}>
          Vertical Recursive Maze
        </button>
        </div>
        </div>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const {row, col, isFinish, isStart, isWall, isWeight} = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      isWeight={isWeight}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}></Node>
                  );
                })}
              </div>
            );
          })}
          <div className = "speedButtons">
          <button className = "button" onClick={() => this.setSpeedFast()}>
          Fast
        </button>
        <button className = "button" onClick={() => this.setSpeedSlow()}>
          Slow
        </button>
        <button className = "button" onClick={() => this.setSpeedSuperSlow()}>
          Super Slow
        </button>
        </div>
        <div className = "weightButton">
          <button className = {'button'+ (this.state.weightOn ? 'weightToggledOn' : '')} onClick = {() => this.toggleWeightOn()}>
          Weight (cost of 15)
        </button>
        </div>
        <div className = "resetButtons">
          <button className = "button" onClick={() => this.resetBoard()} >
            Reset Grid
        </button>
        <button className = "button" onClick={() => this.resetBoardPaths()} >
            Reset Paths
        </button>
        <button className = "button" onClick={() => this.resetBoardWeightsAndWalls()} >
            Reset Weights and Walls
        </button>
        </div>
        </div>
      </>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < gridRow; row++) {
    const currentRow = [];
    for (let col = 0; col < gridCol; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};
const resetGrid = (grid) =>{
  let newGrid = grid.slice();
  for (let row = 0; row < gridRow; row++) {
    for (let col = 0; col < gridCol; col++) {
        if(row === START_NODE_ROW && col === START_NODE_COL){
          document.getElementById(`node-${row}-${col}`).className ='node node-start';
          newGrid[row][col].isVisited =false;
        }
        else if(row === FINISH_NODE_ROW && col === FINISH_NODE_COL){
          document.getElementById(`node-${row}-${col}`).className ='node node-finish';
          newGrid[row][col].isVisited =false;
        }
        else{
        document.getElementById(`node-${row}-${col}`).className ='node';
        newGrid[row][col].isWall =false;
        newGrid[row][col].isWeight =false;
        newGrid[row][col].isVisited =false;}
    }
  }
  return newGrid
};

// const resetPaths = (grid) =>{
//   let newGrid = grid.slice();
//   for (let row = 0; row < gridRow; row++) {
//     for (let col = 0; col < gridCol; col++) {
//         if(row === START_NODE_ROW && col === START_NODE_COL){
//           document.getElementById(`node-${row}-${col}`).className ='node node-start';
//           newGrid[row][col].isVisited =false;
//         }
//         else if(row === FINISH_NODE_ROW && col === FINISH_NODE_COL){
//           document.getElementById(`node-${row}-${col}`).className ='node node-finish';
//           newGrid[row][col].isVisited =false;
//         }
//         else if(!grid[row][col].isWeight && !grid[row][col].isWall){
//         document.getElementById(`node-${row}-${col}`).className ='node';
//         newGrid[row][col].isWall =false;
//         newGrid[row][col].isWeight =false;
//         newGrid[row][col].isVisited =false;}
//         else if(grid[row][col].isWeight || grid[row][col].isWall){
//           newGrid[row][col].isVisited =false;
//           if(grid[row][col].isWall){
//             document.getElementById(`node-${row}-${col}`).className ='node node-wall';
//           }
//           if(grid[row][col].isWeight){
//             document.getElementById(`node-${row}-${col}`).className ='node node-weight';
//           }
//           }
//     }
    
//   }
//   return newGrid
// };
const resetWeights = (grid) =>{
  let newGrid = grid.slice();
  for (let row = 0; row < gridRow; row++) {
    for (let col = 0; col < gridCol; col++) {
      if(newGrid[row][col].isWeight){
        newGrid[row][col].isWeight =false;
        newGrid[row][col].isVisited =false;
        document.getElementById(`node-${row}-${col}`).className ='node';}
    }
  }
  return newGrid
};

const resetWeightsAndWall = (grid) =>{
  let newGrid = grid.slice();
  for (let row = 0; row < gridRow; row++) {
    for (let col = 0; col < gridCol; col++) {
      if(newGrid[row][col].isWall || newGrid[row][col].isWeight){
        newGrid[row][col].isWall =false;
        newGrid[row][col].isWeight =false;
        newGrid[row][col].isVisited =false;
        document.getElementById(`node-${row}-${col}`).className ='node';}
    }
  }
  return newGrid
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    isWeight: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
    isWeight: false,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
const getNewGridWithWeightToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWeight: !node.isWeight,
    isWall: false,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};