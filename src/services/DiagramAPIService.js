const API_BASE_URL = 'http://localhost:3000/api';

export class DiagramAPIService {
  static async getAllDiagrams() {
    const response = await fetch(`${API_BASE_URL}/diagrams`);
    if (!response.ok) throw new Error('Failed to fetch diagrams');
    return response.json();
  }

  static async getDiagram(id) {
    const response = await fetch(`${API_BASE_URL}/diagrams/${id}`);
    if (!response.ok) throw new Error('Failed to fetch diagram');
    return response.json();
  }

  static async saveDiagram(diagramData) {
    const response = await fetch(`${API_BASE_URL}/diagrams`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(diagramData)
    });
    if (!response.ok) throw new Error('Failed to save diagram');
    return response.json();
  }

  static async updateDiagram(id, diagramData) {
    const response = await fetch(`${API_BASE_URL}/diagrams/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(diagramData)
    });
    if (!response.ok) throw new Error('Failed to update diagram');
    return response.json();
  }

  static async deleteDiagram(id) {
    const response = await fetch(`${API_BASE_URL}/diagrams/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete diagram');
    return response.json();
  }
}