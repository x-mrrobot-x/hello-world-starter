import { motion } from "framer-motion";
import {
  Bell,
  Sun,
  Moon,
  Monitor,
  RotateCcw,
  Sparkles,
  FolderSync,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAnimations } from "@/contexts/AnimationContext";
import { useMotionConfig } from "@/hooks/useMotionConfig";
import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";

type Theme = "light" | "dark" | "system";

const themeOptions: { label: string; value: Theme; icon: typeof Sun }[] = [
  { label: "Claro", value: "light", icon: Sun },
  { label: "Escuro", value: "dark", icon: Moon },
  { label: "Sistema", value: "system", icon: Monitor },
];

export const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [autoOrganize, setAutoOrganize] = useState(true);
  const [autoCleanup, setAutoCleanup] = useState(true);
  const { animationsEnabled, setAnimationsEnabled } = useAnimations();
  const { fadeInDown, fadeInUp, fadeIn } = useMotionConfig();
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("screenflow-theme");
    return (saved as Theme) || "system";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      root.classList.remove("light", "dark");
      root.classList.add(systemTheme);
    } else {
      root.classList.remove("light", "dark");
      root.classList.add(theme);
    }
    
    localStorage.setItem("screenflow-theme", theme);
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    if (theme !== "system") return;
    
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      const root = window.document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(e.matches ? "dark" : "light");
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const handleAnimationToggle = (enabled: boolean) => {
    setAnimationsEnabled(enabled);
    toast.success(enabled ? "Animações ativadas" : "Animações desativadas");
  };

  const handleResetSettings = () => {
    setNotifications(true);
    setTheme("system");
    setAnimationsEnabled(true);
    toast.success("Configurações restauradas para o padrão");
  };

  return (
    <div className="min-h-screen bg-background px-4 pt-6 pb-24 safe-top">
      {/* Header */}
      <motion.div
        {...fadeInDown()}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-foreground mb-2">Configurações</h1>
        <p className="text-muted-foreground">
          Personalize sua experiência
        </p>
      </motion.div>

      {/* Theme Section */}
      <motion.div
        {...fadeInUp(0.1)}
        className="mb-6"
      >
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Tema
        </h2>
        <div className="bg-card border border-border rounded-2xl p-4 card-glow">
          <div className="grid grid-cols-3 gap-2">
            {themeOptions.map((option) => {
              const Icon = option.icon;
              const isActive = theme === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => setTheme(option.value)}
                  className={`flex flex-col items-center gap-2 py-4 rounded-xl font-medium text-sm transition-all ${
                    isActive
                      ? "gradient-primary text-primary-foreground glow"
                      : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Automation Section */}
      <motion.div
        {...fadeInUp(0.12)}
        className="mb-6"
      >
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Automação
        </h2>
        <div className="bg-card border border-border rounded-2xl overflow-hidden card-glow">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-xl">
                <FolderSync className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Organização Automática</p>
                <p className="text-sm text-muted-foreground">
                  Mover arquivos automaticamente
                </p>
              </div>
            </div>
            <Switch checked={autoOrganize} onCheckedChange={setAutoOrganize} />
          </div>

          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/20 rounded-xl">
                <Trash2 className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="font-medium text-foreground">Auto Limpeza</p>
                <p className="text-sm text-muted-foreground">
                  Remover arquivos antigos
                </p>
              </div>
            </div>
            <Switch checked={autoCleanup} onCheckedChange={setAutoCleanup} />
          </div>
        </div>
      </motion.div>

      {/* Others Section */}
      <motion.div
        {...fadeInUp(0.15)}
        className="mb-6"
      >
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Outros
        </h2>
        <div className="bg-card border border-border rounded-2xl overflow-hidden card-glow">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-xl">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Animações</p>
                <p className="text-sm text-muted-foreground">
                  Efeitos visuais e transições
                </p>
              </div>
            </div>
            <Switch checked={animationsEnabled} onCheckedChange={handleAnimationToggle} />
          </div>
        </div>
      </motion.div>

      {/* Notifications Section */}
      <motion.div
        {...fadeInUp(0.2)}
        className="mb-6"
      >
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Notificações
        </h2>
        <div className="bg-card border border-border rounded-2xl overflow-hidden card-glow">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning/20 rounded-xl">
                <Bell className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="font-medium text-foreground">Notificações</p>
                <p className="text-sm text-muted-foreground">
                  Receber alertas de limpeza
                </p>
              </div>
            </div>
            <Switch checked={notifications} onCheckedChange={setNotifications} />
          </div>
        </div>
      </motion.div>

      {/* Reset Settings */}
      <motion.div
        {...fadeInUp(0.25)}
        className="mb-6"
      >
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
              className="w-full flex items-center justify-center gap-2 p-4 bg-destructive/10 border border-destructive/20 rounded-2xl text-destructive hover:bg-destructive/20 transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
              <span className="font-medium">Restaurar Configurações Padrão</span>
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent className="max-w-[90%] rounded-2xl">
            <AlertDialogHeader>
              <AlertDialogTitle>Restaurar configurações?</AlertDialogTitle>
              <AlertDialogDescription>
                Todas as suas preferências serão redefinidas para os valores padrão. Esta ação não pode ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="rounded-xl">Cancelar</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleResetSettings}
                className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Restaurar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </motion.div>

      {/* Version */}
      <motion.p
        {...fadeIn(0.3)}
        className="text-center text-sm text-muted-foreground"
      >
        ScreenFlow v1.0.0
      </motion.p>
    </div>
  );
};
