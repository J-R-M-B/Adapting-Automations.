import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTabId?: string;
  onChange?: (tabId: string) => void;
  variant?: 'underline' | 'pills' | 'boxed';
  className?: string;
  tabClassName?: string;
  activeTabClassName?: string;
  indicatorClassName?: string;
}

export function Tabs({
  tabs,
  defaultTabId,
  onChange,
  variant = 'underline',
  className,
  tabClassName,
  activeTabClassName,
  indicatorClassName
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTabId || tabs[0]?.id);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  const getTabStyles = () => {
    switch (variant) {
      case 'pills':
        return {
          container: 'flex space-x-2',
          tab: cn(
            'px-4 py-2 rounded-full text-gray-400 transition-all duration-200',
            tabClassName
          ),
          activeTab: cn(
            'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md',
            activeTabClassName
          ),
          indicator: 'hidden'
        };
      case 'boxed':
        return {
          container: 'flex',
          tab: cn(
            'px-6 py-3 border-b-2 border-transparent text-gray-400 transition-all duration-200',
            tabClassName
          ),
          activeTab: cn(
            'bg-gray-900/50 border-purple-500 text-white',
            activeTabClassName
          ),
          indicator: 'hidden'
        };
      case 'underline':
      default:
        return {
          container: 'flex relative border-b border-gray-800',
          tab: cn(
            'px-6 py-3 text-gray-400 transition-all duration-200',
            tabClassName
          ),
          activeTab: cn('text-white', activeTabClassName),
          indicator: cn(
            'absolute bottom-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300',
            indicatorClassName
          )
        };
    }
  };

  const styles = getTabStyles();
  const activeTabIndex = tabs.findIndex(tab => tab.id === activeTab);

  return (
    <div className={cn('w-full', className)}>
      <div className={styles.container}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={cn(
              styles.tab,
              tab.id === activeTab && styles.activeTab,
              'flex items-center gap-2 font-medium'
            )}
            aria-selected={tab.id === activeTab}
            role="tab"
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
        
        {variant === 'underline' && activeTabIndex !== -1 && (
          <motion.div
            className={styles.indicator}
            initial={false}
            animate={{
              left: `calc(${activeTabIndex * (100 / tabs.length)}% + 0.75rem)`,
              width: `calc(${100 / tabs.length}% - 1.5rem)`
            }}
          />
        )}
      </div>
    </div>
  );
}

interface TabPanelsProps {
  tabs: Tab[];
  activeTabId: string;
  children: React.ReactNode[];
  className?: string;
}

export function TabPanels({ tabs, activeTabId, children, className }: TabPanelsProps) {
  const activeIndex = tabs.findIndex(tab => tab.id === activeTabId);
  
  return (
    <div className={cn('mt-6', className)}>
      {children.map((child, index) => (
        <div
          key={tabs[index]?.id || index}
          className={cn(
            'transition-opacity duration-300',
            activeIndex === index ? 'block opacity-100' : 'hidden opacity-0'
          )}
          role="tabpanel"
          aria-labelledby={tabs[index]?.id}
        >
          {child}
        </div>
      ))}
    </div>
  );
}