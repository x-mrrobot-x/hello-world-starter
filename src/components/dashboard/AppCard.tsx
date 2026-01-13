import { motion } from "framer-motion";
import { useMotionConfig } from "@/hooks/useMotionConfig";

interface AppCardProps {
  name: string;
  icon: string;
  count: number;
  size: string;
  color: string;
  delay?: number;
}

export const AppCard = ({
  name,
  icon,
  count,
  size,
  color,
  delay = 0,
}: AppCardProps) => {
  const { fadeInLeft } = useMotionConfig();

  return (
    <motion.div
      {...fadeInLeft(delay)}
      className="flex items-center gap-4 p-4 bg-card rounded-2xl border border-border card-glow"
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
        style={{ backgroundColor: `${color}20` }}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-foreground truncate">{name}</p>
        <p className="text-sm text-muted-foreground">
          {count} arquivos • {size}
        </p>
      </div>
      <div
        className="w-2 h-8 rounded-full"
        style={{ backgroundColor: color }}
      />
    </motion.div>
  );
};
