import React, { useState, useEffect } from 'react';
import { Settings, Palette, Plus, Trash2, ArrowUp, ArrowDown, Save, FileText } from 'lucide-react';
import BlockSettings from './BlockSettings';
import { ArticleBlock, ArticleBlockProps } from './ArticleBlock';
import { BlockSelector } from './BlockSelector';
import { FullArticleBlock, FullArticleBlockProps } from './FullArticleBlock';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../lib/auth';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

export default function NewsletterLayoutTab() {
  const { user } = useAuth();
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [articleBlocks, setArticleBlocks] = useState<Array<ArticleBlockProps | FullArticleBlockProps>>([]);
  const [newsletterSettings, setNewsletterSettings] = useState({
    title: 'Monthly Newsletter',
    headerColor: '#6366f1',
    bodyColor: '#ffffff',
    textColor: '#1f2937',
    accentColor: '#8b5cf6',
    fontFamily: 'Arial, sans-serif',
    width: 600
  });
  const [showBlockSelector, setShowBlockSelector] = useState(false);
  const [blockSelectorPosition, setBlockSelectorPosition] = useState<'top' | 'bottom' | number>('bottom');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [templateId, setTemplateId] = useState<string | null>(null);

  // Load newsletter template
  useEffect(() => {
    if (user) {
      loadSettings();
    }
  }, [user]);

  const loadSettings = async () => {
    try {
      setIsLoading(true);
      
      // Load newsletter settings
      const { data: settingsData, error: settingsError } = await supabase
        .from('newsletter_settings')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (settingsError && settingsError.code !== 'PGRST116') {
        throw settingsError;
      }

      if (settingsData) {
        setNewsletterSettings(settingsData);
      }

      // Load newsletter template
      const { data: templateData, error: templateError } = await supabase
        .from('newsletter_templates')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (templateError) {
        throw templateError;
      }

      if (templateData && templateData.length > 0) {
        // Use the most recent template
        setTemplateId(templateData[0].id);
        setArticleBlocks(templateData[0].blocks || []);
      }
    } catch (error) {
      console.error('Error loading newsletter settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveTemplate = async () => {
    if (!user) return;
    
    try {
      setIsSaving(true);
      
      const templateData = {
        user_id: user.id,
        name: 'My Newsletter Template',
        settings: newsletterSettings,
        blocks: articleBlocks
      };
      
      if (templateId) {
        // Update existing template
        const { error } = await supabase
          .from('newsletter_templates')
          .update(templateData)
          .eq('id', templateId);
          
        if (error) throw error;
      } else {
        // Create new template
        const { data, error } = await supabase
          .from('newsletter_templates')
          .insert(templateData)
          .select();
          
        if (error) throw error;
        if (data && data[0]) {
          setTemplateId(data[0].id);
        }
      }
      
      toast.success('Newsletter template saved successfully');
    } catch (error) {
      console.error('Error saving newsletter template:', error);
      toast.error('Failed to save newsletter template');
    } finally {
      setIsSaving(false);
    }
  };

  const selectedBlock = articleBlocks.find(block => block.id === selectedBlockId);

  const updateBlock = (blockId: string, updates: Partial<ArticleBlockProps | FullArticleBlockProps>) => {
    setArticleBlocks(blocks => 
      blocks.map(block => 
        block.id === blockId ? { ...block, ...updates } : block
      )
    );
  };

  const moveBlock = (blockId: string, direction: 'up' | 'down') => {
    setArticleBlocks(blocks => {
      const index = blocks.findIndex(block => block.id === blockId);
      const newBlocks = [...blocks];
      const [movedBlock] = newBlocks.splice(index, 1);
      newBlocks.splice(direction === 'up' ? index - 1 : index + 1, 0, movedBlock);
      return newBlocks;
    });
  };

  const deleteBlock = (blockId: string) => {
    setArticleBlocks(blocks => blocks.filter(block => block.id !== blockId));
    if (selectedBlockId === blockId) {
      setSelectedBlockId(null);
    }
  };

  const addBlock = (type: string, position: 'top' | 'bottom' | number = 'bottom') => {
    const newBlock = createBlock(type);
    
    setArticleBlocks(blocks => {
      const newBlocks = [...blocks];
      
      if (position === 'top') {
        newBlocks.unshift(newBlock);
      } else if (position === 'bottom') {
        newBlocks.push(newBlock);
      } else if (typeof position === 'number') {
        newBlocks.splice(position + 1, 0, newBlock);
      }
      
      return newBlocks;
    });
    
    setSelectedBlockId(newBlock.id);
    setShowBlockSelector(false);
  };

  const createBlock = (type: string): ArticleBlockProps | FullArticleBlockProps => {
    const id = uuidv4();
    const order = articleBlocks.length;
    
    if (type === 'full-article') {
      return {
        id,
        order,
        type: 'full-article',
        title: 'A1H',
        content: 'A1T',
        imageUrl: '',
        videoUrl: '',
        alignment: 'left',
        showImage: true,
        showVideo: false
      } as FullArticleBlockProps;
    }
    
    if (type.startsWith('shape-')) {
      const shapeType = type.replace('shape-', '') as 'square' | 'circle' | 'triangle';
      return {
        id,
        order,
        type: type,
        alignment: 'center',
        shapeType,
        shapeSize: 100,
        shapeColor: '#6366f1',
        borderRadius: shapeType === 'square' ? '4px' : undefined
      } as ArticleBlockProps;
    }
    
    // Default block properties
    const baseBlock: ArticleBlockProps = {
      id,
      order,
      type,
      alignment: 'left'
    };
    
    // Add type-specific properties
    switch (type) {
      case 'heading':
        return {
          ...baseBlock,
          content: 'Heading Text',
          headingLevel: 2
        };
      case 'paragraph':
        return {
          ...baseBlock,
          content: 'Paragraph text goes here.'
        };
      case 'image':
        return {
          ...baseBlock,
          imageUrl: ''
        };
      case 'button':
        return {
          ...baseBlock,
          buttonText: 'Click Me',
          buttonUrl: 'https://example.com'
        };
      case 'divider':
        return baseBlock;
      case 'spacer':
        return {
          ...baseBlock,
          height: 20
        };
      default:
        return baseBlock;
    }
  };

  const getControlsForBlock = (block: ArticleBlockProps | FullArticleBlockProps) => {
    if (!block) return null;
    
    if (block.type === 'full-article') {
      return null; // Full article has its own settings component
    }
    
    const controls = {
      alignment: true,
      text: false,
      headingLevel: false,
      image: false,
      button: false,
      spacer: false,
      shape: false
    };
    
    switch (block.type) {
      case 'heading':
        controls.text = true;
        controls.headingLevel = true;
        break;
      case 'paragraph':
        controls.text = true;
        break;
      case 'image':
        controls.image = true;
        break;
      case 'button':
        controls.button = true;
        break;
      case 'spacer':
        controls.spacer = true;
        break;
      default:
        if (block.type?.startsWith('shape-')) {
          controls.shape = true;
        }
        break;
    }
    
    return controls;
  };

  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-8 gap-6 h-full">
        <div className="col-span-6">
          <div className="h-full">
            <div className="relative bg-gradient-to-b from-[#0f1629]/80 to-[#0a0a1f]/80 rounded-xl border border-purple-500/30 p-6">
              {isLoading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
                </div>
              ) : (
                <>
                  {/* Add Block Button - Top */}
                  <button
                    onClick={() => {
                      setBlockSelectorPosition('top');
                      setShowBlockSelector(true);
                    }}
                    className="w-full mb-6 p-3 rounded-lg border border-dashed border-gray-700 hover:border-purple-500 text-gray-400 hover:text-purple-400 transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Add Block</span>
                  </button>
                  
                  {/* Blocks */}
                  <div className="space-y-4">
                    {articleBlocks.length === 0 ? (
                      <div className="text-center py-12 text-gray-400">
                        No blocks added yet. Click the "Add Block" button to get started.
                      </div>
                    ) : (
                      articleBlocks.map((block, index) => (
                        <div key={block.id} className="relative">
                          <div className="group">
                            {block.type === 'full-article' ? (
                              <FullArticleBlock
                                {...block as FullArticleBlockProps}
                                isSelected={selectedBlockId === block.id}
                                onClick={() => setSelectedBlockId(block.id)}
                                onMove={(direction) => moveBlock(block.id, direction)}
                                onDelete={() => deleteBlock(block.id)}
                                canMoveUp={index > 0}
                                canMoveDown={index < articleBlocks.length - 1}
                                onUpdate={(updates) => updateBlock(block.id, updates)}
                              />
                            ) : (
                              <ArticleBlock
                                {...block as ArticleBlockProps}
                                isSelected={selectedBlockId === block.id}
                                onClick={() => setSelectedBlockId(block.id)}
                                onMove={(direction) => moveBlock(block.id, direction)}
                                onDelete={() => deleteBlock(block.id)}
                                canMoveUp={index > 0}
                                canMoveDown={index < articleBlocks.length - 1}
                              />
                            )}
                            
                            {/* Add Block Button - Between Blocks */}
                            {selectedBlockId === block.id && (
                              <button
                                onClick={() => {
                                  setBlockSelectorPosition(index);
                                  setShowBlockSelector(true);
                                }}
                                className="w-full mt-2 p-2 rounded-lg border border-dashed border-gray-700 hover:border-purple-500 text-gray-400 hover:text-purple-400 transition-colors flex items-center justify-center gap-2"
                              >
                                <Plus className="w-4 h-4" />
                                <span>Add Block</span>
                              </button>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  
                  {/* Add Block Button - Bottom */}
                  <button
                    onClick={() => {
                      setBlockSelectorPosition('bottom');
                      setShowBlockSelector(true);
                    }}
                    className="w-full mt-6 p-3 rounded-lg border border-dashed border-gray-700 hover:border-purple-500 text-gray-400 hover:text-purple-400 transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Add Block</span>
                  </button>
                  
                  {/* Block Selector */}
                  {showBlockSelector && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                      <div 
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setShowBlockSelector(false)}
                      />
                      <div className="relative">
                        <BlockSelector
                          onSelectBlock={(type) => addBlock(type, blockSelectorPosition)}
                          onClose={() => setShowBlockSelector(false)}
                          position="fixed"
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* Save Button */}
                  <div className="mt-8 flex justify-end">
                    <button
                      onClick={saveTemplate}
                      disabled={isSaving}
                      className={`px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg transition-colors flex items-center gap-2 ${
                        isSaving ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      <Save className="w-4 h-4" />
                      {isSaving ? 'Saving...' : 'Save Template'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Settings Panel */}
        <div className="col-span-2 space-y-6">
          <div className="p-6 rounded-xl bg-gradient-to-b from-[#0f1629]/80 to-[#0a0a1f]/80 border border-purple-500/30">
            {isLoading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  Block Settings
                  <Settings className="w-4 h-4 text-purple-500" />
                </h3>
                
                {selectedBlock ? (
                  selectedBlock.type === 'full-article' ? (
                    <FullArticleBlockSettings
                      block={selectedBlock as FullArticleBlockProps}
                      onUpdate={(updates) => updateBlock(selectedBlock.id, updates)}
                    />
                  ) : (
                    <BlockSettings
                      block={selectedBlock as ArticleBlockProps}
                      onUpdate={(updates) => updateBlock(selectedBlock.id, updates)}
                      controls={getControlsForBlock(selectedBlock)}
                    />
                  )
                ) : (
                  <div className="text-gray-400 text-center py-4">
                    Select a block to edit its settings
                  </div>
                )}
              </>
            )}
          </div>

          <div className="p-6 rounded-xl bg-gradient-to-b from-[#0f1629]/80 to-[#0a0a1f]/80 border border-purple-500/30">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              Newsletter Settings
              <Palette className="w-4 h-4 text-purple-500" />
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Newsletter Title
                </label>
                <input
                  type="text"
                  value={newsletterSettings.title}
                  onChange={(e) => setNewsletterSettings({
                    ...newsletterSettings,
                    title: e.target.value
                  })}
                  className="w-full px-4 py-2 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Header Color
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={newsletterSettings.headerColor}
                    onChange={(e) => setNewsletterSettings({
                      ...newsletterSettings,
                      headerColor: e.target.value
                    })}
                    className="w-10 h-10 rounded-lg"
                  />
                  <input
                    type="text"
                    value={newsletterSettings.headerColor}
                    onChange={(e) => setNewsletterSettings({
                      ...newsletterSettings,
                      headerColor: e.target.value
                    })}
                    className="flex-1 px-4 py-2 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Body Color
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={newsletterSettings.bodyColor}
                    onChange={(e) => setNewsletterSettings({
                      ...newsletterSettings,
                      bodyColor: e.target.value
                    })}
                    className="w-10 h-10 rounded-lg"
                  />
                  <input
                    type="text"
                    value={newsletterSettings.bodyColor}
                    onChange={(e) => setNewsletterSettings({
                      ...newsletterSettings,
                      bodyColor: e.target.value
                    })}
                    className="flex-1 px-4 py-2 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Text Color
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={newsletterSettings.textColor}
                    onChange={(e) => setNewsletterSettings({
                      ...newsletterSettings,
                      textColor: e.target.value
                    })}
                    className="w-10 h-10 rounded-lg"
                  />
                  <input
                    type="text"
                    value={newsletterSettings.textColor}
                    onChange={(e) => setNewsletterSettings({
                      ...newsletterSettings,
                      textColor: e.target.value
                    })}
                    className="flex-1 px-4 py-2 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Font Family
                </label>
                <select
                  value={newsletterSettings.fontFamily}
                  onChange={(e) => setNewsletterSettings({
                    ...newsletterSettings,
                    fontFamily: e.target.value
                  })}
                  className="w-full px-4 py-2 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                >
                  <option value="Arial, sans-serif">Arial</option>
                  <option value="Helvetica, sans-serif">Helvetica</option>
                  <option value="Georgia, serif">Georgia</option>
                  <option value="'Times New Roman', serif">Times New Roman</option>
                  <option value="Verdana, sans-serif">Verdana</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Width (px)
                </label>
                <input
                  type="number"
                  value={newsletterSettings.width}
                  onChange={(e) => setNewsletterSettings({
                    ...newsletterSettings,
                    width: parseInt(e.target.value)
                  })}
                  min="300"
                  max="800"
                  step="10"
                  className="w-full px-4 py-2 rounded-lg bg-gray-900/50 border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { NewsletterLayoutTab }