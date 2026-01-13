import { useState } from "react";
import { motion } from "framer-motion";
import { FolderCheck, HardDrive, Clock, Sparkles, Camera, Video } from "lucide-react";
import { StatCard } from "./StatCard";
import { AppCard } from "./AppCard";
import { ProcessModal } from "./ProcessModal";
import { useMotionConfig } from "@/hooks/useMotionConfig";
import logoImage from "@/assets/logo.png";

const topApps = [
  { name: "Instagram", icon: "📸", count: 234, size: "1.2 GB", color: "#E1306C" },
  { name: "WhatsApp", icon: "💬", count: 156, size: "890 MB", color: "#25D366" },
  { name: "Twitter/X", icon: "🐦", count: 98, size: "456 MB", color: "#1DA1F2" },
  { name: "YouTube", icon: "▶️", count: 67, size: "2.1 GB", color: "#FF0000" },
];

type ProcessType = "screenshots" | "recordings" | "cleanup";

export const Dashboard = () => {
  const { fadeInDown, fadeIn, fadeInUp, tapScale } = useMotionConfig();
  const [modalOpen, setModalOpen] = useState(false);
  const [processType, setProcessType] = useState<ProcessType>("screenshots");

  const openProcess = (type: ProcessType) => {
    setProcessType(type);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background px-4 pt-6 pb-24 safe-top">
      {/* Header */}
      <motion.div
        {...fadeInDown()}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <img 
            src={logoImage} 
            alt="ScreenFlow Logo" 
            className="w-12 h-12 rounded-xl shadow-lg"
          />
          <div>
            <h1 className="text-2xl font-bold text-foreground">ScreenFlow</h1>
            <p className="text-sm text-muted-foreground">
              Tudo organizado automaticamente
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <StatCard
          icon={FolderCheck}
          label="Arquivos Organizados"
          value="1,234"
          subtext="Este mês"
          gradient
          delay={0.1}
        />
        <StatCard
          icon={HardDrive}
          label="Espaço Economizado"
          value="4.2 GB"
          subtext="+800 MB hoje"
          delay={0.2}
        />
        <StatCard
          icon={Clock}
          label="Última Limpeza"
          value="2h atrás"
          subtext="Automática"
          delay={0.3}
        />
        <StatCard
          icon={Sparkles}
          label="Taxa de Automação"
          value="98%"
          subtext="Excelente!"
          delay={0.4}
        />
      </div>

      {/* Quick Actions */}
      <motion.div
        {...fadeIn(0.25)}
        className="mb-8"
      >
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Ações Rápidas
        </h2>
        <div className="flex gap-3">
          <motion.button
            {...tapScale()}
            onClick={() => openProcess("screenshots")}
            className="flex-1 bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/30 text-foreground font-medium py-4 px-3 rounded-2xl flex flex-col items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <div className="p-2 bg-blue-500/20 rounded-xl">
              <Camera className="w-5 h-5 text-blue-500" />
            </div>
            <span className="text-xs text-center font-medium">Organizar capturas</span>
          </motion.button>
          
          <motion.button
            {...tapScale()}
            onClick={() => openProcess("recordings")}
            className="flex-1 bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/30 text-foreground font-medium py-4 px-3 rounded-2xl flex flex-col items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <div className="p-2 bg-purple-500/20 rounded-xl">
              <Video className="w-5 h-5 text-purple-500" />
            </div>
            <span className="text-xs text-center font-medium">Organizar gravações</span>
          </motion.button>
          
          <motion.button
            {...tapScale()}
            onClick={() => openProcess("cleanup")}
            className="flex-1 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-foreground font-medium py-4 px-3 rounded-2xl flex flex-col items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <div className="p-2 bg-emerald-500/20 rounded-xl">
              <Sparkles className="w-5 h-5 text-emerald-500" />
            </div>
            <span className="text-xs text-center font-medium">Executar limpeza</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Top Apps Section */}
      <motion.div
        {...fadeIn(0.3)}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">
            Apps com Mais Capturas
          </h2>
          <button className="text-sm text-primary font-medium">Ver todos</button>
        </div>

        <div className="space-y-3">
          {topApps.map((app, index) => (
            <AppCard
              key={app.name}
              {...app}
              delay={0.4 + index * 0.1}
            />
          ))}
        </div>
      </motion.div>

      {/* Process Modal */}
      <ProcessModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        processType={processType}
      />
    </div>
  );
};
