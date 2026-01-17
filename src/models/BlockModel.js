export class BlockModel {
  constructor(id, name, icon, color, borderColor, components = []) {
    this.id = id;
    this.name = name;
    this.icon = icon;
    this.color = color;
    this.borderColor = borderColor;
    this.components = components;
    this.position = { x: 0, y: 0 };
  }

  addComponent(componentName) {
    if (!this.components.includes(componentName)) {
      this.components.push(componentName);
    }
  }

  removeComponent(index) {
    this.components.splice(index, 1);
  }

  updateComponent(index, newName) {
    if (this.components[index]) {
      this.components[index] = newName;
    }
  }

  setPosition(x, y) {
    this.position = { x, y };
  }
}