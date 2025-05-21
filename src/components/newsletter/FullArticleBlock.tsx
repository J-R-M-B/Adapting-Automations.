import React, { useState } from 'react';
import { 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Heading1, 
  Heading2, 
  Heading3, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Image as ImageIcon, 
  Video, 
  Type,
  Layout,
  Info,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

interface FullArticleBlockProps {
  id: string;
  order: number;
  title: string;
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  alignment: 'left' | 'center' | 'right';
  showImage: boolean;
  showVideo: boolean;
  isSelected?: boolean;
  onClick?: () => void;
  onMove?: (direction: 'up' | 'down') => void;
  onDelete?: () => void;
  canMoveUp?: boolean;
  canMoveDown?: boolean;
  onUpdate?: (updates: Partial<FullArticleBlockProps>) => void;
}

export function FullArticleBlock({
  id,
  order,
  title,
  content,
  imageUrl,
  videoUrl,
  alignment,
  showImage,
  showVideo,
  isSelected,
  onClick,
  onMove,
  onDelete,
  canMoveUp,
  canMoveDown,
  onUpdate
}: FullArticleBlockProps) {
  return (
    <div
      className={`relative p-4 rounded-lg transition-all ${
        isSelected
          ? 'bg-gray-800 border-2 border-purple-500'
          : 'bg-gray-900 hover:bg-gray-800'
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div style={{ textAlign: alignment }}>
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            
            {showImage && imageUrl && (
              <div className="mb-4">
                <img
                  src={imageUrl}
                  alt={title}
                  className="max-w-full rounded-lg"
                />
              </div>
            )}
            
            {showImage && !imageUrl && (
              <div className="bg-gray-200 h-40 flex items-center justify-center rounded-lg mb-4">
                <ImageIcon className="w-8 h-8 text-gray-400" />
                <span className="ml-2 text-gray-500">Featured Image</span>
              </div>
            )}
            
            {showVideo && videoUrl && (
              <div className="mb-4">
                <iframe
                  src={videoUrl}
                  className="w-full h-64 rounded-lg"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
            
            {showVideo && !videoUrl && (
              <div className="bg-gray-200 h-40 flex items-center justify-center rounded-lg mb-4">
                <Video className="w-8 h-8 text-gray-400" />
                <span className="ml-2 text-gray-500">Featured Video</span>
              </div>
            )}
            
            <div className="text-gray-300 whitespace-pre-wrap">
              {content}
            </div>
          </div>
        </div>

        {isSelected && (
          <div className="flex flex-col gap-2">
            {canMoveUp && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onMove?.('up');
                }}
                className="p-1 hover:bg-gray-700 rounded"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            )}
            {canMoveDown && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onMove?.('down');
                }}
                className="p-1 hover:bg-gray-700 rounded"
              >
                <ArrowDown className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.();
              }}
              className="p-1 hover:bg-gray-700 rounded text-red-500"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function FullArticleBlockSettings({ 
  block, 
  onUpdate 
}: { 
  block: FullArticleBlockProps, 
  onUpdate: (updates: Partial<FullArticleBlockProps>) => void 
}) {
  const [articleLength, setArticleLength] = useState<'short' | 'medium' | 'long'>('medium');

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Alignment</label>
        <div className="flex gap-2">
          <button
            onClick={() => onUpdate({ alignment: 'left' })}
            className={`p-2 rounded ${
              block.alignment === 'left'
                ? 'bg-purple-500 text-white'
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            <AlignLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => onUpdate({ alignment: 'center' })}
            className={`p-2 rounded ${
              block.alignment === 'center'
                ? 'bg-purple-500 text-white'
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            <AlignCenter className="w-4 h-4" />
          </button>
          <button
            onClick={() => onUpdate({ alignment: 'right' })}
            className={`p-2 rounded ${
              block.alignment === 'right'
                ? 'bg-purple-500 text-white'
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            <AlignRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Article Options</label>
        <div className="space-y-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
          {/* Article Length */}
          <div>
            <label className="block text-sm font-medium mb-2">Article Length</label>
            <div className="flex gap-2">
              {['short', 'medium', 'long'].map((length) => (
                <button
                  key={length}
                  onClick={() => {
                    setArticleLength(length as 'short' | 'medium' | 'long');
                    // Update content placeholder based on length
                    let placeholder = '';
                    if (length === 'short') placeholder = 'A1T - Short article text';
                    if (length === 'medium') placeholder = 'A1T - Medium length article with more details';
                    if (length === 'long') placeholder = 'A1T - Long form article with comprehensive information';
                    onUpdate({ content: placeholder });
                  }}
                  className={`px-3 py-1 rounded ${
                    articleLength === length
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                  }`}
                >
                  {length.charAt(0).toUpperCase() + length.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          {/* Text Toggle */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm font-medium">
              <span>Show Text</span>
            </label>
            <button
              onClick={() => {
                // Toggle between showing text or not
                const newContent = block.content ? '' : 'A1T';
                onUpdate({ content: newContent });
              }}
              className={`p-1 rounded ${
                block.content ? 'text-purple-400' : 'text-gray-500'
              }`}
            >
              {block.content ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
            </button>
          </div>
          
          {/* Headline Toggle */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm font-medium">
              <span>Show Headline</span>
            </label>
            <button
              onClick={() => {
                // Toggle between showing headline or not
                const newTitle = block.title ? '' : 'A1H';
                onUpdate({ title: newTitle });
              }}
              className={`p-1 rounded ${
                block.title ? 'text-purple-400' : 'text-gray-500'
              }`}
            >
              {block.title ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Media Options */}
      <div className="space-y-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
        <h4 className="font-medium text-sm">Media Options</h4>
        
        {/* Image Toggle */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm">
            <ImageIcon className="w-4 h-4 text-gray-400" />
            <span>Show Image</span>
          </label>
          <button
            onClick={() => onUpdate({ showImage: !block.showImage })}
            className={`p-1 rounded ${
              block.showImage ? 'text-purple-400' : 'text-gray-500'
            }`}
          >
            {block.showImage ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Video Toggle */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm">
            <Video className="w-4 h-4 text-gray-400" />
            <span>Show Video</span>
          </label>
          <button
            onClick={() => onUpdate({ showVideo: !block.showVideo })}
            className={`p-1 rounded ${
              block.showVideo ? 'text-purple-400' : 'text-gray-500'
            }`}
          >
            {block.showVideo ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {block.showImage && (
        <div>
          <label className="block text-sm font-medium mb-2">Image URL</label>
          <input
            type="text"
            value={block.imageUrl || ''}
            onChange={(e) => onUpdate({ imageUrl: e.target.value })}
            className="w-full p-2 bg-gray-800 rounded-lg"
            placeholder="https://example.com/image.jpg"
          />
          <p className="text-xs text-gray-400 mt-1">
            This will be replaced with A1I if used in the content
          </p>
        </div>
      )}

      {block.showVideo && (
        <div>
          <label className="block text-sm font-medium mb-2">Video Embed URL</label>
          <input
            type="text"
            value={block.videoUrl || ''}
            onChange={(e) => onUpdate({ videoUrl: e.target.value })}
            className="w-full p-2 bg-gray-800 rounded-lg"
            placeholder="https://www.youtube.com/embed/VIDEO_ID"
          />
          <p className="text-xs text-gray-400 mt-1 flex items-start gap-1">
            <span>Use embed URLs (e.g., https://www.youtube.com/embed/VIDEO_ID)</span>
            <span>This will be replaced with A1V if used in the content</span>
          </p>
        </div>
      )}
      
      <div className="mt-4 p-3 bg-gray-800/50 rounded-lg border border-purple-500/20">
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0" />
          <div className="text-xs text-gray-300">
            <p className="mb-1">Article variables will be replaced with actual content:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><code className="bg-gray-700 px-1 rounded">A1H</code> - Article 1 Headline</li>
              <li><code className="bg-gray-700 px-1 rounded">A1T</code> - Article 1 Text</li>
              <li><code className="bg-gray-700 px-1 rounded">A1I</code> - Article 1 Image</li>
              <li><code className="bg-gray-700 px-1 rounded">A1V</code> - Article 1 Video</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export type { FullArticleBlockProps };