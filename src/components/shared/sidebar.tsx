'use client';
import { navItems } from '@/constants/data';
import { cn } from '@/lib/utils';
import { ChevronsLeft } from 'lucide-react';
import { useState } from 'react';
import DashboardNav from './dashboard-nav';
import logo from '@/assets/logo.svg';
import { useAppDispatch } from '../store/hooks';
import { useNavigate } from 'react-router-dom';
import { actAuthLogout } from '../store/auth/authSlice';
import { toast } from 'sonner';

type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(actAuthLogout()).unwrap();
      navigate('/');
      toast.info('You are logged out');
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Logout failed. Please try again.');
    }
  };

  const [isMinimized, setIsMinimized] = useState(false);

  const handleToggle = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <nav
      className={cn(
        `relative z-10 hidden h-screen flex-none px-3 md:block transition-all duration-500`,
        !isMinimized ? 'w-72' : 'w-[80px]',
        className
      )}
    >
      <div
        className={cn(
          'flex items-center px-0 py-5 md:px-2',
          isMinimized ? 'justify-center' : 'justify-between'
        )}
      >
        {!isMinimized && (
          <img className="h-16 ml-5" src={logo} alt="TradeFusion" />
        )}
        <ChevronsLeft
          className={cn(
            'size-8 cursor-pointer rounded-full border bg-background text-foreground',
            isMinimized && 'rotate-180'
          )}
          onClick={handleToggle}
        />
      </div>
      <div className="py-4 space-y-4">
        <div className="px-2 py-2">
          <div className="mt-3 space-y-1">
            <DashboardNav
              items={navItems}
              isMinimized={isMinimized}
              handleLogout={handleLogout} 
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
