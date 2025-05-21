import { AlignLeft, AlignCenter, AlignRight, Heading1, Heading2, Heading3, Trash2, ArrowUp, ArrowDown, Link as LinkIcon, Image as ImageIcon, Donut as ButtonIcon, Minus, ArrowUpDown } from 'lucide-react';
import React, { useState } from 'react';

interface ArticleBlockProps {
  id: string;
  order: number;
  type: string;
  content?: string;
  headingLevel?: number;
  imageUrl?: string;
  buttonText?: string;
  buttonUrl?: string;
  alignment: 'left' | 'center' | 'right';
  height?: number;
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: string;
  shapeType?: 'square' | 'circle' | 'triangle';
  shapeSize?: number;
  shapeColor?: string;
  isSelected?: boolean;
  onClick?: () => void;
  onMove?: (direction: 'up' | 'down') => void;
  onDelete?: () => void;
  canMoveUp?: boolean;
  canMoveDown?: boolean;
}

interface BlockSettingsProps {
  block: ArticleBlockProps;
  onUpdate: (updates: Partial<ArticleBlockProps>) => void;
  controls: {
    alignment?: boolean;
    text?: boolean;
    headingLevel?: boolean;
    image?: boolean;
    button?: boolean;
    spacer?: boolean;
    shape?: boolean;
  } | null;
}

export function ArticleBlock({
  id,
  order,
  type,
  content,
  headingLevel,
  imageUrl,
  buttonText,
  buttonUrl,
  alignment,
  height,
  backgroundColor,
  textColor,
  borderRadius,
  shapeType,
  shapeSize,
  shapeColor,
  isSelected,
  onClick,
  onMove,
  onDelete,
  canMoveUp,
  canMoveDown
}: ArticleBlockProps) {
  // Render shape based on type
  const renderShape = () => {
    const size = shapeSize || 100;
    const color = shapeColor || '#6366f1';
    
    switch (shapeType) {
      case 'square':
        return (
          <div 
            style={{ 
              width: `${size}px`, 
              height: `${size}px`, 
              backgroundColor: color,
              borderRadius: borderRadius || '0px',
              margin: alignment === 'center' ? '0 auto' : alignment === 'right' ? '0 0 0 auto' : '0'
            }} 
          />
        );
      case 'circle':
        return (
          <div 
            style={{ 
              width: `${size}px`, 
              height: `${size}px`, 
              backgroundColor: color,
              borderRadius: '50%',
              margin: alignment === 'center' ? '0 auto' : alignment === 'right' ? '0 0 0 auto' : '0'
            }} 
          />
        );
      case 'triangle':
        return (
          <div 
            style={{ 
              width: '0',
              height: '0',
              borderLeft: `${size/2}px solid transparent`,
              borderRight: `${size/2}px solid transparent`,
              borderBottom: `${size}px solid ${color}`,
              margin: alignment === 'center' ? '0 auto' : alignment === 'right' ? '0 0 0 auto' : '0'
            }} 
          />
        );
      default:
        return null;
    }
  };
  
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
          {type === 'heading' && (
            <div style={{ textAlign: alignment }}>
              {headingLevel === 1 && <h1 className="text-3xl font-bold">{content}</h1>}
              {headingLevel === 2 && <h2 className="text-2xl font-bold">{content}</h2>}
              {headingLevel === 3 && <h3 className="text-xl font-bold">{content}</h3>}
            </div>
          )}

          {type === 'paragraph' && (
            <p style={{ textAlign: alignment }}>{content}</p>
          )}

          {type === 'image' && (
            <div style={{ textAlign: alignment }}>
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Newsletter content"
                  className="max-w-full rounded-lg"
                />
              ) : (
                <div className="bg-gray-200 h-40 flex items-center justify-center rounded-lg">
                  <ImageIcon className="w-8 h-8 text-gray-400" />
                  <span className="ml-2 text-gray-500">Image {order}</span>
                </div>
              )}
            </div>
          )}

          {type === 'button' && (
            <div style={{ textAlign: alignment }}>
              <button className="px-4 py-2 bg-purple-500 text-white rounded-lg">
                {buttonText || 'Button Text'}
              </button>
            </div>
          )}

          {type === 'divider' && (
            <hr className="my-4 border-gray-700" />
          )}

          {type === 'spacer' && (
            <div style={{ height: `${height || 20}px` }} />
          )}
          
          {type.startsWith('shape-') && renderShape()}
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

