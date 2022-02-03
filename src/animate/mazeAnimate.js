import { speedAnimatealgo } from "../PathfindingVisualizer/PathfindingVisualizer";
export function mazeGenerate(wallsToAnimate){
    let nodes = wallsToAnimate.slice();
    for (let i = 0; i <= nodes.length; i++) {
        if (i === nodes.length) {
          wallsToAnimate = [];
          return;
        }
        setTimeout(() => {
          const node = nodes[i];
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'node node-wall';
        }, speedAnimatealgo*2 * i);
      }
    }