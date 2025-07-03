import React from 'react';
import { Handle, Position } from 'reactflow';
import './NodeComponent.css'; // Ensure this file exists

const typeStyles = {
  source: 'node-source',
  process: 'node-process',
  output: 'node-output',
};

const NodeComponent = ({ data }) => {
  const nodeType = data.type || 'process'; // default type

  return (
    <div className={`custom-node ${typeStyles[nodeType]}`}>
      <Handle type="target" position={Position.Left} isConnectable={true} />
      <div className="label">
        {data.label}
        <span className="type-badge">{nodeType}</span>
      </div>
      <Handle type="source" position={Position.Right} isConnectable={true} />
    </div>
  );
};

export default NodeComponent;