export function BlockSettings({ block, onUpdate, controls }: BlockSettingsProps) {
  if (!controls) return null;

  // Determine if this is a shape block
  const isShapeBlock = block.type.startsWith('shape-');
  const shapeType = isShapeBlock ? block.type.replace('shape-', '') as 'square' | 'circle' | 'triangle' : undefined;
  
  // If it's a shape block, add shape controls
  if (isShapeBlock && !controls.shape) {
    controls.shape = true;
  }
  
  return (
    <div className="space-y-4">
      {controls.alignment && (
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
      )}

      {controls.text && (
        <div>
          <label className="block text-sm font-medium mb-2">Content</label>
          <textarea
            value={block.content}
            onChange={(e) => onUpdate({ content: e.target.value })}
            className="w-full p-2 bg-gray-800 rounded-lg"
            rows={4}
          />
        </div>
      )}

      {controls.headingLevel && (
        <div>
          <label className="block text-sm font-medium mb-2">Heading Level</label>
          <div className="flex gap-2">
            <button
              onClick={() => onUpdate({ headingLevel: 1 })}
              className={`p-2 rounded ${
                block.headingLevel === 1
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              <Heading1 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onUpdate({ headingLevel: 2 })}
              className={`p-2 rounded ${
                block.headingLevel === 2
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              <Heading2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onUpdate({ headingLevel: 3 })}
              className={`p-2 rounded ${
                block.headingLevel === 3
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              <Heading3 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {controls.image && (
        <div>
          <label className="block text-sm font-medium mb-2">Image URL</label>
          <input
            type="text"
            value={block.imageUrl}
            onChange={(e) => onUpdate({ imageUrl: e.target.value })}
            className="w-full p-2 bg-gray-800 rounded-lg"
            placeholder="https://example.com/image.jpg"
          />
        </div>
      )}

      {controls.button && (
        <>
          <div>
            <label className="block text-sm font-medium mb-2">Button Text</label>
            <input
              type="text"
              value={block.buttonText}
              onChange={(e) => onUpdate({ buttonText: e.target.value })}
              className="w-full p-2 bg-gray-800 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Button URL</label>
            <input
              type="text"
              value={block.buttonUrl}
              onChange={(e) => onUpdate({ buttonUrl: e.target.value })}
              className="w-full p-2 bg-gray-800 rounded-lg"
              placeholder="https://example.com"
            />
          </div>
        </>
      )}

      {controls.spacer && (
        <div>
          <label className="block text-sm font-medium mb-2">Height (px)</label>
          <input
            type="number"
            value={block.height}
            onChange={(e) => onUpdate({ height: parseInt(e.target.value) })}
            className="w-full p-2 bg-gray-800 rounded-lg"
            min="1"
            max="200"
          />
        </div>
      )}
      
      {controls.shape && (
        <>
          <div>
            <label className="block text-sm font-medium mb-2">Shape Size (px)</label>
            <input
              type="number"
              value={block.shapeSize || 100}
              onChange={(e) => onUpdate({ shapeSize: parseInt(e.target.value) })}
              className="w-full p-2 bg-gray-800 rounded-lg"
              min="10"
              max="500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Shape Color</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={block.shapeColor || '#6366f1'}
                onChange={(e) => onUpdate({ shapeColor: e.target.value })}
                className="w-10 h-10 rounded-lg"
              />
              <input
                type="text"
                value={block.shapeColor || '#6366f1'}
                onChange={(e) => onUpdate({ shapeColor: e.target.value })}
                className="flex-1 p-2 bg-gray-800 rounded-lg"
              />
            </div>
          </div>
          {shapeType === 'square' && (
            <div>
              <label className="block text-sm font-medium mb-2">Border Radius (px)</label>
              <input
                type="number"
                value={parseInt(block.borderRadius || '0')}
                onChange={(e) => onUpdate({ borderRadius: `${e.target.value}px` })}
                className="w-full p-2 bg-gray-800 rounded-lg"
                min="0"
                max="100"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

export type { ArticleBlockProps, BlockSettingsProps };