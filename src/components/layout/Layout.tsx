import { ReactNode, useState } from 'react';
import { Sidebar } from './Sidebar';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-white w-screen relative">
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        className="lg:hidden fixed top-4 left-4 z-50"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle menu</span>
      </Button>

      {/* Sidebar */}
      <div className={`
        fixed inset-0 z-40 lg:static
        ${isSidebarOpen ? 'block' : 'hidden lg:block'}
      `}>
        <div 
          className="fixed inset-0 bg-black/20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto w-full">
        <div className="max-w-6xl mx-auto p-6 lg:p-8">
          {children}
        </div>
      </div>
    </div>
  );
} 