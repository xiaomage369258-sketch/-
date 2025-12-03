import React, { useState, useEffect } from 'react';
import { generateCryptoImage } from '../services/geminiService';
import { GenerationStatus, PromptOption } from '../types';
import { Wand2, Download, AlertCircle, RefreshCw, Loader2, Coins, TrendingUp, User, Bitcoin } from 'lucide-react';

const PRESET_PROMPTS: PromptOption[] = [
  {
    id: 'tycoon-office',
    label: 'The Whale',
    value: 'A cinematic, hyper-realistic portrait of a mysterious cryptocurrency whale sitting in a penthouse office at night. Dressed in a modern, expensive dark hoodie. Surroundings are illuminated by multiple holographic screens displaying green trading candles and blockchain nodes. Cyberpunk city skyline in background. Blue and gold lighting accents, 8k resolution.'
  },
  {
    id: 'defi-queen',
    label: 'DeFi Visionary',
    value: 'A futuristic portrait of a female DeFi visionary leader, wearing high-tech smart glasses and a sharp white suit. Standing in a server room with glowing blue cables. Floating digital Ethereum symbols around her. Clean, minimalist, high-tech aesthetic, soft lighting, highly detailed.'
  },
  {
    id: 'crypto-punk',
    label: 'Cyber Trader',
    value: 'A cyberpunk style crypto day trader with cybernetic enhancements, sitting in a messy room filled with monitors and energy drinks. Neon green and magenta lighting. Intense focus, digital glitches in the air, retro-futuristic vibe, illustrative style.'
  },
  {
    id: 'bitcoin-maxi',
    label: 'Bitcoin Maxi',
    value: 'An authoritative figure in a golden suit, standing on a pile of digital gold coins. Background is a digital vault. Powerful, warm golden lighting, cinematic composition, feeling of immense wealth and stability.'
  }
];

const Generator: React.FC = () => {
  const [prompt, setPrompt] = useState<string>(PRESET_PROMPTS[0].value);
  const [status, setStatus] = useState<GenerationStatus>(GenerationStatus.IDLE);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingText, setLoadingText] = useState('Initializing...');

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (status === GenerationStatus.GENERATING) {
      const texts = [
        'Mining block...',
        'Confirming transaction...',
        'Synthesizing pixels...',
        'Calculating hash...',
        'Deploying smart contract...',
      ];
      let i = 0;
      interval = setInterval(() => {
        setLoadingText(texts[i % texts.length]);
        i++;
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [status]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setStatus(GenerationStatus.GENERATING);
    setError(null);
    setGeneratedImage(null);

    try {
      const result = await generateCryptoImage(prompt);
      
      if (result.error) {
        setStatus(GenerationStatus.ERROR);
        setError(result.error);
      } else if (result.imageUrl) {
        setGeneratedImage(result.imageUrl);
        setStatus(GenerationStatus.SUCCESS);
      }
    } catch (e) {
      setStatus(GenerationStatus.ERROR);
      setError("An unexpected error occurred.");
    }
  };

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `crypto-tycoon-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8 flex flex-col lg:flex-row gap-8">
      
      {/* Control Panel */}
      <div className="w-full lg:w-1/3 flex flex-col gap-6">
        <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl backdrop-blur-sm shadow-xl">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
            <Coins className="text-yellow-500" />
            <span>Configuration</span>
          </h2>

          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">Preset Archetypes</label>
            <div className="grid grid-cols-2 gap-2">
              {PRESET_PROMPTS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setPrompt(opt.value)}
                  className={`text-xs p-2 rounded-lg border transition-all duration-200 text-left ${
                    prompt === opt.value
                      ? 'bg-cyan-900/40 border-cyan-500 text-cyan-300'
                      : 'bg-slate-900/40 border-slate-700 text-slate-400 hover:border-slate-500'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">Prompt Details</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full h-40 bg-slate-950 border border-slate-700 rounded-xl p-3 text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none resize-none text-sm leading-relaxed"
              placeholder="Describe your crypto tycoon..."
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={status === GenerationStatus.GENERATING || !prompt.trim()}
            className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:from-slate-700 disabled:to-slate-800 text-white font-bold rounded-xl shadow-lg shadow-cyan-900/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:cursor-not-allowed border border-white/10"
          >
            {status === GenerationStatus.GENERATING ? (
              <>
                <Loader2 className="animate-spin" />
                <span>Generating Asset...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                <span>Mint New Image</span>
              </>
            )}
          </button>
        </div>

        <div className="bg-slate-900/30 border border-slate-800 p-4 rounded-xl text-xs text-slate-500 flex gap-3">
          <TrendingUp className="w-5 h-5 flex-shrink-0 text-green-500" />
          <p>
            Pro Tip: Include keywords like "cinematic lighting", "futuristic", and specific colors (e.g., "neon green", "gold") for the best crypto aesthetic.
          </p>
        </div>
      </div>

      {/* Preview Panel */}
      <div className="w-full lg:w-2/3">
        <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square xl:aspect-[16/9] bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden flex items-center justify-center group shadow-2xl shadow-black/50">
          
          {/* Background Grid Effect */}
          <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none"></div>

          {status === GenerationStatus.IDLE && (
            <div className="text-center p-8 max-w-md">
              <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-800 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                <User className="w-10 h-10 text-slate-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-300 mb-2">Ready to Mint</h3>
              <p className="text-slate-500">Configure your parameters on the left and mint your unique crypto tycoon avatar.</p>
            </div>
          )}

          {status === GenerationStatus.GENERATING && (
            <div className="flex flex-col items-center justify-center z-10">
              <div className="relative w-24 h-24 mb-6">
                <div className="absolute inset-0 border-4 border-slate-800 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-4 bg-slate-900 rounded-full flex items-center justify-center animate-pulse">
                   <Bitcoin className="w-8 h-8 text-cyan-500" />
                </div>
              </div>
              <p className="text-cyan-400 font-mono text-sm tracking-wider animate-pulse">{loadingText}</p>
            </div>
          )}

          {status === GenerationStatus.ERROR && (
            <div className="text-center p-8 max-w-md z-10">
              <div className="w-16 h-16 bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-900/50">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold text-red-400 mb-2">Transaction Failed</h3>
              <p className="text-red-300/70 text-sm mb-6">{error}</p>
              <button 
                onClick={() => setStatus(GenerationStatus.IDLE)}
                className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm transition-colors border border-slate-700 flex items-center gap-2 mx-auto"
              >
                <RefreshCw size={14} /> Reset
              </button>
            </div>
          )}

          {generatedImage && status === GenerationStatus.SUCCESS && (
            <div className="relative w-full h-full">
              <img 
                src={generatedImage} 
                alt="Generated Crypto Tycoon" 
                className="w-full h-full object-contain bg-black"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={handleDownload}
                  className="px-6 py-3 bg-white text-slate-950 font-bold rounded-xl shadow-lg hover:bg-cyan-50 transition-colors flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download Asset
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Generator;