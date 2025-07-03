export function validateDag(nodes, edges) {
  if (nodes.length < 2) return '❌ DAG must have at least 2 nodes';

  const adj = {};
  nodes.forEach((n) => (adj[n.id] = []));
  edges.forEach((e) => {
    if (e.source !== e.target) {
      adj[e.source].push(e.target);
    }
  });

  const visited = {};
  const recStack = {};

  const hasCycle = (nodeId) => {
    if (!visited[nodeId]) {
      visited[nodeId] = true;
      recStack[nodeId] = true;

      for (const neighbor of adj[nodeId]) {
        if (!visited[neighbor] && hasCycle(neighbor)) return true;
        if (recStack[neighbor]) return true;
      }
    }
    recStack[nodeId] = false;
    return false;
  };

  for (const node of nodes) {
    if (hasCycle(node.id)) return '❌ DAG has a cycle';
  }

  const connected = new Set();
  edges.forEach((e) => {
    connected.add(e.source);
    connected.add(e.target);
  });

  for (const node of nodes) {
    if (!connected.has(node.id)) {
      return `❌ Node "${node.data.label}" is not connected`;
    }
  }

  return '✅ Valid DAG';
}
