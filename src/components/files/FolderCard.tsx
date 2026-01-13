import { motion } from "framer-motion";
import { Folder, Star, Trash2, Image, Video } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { useMotionConfig } from "@/hooks/useMotionConfig";

interface FolderCardProps {
  id: string;
  app: string;
  appIcon: string;
  mediaCount: number;
  mediaType: "screenshots" | "recordings";
  lastUpdated: string;
  isFavorite?: boolean;
  delay?: number;
  onDelete?: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
}

export const FolderCard = ({
  id,
  app,
  appIcon,
  mediaCount,
  mediaType,
  lastUpdated,
  isFavorite = false,
  delay = 0,
  onDelete,
  onToggleFavorite,
}: FolderCardProps) => {
  const { scaleIn, tapScale } = useMotionConfig();
  const MediaIcon = mediaType === "screenshots" ? Image : Video;
  const mediaLabel = mediaType === "screenshots" 
    ? (mediaCount === 1 ? 'captura' : 'capturas')
    : (mediaCount === 1 ? 'gravação' : 'gravações');

  return (
    <motion.div
      {...scaleIn(delay)}
      {...tapScale()}
      className="bg-card rounded-2xl border border-border overflow-hidden card-glow"
    >
      {/* Folder Preview Area */}
      <div className="relative aspect-[4/3] bg-secondary flex items-center justify-center">
        <div className="relative">
          <Folder className="w-16 h-16 text-primary/60 fill-primary/20" />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl mt-1">
            {appIcon}
          </span>
        </div>
        
        {/* Media Count Badge */}
        <div className="absolute top-2 left-2 glass px-2 py-1 rounded-lg flex items-center gap-1">
          <MediaIcon className="w-3 h-3 text-foreground" />
          <span className="text-xs font-medium text-foreground">
            {mediaCount} {mediaLabel}
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
              <p className="text-xs text-muted-foreground">{lastUpdated}</p>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1 text-muted-foreground hover:text-foreground transition-colors">
                <MoreVertical className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44 bg-popover border border-border z-50">
              <DropdownMenuItem 
                onClick={() => onToggleFavorite?.(id)}
                className="cursor-pointer"
              >
                <Star className={`w-4 h-4 mr-2 ${isFavorite ? 'text-warning fill-warning' : ''}`} />
                {isFavorite ? 'Desfavoritar' : 'Favoritar'}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete?.(id)}
                className="text-destructive focus:text-destructive cursor-pointer"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Excluir pasta
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.div>
  );
};
