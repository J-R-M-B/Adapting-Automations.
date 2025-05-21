import { useRef } from 'react';
import { 
  LayoutGrid, 
  Code, 
  Workflow, 
  BarChart, 
  Boxes,
  Laptop
} from 'lucide-react';
import { Dock, DockIcon, DockItem, DockLabel } from './dock';
import { NavItem } from '../../lib/utils';

interface WebsiteNavDockProps {
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

export function WebsiteNavDock({ activeSection, onSectionChange }: WebsiteNavDockProps) {
  const navItems: NavItem[] = [
    {
      id: 'overview',
      label: 'Overview',
      href: '#overview',
    },
    {
      id: 'features',
      label: 'Features',
      href: '#features',
    },
    {
      id: 'process',
      label: 'Process',
      href: '#process',
    },
    {
      id: 'pricing',
      label: 'Pricing',
      href: '#pricing',
    },
    {
      id: 'integration',
      label: 'Integration',
      href: '#integration',
    },
  ];

  const getIconForItem = (id: string) => {
    switch (id) {
      case 'overview':
        return <LayoutGrid className="h-full w-full text-indigo-400" />;
      case 'features':
        return <Code className="h-full w-full text-indigo-400" />;
      case 'process':
        return <Workflow className="h-full w-full text-indigo-400" />;
      case 'pricing':
        return <BarChart className="h-full w-full text-indigo-400" />;
      case 'integration':
        return <Boxes className="h-full w-full text-indigo-400" />;
      default:
        return <Laptop className="h-full w-full text-indigo-400" />;
    }
  };

  const handleItemClick = (item: NavItem) => {
    // Scroll to the section
    const element = document.getElementById(item.id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Update active section
    onSectionChange(item.id);
  };

  return (
    <div className="flex justify-center w-full">
      <Dock className="items-end pb-3 bg-gray-900/70 border border-indigo-500/30 backdrop-blur-sm">
        {navItems.map((item) => (
          <DockItem
            key={item.id}
            onClick={() => handleItemClick(item)}
            className={`aspect-square rounded-full transition-colors hover:scale-105 ${
              activeSection === item.id
                ? 'bg-indigo-500/30 border border-indigo-500/50'
                : 'bg-gray-800/70 border border-gray-700 hover:border-indigo-500/30'
            }`}
          >
            <DockLabel className="bg-blue-900/80 border-blue-500/30 text-blue-100 whitespace-nowrap">
              {item.label}
            </DockLabel>
            <DockIcon>{getIconForItem(item.id)}</DockIcon>
          </DockItem>
        ))}
      </Dock>
    </div>
  );
}