import { useState } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, Folder, Star, Image, Video } from "lucide-react";
import { FolderCard } from "./FolderCard";
import { useMotionConfig } from "@/hooks/useMotionConfig";

const initialFolders = [
  { id: "1", app: "Instagram", appIcon: "📸", screenshotCount: 24, recordingCount: 5, lastUpdated: "Hoje, 14:32", isFavorite: true },
  { id: "2", app: "WhatsApp", appIcon: "💬", screenshotCount: 156, recordingCount: 12, lastUpdated: "Hoje, 12:15" },
  { id: "3", app: "Twitter/X", appIcon: "🐦", screenshotCount: 43, recordingCount: 0, lastUpdated: "Ontem, 23:45" },
  { id: "4", app: "YouTube", appIcon: "▶️", screenshotCount: 18, recordingCount: 28, lastUpdated: "Ontem, 19:20", isFavorite: true },
  { id: "5", app: "TikTok", appIcon: "🎵", screenshotCount: 89, recordingCount: 45, lastUpdated: "2 dias atrás" },
  { id: "6", app: "Spotify", appIcon: "🎧", screenshotCount: 12, recordingCount: 0, lastUpdated: "3 dias atrás" },
  { id: "7", app: "Netflix", appIcon: "🎬", screenshotCount: 7, recordingCount: 15, lastUpdated: "5 dias atrás" },
  { id: "8", app: "Telegram", appIcon: "✈️", screenshotCount: 31, recordingCount: 3, lastUpdated: "1 semana atrás" },
];

const filters = [
  { id: "all", label: "Todas", icon: Folder },
  { id: "favorites", label: "Favoritas", icon: Star },
];

export const FileBrowser = () => {
  const [folders, setFolders] = useState(initialFolders);
  const [activeFilter, setActiveFilter] = useState("all");
  const [mediaFilter, setMediaFilter] = useState<"screenshots" | "recordings">("screenshots");
  const { fadeInDown, fadeIn } = useMotionConfig();

  const handleDeleteFolder = (id: string) => {
    setFolders(prev => prev.filter(folder => folder.id !== id));
  };

  const handleToggleFavorite = (id: string) => {
    setFolders(prev => prev.map(folder => 
      folder.id === id ? { ...folder, isFavorite: !folder.isFavorite } : folder
    ));
  };

  const filteredFolders = folders.filter((folder) => {
    // Filter by favorites
    if (activeFilter === "favorites" && !folder.isFavorite) return false;
    
    // Filter by media type - only show folders that have the selected media type
    if (mediaFilter === "screenshots" && folder.screenshotCount === 0) return false;
    if (mediaFilter === "recordings" && folder.recordingCount === 0) return false;
    
    return true;
  });

  // Calculate totals
  const totalFolders = filteredFolders.length;
  const totalCaptures = filteredFolders.reduce((sum, folder) => 
    sum + (mediaFilter === "screenshots" ? folder.screenshotCount : folder.recordingCount), 0
  );

  return (
    <div className="min-h-screen bg-background px-4 pt-6 pb-24 safe-top">
      {/* Header */}
      <motion.div
        {...fadeInDown()}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-foreground">Apps</h1>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Folder className="w-4 h-4" />
              {totalFolders}
            </span>
            <span className="flex items-center gap-1">
              {mediaFilter === "screenshots" ? <Image className="w-4 h-4" /> : <Video className="w-4 h-4" />}
              {totalCaptures}
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por app..."
            className="w-full bg-card border border-border rounded-xl py-3 pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 bg-secondary rounded-lg">
            <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.id;
            const Icon = filter.icon;

            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm whitespace-nowrap transition-all ${
                  isActive
                    ? "gradient-primary text-primary-foreground glow"
                    : "bg-card border border-border text-muted-foreground"
                }`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                {filter.label}
              </button>
            );
          })}

          <div className="ml-auto flex items-center gap-1 bg-card border border-border rounded-xl p-1">
            <button
              onClick={() => setMediaFilter("screenshots")}
              className={`p-2 rounded-lg transition-colors ${
                mediaFilter === "screenshots" ? "bg-secondary text-primary" : "text-muted-foreground"
              }`}
              title="Capturas de tela"
            >
              <Image className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMediaFilter("recordings")}
              className={`p-2 rounded-lg transition-colors ${
                mediaFilter === "recordings" ? "bg-secondary text-primary" : "text-muted-foreground"
              }`}
              title="Gravações"
            >
              <Video className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Folders Grid */}
      <motion.div
        {...fadeIn(0.2)}
        className="grid grid-cols-2 gap-3"
      >
        {filteredFolders.map((folder, index) => (
          <FolderCard
            key={folder.id}
            {...folder}
            mediaCount={mediaFilter === "screenshots" ? folder.screenshotCount : folder.recordingCount}
            mediaType={mediaFilter}
            onDelete={handleDeleteFolder}
            onToggleFavorite={handleToggleFavorite}
            delay={0.1 + index * 0.05}
          />
        ))}
      </motion.div>

      {/* Empty State */}
      {filteredFolders.length === 0 && (
        <motion.div
          {...fadeIn()}
          className="flex flex-col items-center justify-center py-20 text-center"
        >
          <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mb-4">
            <Folder className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-foreground font-medium mb-1">Nenhuma pasta encontrada</p>
          <p className="text-sm text-muted-foreground">
            {mediaFilter === "recordings" 
              ? "Nenhum app com gravações" 
              : "Tente ajustar os filtros"}
          </p>
        </motion.div>
      )}
    </div>
  );
};