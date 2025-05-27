import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

export const Sidebar = () => {
  const { t } = useTranslation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside
      className={`${
        isCollapsed ? 'w-16' : 'w-64'
      } hidden border-r border-border bg-card transition-all duration-300 md:block`}
    >
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center justify-between px-4">
          {!isCollapsed && (
            <span className="text-lg font-semibold">
              {t('navigation.dashboard')}
            </span>
          )}
          <button
            onClick={toggleSidebar}
            className="rounded-md p-2 hover:bg-muted"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? '→' : '←'}
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-2 py-4">
          <NavItem
            to="/"
            icon="🏠"
            label={t('navigation.home')}
            isCollapsed={isCollapsed}
          />
          <NavItem
            to="/dashboard"
            icon="📊"
            label={t('navigation.dashboard')}
            isCollapsed={isCollapsed}
          />
          <NavItem
            to="/profile"
            icon="👤"
            label={t('navigation.profile')}
            isCollapsed={isCollapsed}
          />
          <NavItem
            to="/settings"
            icon="⚙️"
            label={t('navigation.settings')}
            isCollapsed={isCollapsed}
          />
        </nav>
      </div>
    </aside>
  );
};

interface NavItemProps {
  to: string;
  icon: string;
  label: string;
  isCollapsed: boolean;
}

const NavItem = ({ to, icon, label, isCollapsed }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center rounded-md px-3 py-2 text-sm font-medium ${
          isActive
            ? 'bg-primary/10 text-primary'
            : 'text-foreground hover:bg-muted'
        } ${isCollapsed ? 'justify-center' : ''}`
      }
    >
      <span className="mr-3">{icon}</span>
      {!isCollapsed && <span>{label}</span>}
    </NavLink>
  );
};
