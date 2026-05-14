import React, { useState, useRef, useEffect, useCallback } from 'react';
import Editor from '@monaco-editor/react';
import toast from 'react-hot-toast';
import {
  Code2, Download, Save, RefreshCw, Upload,
  Layers, Eye, Monitor, FileImage, Copy, Share2,
  FileCode, ExternalLink, ImagePlus, X
} from 'lucide-react';
import {
  THEME_PRESETS, PROGRAMMING_LANGUAGES, DEFAULT_SETTINGS,
  CustomizationSettings, SavedDesign
} from '../data/themes';

const AUTOSAVE_KEY = 'code_slayer_autosave_code_v2';

interface StudioProps {
  onSaveDesign: (design: Omit<SavedDesign, 'id' | 'createdAt'>) => void;
  onOpenSavedDrawer: () => void;
  initialLoadedDesign?: SavedDesign | null;
}

// ─── Beautiful auto syntax coloring helper ────────────────────────
function colorizeToken(token: string): { color: string; bold?: boolean; italic?: boolean } {
  const t = token.trim();

  // Keywords
  if (/^(function|def|func|fn|pub|async|await|class|interface|type|struct|enum|impl|trait|mod|package|import|from|export|default|const|let|var|mut|static|final|override|abstract|extends|implements|new|this|self|super|match|case|switch|with|as|in|of|is|not|and|or)$/.test(t)) {
    return { color: '#c792ea', bold: true }; // soft purple
  }
  // Control flow
  if (/^(if|else|elif|for|while|loop|do|break|continue|return|yield|throw|try|catch|finally|except|raise|panic|unwrap)$/.test(t)) {
    return { color: '#ff6b9d', bold: true }; // soft pink
  }
  // Types / Builtins
  if (/^(string|String|number|int|i32|i64|u32|u64|f32|f64|bool|boolean|true|false|None|null|nil|undefined|void|any|never|unknown|float|double|char|byte|usize|isize|println|print|console|fmt|map|filter|reduce|Object|Array|Math|Error|Promise|Result|Option|Some|Ok|Err|Vec)$/.test(t)) {
    return { color: '#82aaff' }; // soft blue
  }
  // Numbers
  if (/^[0-9]+(\.[0-9]+)?$/.test(t)) {
    return { color: '#f78c6c' }; // soft orange
  }
  // Strings (detected by quotes)
  if (/^["'`]/.test(t) || /["'`]$/.test(t)) {
    return { color: '#c3e88d' }; // soft green
  }
  // Operators
  if (/^[=!<>+\-*/%&|^~?:]+$/.test(t)) {
    return { color: '#89ddff' }; // soft cyan
  }
  // Brackets
  if (/^[(){}[\]]+$/.test(t)) {
    return { color: '#ffd700' }; // gold
  }
  // Semicolons, commas
  if (/^[;,.]$/.test(t)) {
    return { color: '#637777' };
  }

  return { color: '' }; // use default theme color
}

function renderColorizedLine(line: string, defaultColor: string): React.ReactNode[] {
  const trimmed = line.trim();

  // Full line comments - soft muted style
  if (trimmed.startsWith('//') || trimmed.startsWith('#') || trimmed.startsWith('/*') || trimmed.startsWith('*')) {
    return [<span key="c" style={{ color: '#546e7a', fontStyle: 'italic' }}>{line}</span>];
  }

  // Tokenize and colorize
  const parts: React.ReactNode[] = [];
  // Split by strings first, then by tokens
  const regex = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`|\/\/.*|#.*|\b\w+\b|[^\s\w]+|\s+)/g;
  let match;
  let i = 0;

  while ((match = regex.exec(line)) !== null) {
    const tok = match[0];

    // Check if it's a string literal
    if (/^["'`]/.test(tok) && tok.length > 1) {
      parts.push(<span key={i++} style={{ color: '#c3e88d' }}>{tok}</span>);
    } else if (/^\s+$/.test(tok)) {
      parts.push(<span key={i++}>{tok}</span>);
    } else {
      const style = colorizeToken(tok);
      if (style.color) {
        parts.push(
          <span key={i++} style={{ color: style.color, fontWeight: style.bold ? 600 : undefined, fontStyle: style.italic ? 'italic' : undefined }}>
            {tok}
          </span>
        );
      } else {
        parts.push(<span key={i++} style={{ color: defaultColor }}>{tok}</span>);
      }
    }
  }

  if (parts.length === 0) {
    return [<span key="empty" style={{ color: defaultColor }}>{line || ' '}</span>];
  }

  return parts;
}

