import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { useMotionConfig } from "@/hooks/useMotionConfig";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  subtext?: string;
  gradient?: boolean;
  delay?: number;
}

export const StatCard = ({
  icon: Icon,
  label,
  value,
  subtext,
  gradient = false,
  delay = 0,
}: StatCardProps) => {
  const { fadeInUp } = useMotionConfig();

  return (
    <motion.div
      {...fadeInUp(delay)}
      className={`relative overflow-hidden rounded-2xl p-4 ${
        gradient
          ? "gradient-primary glow"
          : "bg-card border border-border card-glow"
      }`}
    >
      {gradient && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
      )}
      <div className="relative z-10">
        <div
          className={`inline-flex p-2 rounded-xl mb-3 ${
            gradient ? "bg-white/20" : "bg-secondary"
          }`}
        >
          <Icon
            className={`w-5 h-5 ${
              gradient ? "text-white" : "text-primary"
            }`}
          />
        </div>
        <p
          className={`text-sm font-medium mb-1 ${
            gradient ? "text-white/80" : "text-muted-foreground"
          }`}
        >
          {label}
        </p>
        <p
          className={`text-2xl font-bold ${
            gradient ? "text-white" : "text-foreground"
          }`}
        >
          {value}
        </p>
        {subtext && (
          <p
            className={`text-xs mt-1 ${
              gradient ? "text-white/60" : "text-muted-foreground"
            }`}
          >
            {subtext}
          </p>
        )}
      </div>
    </motion.div>
  );
};
