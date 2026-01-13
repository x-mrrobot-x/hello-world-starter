import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, FolderSync, Trash2, Shield, ArrowRight, Check } from "lucide-react";
import { useMotionConfig } from "@/hooks/useMotionConfig";

interface OnboardingProps {
  onComplete: () => void;
}

const steps = [
  {
    icon: Sparkles,
    title: "Bem-vindo ao ScreenFlow",
    description: "Organize suas capturas automaticamente e economize espaço no seu dispositivo.",
    gradient: true,
  },
  {
    icon: FolderSync,
    title: "Organização Automática",
    description: "Detectamos o app de origem e movemos screenshots e gravações para pastas organizadas.",
    gradient: false,
  },
  {
    icon: Trash2,
    title: "Limpeza Inteligente",
    description: "Configure quanto tempo manter cada arquivo. Nós cuidamos do resto.",
    gradient: false,
  },
  {
    icon: Shield,
    title: "Seus Dados, Seu Controle",
    description: "Tudo fica no seu dispositivo. Nenhum upload automático. Total privacidade.",
    gradient: false,
  },
];

export const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const { animationsEnabled, slideTransition, scaleIn, fadeIn, tapScale, progressBar } = useMotionConfig();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onComplete();
    }
  };

  const isLastStep = currentStep === steps.length - 1;
  const step = steps[currentStep];
  const Icon = step.icon;

  return (
    <div className="fixed inset-0 bg-background flex flex-col">
      {/* Progress */}
      <div className="flex gap-2 p-6 safe-top">
        {steps.map((_, index) => (
          <motion.div
            key={index}
            className="flex-1 h-1 rounded-full overflow-hidden bg-secondary"
          >
            <motion.div
              {...progressBar(index <= currentStep ? "100%" : "0%")}
              className="h-full gradient-primary"
            />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            {...slideTransition()}
            className="flex flex-col items-center text-center"
          >
            {/* Icon */}
            <motion.div
              {...scaleIn(0.1)}
              className={`w-24 h-24 rounded-3xl flex items-center justify-center mb-8 ${
                step.gradient ? "gradient-primary glow" : "bg-card border border-border"
              }`}
            >
              <Icon
                className={`w-12 h-12 ${
                  step.gradient ? "text-white" : "text-primary"
                }`}
              />
            </motion.div>

            {/* Title */}
            <motion.h1
              {...fadeIn(0.2)}
              className="text-3xl font-bold text-white mb-4"
            >
              {step.title}
            </motion.h1>

            {/* Description */}
            <motion.p
              {...fadeIn(0.3)}
              className="text-lg text-gray-400 max-w-sm leading-relaxed"
            >
              {step.description}
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Actions */}
      <div className="p-6 safe-bottom">
        <motion.button
          {...tapScale()}
          onClick={handleNext}
          className="w-full gradient-primary text-primary-foreground font-semibold py-4 rounded-2xl glow flex items-center justify-center gap-2"
        >
          {isLastStep ? (
            <>
              <Check className="w-5 h-5" />
              Começar
            </>
          ) : (
            <>
              Continuar
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </motion.button>

        {!isLastStep && (
          <button
            onClick={onComplete}
            className="w-full text-muted-foreground font-medium py-3 mt-2"
          >
            Pular
          </button>
        )}
      </div>
    </div>
  );
};
