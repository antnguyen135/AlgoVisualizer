export function Astar(grid, startNode, finishNode) {

    const visitedNodesInOrder = [];
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);
    while (unvisitedNodes.length > 0) {
      sortNodesByDistance(unvisitedNodes);
      const closestNode = unvisitedNodes.shift();
      if (closestNode.isWall === true) 
        continue;
      if (closestNode.distance === Infinity)
        return visitedNodesInOrder;
      closestNode.isVisited = true;
      visitedNodesInOrder.push(closestNode);
      if (closestNode === finishNode) 
        return visitedNodesInOrder;
      updateUnvisitedNeighbors(closestNode, grid,finishNode);
    }
  }
  
  function sortNodesByDistance(unvisitedNodes) {
    unvisitedNodes.sort(function(nodeA, nodeB){
        if(nodeA.distance === nodeB.distance)
            return nodeA.heurDistance - nodeB.heurDistance;
        return nodeA.distance - nodeB.distance
    });
  }
  
  function updateUnvisitedNeighbors(node, grid,finishNode) {
    const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
      if(neighbor.isWeight === false)
      {   neighbor.heurDistance = getEuclideanDistance(neighbor,finishNode);
          neighbor.distance = node.distance + 1 + neighbor.heurDistance;}
      else
      {neighbor.heurDistance = getEuclideanDistance(neighbor);
        neighbor.distance = node.distance + 15 + neighbor.heurDistance;}
      neighbor.previousNode = node;
    }
  }
  function getEuclideanDistance (node,finishNode){
    let r = node.row;
    let c = node.col;
    let X = r - finishNode.row;
    let Y = c - finishNode.col;
    let squaredX = Math.pow(X,2);
    let squaredY = Math.pow(Y,2);
    let d = squaredX + squaredY;
    return Math.sqrt(d);

  }
  function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const {col, row} = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
  }
  
  function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
      for (const node of row) {
        nodes.push(node);
      }
    }
    return nodes;
  }
  
  // Backtracks from the finishNode to find the shortest path.
  // Only works when called *after* the dijkstra method above.
  export function getNodesInShortestPathOrderAstar(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  }
  