import React, { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
} from 'reactflow';
import 'reactflow/dist/style.css';
import './App.css';

import NodeComponent from './NodeComponent';
import { validateDag } from './ValidationService';
import getLayoutedElements from './getLayoutedElements';
import ControlsPanel from './Controls';

const nodeTypes = {
  custom: NodeComponent,
};

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedElements, setSelectedElements] = useState([]);
  const [validationMessage, setValidationMessage] = useState('');

  const addNode = () => {
    const label = prompt('Enter node label:');
    if (!label) return;

    const newNode = {
      id: `${+new Date()}`,
      data: { label },
      position: {
        x: Math.random() * 300,
        y: Math.random() * 300,
      },
      type: 'custom',
    };

    setNodes((nds) => [...nds, newNode]);
  };

const onConnect = useCallback(
  (params) => {
    if (params.source === params.target) {
      setValidationMessage('❌ Self-loop detected');
      return;
    }

    setEdges((eds) => addEdge({ ...params, animated: true }, eds));
    setValidationMessage('');
  },
  [setEdges]
);


  const onSelectionChange = ({ nodes, edges }) => {
    const selected = [...nodes, ...edges];
    setSelectedElements(selected);
  };

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'Delete' && selectedElements.length > 0) {
        const selectedIds = new Set(selectedElements.map((el) => el.id));
        setNodes((nds) => nds.filter((node) => !selectedIds.has(node.id)));
        setEdges((eds) => eds.filter((edge) => !selectedIds.has(edge.id)));
        setSelectedElements([]);
      }
    },
    [selectedElements, setNodes, setEdges]
  );

  const applyAutoLayout = () => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      nodes,
      edges,
      'LR'
    );
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    const msg = validateDag(nodes, edges);
    setValidationMessage(msg);
  }, [nodes, edges]);

  useEffect(() => {
  const handler = (e) => {
      const id = e.detail;
      setNodes((nds) => nds.filter((n) => n.id !== id));
      setEdges((eds) => eds.filter((e) => e.source !== id && e.target !== id));
    };
    document.addEventListener('delete-node', handler);
    return () => document.removeEventListener('delete-node', handler);
  }, []);


  return (
    <ReactFlowProvider>
      <ControlsPanel onAddNode={addNode} onAutoLayout={applyAutoLayout} />

      <div className="canvas-container">
        <div
          className={`dag-status ${
            validationMessage.startsWith('✅') ? 'valid' : 'invalid'
          }`}
        >
          {validationMessage}
        </div>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onSelectionChange={onSelectionChange}
          nodeTypes={nodeTypes}
          fitView
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
}

export default App;
