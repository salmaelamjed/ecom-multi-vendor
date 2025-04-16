import { useState } from 'react';
import React from 'react'; 
import { MenuIcon } from 'lucide-react';
import Sidebar from '@/components/shared/sidebar';
import Header from '@/components/shared/headerD';
import MobileSidebar from '@/components/shared/mobile-sidebar';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null; 
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: unknown): Partial<ErrorBoundaryState> {
    return { hasError: true, error: error instanceof Error ? error : new Error(String(error)) };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Error in DashboardLayout:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Une erreur est survenue dans le layout :</h1>
          <pre>{this.state.error?.toString() ?? 'Erreur inconnue'}</pre>
        </div>
      );
    }
    return this.props.children; // Maintenant TypeScript sait que children existe
  }
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <ErrorBoundary>
      <div className="flex h-screen overflow-hidden bg-secondary">
        <MobileSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <Sidebar />
        <div className="flex flex-col flex-1 w-0 overflow-hidden">
          <div className="relative z-10 flex flex-shrink-0 h-20 md:hidden">
            <button
              className="pl-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 xl:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuIcon className="w-6 h-6" aria-hidden="true" />
            </button>
            <Header />
          </div>
          <main className="relative flex-1 mx-2 my-3 mr-2 overflow-hidden rounded-xl bg-background focus:outline-none md:mx-0 md:my-4 md:mr-4">
            {children}
          </main>
        </div>
      </div>
    </ErrorBoundary>
  );
}