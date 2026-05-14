export interface ThemePreset {
  id: string;
  name: string;
  category: 'anime' | 'cyberpunk' | 'nature' | 'custom';
  bgUrl: string;
  fontFamily: string;
  windowBg: string;
  borderColor: string;
  textColor: string;
  glowEffect: string;
}

export const THEME_PRESETS: ThemePreset[] = [
  // CYBERPUNK THEMES
  {
    id: 'cyber-neon',
    name: 'Neon Gridscape',
    category: 'cyberpunk',
    bgUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&q=80',
    fontFamily: 'Orbitron, monospace',
    windowBg: 'rgba(10, 10, 25, 0.75)',
    borderColor: 'rgba(255, 0, 128, 0.5)',
    textColor: '#e2e8f0',
    glowEffect: '0 0 30px rgba(255, 0, 128, 0.6)'
  },
  {
    id: 'cyber-city',
    name: 'Tokyo Overload',
    category: 'cyberpunk',
    bgUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80',
    fontFamily: 'JetBrains Mono, monospace',
    windowBg: 'rgba(5, 5, 12, 0.85)',
    borderColor: 'rgba(0, 240, 255, 0.6)',
    textColor: '#38bdf8',
    glowEffect: '0 0 25px rgba(0, 240, 255, 0.5)'
  },
  {
    id: 'cyber-matrix',
    name: 'Neural Terminal',
    category: 'cyberpunk',
    bgUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&q=80',
    fontFamily: 'JetBrains Mono, monospace',
    windowBg: 'rgba(0, 20, 10, 0.8)',
    borderColor: 'rgba(34, 197, 94, 0.5)',
    textColor: '#4ade80',
    glowEffect: '0 0 25px rgba(34, 197, 94, 0.6)'
  },
  {
    id: 'cyber-synth',
    name: 'Synthwave Horizon',
    category: 'cyberpunk',
    bgUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80',
    fontFamily: 'Outfit, sans-serif',
    windowBg: 'rgba(30, 5, 40, 0.7)',
    borderColor: 'rgba(192, 132, 252, 0.5)',
    textColor: '#f8fafc',
    glowEffect: '0 0 35px rgba(192, 132, 252, 0.7)'
  },
  {
    id: 'cyber-reactor',
    name: 'Core Meltdown',
    category: 'cyberpunk',
    bgUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80',
    fontFamily: 'Orbitron, monospace',
    windowBg: 'rgba(25, 5, 5, 0.82)',
    borderColor: 'rgba(239, 68, 68, 0.6)',
    textColor: '#fca5a5',
    glowEffect: '0 0 30px rgba(239, 68, 68, 0.6)'
  },

  // ANIME THEMES
  {
    id: 'anime-sunset',
    name: 'Lofi Balcony',
    category: 'anime',
    bgUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&q=80',
    fontFamily: 'Outfit, sans-serif',
    windowBg: 'rgba(15, 23, 42, 0.65)',
    borderColor: 'rgba(244, 114, 182, 0.4)',
    textColor: '#fdf2f8',
    glowEffect: '0 0 20px rgba(244, 114, 182, 0.4)'
  },
  {
    id: 'anime-cloud',
    name: 'Ethereal Skies',
    category: 'anime',
    bgUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1200&q=80',
    fontFamily: 'JetBrains Mono, monospace',
    windowBg: 'rgba(12, 16, 28, 0.6)',
    borderColor: 'rgba(147, 197, 253, 0.5)',
    textColor: '#ffffff',
    glowEffect: '0 0 25px rgba(147, 197, 253, 0.5)'
  },
  {
    id: 'anime-rain',
    name: 'Midnight Alleyway',
    category: 'anime',
    bgUrl: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200&q=80',
    fontFamily: 'JetBrains Mono, monospace',
    windowBg: 'rgba(8, 8, 16, 0.8)',
    borderColor: 'rgba(167, 139, 250, 0.5)',
    textColor: '#e0e7ff',
    glowEffect: '0 0 20px rgba(167, 139, 250, 0.5)'
  },
  {
    id: 'anime-sakura',
    name: 'Cherry Blossom Dreams',
    category: 'anime',
    bgUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&q=80',
    fontFamily: 'Outfit, sans-serif',
    windowBg: 'rgba(30, 15, 25, 0.7)',
    borderColor: 'rgba(251, 113, 133, 0.5)',
    textColor: '#fff1f2',
    glowEffect: '0 0 30px rgba(251, 113, 133, 0.5)'
  },
  {
    id: 'anime-portal',
    name: 'Spirited Glow',
    category: 'anime',
    bgUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&q=80',
    fontFamily: 'JetBrains Mono, monospace',
    windowBg: 'rgba(10, 15, 30, 0.72)',
    borderColor: 'rgba(56, 189, 248, 0.5)',
    textColor: '#f0f9ff',
    glowEffect: '0 0 25px rgba(56, 189, 248, 0.6)'
  },

  // NATURE THEMES
  {
    id: 'nature-forest',
    name: 'Misty Redwood',
    category: 'nature',
    bgUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=80',
    fontFamily: 'Playfair Display, serif',
    windowBg: 'rgba(10, 20, 12, 0.75)',
    borderColor: 'rgba(134, 239, 172, 0.3)',
    textColor: '#ecfdf5',
    glowEffect: '0 0 15px rgba(134, 239, 172, 0.3)'
  },
  {
    id: 'nature-ocean',
    name: 'Deep Blue Depths',
    category: 'nature',
    bgUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
    fontFamily: 'JetBrains Mono, monospace',
    windowBg: 'rgba(5, 15, 25, 0.7)',
    borderColor: 'rgba(103, 232, 249, 0.4)',
    textColor: '#ecfeff',
    glowEffect: '0 0 20px rgba(103, 232, 249, 0.4)'
  },
  {
    id: 'nature-aurora',
    name: 'Northern Lights',
    category: 'nature',
    bgUrl: 'https://images.unsplash.com/photo-1483086431886-3590a88317fe?w=1200&q=80',
    fontFamily: 'Outfit, sans-serif',
    windowBg: 'rgba(10, 25, 35, 0.75)',
    borderColor: 'rgba(167, 243, 208, 0.5)',
    textColor: '#f8fafc',
    glowEffect: '0 0 30px rgba(52, 211, 153, 0.5)'
  },
  {
    id: 'nature-canyon',
    name: 'Desert Starlight',
    category: 'nature',
    bgUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80',
    fontFamily: 'Playfair Display, serif',
    windowBg: 'rgba(25, 15, 10, 0.78)',
    borderColor: 'rgba(253, 186, 116, 0.4)',
    textColor: '#fff7ed',
    glowEffect: '0 0 20px rgba(253, 186, 116, 0.3)'
  },
  {
    id: 'nature-mountain',
    name: 'Alpine Sunrise',
    category: 'nature',
    bgUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80',
    fontFamily: 'JetBrains Mono, monospace',
    windowBg: 'rgba(15, 18, 25, 0.7)',
    borderColor: 'rgba(226, 232, 240, 0.4)',
    textColor: '#f1f5f9',
    glowEffect: '0 0 25px rgba(255, 255, 255, 0.4)'
  }
];

