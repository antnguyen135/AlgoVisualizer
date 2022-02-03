import React, {Component} from 'react';
import Node from './Node/Node';
import {dijkstra, getNodesInShortestPathOrder} from '../algorithms/dijkstra';
import {DFS, getNodesInShortestPathOrderDFS} from '../algorithms/DFS';
import {BFS, getNodesInShortestPathOrderBFS} from '../algorithms/BFS';
import {stairs} from '../Mazes/simpleStair';
import { mazeGenerate } from '../animate/mazeAnimate';
import './PathfindingVisualizer.css';
import { recursiveMaze, wallsToAnimateRec} from '../Mazes/recursiveMaze';

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
    };
  }

  getStairGrid(){
    let wallsToAnimate = stairs(this.state.grid);
    mazeGenerate(wallsToAnimate);
  }
   getRecursiveMaze(Orientation){ //(grid, rowStart, rowEnd, colStart, colEnd, orientation, outerWalls)   
    recursiveMaze(this.state.grid,2,27,2,47,Orientation, false);
    mazeGenerate(wallsToAnimateRec);
   }
  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({grid});
  }
  resetBoard(grid){
    const newGrid = resetGrid(this.state.grid);
    this.setState({newGrid});
  }
  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid, mouseIsPressed: true});
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid});
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
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, speedAnimatealgo * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, speedAnimatePath * i);
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
        <button className = "button" onClick={() => this.visualizeDijkstra()}>
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
        <button className = "button" onClick={() => this.getRecursiveMaze("Horizontal")}>
          Horizontal Recursive Maze
        </button>
        <button className = "button" onClick={() => this.getRecursiveMaze("Vertical")}>
          Vertical Recursive Maze
        </button>
        </div>
        </div>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const {row, col, isFinish, isStart, isWall} = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
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
        
        </div>
      </>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 30; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};
const resetGrid = (grid) =>{
  let newGrid = grid.slice();
  for (let row = 0; row < 50; row++) {
    for (let col = 0; col < 75; col++) {
      newGrid[row][col] = createNode(col,row);
      newGrid[row][col].id = "node";
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
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

