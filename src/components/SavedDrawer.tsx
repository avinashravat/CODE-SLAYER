import React from 'react';
import { Layers, Trash2, ExternalLink, Calendar, Code2, AlertCircle } from 'lucide-react';
import { SavedDesign } from '../data/themes';

interface SavedDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedDesigns: SavedDesign[];
  onLoadDesign: (design: SavedDesign) => void;
  onDeleteDesign: (id: string) => void;
  onClearAll: () => void;
}

export const SavedDrawer: React.FC<SavedDrawerProps> = ({
  isOpen,
  onClose,
  savedDesigns,
  onLoadDesign,
  onDeleteDesign,
  onClearAll
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-sm animate-fade-in flex justify-end">
      {/* Backdrop trigger */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Slide-over panel */}
      <div className="relative w-full max-w-md bg-slate-900 h-full border-l border-slate-800 shadow-2xl flex flex-col z-10 animate-slide-left">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-purple-400" />
            <h3 className="font-bold text-slate-100 font-['Outfit']">
              Saved Designs Drawer
            </h3>
            <span className="bg-slate-800 text-slate-300 text-[10px] font-mono px-2 py-0.5 rounded-full">
              {savedDesigns.length} items
            </span>
          </div>

          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 text-sm font-mono"
          >
            ✕
          </button>
        </div>

        {/* Info label */}
        <div className="bg-purple-950/30 px-4 py-2 text-[11px] text-purple-300 border-b border-purple-900/40 font-mono flex items-center gap-1.5 shrink-0">
          <span>💾 Storage Engine: persistent standard localStorage API</span>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {savedDesigns.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 border border-dashed border-slate-800 rounded-xl">
              <AlertCircle className="w-8 h-8 text-slate-600 mb-2" />
              <p className="text-sm font-medium text-slate-400">No saved output presets found</p>
              <p className="text-xs text-slate-600 mt-1 max-w-[200px]">
                Click "Save state" inside the workspace menu to preserve setups instantly.
              </p>
            </div>
          ) : (
            savedDesigns.map((item) => (
              <div 
                key={item.id}
                className="bg-slate-950/60 hover:bg-slate-950 border border-slate-800 rounded-xl p-3.5 transition group relative"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="truncate flex-1">
                    <h4 className="text-xs font-bold text-slate-200 truncate flex items-center gap-1.5 font-['Outfit']">
                      <Code2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{item.title || 'Untitled Visual'}</span>
                    </h4>
                    <span className="text-[10px] text-slate-500 font-mono block mt-0.5">
                      Theme ID: <code className="text-purple-400">{item.settings.themeId}</code>
                    </span>
                  </div>

                  <button
                    onClick={() => onDeleteDesign(item.id)}
                    className="text-slate-600 hover:text-rose-400 p-1 rounded transition"
                    title="Delete item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Code Preview summary */}
                <div className="mt-2 bg-slate-900/90 rounded p-1.5 border border-slate-800/80">
                  <pre className="text-[10px] text-slate-400 font-mono line-clamp-2 overflow-hidden m-0">
                    {item.code || '// Empty script'}
                  </pre>
                </div>

                {/* Meta details footer */}
                <div className="mt-3 pt-2 border-t border-slate-900 flex items-center justify-between text-[10px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{item.createdAt}</span>
                  </span>

                  <button
                    onClick={() => {
                      onLoadDesign(item);
                      onClose();
                    }}
                    className="bg-purple-950 hover:bg-purple-900 text-purple-300 font-semibold px-2.5 py-1 rounded border border-purple-800 flex items-center gap-1 transition"
                  >
                    <span>Load back</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Panel Footer */}
        {savedDesigns.length > 0 && (
          <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between shrink-0">
            <span className="text-xs text-slate-500">Preserved locally</span>
            <button
              onClick={onClearAll}
              className="text-xs text-rose-500 hover:text-rose-400 hover:underline transition"
            >
              Clear entire repository
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
