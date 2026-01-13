import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Camera, Video, Sparkles, Download, FolderOpen, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

type ProcessType = "screenshots" | "recordings" | "cleanup";

interface ProcessStep {
  title: string;
  subtitle: string;
  duration: number;
}

const processConfigs: Record<ProcessType, { 
  title: string; 
  icon: typeof Camera; 
  colorClass: string;
  bgClass: string;
  borderClass: string;
  steps: ProcessStep[] 
}> = {
  screenshots: {
    title: "Organizando Screenshots",
    icon: Download,
    colorClass: "text-primary",
    bgClass: "bg-primary/20",
    borderClass: "border-primary/50",
    steps: [
      { title: "Analisando screenshots", subtitle: "Identificando arquivos para organização", duration: 1500 },
      { title: "Classificando por categoria", subtitle: "Agrupando por aplicativo e data", duration: 1200 },
      { title: "Movendo para pastas", subtitle: "Organizando arquivos em diretórios apropriados", duration: 1800 },
      { title: "Finalizando processo", subtitle: "Atualizando estatísticas e registros", duration: 1000 },
    ],
  },
  recordings: {
    title: "Organizando Gravações",
    icon: Video,
    colorClass: "text-accent",
    bgClass: "bg-accent/20",
    borderClass: "border-accent/50",
    steps: [
      { title: "Escaneando gravações", subtitle: "Localizando arquivos de vídeo", duration: 1500 },
      { title: "Analisando metadados", subtitle: "Extraindo informações dos vídeos", duration: 1300 },
      { title: "Categorizando por data", subtitle: "Organizando cronologicamente", duration: 1600 },
      { title: "Finalizando processo", subtitle: "Atualizando estatísticas e registros", duration: 900 },
    ],
  },
  cleanup: {
    title: "Limpeza Inteligente",
    icon: Sparkles,
    colorClass: "text-success",
    bgClass: "bg-success/20",
    borderClass: "border-success/50",
    steps: [
      { title: "Identificando duplicados", subtitle: "Comparando arquivos similares", duration: 1400 },
      { title: "Localizando arquivos antigos", subtitle: "Buscando itens não utilizados", duration: 1200 },
      { title: "Removendo desnecessários", subtitle: "Limpando arquivos selecionados", duration: 1700 },
      { title: "Liberando espaço", subtitle: "Finalizando limpeza do sistema", duration: 1100 },
    ],
  },
};

const resultStats: Record<ProcessType, { value: string; label: string }> = {
  screenshots: { value: "234", label: "capturas organizadas" },
  recordings: { value: "18", label: "gravações organizadas" },
  cleanup: { value: "1.2 GB", label: "de espaço liberado" },
};

interface ProcessModalProps {
  isOpen: boolean;
  onClose: () => void;
  processType: ProcessType;
}

export const ProcessModal = ({ isOpen, onClose, processType }: ProcessModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  const config = processConfigs[processType];
  const Icon = config.icon;
  const totalSteps = config.steps.length;
  const progress = isComplete ? 100 : ((currentStep + 1) / totalSteps) * 100;
  const stats = resultStats[processType];

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      setIsComplete(false);
      return;
    }

    if (currentStep >= totalSteps) {
      setIsComplete(true);
      return;
    }

    const timer = setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, config.steps[currentStep]?.duration || 1000);

    return () => clearTimeout(timer);
  }, [isOpen, currentStep, totalSteps, config.steps]);

  const handleClose = () => {
    setCurrentStep(0);
    setIsComplete(false);
    onClose();
  };

  const currentStepLabel = currentStep < totalSteps 
    ? config.steps[currentStep].title 
    : "Concluído";

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-[95%] sm:max-w-md rounded-2xl bg-card border-border p-0 gap-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="p-5 pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold text-foreground">
              {config.title}
            </DialogTitle>
          </div>
        </DialogHeader>

        {/* Progress Section */}
        <div className="px-5 pb-4">
          <Progress value={progress} className="h-2 mb-3" />
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{currentStepLabel}</span>
            <span className="text-muted-foreground font-medium">{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Steps List */}
        <div className="px-5 pb-6 space-y-3">
          {config.steps.map((step, index) => {
            const isActive = index === currentStep && !isComplete;
            const isDone = index < currentStep || isComplete;
            const isPending = index > currentStep && !isComplete;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.3 }}
                className={`
                  relative rounded-xl p-4 transition-all duration-300
                  ${isActive 
                    ? `bg-card border-2 ${config.borderClass} shadow-lg` 
                    : 'bg-muted/40 border border-border/50'
                  }
                  ${isDone && !isActive ? 'opacity-60' : ''}
                `}
              >
                <div className="flex items-center gap-4">
                  {/* Icon */}
                  <div className={`
                    w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300
                    ${isActive 
                      ? config.bgClass 
                      : isDone 
                        ? 'bg-success/20' 
                        : 'bg-muted'
                    }
                  `}>
                    {isDone && !isActive ? (
                      <Check className="w-5 h-5 text-success" />
                    ) : (
                      <Icon className={`w-5 h-5 ${isActive ? config.colorClass : 'text-muted-foreground'}`} />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h4 className={`
                      font-semibold text-sm mb-0.5 transition-colors duration-300
                      ${isActive ? 'text-foreground' : isDone ? 'text-muted-foreground' : 'text-muted-foreground'}
                    `}>
                      {step.title}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {step.subtitle}
                    </p>
                  </div>
                </div>

                {/* Active indicator pulse */}
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className={`absolute inset-0 rounded-xl border-2 ${config.borderClass} pointer-events-none`}
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Complete State */}
        <AnimatePresence>
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="px-5 pb-6"
            >
              <div className="bg-success/10 border border-success/30 rounded-xl p-4 text-center">
                <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <p className="font-semibold text-foreground mb-1">Processo Concluído!</p>
                <p className="text-sm text-muted-foreground">
                  <span className="font-bold text-success">{stats.value}</span> {stats.label}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};
