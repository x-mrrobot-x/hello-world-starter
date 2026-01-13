import { motion } from "framer-motion";
import { Home, FolderOpen, Settings, BarChart3, Trash2 } from "lucide-react";
import { useMotionConfig } from "@/hooks/useMotionConfig";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "dashboard", icon: Home, label: "Início" },
  { id: "files", icon: FolderOpen, label: "Apps" },
  { id: "autoclean", icon: Trash2, label: "Auto Clean" },
  { id: "stats", icon: BarChart3, label: "Stats" },
  { id: "settings", icon: Settings, label: "Config" },
];

export const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => {
  const { animationsEnabled } = useMotionConfig();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-border safe-bottom">
      <div className="flex items-center justify-around px-4 py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="relative flex flex-col items-center gap-1 px-4 py-2 transition-colors"
            >
              {isActive && animationsEnabled && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 gradient-primary rounded-xl opacity-15"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
              {isActive && !animationsEnabled && (
                <div className="absolute inset-0 gradient-primary rounded-xl opacity-15" />
              )}
              <Icon
                className={`w-5 h-5 transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              />
              <span
                className={`text-xs font-medium transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
