import { DiagramAPIService } from '../services/DiagramAPIService.js';

export class DiagramController {
  constructor(model, updateCallback) {
    this.model = model;
    this.updateCallback = updateCallback; // Function to trigger view re-render
  }

  addComponent(blockId, componentName) {
    if (!componentName.trim()) return;
    
    const block = this.model.getBlock(blockId);
    if (block) {
      block.addComponent(componentName);
      this.updateCallback(); // Notify view to re-render
    }
  }

  removeComponent(blockId, componentIndex) {
    const block = this.model.getBlock(blockId);
    if (block) {
      block.removeComponent(componentIndex);
      this.updateCallback();
    }
  }

  updateComponent(blockId, componentIndex, newName) {
    const block = this.model.getBlock(blockId);
    if (block) {
      block.updateComponent(componentIndex, newName);
      this.updateCallback();
    }
  }

  addComment(blockId, comment) {
    this.model.addComment(blockId, comment);
    this.updateCallback();
  }

  exportAsJSON() {
    const json = JSON.stringify(this.model.toJSON(), null, 2);
    this.downloadFile(
      json,
      `${this.sanitizeFilename(this.model.productName)}_diagram.json`,
      'application/json'
    );
  }

  exportAsSVG() {
    const svg = this.model.toSVG();
    this.downloadFile(
      svg,
      `${this.sanitizeFilename(this.model.productName)}_diagram.svg`,
      'image/svg+xml'
    );
  }

  downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  sanitizeFilename(name) {
    return name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  }

  // Add to DiagramController.js

async saveDiagram() {
  try {
    const data = this.model.toJSON();
    const result = await DiagramAPIService.saveDiagram(data);
    console.log('Diagram saved:', result);
    return result;
  } catch (error) {
    console.error('Save failed:', error);
    throw error;
  }
}

async loadDiagram(id) {
  try {
    const data = await DiagramAPIService.getDiagram(id);
    // Reconstruct model from loaded data
    // Update view
  } catch (error) {
    console.error('Load failed:', error);
    throw error;
  }
}

  getModel() {
    return this.model;
  }
}