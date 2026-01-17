import { BlockModel } from './BlockModel';

export class DiagramModel {
  constructor(productName = '', components = {}) {
    this.productName = productName;
    this.timestamp = new Date().toISOString();
    this.blocks = this.initializeBlocks(components);
    this.connections = this.generateConnections();
    this.comments = {};
  }

  initializeBlocks(components) {
    const blocks = [
      new BlockModel(
        'power',
        'Power Supply',
        'Zap',
        '#fee2e2',
        '#f87171',
        components.powerSupply || []
      ),
      new BlockModel(
        'inputs',
        'Inputs Block',
        'Radio',
        '#dbeafe',
        '#60a5fa',
        components.inputs || []
      ),
      new BlockModel(
        'control',
        'Control & Processing',
        'Cpu',
        '#dcfce7',
        '#4ade80',
        components.control || []
      ),
      new BlockModel(
        'outputs',
        'Outputs Block',
        'Monitor',
        '#fef3c7',
        '#fbbf24',
        components.outputs || []
      ),
      new BlockModel(
        'peripherals',
        'Other Peripherals',
        'Box',
        '#e9d5ff',
        '#a855f7',
        components.peripherals || []
      )
    ];

    // Set positions (left to right, top to bottom layout)
    blocks[0].setPosition(50, 50);    // Power: top-left
    blocks[1].setPosition(50, 250);   // Inputs: bottom-left
    blocks[2].setPosition(400, 150);  // Control: center
    blocks[3].setPosition(750, 250);  // Outputs: bottom-right
    blocks[4].setPosition(750, 50);   // Peripherals: top-right

    return blocks;
  }

  generateConnections() {
    return [
      { from: 'power', to: 'control', label: 'VCC/GND' },
      { from: 'power', to: 'inputs', label: '3.3V/5V' },
      { from: 'power', to: 'outputs', label: 'Power' },
      { from: 'power', to: 'peripherals', label: 'Power' },
      { from: 'inputs', to: 'control', label: 'Sensor Data' },
      { from: 'control', to: 'outputs', label: 'Control Signals' },
      { from: 'control', to: 'peripherals', label: 'I2C/SPI/UART' }
    ];
  }

  getBlock(blockId) {
    return this.blocks.find(b => b.id === blockId);
  }

  addComment(blockId, comment) {
    this.comments[blockId] = comment;
  }

  toJSON() {
    return {
      productName: this.productName,
      timestamp: this.timestamp,
      blocks: this.blocks.map(block => ({
        id: block.id,
        name: block.name,
        components: block.components,
        position: block.position
      })),
      connections: this.connections,
      comments: this.comments
    };
  }

  toSVG(width = 1100, height = 500) {
    let svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">`;
    
    // Draw connections
    svg += '<g id="connections">';
    this.connections.forEach(conn => {
      const fromBlock = this.getBlock(conn.from);
      const toBlock = this.getBlock(conn.to);
      if (fromBlock && toBlock) {
        const x1 = fromBlock.position.x + 150;
        const y1 = fromBlock.position.y + 75;
        const x2 = toBlock.position.x;
        const y2 = toBlock.position.y + 75;
        svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#94a3b8" stroke-width="2" stroke-dasharray="5,5"/>`;
        svg += `<text x="${(x1+x2)/2}" y="${(y1+y2)/2-5}" fill="#64748b" font-size="12">${conn.label}</text>`;
      }
    });
    svg += '</g>';
    
    // Draw blocks
    this.blocks.forEach(block => {
      const height = 60 + block.components.length * 25;
      svg += `<g id="${block.id}">`;
      svg += `<rect x="${block.position.x}" y="${block.position.y}" width="300" height="${height}" fill="${block.color}" stroke="${block.borderColor}" stroke-width="2" rx="8"/>`;
      svg += `<text x="${block.position.x + 10}" y="${block.position.y + 30}" font-size="16" font-weight="bold" fill="#1e293b">${block.name}</text>`;
      block.components.forEach((comp, idx) => {
        svg += `<text x="${block.position.x + 20}" y="${block.position.y + 60 + idx * 25}" font-size="14" fill="#475569">• ${comp}</text>`;
      });
      svg += '</g>';
    });
    
    svg += '</svg>';
    return svg;
  }
}