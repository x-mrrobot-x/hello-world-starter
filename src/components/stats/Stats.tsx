import { motion } from "framer-motion";
import { TrendingUp, Calendar, Trash2, FolderCheck } from "lucide-react";
import { useMotionConfig } from "@/hooks/useMotionConfig";

const weeklyData = [
  { day: "Seg", value: 45 },
  { day: "Ter", value: 78 },
  { day: "Qua", value: 32 },
  { day: "Qui", value: 95 },
  { day: "Sex", value: 67 },
  { day: "Sáb", value: 120 },
  { day: "Dom", value: 89 },
];

const maxValue = Math.max(...weeklyData.map((d) => d.value));

export const Stats = () => {
  const { fadeInDown, fadeInUp, fadeInLeft, fadeInRight, barGrow } = useMotionConfig();

  return (
    <div className="min-h-screen bg-background px-4 pt-6 pb-24 safe-top">
      {/* Header */}
      <motion.div
        {...fadeInDown()}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-foreground mb-2">Estatísticas</h1>
        <p className="text-muted-foreground">
          Acompanhe seu uso e economia
        </p>
      </motion.div>

      {/* Period Selector */}
      <motion.div
        {...fadeInUp(0.1)}
        className="flex gap-2 mb-6"
      >
        {["7 dias", "30 dias", "3 meses", "1 ano"].map((period, index) => (
          <button
            key={period}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              index === 0
                ? "gradient-primary text-primary-foreground glow"
                : "bg-card border border-border text-muted-foreground"
            }`}
          >
            {period}
          </button>
        ))}
      </motion.div>

      {/* Weekly Chart */}
      <motion.div
        {...fadeInUp(0.2)}
        className="bg-card border border-border rounded-2xl p-5 mb-6 card-glow"
      >
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Capturas por Dia</h3>
        </div>

        <div className="flex items-end justify-between gap-2 h-40">
          {weeklyData.map((item, index) => {
            const height = (item.value / maxValue) * 100;

            return (
              <motion.div
                key={item.day}
                {...barGrow(height, 0.3 + index * 0.05)}
                className="flex-1 flex flex-col items-center gap-2"
              >
                <div
                  className="w-full gradient-primary rounded-t-lg min-h-[4px]"
                  style={{ height: "100%" }}
                />
                <span className="text-xs text-muted-foreground font-medium">
                  {item.day}
                </span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <motion.div
          {...fadeInLeft(0.4)}
          className="bg-card border border-border rounded-2xl p-4 card-glow"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-success/20 rounded-xl">
              <Trash2 className="w-4 h-4 text-success" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground mb-1">847</p>
          <p className="text-sm text-muted-foreground">Arquivos limpos</p>
        </motion.div>

        <motion.div
          {...fadeInRight(0.5)}
          className="bg-card border border-border rounded-2xl p-4 card-glow"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-primary/20 rounded-xl">
              <FolderCheck className="w-4 h-4 text-primary" />
            </div>
          </div>
          <p className="text-2xl font-bold text-foreground mb-1">1,456</p>
          <p className="text-sm text-muted-foreground">Organizados</p>
        </motion.div>
      </div>

      {/* Activity Timeline */}
      <motion.div
        {...fadeInUp(0.6)}
        className="bg-card border border-border rounded-2xl p-5 card-glow"
      >
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Atividade Recente</h3>
        </div>

        <div className="space-y-4">
          {[
            { action: "Limpeza automática", detail: "156 arquivos removidos", time: "2h atrás", icon: "🧹" },
            { action: "Organização", detail: "34 screenshots do Instagram", time: "5h atrás", icon: "📁" },
            { action: "Backup completo", detail: "2.3 GB sincronizados", time: "1 dia atrás", icon: "☁️" },
          ].map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <span className="text-xl">{item.icon}</span>
              <div className="flex-1">
                <p className="font-medium text-foreground text-sm">{item.action}</p>
                <p className="text-xs text-muted-foreground">{item.detail}</p>
              </div>
              <span className="text-xs text-muted-foreground">{item.time}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
