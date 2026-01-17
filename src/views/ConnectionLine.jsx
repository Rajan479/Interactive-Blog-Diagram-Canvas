import React from 'react';

const ConnectionLine = ({ from, to, label, blocks }) => {
  const fromBlock = blocks.find(b => b.id === from);
  const toBlock = blocks.find(b => b.id === to);

  if (!fromBlock || !toBlock) return null;

  // Calculate connection points (right edge of source to left edge of target)
  const x1 = fromBlock.position.x + 300; // Block width is 300
  const y1 = fromBlock.position.y + 75;  // Middle of block height
  const x2 = toBlock.position.x;
  const y2 = toBlock.position.y + 75;

  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="#94a3b8"
        strokeWidth="2"
        strokeDasharray="5,5"
        markerEnd="url(#arrowhead)"
      />
      <text
        x={(x1 + x2) / 2}
        y={(y1 + y2) / 2 - 5}
        fill="#64748b"
        fontSize="11"
        textAnchor="middle"
        className="pointer-events-none"
      >
        {label}
      </text>
    </g>
  );
};

export default ConnectionLine;