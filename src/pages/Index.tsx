import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Onboarding } from "@/components/onboarding/Onboarding";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { FileBrowser } from "@/components/files/FileBrowser";
import { Stats } from "@/components/stats/Stats";
import { Settings } from "@/components/settings/Settings";
import { AutoClean } from "@/components/autoclean/AutoClean";
import { BottomNav } from "@/components/ui/BottomNav";

const Index = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const hasOnboarded = localStorage.getItem("screenflow-onboarded");
    if (hasOnboarded) {
      setShowOnboarding(false);
    }
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem("screenflow-onboarded", "true");
    setShowOnboarding(false);
  };

  if (showOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        {activeTab === "dashboard" && <Dashboard key="dashboard" />}
        {activeTab === "files" && <FileBrowser key="files" />}
        {activeTab === "autoclean" && <AutoClean key="autoclean" />}
        {activeTab === "stats" && <Stats key="stats" />}
        {activeTab === "settings" && <Settings key="settings" />}
      </AnimatePresence>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
