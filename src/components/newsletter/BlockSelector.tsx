import { useState } from 'react';
import { Type, Image, Donut as ButtonIcon, Heading1, Heading2, Heading3, Minus, ArrowUpDown, X, FileText, Newspaper, Square, Circle, Triangle } from 'lucide-react';

interface BlockSelectorProps {
  onSelectBlock: (type: string) => void;
  onClose: () => void;
  position?: 'fixed' | 'absolute';
}

export function BlockSelector({ onSelectBlock, onClose, position = 'absolute' }: BlockSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<'text' | 'media' | 'layout' | 'advanced'>('text');
  
  const categories = [
    { id: 'text', label: 'Text' },
    { id: 'media', label: 'Media' },
    { id: 'layout', label: 'Layout' },
    { id: 'advanced', label: 'Advanced' }
  ];
  
  const textBlocks = [
    {
      icon: Heading1,
      label: 'Heading 1',
      description: 'Large title for main sections',
      type: 'heading',
      headingLevel: 1
    },
    {
      icon: Heading2,
      label: 'Heading 2',
      description: 'Medium title for subsections',
      type: 'heading',
      headingLevel: 2
    },
    {
      icon: Heading3,
      label: 'Heading 3',
      description: 'Small title for minor sections',
      type: 'heading',
      headingLevel: 3
    },
    {
      label: 'Paragraph',
      description: 'Regular text block for content',
      type: 'paragraph'
    }
  ];
  
  const mediaBlocks = [
    {
      icon: Image,
      label: 'Image',
      description: 'Add an image to your newsletter',
      type: 'image'
    },
    {
      icon: Square,
      label: 'Shape - Square',
      description: 'Add a decorative square shape',
      type: 'shape-square'
    },
    {
      icon: Circle,
      label: 'Shape - Circle',
      description: 'Add a decorative circle shape',
      type: 'shape-circle'
    },
    {
      icon: Triangle,
      label: 'Shape - Triangle',
      description: 'Add a decorative triangle shape',
      type: 'shape-triangle'
    },
    {
      icon: ButtonIcon,
      label: 'Button',
      description: 'Add a clickable button with a link',
      type: 'button'
    }
  ];
  
  const layoutBlocks = [
    {
      icon: Minus,
      label: 'Divider',
      description: 'Horizontal line to separate content',
      type: 'divider'
    },
    {
      icon: ArrowUpDown,
      label: 'Spacer',
      description: 'Add vertical space between elements',
      type: 'spacer'
    }
  ];
  
  const advancedBlocks = [
    {
      icon: Newspaper,
      label: 'Full Article',
      description: 'Complete article with title, text, and optional media',
      type: 'full-article'
    },
    {
      icon: FileText,
      label: 'Custom HTML',
      description: 'Add custom HTML code (for advanced users)',
      type: 'html'
    }
  ];
  
  const getBlocksForCategory = () => {
    switch (selectedCategory) {
      case 'text':
        return textBlocks;
      case 'media':
        return mediaBlocks;
      case 'layout':
        return layoutBlocks;
      case 'advanced':
        return advancedBlocks;
      default:
        return [];
    }
  };
  
  const handleSelectBlock = (type: string) => {
    onSelectBlock(type);
    onClose();
  };
  
  return (
    <div className={`${position} bg-gray-900 rounded-xl border border-gray-800 shadow-xl p-4 w-[500px] max-w-full z-50 animate-fadeIn`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Select Block Type</h3>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      {/* Category Tabs */}
      <div className="flex border-b border-gray-800 mb-4">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id as any)}
            className={`px-4 py-2 border-b-2 transition-colors ${
              selectedCategory === category.id
                ? 'border-purple-500 text-purple-400'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>
      
      {/* Block Options */}
      <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-1">
        {getBlocksForCategory().map((block, index) => (
          <button
            key={index}
            onClick={() => handleSelectBlock(block.type)}
            className="flex items-start gap-3 p-3 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-200 text-left hover:scale-[1.02]"
          >
            <div className="p-2 rounded-lg bg-purple-500/10 flex-shrink-0">
              <block.icon className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <div className="font-medium">{block.label}</div>
              <div className="text-sm text-gray-400">{block.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}