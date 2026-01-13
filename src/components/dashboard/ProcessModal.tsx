import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, Camera, Video, Sparkles, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

type ProcessType = "screenshots" | "recordings" | "cleanup";

interface ProcessStep {
  label: string;
  duration: number;
}

const processConfigs: Record<ProcessType, { title: string; icon: typeof Camera; color: string; steps: ProcessStep[] }> = {
  screenshots: {
    title: "Organizando Capturas de Tela",
    icon: Camera,
    color: "text-blue-500",
    steps: [
      { label: "Escaneando capturas de tela...", duration: 1500 },
      { label: "Identificando aplicativos...", duration: 1200 },
      { label: "Criando pastas por app...", duration: 1000 },
      { label: "Movendo arquivos...", duration: 1800 },
      { label: "Finalizando organização...", duration: 800 },
    ],
  },
  recordings: {
    title: "Organizando Gravações de Tela",
    icon: Video,
    color: "text-purple-500",
    steps: [
      { label: "Escaneando gravações...", duration: 1500 },
      { label: "Analisando metadados...", duration: 1300 },
      { label: "Categorizando por data...", duration: 1100 },
      { label: "Organizando em pastas...", duration: 1600 },
      { label: "Concluindo processo...", duration: 900 },
    ],
  },
  cleanup: {
    title: "Executando Limpeza",
    icon: Sparkles,
    color: "text-emerald-500",
    steps: [
      { label: "Identificando arquivos duplicados...", duration: 1400 },
      { label: "Localizando arquivos antigos...", duration: 1200 },
      { label: "Analisando espaço ocupado...", duration: 1000 },
      { label: "Removendo arquivos desnecessários...", duration: 1700 },
      { label: "Liberando espaço...", duration: 1100 },
      { label: "Limpeza concluída!", duration: 600 },
    ],
  },
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
  const progress = isComplete ? 100 : (currentStep / totalSteps) * 100;

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

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-[90%] sm:max-w-md rounded-2xl bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-foreground">
            <div className={`p-2 rounded-xl ${
              processType === "screenshots" ? "bg-blue-500/20" :
              processType === "recordings" ? "bg-purple-500/20" :
              "bg-emerald-500/20"
            }`}>
              <Icon className={`w-5 h-5 ${config.color}`} />
            </div>
            {config.title}
          </DialogTitle>
        </DialogHeader>

        <div className="py-6">
          {/* Progress Bar */}
          <div className="mb-6">
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2 text-right">
              {Math.round(progress)}%
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-3">
            <AnimatePresence mode="wait">
              {config.steps.map((step, index) => {
                const isActive = index === currentStep && !isComplete;
                const isDone = index < currentStep || isComplete;
                const isPending = index > currentStep && !isComplete;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                      isActive ? "bg-primary/10" : isDone ? "bg-muted/50" : "bg-transparent"
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      isDone ? "bg-emerald-500" :
                      isActive ? "bg-primary" :
                      "bg-muted"
                    }`}>
                      {isDone ? (
                        <Check className="w-4 h-4 text-white" />
                      ) : isActive ? (
                        <Loader2 className="w-4 h-4 text-primary-foreground animate-spin" />
                      ) : (
                        <span className="text-xs text-muted-foreground">{index + 1}</span>
                      )}
                    </div>
                    <span className={`text-sm ${
                      isDone ? "text-muted-foreground line-through" :
                      isActive ? "text-foreground font-medium" :
                      "text-muted-foreground"
                    }`}>
                      {step.label}
                    </span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Complete State */}
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 p-4 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl text-center"
            >
              <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Check className="w-6 h-6 text-white" />
              </div>
              <p className="font-semibold text-foreground">Processo Concluído!</p>
              <p className="text-sm text-muted-foreground mt-1">
                {processType === "screenshots" && "234 capturas organizadas"}
                {processType === "recordings" && "18 gravações organizadas"}
                {processType === "cleanup" && "1.2 GB de espaço liberado"}
              </p>
            </motion.div>
          )}
        </div>

        {/* Close Button */}
        {isComplete && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handleClose}
            className="w-full gradient-primary text-primary-foreground font-semibold py-3 rounded-xl"
          >
            Fechar
          </motion.button>
        )}
      </DialogContent>
    </Dialog>
  );
};