export const PROGRAMMING_LANGUAGES = [
  { id: 'javascript', name: 'JavaScript', sample: `// Convert Code to Viral Images
function initCodeSlayer(developer) {
  const customConfig = {
    theme: "cyberpunk",
    glowIntensity: "maximum",
    exportQuality: "1200x627 HD"
  };
  
  console.log(\`Ready to slay, \${developer}!\`);
  return generateViralGraphic(customConfig);
}` },
  { id: 'typescript', name: 'TypeScript', sample: `interface SlayPayload {
  author: string;
  linesOfCode: number;
  isViralReady: boolean;
}

export const renderPreview = (data: SlayPayload): string => {
  if (data.isViralReady) {
    return \`✨ Visual Generated successfully by \${data.author}\`;
  }
  throw new Error("Missing high quality assets!");
};` },
  { id: 'python', name: 'Python', sample: `def create_cyber_visual(user_code: str, theme="anime"):
    """
    Transforms generic syntax into gorgeous canvas backdrops.
    """
    settings = {
        "padding": 48,
        "border_radius": 16,
        "glassmorphism": True
    }
    
    # Render with glowing aesthetics
    export_engine.capture(user_code, **settings)
    return "SaaS Preview updated instantly"` },
  { id: 'css', name: 'CSS', sample: `.preview-card {
  background: rgba(10, 15, 30, 0.65);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(0, 240, 255, 0.4);
  border-radius: 16px;
  box-shadow: 0 0 30px rgba(0, 240, 255, 0.2);
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}` },
  { id: 'rust', name: 'Rust', sample: `fn main() {
    let app_name = "CODE-SLAYER";
    let creator = "Avinash Ravat";
    
    println!(
        "⚡ Slaying code visual generation for {} created by {}", 
        app_name, 
        creator
    );
}` },
  { id: 'go', name: 'Go', sample: `package main

import "fmt"

func main() {
    config := map[string]string{
        "Engine":  "html2canvas",
        "Tagline": "Turn your code into viral visuals",
        "Author":  "Avinash Ravat",
    }
    
    fmt.Printf("Visual config engine fully ready: %v\\n", config)
}` }
];

export interface CustomizationSettings {
  themeId: string;
  language: string;
  fontSize: number; // 12 to 24
  padding: number; // 16 to 80
  borderRadius: number; // 0 to 32
  blurIntensity: number; // 0 to 30
  glowEnabled: boolean;
  lineNumbers: boolean;
  windowControls: boolean; // colored dots toggle
  customBgUrl?: string; // Optional user uploaded background
}

export const DEFAULT_SETTINGS: CustomizationSettings = {
  themeId: 'cyber-neon',
  language: 'javascript',
  fontSize: 15,
  padding: 48,
  borderRadius: 16,
  blurIntensity: 12,
  glowEnabled: true,
  lineNumbers: true,
  windowControls: true
};

export interface SavedDesign {
  id: string;
  title: string;
  code: string;
  settings: CustomizationSettings;
  createdAt: string;
  previewThumbnail?: string;
}
