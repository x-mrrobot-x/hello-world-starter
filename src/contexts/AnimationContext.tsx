import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AnimationContextType {
  animationsEnabled: boolean;
  setAnimationsEnabled: (enabled: boolean) => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export const AnimationProvider = ({ children }: { children: ReactNode }) => {
  const [animationsEnabled, setAnimationsEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem("screenflow-animations-enabled");
    return saved !== "false";
  });

  useEffect(() => {
    localStorage.setItem("screenflow-animations-enabled", String(animationsEnabled));
    
    const root = window.document.documentElement;
    root.classList.remove("no-animations", "reduced-animations");
    
    if (!animationsEnabled) {
      root.classList.add("no-animations");
    }
  }, [animationsEnabled]);

  useEffect(() => {
    const saved = localStorage.getItem("screenflow-animations-enabled");
    if (saved === "false") {
      window.document.documentElement.classList.add("no-animations");
    }
  }, []);

  return (
    <AnimationContext.Provider value={{ animationsEnabled, setAnimationsEnabled }}>
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimations = () => {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error("useAnimations must be used within an AnimationProvider");
  }
  return context;
};
