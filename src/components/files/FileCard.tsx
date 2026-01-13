import { motion } from "framer-motion";
import { Image, Video, MoreVertical, Star } from "lucide-react";

interface FileCardProps {
  id: string;
  type: "screenshot" | "recording";
  app: string;
  appIcon: string;
  date: string;
  size: string;
  thumbnail?: string;
  isFavorite?: boolean;
  delay?: number;
}

export const FileCard = ({
  type,
  app,
  appIcon,
  date,
  size,
  thumbnail,
  isFavorite = false,
  delay = 0,
}: FileCardProps) => {
  const TypeIcon = type === "screenshot" ? Image : Video;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.3 }}
      whileTap={{ scale: 0.98 }}
      className="bg-card rounded-2xl border border-border overflow-hidden card-glow"
    >
      {/* Thumbnail Area */}
      <div className="relative aspect-[4/3] bg-secondary">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <TypeIcon className="w-10 h-10 text-muted-foreground/40" />
          </div>
        )}
        
        {/* Type Badge */}
        <div className="absolute top-2 left-2 glass px-2 py-1 rounded-lg flex items-center gap-1">
          <TypeIcon className="w-3 h-3 text-primary" />
          <span className="text-xs font-medium text-foreground">
            {type === "screenshot" ? "Screenshot" : "Gravação"}
          </span>
        </div>

        {/* Favorite */}
        {isFavorite && (
          <div className="absolute top-2 right-2">
            <Star className="w-4 h-4 text-warning fill-warning" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-lg">{appIcon}</span>
            <div className="min-w-0">
              <p className="font-medium text-foreground text-sm truncate">{app}</p>
              <p className="text-xs text-muted-foreground">{date} • {size}</p>
            </div>
          </div>
          <button className="p-1 text-muted-foreground hover:text-foreground transition-colors">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
