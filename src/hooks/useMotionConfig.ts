import { useAnimations } from "@/contexts/AnimationContext";
import { TargetAndTransition, Transition } from "framer-motion";

interface MotionConfig {
  initial: TargetAndTransition | boolean;
  animate: TargetAndTransition;
  exit?: TargetAndTransition;
  transition?: Transition;
  whileTap?: TargetAndTransition;
  whileHover?: TargetAndTransition;
}

export const useMotionConfig = () => {
  const { animationsEnabled } = useAnimations();

  const getMotionProps = (config: MotionConfig): MotionConfig => {
    if (!animationsEnabled) {
      return {
        initial: false,
        animate: config.animate,
        exit: undefined,
        transition: { duration: 0 },
        whileTap: undefined,
        whileHover: undefined,
      };
    }
    
    return config;
  };

  const fadeInUp = (delay = 0): MotionConfig =>
    getMotionProps({
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay },
    });

  const fadeInDown = (delay = 0): MotionConfig =>
    getMotionProps({
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay },
    });

  const fadeIn = (delay = 0): MotionConfig =>
    getMotionProps({
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { delay },
    });

  const fadeInLeft = (delay = 0): MotionConfig =>
    getMotionProps({
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      transition: { delay },
    });

  const fadeInRight = (delay = 0): MotionConfig =>
    getMotionProps({
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      transition: { delay },
    });

  const scaleIn = (delay = 0): MotionConfig =>
    getMotionProps({
      initial: { scale: 0.8, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      transition: { delay, type: "spring" },
    });

  const slideTransition = (delay = 0): MotionConfig =>
    getMotionProps({
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
      transition: { duration: 0.4, delay },
    });

  const tapScale = (): Pick<MotionConfig, 'whileTap'> => {
    if (!animationsEnabled) return {};
    return { whileTap: { scale: 0.98 } };
  };

  const heightAuto = (): MotionConfig =>
    getMotionProps({
      initial: { opacity: 0, height: 0 },
      animate: { opacity: 1, height: "auto" },
      exit: { opacity: 0, height: 0 },
    });

  const barGrow = (height: number, delay = 0): MotionConfig => {
    if (!animationsEnabled) {
      return {
        initial: false,
        animate: { height: `${height}%` },
        transition: { duration: 0 },
      };
    }
    
    return {
      initial: { height: 0 },
      animate: { height: `${height}%` },
      transition: { delay, duration: 0.5 },
    };
  };

  const progressBar = (targetWidth: string, delay = 0): MotionConfig => {
    if (!animationsEnabled) {
      return {
        initial: false,
        animate: { width: targetWidth },
        transition: { duration: 0 },
      };
    }
    
    return {
      initial: { width: 0 },
      animate: { width: targetWidth },
      transition: { duration: 0.3, delay },
    };
  };

  return {
    animationsEnabled,
    getMotionProps,
    fadeInUp,
    fadeInDown,
    fadeIn,
    fadeInLeft,
    fadeInRight,
    scaleIn,
    slideTransition,
    tapScale,
    heightAuto,
    barGrow,
    progressBar,
  };
};
