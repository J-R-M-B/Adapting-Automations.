import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  separator?: React.ReactNode;
  homeHref?: string;
}

export function Breadcrumb({
  items,
  className,
  separator = <ChevronRight className="w-4 h-4 text-gray-500" />,
  homeHref = '/'
}: BreadcrumbProps) {
  return (
    <nav className={cn('flex items-center space-x-1 text-sm', className)} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        <li>
          <Link
            to={homeHref}
            className="text-gray-400 hover:text-white transition-colors flex items-center"
          >
            <Home className="w-4 h-4" />
          </Link>
        </li>
        
        {items.map((item, index) => (
          <li key={index} className="flex items-center space-x-1">
            <span className="text-gray-500 mx-1">{separator}</span>
            {item.href ? (
              <Link
                to={item.href}
                className="text-gray-400 hover:text-white transition-colors flex items-center gap-1"
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ) : (
              <span className="text-white flex items-center gap-1">
                {item.icon}
                <span>{item.label}</span>
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}