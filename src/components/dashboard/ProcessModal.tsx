import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, Camera, Video, Sparkles, FolderOpen, Trash2, FileCheck } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

type ProcessType = "screenshots" | "recordings" | "cleanup";

interface ProcessStep {
  label: string;
  duration: number;
  icon: typeof Camera;
}

const processConfigs: Record<ProcessType, { title: string; subtitle: string; icon: typeof Camera; color: string; bgColor: string; steps: ProcessStep[] }> = {
  screenshots: {
    title: "Organizando Capturas",
    subtitle: "Suas capturas de tela estão sendo organizadas automaticamente",
    icon: Camera,
    color: "text-blue-500",
    bgColor: "bg-blue-500",
    steps: [
      { label: "Escaneando capturas de tela", duration: 1500, icon: FolderOpen },
      { label: "Identificando aplicativos", duration: 1200, icon: FileCheck },
      { label: "Criando pastas por app", duration: 1000, icon: FolderOpen },
      { label: "Movendo arquivos", duration: 1800, icon: FileCheck },
      { label: "Finalizando organização", duration: 800, icon: Check },
    ],
  },
  recordings: {
    title: "Organizando Gravações",
    subtitle: "Suas gravações estão sendo categorizadas e organizadas",
    icon: Video,
    color: "text-purple-500",
    bgColor: "bg-purple-500",
    steps: [
      { label: "Escaneando gravações", duration: 1500, icon: FolderOpen },
      { label: "Analisando metadados", duration: 1300, icon: FileCheck },
      { label: "Categorizando por data", duration: 1100, icon: FolderOpen },
      { label: "Organizando em pastas", duration: 1600, icon: FileCheck },
      { label: "Concluindo processo", duration: 900, icon: Check },
    ],
  },
  cleanup: {
    title: "Limpeza Inteligente",
    subtitle: "Removendo arquivos duplicados e liberando espaço",
    icon: Sparkles,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500",
    steps: [
      { label: "Identificando duplicados", duration: 1400, icon: FolderOpen },
      { label: "Localizando arquivos antigos", duration: 1200, icon: Trash2 },
      { label: "Analisando espaço ocupado", duration: 1000, icon: FileCheck },
      { label: "Removendo desnecessários", duration: 1700, icon: Trash2 },
      { label: "Liberando espaço", duration: 1100, icon: Check },
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
  const progress = isComplete ? 100 : (currentStep / totalSteps) * 100;
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

  return (
    <Drawer open={isOpen} onOpenChange={handleClose}>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader className="text-center pb-2">
          {/* Animated Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="mx-auto mb-4"
          >
            <div className={`w-16 h-16 ${config.bgColor} rounded-2xl flex items-center justify-center shadow-lg`}>
              <Icon className="w-8 h-8 text-white" />
            </div>
          </motion.div>
          
          <DrawerTitle className="text-xl font-bold text-foreground">
            {config.title}
          </DrawerTitle>
          <p className="text-sm text-muted-foreground mt-1">
            {config.subtitle}
          </p>
        </DrawerHeader>

        <div className="px-6 pb-4">
          {/* Circular Progress Indicator */}
          <div className="flex justify-center mb-6">
            <div className="relative w-24 h-24">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="42"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="transparent"
                  className="text-muted/30"
                />
                <motion.circle
                  cx="48"
                  cy="48"
                  r="42"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="transparent"
                  strokeLinecap="round"
                  className={config.color}
                  initial={{ strokeDasharray: "0 264" }}
                  animate={{ strokeDasharray: `${(progress / 100) * 264} 264` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.span 
                  key={Math.round(progress)}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-2xl font-bold text-foreground"
                >
                  {Math.round(progress)}%
                </motion.span>
              </div>
            </div>
          </div>

          {/* Current Step Display */}
          <AnimatePresence mode="wait">
            {!isComplete && currentStep < totalSteps && (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-muted/50 rounded-2xl p-4 mb-4"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${config.bgColor}/20 flex items-center justify-center`}>
                    <Loader2 className={`w-5 h-5 ${config.color} animate-spin`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {config.steps[currentStep].label}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Etapa {currentStep + 1} de {totalSteps}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step Progress Dots */}
          <div className="flex justify-center gap-2 mb-4">
            {config.steps.map((_, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index < currentStep || isComplete
                    ? `${config.bgColor} w-6`
                    : index === currentStep && !isComplete
                    ? `${config.bgColor} w-4 animate-pulse`
                    : "bg-muted w-2"
                }`}
              />
            ))}
          </div>

          {/* Complete State */}
          <AnimatePresence>
            {isComplete && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="text-center py-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                  className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/30"
                >
                  <Check className="w-8 h-8 text-white" />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-lg font-bold text-foreground mb-1">
                    Processo Concluído!
                  </h3>
                  <div className="flex items-center justify-center gap-2">
                    <span className={`text-3xl font-bold ${config.color}`}>
                      {stats.value}
                    </span>
                    <span className="text-muted-foreground">
                      {stats.label}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <DrawerFooter className="pt-2">
          {isComplete ? (
            <Button
              onClick={handleClose}
              className="w-full gradient-primary text-primary-foreground font-semibold py-6 rounded-xl"
            >
              Concluído
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={handleClose}
              className="w-full py-6 rounded-xl"
            >
              Cancelar
            </Button>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
