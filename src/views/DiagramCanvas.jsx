import React from 'react';
import BlockComponent from './BlockComponent';
import ConnectionLine from './ConnectionLine';

const DiagramCanvas = ({ 
  model, 
  controller, 
  selectedBlock, 
  onSelectBlock, 
  onCommentClick 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 overflow-auto">
      <div className="relative" style={{ width: '1100px', height: '500px' }}>
        // SVG Layer for Connections 
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 10 3, 0 6" fill="#94a3b8" />
            </marker>
          </defs>
          
          // Render all connections
          {model.connections.map((conn, idx) => (
            <ConnectionLine
              key={idx}
              from={conn.from}
              to={conn.to}
              label={conn.label}
              blocks={model.blocks}
            />
          ))}
        </svg>

        // Blocks Layer
        {model.blocks.map((block) => (
          <BlockComponent
            key={block.id}
            block={block}
            controller={controller}
            onComment={onCommentClick}
            comment={model.comments[block.id]}
            isSelected={selectedBlock === block.id}
            onSelect={onSelectBlock}
          />
        ))}
      </div>
    </div>
  );
};

export default DiagramCanvas;