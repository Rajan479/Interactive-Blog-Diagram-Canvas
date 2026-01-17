import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { DiagramModel } from './models/DiagramModel';
import { DiagramController } from './controllers/DiagramController';
import { ComponentCategorizationService } from './services/ComponentCategorizationService';
import DiagramCanvas from './views/DiagramCanvas';

function App() {
  const [prompt, setPrompt] = useState('');
  const [model, setModel] = useState(null);
  const [controller, setController] = useState(null);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [commentBlockId, setCommentBlockId] = useState(null);
  const [, forceUpdate] = useState(); // For triggering re-renders

  // Generate diagram from natural language
  const handleGenerate = () => {
    if (!prompt.trim()) return;

    // Step 1: Use service to categorize components
    const components = ComponentCategorizationService.categorize(prompt);
    
    // Step 2: Create model with categorized components
    const newModel = new DiagramModel(prompt, components);
    
    // Step 3: Create controller with model and update callback
    const newController = new DiagramController(newModel, () => forceUpdate({}));
    
    // Step 4: Update state
    setModel(newModel);
    setController(newController);
    setSelectedBlock(null);
  };

  const handleCommentClick = (blockId) => {
    setCommentBlockId(blockId);
    setCommentText(model.comments[blockId] || '');
    setShowCommentModal(true);
  };

  const handleSaveComment = () => {
    controller.addComment(commentBlockId, commentText);
    setShowCommentModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Electronics Block Diagram Generator
          </h1>
          <p className="text-gray-600 mb-4">
            Generate interactive block diagrams from natural language (MVC Architecture)
          </p>

          {/* Input */}
          <div className="flex gap-3">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., smart doorbell with camera and motion sensor"
              className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
            />
            <button
              onClick={handleGenerate}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Generate
            </button>
          </div>
        </div>

        {/* Export Controls */}
        {model && (
          <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex gap-3">
            <button
              onClick={() => controller.exportAsJSON()}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg"
            >
              <Download className="w-4 h-4" />
              Export JSON
            </button>
            <button
              onClick={() => controller.exportAsSVG()}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg"
            >
              <Download className="w-4 h-4" />
              Export SVG
            </button>
          </div>
        )}

        {/* Canvas */}
        {model && (
          <DiagramCanvas
            model={model}
            controller={controller}
            selectedBlock={selectedBlock}
            onSelectBlock={setSelectedBlock}
            onCommentClick={handleCommentClick}
          />
        )}

        {/* Comment Modal */}
        {showCommentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96">
              <h3 className="text-lg font-bold mb-4">Add Comment</h3>
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg mb-4 h-32"
                placeholder="Enter your comment..."
              />
              <div className="flex gap-3">
                <button
                  onClick={handleSaveComment}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowCommentModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-300 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;