export const Studio: React.FC<StudioProps> = ({
  onSaveDesign,
  onOpenSavedDrawer,
  initialLoadedDesign
}) => {
  const [settings, setSettings] = useState<CustomizationSettings>(
    initialLoadedDesign ? initialLoadedDesign.settings : DEFAULT_SETTINGS
  );

  const [codeContent, setCodeContent] = useState<string>(() => {
    if (initialLoadedDesign) return initialLoadedDesign.code;
    try {
      const stored = localStorage.getItem(AUTOSAVE_KEY);
      if (stored) return stored;
    } catch (_e) { /* ignore */ }
    const defaultLang = PROGRAMMING_LANGUAGES.find(l => l.id === DEFAULT_SETTINGS.language);
    return defaultLang ? defaultLang.sample : '// Write your code here';
  });

  const currentPreset = THEME_PRESETS.find(p => p.id === settings.themeId) || THEME_PRESETS[0];
  const [activeTab, setActiveTab] = useState<'editor' | 'controls' | 'preview'>('preview');
  const [exporting, setExporting] = useState(false);

  const previewRef = useRef<HTMLDivElement>(null);
  const codeDropRef = useRef<HTMLInputElement>(null);
  const bgUploadRef = useRef<HTMLInputElement>(null);

  // Autosave debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      try { localStorage.setItem(AUTOSAVE_KEY, codeContent); } catch (_e) { /* */ }
    }, 800);
    return () => clearTimeout(timer);
  }, [codeContent]);

  useEffect(() => {
    if (initialLoadedDesign) {
      setSettings(initialLoadedDesign.settings);
      setCodeContent(initialLoadedDesign.code);
      toast.success("Design loaded");
    }
  }, [initialLoadedDesign]);

  const handleLanguageChange = (langId: string) => {
    setSettings(prev => ({ ...prev, language: langId }));
    const sampleCode = PROGRAMMING_LANGUAGES.find(l => l.id === langId)?.sample || '';
    setCodeContent(sampleCode);
    toast.success(`Language: ${langId}`);
  };

  const handleRandomizeTheme = () => {
    const chosen = THEME_PRESETS[Math.floor(Math.random() * THEME_PRESETS.length)];
    setSettings(prev => ({ ...prev, themeId: chosen.id, customBgUrl: undefined }));
    toast.success(`Theme: ${chosen.name}`);
  };

  // ─── Code file drop ──────────────────
  const handleCodeFileDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) {
        setCodeContent(ev.target.result as string);
        toast.success("Code loaded from file!");
      }
    };
    reader.readAsText(file);
  };

  // ─── Custom Background Image Upload ──────────────────
  const handleBgUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error("Please upload an image file");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) {
        setSettings(prev => ({ ...prev, customBgUrl: ev.target!.result as string }));
        toast.success("Custom background applied!");
      }
    };
    reader.readAsDataURL(file);
  }, []);

  // ─── FIXED Image Export — Canvas-based drawing ──────────────────
  const handleExport = useCallback(async (format: 'png' | 'jpg') => {
    if (!previewRef.current) {
      toast.error("Preview not ready");
      return;
    }

    setExporting(true);
    const toastId = toast.loading(`Rendering ${format.toUpperCase()}...`);

    // Small delay to ensure DOM is fully painted
    await new Promise(r => setTimeout(r, 200));

    try {
      const el = previewRef.current;
      const rect = el.getBoundingClientRect();
      const scale = 2;

      // Create offscreen canvas
      const canvas = document.createElement('canvas');
      canvas.width = rect.width * scale;
      canvas.height = rect.height * scale;
      const ctx = canvas.getContext('2d')!;
      ctx.scale(scale, scale);

      // Draw background color
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Try to draw background image
      const bgUrl = settings.customBgUrl || currentPreset.bgUrl;
      try {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = () => reject();
          img.src = bgUrl;
          setTimeout(() => resolve(), 3000); // timeout fallback
        });
        // Draw image covering full area
        const imgRatio = img.width / img.height;
        const canvasRatio = rect.width / rect.height;
        let sx = 0, sy = 0, sw = img.width, sh = img.height;
        if (imgRatio > canvasRatio) {
          sw = img.height * canvasRatio;
          sx = (img.width - sw) / 2;
        } else {
          sh = img.width / canvasRatio;
          sy = (img.height - sh) / 2;
        }
        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, rect.width, rect.height);
      } catch (_e) {
        // Background image failed — use gradient fallback
        const grad = ctx.createLinearGradient(0, 0, rect.width, rect.height);
        grad.addColorStop(0, '#0f172a');
        grad.addColorStop(1, '#1e1b4b');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, rect.width, rect.height);
      }

      // Dark overlay
      ctx.fillStyle = 'rgba(15, 23, 42, 0.25)';
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Draw glass card
      const pad = settings.padding;
      const cardX = pad;
      const cardY = pad;
      const cardW = rect.width - pad * 2;
      const cardH = rect.height - pad * 2;
      const radius = Math.max(4, settings.borderRadius - 4);

      // Rounded rect helper
      const roundRect = (x: number, y: number, w: number, h: number, r: number) => {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.arcTo(x + w, y, x + w, y + r, r);
        ctx.lineTo(x + w, y + h - r);
        ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
        ctx.lineTo(x + r, y + h);
        ctx.arcTo(x, y + h, x, y + h - r, r);
        ctx.lineTo(x, y + r);
        ctx.arcTo(x, y, x + r, y, r);
        ctx.closePath();
      };

      // Card background
      roundRect(cardX, cardY, cardW, cardH, radius);
      ctx.fillStyle = currentPreset.windowBg;
      ctx.fill();
      ctx.strokeStyle = currentPreset.borderColor;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Window dots header
      const headerH = 40;
      ctx.fillStyle = 'rgba(255,255,255,0.03)';
      roundRect(cardX, cardY, cardW, headerH, radius);
      ctx.fill();

      // Window dots
      if (settings.windowControls) {
        const dotY = cardY + headerH / 2;
        [['#ef4444', 12], ['#f59e0b', 24], ['#22c55e', 36]].forEach(([color, offsetX]) => {
          ctx.beginPath();
          ctx.arc(cardX + Number(offsetX) + 8, dotY, 5, 0, Math.PI * 2);
          ctx.fillStyle = color as string;
          ctx.fill();
        });
      }

      // CODE-SLAYER label
      ctx.font = 'bold 9px monospace';
      ctx.fillStyle = 'rgba(255,255,255,0.35)';
      ctx.textAlign = 'right';
      ctx.fillText(`CODE-SLAYER  |  ${settings.language}`, cardX + cardW - 14, cardY + headerH / 2 + 3);
      ctx.textAlign = 'left';

      // Header divider line
      ctx.strokeStyle = 'rgba(255,255,255,0.05)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cardX, cardY + headerH);
      ctx.lineTo(cardX + cardW, cardY + headerH);
      ctx.stroke();

      // Render code lines
      const fontSize = settings.fontSize;
      ctx.font = `${fontSize}px "JetBrains Mono", "Fira Code", "Consolas", monospace`;
      const lineH = fontSize * 1.65;
      const codeX = cardX + 18 + (settings.lineNumbers ? 40 : 0);
      let codeY = cardY + headerH + 22;
      const lines = codeContent.split('\n');

      lines.forEach((line, idx) => {
        if (codeY > cardY + cardH - 30) return;

        // Line numbers
        if (settings.lineNumbers) {
          ctx.font = `${fontSize - 2}px monospace`;
          ctx.fillStyle = 'rgba(255,255,255,0.2)';
          ctx.textAlign = 'right';
          ctx.fillText(`${idx + 1}`, cardX + 48, codeY);
          ctx.textAlign = 'left';
          ctx.font = `${fontSize}px "JetBrains Mono", "Fira Code", "Consolas", monospace`;
        }

        // Determine line color based on content
        const trimmed = line.trim();
        let lineColor = '#d4d4d8'; // default light gray

        if (trimmed.startsWith('//') || trimmed.startsWith('#') || trimmed.startsWith('/*') || trimmed.startsWith('*')) {
          lineColor = '#546e7a'; // comments muted
          ctx.font = `italic ${fontSize}px "JetBrains Mono", monospace`;
        } else if (/\b(function|def|func|fn|interface|class|struct|enum|trait|impl)\b/.test(line)) {
          lineColor = '#c792ea'; // purple keywords
        } else if (/\b(return|import|export|from|package|use|mod)\b/.test(line)) {
          lineColor = '#ff6b9d'; // pink
        } else if (/\b(const|let|var|mut|val|static)\b/.test(line)) {
          lineColor = '#82aaff'; // blue
        } else if (/\b(if|else|for|while|try|catch|match|switch|case)\b/.test(line)) {
          lineColor = '#ffcb6b'; // yellow
        } else if (/["'`]/.test(line)) {
          lineColor = '#c3e88d'; // green
        }

        ctx.fillStyle = lineColor;
        ctx.fillText(line, codeX, codeY);
        ctx.font = `${fontSize}px "JetBrains Mono", "Fira Code", "Consolas", monospace`;
        codeY += lineH;
      });

      // Watermark footer
      const wmY = cardY + cardH - 12;
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.fillRect(cardX, wmY - 18, cardW, 30);
      ctx.font = 'bold 10px "Orbitron", sans-serif';
      ctx.fillStyle = 'rgba(255,255,255,0.55)';
      ctx.textAlign = 'center';
      ctx.fillText('Generated by CODE-SLAYER', cardX + cardW / 2, wmY);
      ctx.textAlign = 'left';

      // Glow border
      if (settings.glowEnabled) {
        ctx.shadowColor = currentPreset.borderColor;
        ctx.shadowBlur = 20;
        roundRect(cardX, cardY, cardW, cardH, radius);
        ctx.strokeStyle = currentPreset.borderColor;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Convert and download
      const mime = format === 'jpg' ? 'image/jpeg' : 'image/png';
      canvas.toBlob((blob) => {
        if (!blob) {
          toast.error("Failed to create image", { id: toastId });
          return;
        }
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `code-slayer-${settings.language}-${Date.now()}.${format}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast.success("✅ Image downloaded!", { id: toastId });
      }, mime, 0.95);

    } catch (err) {
      console.error("Export error:", err);
      toast.error("Download failed", { id: toastId });
    } finally {
      setExporting(false);
    }
  }, [settings, codeContent, currentPreset]);

  const handleSaveToLocal = () => {
    onSaveDesign({
      title: `${currentPreset.name} (${settings.language})`,
      code: codeContent,
      settings: { ...settings }
    });
    toast.success("Design saved!");
  };

  const handleCopyCode = () => {
    if (!codeContent.trim()) { toast.error("Nothing to copy"); return; }
    navigator.clipboard.writeText(codeContent);
    toast.success("Code copied!");
  };

  const handleDownloadCodeFile = () => {
    const extMap: Record<string, string> = { javascript: 'js', typescript: 'ts', python: 'py', css: 'css', rust: 'rs', go: 'go' };
    const ext = extMap[settings.language] || 'txt';
    const blob = new Blob([codeContent], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `code.${ext}`;
    link.click();
    toast.success("Code file downloaded!");
  };

  const handleShareLayout = () => {
    if (navigator.share) {
      navigator.share({ title: 'CODE-SLAYER', text: 'Code visual by CODE-SLAYER', url: window.location.href }).catch(() => handleCopyCode());
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied!");
    }
  };

  const effectiveBgUrl = settings.customBgUrl || currentPreset.bgUrl;

  // Default soft pastel text color
  const defaultTextColor = '#d4d4d8';

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-slate-950 text-slate-100">

      {/* Mobile Tabs */}
      <div className="lg:hidden flex items-center justify-between bg-slate-900 border-b border-slate-800 p-2 text-xs">
        <div className="flex rounded-lg overflow-hidden bg-slate-950 border border-slate-800 p-0.5">
          {(['preview', 'editor', 'controls'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-md font-medium transition cursor-pointer capitalize ${
                activeTab === tab
                  ? tab === 'preview' ? 'bg-purple-600 text-white' : 'bg-slate-800 text-cyan-400'
                  : 'text-slate-400'
              }`}
            >
              {tab === 'preview' && <Eye className="w-3.5 h-3.5 inline mr-1" />}
              {tab === 'editor' && <Code2 className="w-3.5 h-3.5 inline mr-1" />}
              {tab}
            </button>
          ))}
        </div>
        <button onClick={() => handleExport('png')} disabled={exporting} className="bg-cyan-500 text-slate-950 font-bold px-3 py-1.5 rounded-md flex items-center gap-1 cursor-pointer disabled:opacity-50">
          <Download className="w-3.5 h-3.5" /> Export
        </button>
      </div>

      {/* Main Split */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">

        {/* ═══ LEFT PANEL ═══ */}
        <div className={`w-full lg:w-[500px] xl:w-[540px] border-r border-slate-800 bg-slate-900/50 flex flex-col overflow-hidden ${activeTab === 'preview' ? 'hidden lg:flex' : 'flex'}`}>

          {/* Language Header */}
          <div className="p-3 border-b border-slate-800 flex items-center justify-between bg-slate-900/80 shrink-0">
            <h2 className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-purple-400" /> Code Editor
            </h2>
            <select
              value={settings.language}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-lg px-2 py-1 font-mono focus:outline-none focus:border-cyan-500 cursor-pointer"
            >
              {PROGRAMMING_LANGUAGES.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
            </select>
          </div>

          {/* ─── MONACO EDITOR ─── */}
          <div className="bg-[#1e1e1e] relative" style={{ height: '300px' }}>
            <Editor
              height="300px"
              language={settings.language}
              value={codeContent}
              onChange={(val) => setCodeContent(val || '')}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: 'JetBrains Mono, monospace',
                lineNumbers: settings.lineNumbers ? 'on' : 'off',
                scrollBeyondLastLine: false,
                wordWrap: 'on',
                padding: { top: 12 },
                automaticLayout: true,
                placeholder: 'Paste your HTML, CSS, JS, React, Tailwind, or AI-generated code here...' as any,
              }}
            />
          </div>

          {/* Editor footer */}
          <div className="px-3 py-1.5 bg-slate-900 border-y border-slate-800 flex items-center justify-between text-xs shrink-0">
            <span className="text-slate-500 font-mono">{codeContent.split('\n').length} lines • {codeContent.length} chars</span>
            <div className="flex gap-2">
              <button onClick={() => codeDropRef.current?.click()} className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 flex items-center gap-1 cursor-pointer"><Upload className="w-3 h-3" /> File</button>
              <input type="file" ref={codeDropRef} onChange={handleCodeFileDrop} accept=".js,.ts,.html,.css,.py,.rs,.go,.txt,.jsx,.tsx" className="hidden" />
              <button onClick={handleCopyCode} className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 flex items-center gap-1 cursor-pointer"><Copy className="w-3 h-3" /> Copy</button>
              <button onClick={() => setCodeContent('')} className="px-2 py-0.5 text-slate-500 hover:text-white cursor-pointer">Clear</button>
            </div>
          </div>

          {/* ─── CUSTOMIZATION PANEL (scrollable) ─── */}
          <div className="flex-1 overflow-y-auto p-4 space-y-5">

            {/* Custom Image Upload Section */}
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                📸 Custom Background Image
              </label>
              <input type="file" ref={bgUploadRef} onChange={handleBgUpload} accept="image/*" className="hidden" />
              <button
                onClick={() => bgUploadRef.current?.click()}
                className="w-full py-3 bg-gradient-to-r from-purple-950 to-pink-950 hover:from-purple-900 hover:to-pink-900 border border-dashed border-purple-500/50 hover:border-purple-400 rounded-xl text-sm text-purple-200 flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <ImagePlus className="w-5 h-5 text-purple-400" />
                <span>Upload Your Own Image</span>
              </button>
              {settings.customBgUrl && (
                <div className="mt-2 relative rounded-lg overflow-hidden border border-purple-500/30">
                  <img src={settings.customBgUrl} alt="Custom BG" className="w-full h-20 object-cover" />
                  <button
                    onClick={() => { setSettings(prev => ({ ...prev, customBgUrl: undefined })); toast.success("Custom image removed"); }}
                    className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1 hover:bg-red-600 cursor-pointer transition"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  <div className="absolute bottom-0 inset-x-0 bg-black/60 text-[10px] text-purple-300 text-center py-0.5 font-mono">Custom Image Active</div>
                </div>
              )}
            </div>

            {/* Theme Grid */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Preset Themes</label>
                <button onClick={handleRandomizeTheme} className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"><RefreshCw className="w-3 h-3" /> Random</button>
              </div>
              <div className="grid grid-cols-5 gap-1.5">
                {THEME_PRESETS.map(p => {
                  const sel = settings.themeId === p.id && !settings.customBgUrl;
                  return (
                    <button key={p.id} onClick={() => { setSettings(prev => ({ ...prev, themeId: p.id, customBgUrl: undefined })); toast.success(p.name); }}
                      className={`h-9 rounded-lg overflow-hidden relative border transition-all cursor-pointer ${sel ? 'border-cyan-400 ring-1 ring-cyan-500/50 scale-105' : 'border-slate-800 opacity-70 hover:opacity-100'}`} title={p.name}>
                      <img src={p.bgUrl} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                      {sel && <div className="absolute inset-0 bg-cyan-400/20" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sliders */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Visual Controls</label>
              {[
                { label: 'Font Size', key: 'fontSize' as const, min: 12, max: 24, step: 1, accent: 'accent-cyan-500' },
                { label: 'Padding', key: 'padding' as const, min: 16, max: 80, step: 4, accent: 'accent-purple-500' },
                { label: 'Corner Radius', key: 'borderRadius' as const, min: 0, max: 32, step: 1, accent: 'accent-pink-500' },
                { label: 'Glass Blur', key: 'blurIntensity' as const, min: 0, max: 30, step: 1, accent: 'accent-emerald-500' },
              ].map(s => (
                <div key={s.key}>
                  <div className="flex justify-between text-xs mb-0.5 text-slate-400">
                    <span>{s.label}</span><span className="font-mono text-cyan-400">{settings[s.key]}px</span>
                  </div>
                  <input type="range" min={s.min} max={s.max} step={s.step} value={settings[s.key]}
                    onChange={(e) => setSettings(prev => ({ ...prev, [s.key]: Number(e.target.value) }))}
                    className={`w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer ${s.accent}`} />
                </div>
              ))}

              <div className="flex flex-wrap gap-3 pt-1 text-xs">
                <label className="flex items-center gap-1.5 text-slate-300 cursor-pointer">
                  <input type="checkbox" checked={settings.glowEnabled} onChange={e => setSettings(p => ({ ...p, glowEnabled: e.target.checked }))} className="accent-purple-500" /> Neon Glow
                </label>
                <label className="flex items-center gap-1.5 text-slate-300 cursor-pointer">
                  <input type="checkbox" checked={settings.lineNumbers} onChange={e => setSettings(p => ({ ...p, lineNumbers: e.target.checked }))} className="accent-cyan-500" /> Line Numbers
                </label>
                <label className="flex items-center gap-1.5 text-slate-300 cursor-pointer">
                  <input type="checkbox" checked={settings.windowControls} onChange={e => setSettings(p => ({ ...p, windowControls: e.target.checked }))} className="accent-pink-500" /> Window Dots
                </label>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-3 bg-slate-950 border-t border-slate-800 shrink-0 space-y-2">
            <div className="flex items-center justify-between gap-2">
              <button onClick={handleSaveToLocal} className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs rounded-lg border border-slate-700 flex items-center gap-1.5 transition cursor-pointer">
                <Save className="w-3.5 h-3.5 text-purple-400" /> Save Design
              </button>
              <button onClick={onOpenSavedDrawer} className="px-3 py-1.5 text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 cursor-pointer">
                <Layers className="w-3.5 h-3.5" /> Saved
              </button>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleExport('png')} disabled={exporting}
                className="flex-1 py-2.5 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-slate-950 font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer">
                <Download className="w-3.5 h-3.5" /> Export PNG
              </button>
              <button onClick={() => handleExport('jpg')} disabled={exporting}
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer">
                <FileImage className="w-3.5 h-3.5 text-pink-400" /> Export JPG
              </button>
            </div>
          </div>
        </div>

        {/* ═══ RIGHT PANEL — PREVIEW ═══ */}
        <div className={`flex-1 flex flex-col bg-slate-950 overflow-y-auto relative ${activeTab !== 'preview' ? 'hidden lg:flex' : 'flex'}`}>

          {/* Preview Top Bar */}
          <div className="sticky top-0 z-10 bg-slate-950/90 backdrop-blur-sm border-b border-slate-900 px-4 py-2 flex items-center justify-between text-xs text-slate-400 shrink-0">
            <div className="flex items-center gap-2">
              <Monitor className="w-4 h-4 text-cyan-400" />
              <span className="font-mono text-slate-300 hidden sm:inline">Live Preview</span>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={handleCopyCode} className="p-1 sm:px-2 sm:py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded text-[11px] flex items-center gap-1 border border-slate-800 cursor-pointer">
                <Copy className="w-3 h-3 text-cyan-400" /><span className="hidden sm:inline">Copy</span>
              </button>
              <button onClick={handleDownloadCodeFile} className="p-1 sm:px-2 sm:py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded text-[11px] flex items-center gap-1 border border-slate-800 cursor-pointer">
                <FileCode className="w-3 h-3 text-purple-400" /><span className="hidden md:inline">Code</span>
              </button>
              <button onClick={handleShareLayout} className="p-1 sm:px-2 sm:py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded text-[11px] flex items-center gap-1 border border-slate-800 cursor-pointer">
                <Share2 className="w-3 h-3 text-pink-400" /><span className="hidden lg:inline">Share</span>
              </button>
            </div>
          </div>

          {/* Preview Canvas */}
          <div className="flex-1 flex items-center justify-center p-4 sm:p-8 min-h-[500px]">
            <div
              ref={previewRef}
              className="w-full max-w-4xl relative overflow-hidden transition-all duration-300 select-none flex items-center justify-center shadow-2xl"
              style={{
                padding: `${settings.padding}px`,
                backgroundImage: `url(${effectiveBgUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: `${settings.borderRadius}px`,
                boxShadow: settings.glowEnabled ? currentPreset.glowEffect : '0 25px 50px -12px rgba(0,0,0,0.8)',
              }}
            >
              <div className="absolute inset-0 bg-slate-950/25 pointer-events-none" />

              <div className="w-full relative z-10 border transition-all duration-200"
                style={{
                  backgroundColor: currentPreset.windowBg,
                  backdropFilter: `blur(${settings.blurIntensity}px)`,
                  WebkitBackdropFilter: `blur(${settings.blurIntensity}px)`,
                  borderColor: currentPreset.borderColor,
                  borderRadius: `${Math.max(4, settings.borderRadius - 4)}px`,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                }}
              >
                {/* Window header */}
                <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {settings.windowControls ? (
                      <>
                        <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                        <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                        <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                      </>
                    ) : (
                      <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500">// code</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 opacity-70">
                    <span className="text-[10px] font-bold tracking-widest text-white/40 uppercase font-mono">CODE-SLAYER</span>
                    <span className="text-[9px] bg-white/10 px-1.5 py-0.5 text-cyan-300 rounded font-mono">{settings.language}</span>
                  </div>
                </div>

                {/* ─── RENDERED CODE with auto syntax colors ─── */}
                <div className="p-5 overflow-x-auto max-h-[500px]">
                  <pre className="m-0 whitespace-pre-wrap" style={{
                    fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                    fontSize: `${settings.fontSize}px`,
                    lineHeight: '1.65',
                    textShadow: settings.glowEnabled ? '0 0 8px rgba(255,255,255,0.15)' : 'none',
                  }}>
                    {codeContent.split('\n').map((line, idx) => (
                      <div key={idx} className="flex">
                        {settings.lineNumbers && (
                          <span className="w-10 shrink-0 text-right pr-4 select-none font-mono" style={{ fontSize: `${settings.fontSize - 2}px`, color: 'rgba(255,255,255,0.18)' }}>
                            {idx + 1}
                          </span>
                        )}
                        <span className="flex-1 break-all">
                          {renderColorizedLine(line, defaultTextColor)}
                        </span>
                      </div>
                    ))}
                  </pre>
                </div>

                {/* Watermark */}
                <div className="px-4 py-2 bg-black/30 border-t border-white/5 flex items-center justify-center text-[11px] text-white/50">
                  Generated by <strong className="ml-1 text-white/70 font-['Orbitron'] tracking-wider">CODE-SLAYER</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Footer */}
          <div className="p-2.5 bg-slate-950 border-t border-slate-900 text-center text-xs text-slate-500 flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button onClick={() => { setActiveTab('editor'); toast.success("Editor opened"); }} className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer">
              <ExternalLink className="w-3 h-3" /> Edit Code
            </button>
            <button onClick={onOpenSavedDrawer} className="text-purple-400 hover:text-purple-300 flex items-center gap-1 cursor-pointer">
              <Layers className="w-3.5 h-3.5" /> Saved Designs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
