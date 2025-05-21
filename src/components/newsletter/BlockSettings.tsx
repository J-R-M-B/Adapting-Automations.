import React from 'react';

interface BlockSettingsProps {
  block: {
    id: string;
    type: string;
    [key: string]: any;
  };
  onUpdate: (updates: any) => void;
  newsletterSettings: any;
}

export default function BlockSettings({ block, onUpdate, newsletterSettings }: BlockSettingsProps) {
  if (!block) return null;

  return (
    <div className="space-y-4">
      {block.type === 'article' && (
        <>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-200">
              Title
            </label>
            <input
              type="text"
              value={block.title || ''}
              onChange={(e) => onUpdate({ title: e.target.value })}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Article title"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-200">
              Content
            </label>
            <textarea
              value={block.content || ''}
              onChange={(e) => onUpdate({ content: e.target.value })}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[100px]"
              placeholder="Article content"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-200">
              Image URL
            </label>
            <input
              type="url"
              value={block.imageUrl || ''}
              onChange={(e) => onUpdate({ imageUrl: e.target.value })}
              className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </>
      )}
    </div>
  );
}