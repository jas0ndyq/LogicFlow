import { BaseEdgeModel, BaseNodeModel } from "@logicflow/core"

type GraphData = {
  nodes: BaseNodeModel[],
  edges: BaseEdgeModel[]
}

type NodeObject = {
  [id:string]: BaseNodeModel,
}

export const generateNodeObject = (graphData: GraphData): NodeObject => {
  const result:NodeObject = {};
  graphData.nodes.forEach(node => {
    result[node.id] = node;
  }) 
  return result;
}

type EdgeNodeObject = {
  [id: string]: BaseEdgeModel[]
}

export const generateEdgeNodeObject = (graphData: GraphData, type: 'sourceNodeId' | 'targetNodeId'): EdgeNodeObject => {
  const result:EdgeNodeObject = {};
  graphData.edges.forEach(edge => {
    if (!edge[type]) {
      return;
    }
    if (!result[edge[type]]) {
      result[edge[type]] = [edge];
    }
    else {
      result[edge[type]].push(edge);
    }
  }) 
  return result;
}