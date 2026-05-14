import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { Studio } from './components/Studio';
import { SavedDrawer } from './components/SavedDrawer';
import { AnalyticsView } from './components/AnalyticsView';
import { ContactPopup } from './components/ContactPopup';
import { SavedDesign } from './data/themes';

const STORAGE_KEY = 'code_slayer_saved_designs_v2';

export default function App() {
  // Application view controller
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard' | 'analytics'>('landing');
  
  // Storage layer for saved design assets
  const [savedDesigns, setSavedDesigns] = useState<SavedDesign[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.warn("Storage access restricted", e);
      return [];
    }
  });

  // Drawer modal visibility state
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  
  // Design parameters targeted for workspace reloading
  const [loadedDesign, setLoadedDesign] = useState<SavedDesign | null>(null);

  // Synchronize design repository to localStorage statefully
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedDesigns));
    } catch (e) {
      console.warn("Could not commit parameters to storage", e);
    }
  }, [savedDesigns]);

  // Design persister hook
  const handleSaveDesign = (designData: Omit<SavedDesign, 'id' | 'createdAt'>) => {
    const newDesign: SavedDesign = {
      ...designData,
      id: `design_${Date.now()}`,
      createdAt: new Date().toLocaleDateString(undefined, { 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };

    setSavedDesigns(prev => [newDesign, ...prev]);
  };

  // Delete targeted item
  const handleDeleteDesign = (id: string) => {
    setSavedDesigns(prev => prev.filter(d => d.id !== id));
  };

  // Complete cleanout helper
  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to purge all saved code preview setup records?")) {
      setSavedDesigns([]);
    }
  };

  // Reload item into the core editing suite
  const handleLoadDesign = (design: SavedDesign) => {
    setLoadedDesign(design);
    setCurrentView('dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col font-sans select-none text-slate-100 transition-colors">
      
      {/* Toast notification initialization hub */}
      <Toaster 
        position="top-center" 
        toastOptions={{
          style: {
            background: '#0f172a',
            color: '#f8fafc',
            border: '1px solid #334155',
            fontSize: '12px',
            borderRadius: '12px'
          },
          success: {
            iconTheme: {
              primary: '#22c55e',
              secondary: '#0f172a',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#0f172a',
            },
          },
        }} 
      />

      {/* Top Application Ribbon */}
      <Navbar 
        onOpenSaved={() => setIsDrawerOpen(true)}
        savedCount={savedDesigns.length}
        currentView={currentView}
        setView={setCurrentView}
      />

      {/* Core Routing Component Containers */}
      <main className="flex-1 flex flex-col relative">
        {currentView === 'landing' && (
          <LandingPage 
            onStart={() => setCurrentView('dashboard')}
            onOpenAnalytics={() => setCurrentView('analytics')}
          />
        )}

        {currentView === 'dashboard' && (
          <Studio 
            onSaveDesign={handleSaveDesign}
            onOpenSavedDrawer={() => setIsDrawerOpen(true)}
            initialLoadedDesign={loadedDesign}
          />
        )}

        {currentView === 'analytics' && (
          <AnalyticsView 
            onBack={() => setCurrentView('dashboard')}
          />
        )}
      </main>

      {/* Persistent local storage parameter Drawer Overlay */}
      <SavedDrawer 
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        savedDesigns={savedDesigns}
        onLoadDesign={handleLoadDesign}
        onDeleteDesign={handleDeleteDesign}
        onClearAll={handleClearAll}
      />

      {/* Requirement #5: Contact / Help Floating Popup Module */}
      <ContactPopup />

    </div>
  );
}
