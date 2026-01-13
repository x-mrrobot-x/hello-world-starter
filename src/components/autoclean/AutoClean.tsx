import { useState } from "react";
import { motion } from "framer-motion";
import { Trash2, Clock } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useMotionConfig } from "@/hooks/useMotionConfig";

interface AppCleanConfig {
  id: string;
  app: string;
  appIcon: string;
  enabled: boolean;
  days: number;
}

const mockApps: AppCleanConfig[] = [
  { id: "1", app: "Instagram", appIcon: "📸", enabled: true, days: 30 },
  { id: "2", app: "WhatsApp", appIcon: "💬", enabled: false, days: 7 },
  { id: "3", app: "Twitter/X", appIcon: "🐦", enabled: true, days: 14 },
  { id: "4", app: "YouTube", appIcon: "▶️", enabled: false, days: 30 },
  { id: "5", app: "TikTok", appIcon: "🎵", enabled: true, days: 7 },
  { id: "6", app: "Spotify", appIcon: "🎧", enabled: false, days: 30 },
  { id: "7", app: "Netflix", appIcon: "🎬", enabled: false, days: 14 },
  { id: "8", app: "Telegram", appIcon: "✈️", enabled: true, days: 7 },
];

const dayOptions = [7, 14, 30, 60, 90];

export const AutoClean = () => {
  const [apps, setApps] = useState<AppCleanConfig[]>(mockApps);
  const { fadeInDown, fadeInUp, fadeInLeft, heightAuto, fadeIn } = useMotionConfig();

  const toggleApp = (id: string) => {
    setApps((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, enabled: !app.enabled } : app
      )
    );
  };

  const changeDays = (id: string, days: number) => {
    setApps((prev) =>
      prev.map((app) => (app.id === id ? { ...app, days } : app))
    );
  };

  const enabledCount = apps.filter((app) => app.enabled).length;

  return (
    <div className="min-h-screen bg-background px-4 pt-6 pb-24 safe-top">
      {/* Header */}
      <motion.div
        {...fadeInDown()}
        className="mb-6"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
            <Trash2 className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Auto Clean</h1>
            <p className="text-sm text-muted-foreground">
              {enabledCount} apps com limpeza automática
            </p>
          </div>
        </div>
      </motion.div>

      {/* Info Card */}
      <motion.div
        {...fadeInUp(0.1)}
        className="bg-card border border-border rounded-2xl p-4 mb-6"
      >
        <div className="flex items-start gap-3">
          <Clock className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <p className="text-sm text-foreground font-medium mb-1">
              Como funciona?
            </p>
            <p className="text-xs text-muted-foreground">
              Configure o prazo de dias para cada app. Após esse período, as
              capturas serão automaticamente removidas para liberar espaço.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Apps List */}
      <motion.div
        {...fadeIn(0.2)}
        className="space-y-3"
      >
        {apps.map((app, index) => (
          <motion.div
            key={app.id}
            {...fadeInLeft(0.1 + index * 0.05)}
            className={`bg-card border border-border rounded-2xl p-4 transition-all ${
              app.enabled ? "ring-1 ring-primary/20" : ""
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{app.appIcon}</span>
                <span className="font-medium text-foreground">{app.app}</span>
              </div>
              <Switch
                checked={app.enabled}
                onCheckedChange={() => toggleApp(app.id)}
              />
            </div>

            {app.enabled && (
              <motion.div
                {...heightAuto()}
                className="pt-3 border-t border-border"
              >
                <p className="text-xs text-muted-foreground mb-2">
                  Remover após:
                </p>
                <div className="flex flex-wrap gap-2">
                  {dayOptions.map((days) => (
                    <button
                      key={days}
                      onClick={() => changeDays(app.id, days)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        app.days === days
                          ? "gradient-primary text-primary-foreground"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {days} dias
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
