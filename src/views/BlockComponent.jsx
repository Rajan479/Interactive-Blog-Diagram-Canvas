import React, { useState } from 'react';
import { Plus, Trash2, Edit3, Save, MessageSquare, Zap, Radio, Cpu, Monitor, Box } from 'lucide-react';

const BlockComponent = ({ block, controller, onComment, comment, isSelected, onSelect }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [newComponent, setNewComponent] = useState('');

  // Icon mapping
  const getIcon = (iconName) => {
    const icons = { Zap, Radio, Cpu, Monitor, Box };
    const Icon = icons[iconName] || Box;
    return <Icon className="w-5 h-5" />;
  };

  // Start editing a component
  const handleEdit = (index, currentValue) => {
    setEditingIndex(index);
    setEditValue(currentValue);
  };

  // Save edited component
  const handleSaveEdit = () => {
    controller.updateComponent(block.id, editingIndex, editValue);
    setEditingIndex(null);
    setEditValue('');
  };

  // Add new component
  const handleAddComponent = () => {
    if (newComponent.trim()) {
      controller.addComponent(block.id, newComponent);
      setNewComponent('');
    }
  };

  return (
    <div
      onClick={() => onSelect(block.id)}
      className={`absolute rounded-lg shadow-lg p-4 cursor-pointer transition-all ${
        isSelected ? 'ring-4 ring-blue-500' : ''
      }`}
      style={{
        left: block.position.x,
        top: block.position.y,
        width: '300px',
        backgroundColor: block.color,
        borderLeft: `4px solid ${block.borderColor}`
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {getIcon(block.icon)}
          <h3 className="font-bold text-gray-800">{block.name}</h3>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onComment(block.id);
          }}
          className="p-1 hover:bg-gray-200 rounded"
          title="Add comment"
        >
          <MessageSquare className="w-4 h-4" />
        </button>
      </div>

      {/* Components List */}
      <div className="space-y-2">
        {block.components.map((comp, idx) => (
          <div key={idx} className="flex items-center gap-2 text-sm">
            {editingIndex === idx ? (
              // Edit mode
              <>
                <input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="flex-1 px-2 py-1 border rounded text-xs"
                  onClick={(e) => e.stopPropagation()}
                  autoFocus
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSaveEdit();
                  }}
                  className="p-1 bg-green-500 text-white rounded"
                  title="Save"
                >
                  <Save className="w-3 h-3" />
                </button>
              </>
            ) : (
              // Display mode
              <>
                <span className="flex-1 text-gray-700">• {comp}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(idx, comp);
                  }}
                  className="p-1 hover:bg-gray-200 rounded"
                  title="Edit"
                >
                  <Edit3 className="w-3 h-3" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    controller.removeComponent(block.id, idx);
                  }}
                  className="p-1 hover:bg-red-100 rounded"
                  title="Delete"
                >
                  <Trash2 className="w-3 h-3 text-red-500" />
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Add Component Input */}
      <div className="mt-3 flex gap-2">
        <input
          value={newComponent}
          onChange={(e) => setNewComponent(e.target.value)}
          placeholder="Add component..."
          className="flex-1 px-2 py-1 border rounded text-xs"
          onClick={(e) => e.stopPropagation()}
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleAddComponent();
          }}
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleAddComponent();
          }}
          className="p-1 bg-blue-500 text-white rounded"
          title="Add"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Comment Display */}
      {comment && (
        <div className="mt-3 p-2 bg-yellow-100 rounded text-xs">
          <strong>Note:</strong> {comment}
        </div>
      )}
    </div>
  );
};

export default BlockComponent;