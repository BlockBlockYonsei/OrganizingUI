import React, { ReactNode } from "react";

interface Tab {
  key: string;
  label: string | ReactNode;
  icon?: ReactNode;
}

interface TabNavProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabKey: string) => void;
  className?: string;
}

const TabNav = ({ tabs, activeTab, onChange, className = "" }: TabNavProps) => {
  return (
    <div className={`border-b border-[#334155] ${className}`}>
      <div className="flex space-x-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`py-4 flex items-center space-x-2 ${
              activeTab === tab.key
                ? "text-[#a78bfa] border-b-2 border-[#8b5cf6] font-medium"
                : "text-gray-400 hover:text-gray-200"
            }`}
            onClick={() => onChange(tab.key)}
          >
            {tab.icon && <span>{tab.icon}</span>}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNav;
