import React from 'react';
import { FaPlus, FaProjectDiagram } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';
import './Controls.css';

const ControlsPanel = ({ onAddNode, onAutoLayout }) => (
  <>
    <button
      className="control-button add-button"
      onClick={onAddNode}
      data-tooltip-id="tooltip"
      data-tooltip-content="Add Node"
    >
      <FaPlus /> Node
    </button>

    <button
      className="control-button layout-button"
      onClick={onAutoLayout}
      data-tooltip-id="tooltip"
      data-tooltip-content="Auto Layout"
    >
      <FaProjectDiagram /> Layout
    </button>

    {/* Tooltip container once */}
    <Tooltip id="tooltip" place="bottom" />
  </>
);

export default ControlsPanel;
