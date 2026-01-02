
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Wand2, Download, Share2, Info, Layout, Layers, Box } from 'lucide-react';
import { geminiService } from '../services/geminiService';

const AIMealLabPage: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [size, setSize] = useState<'1K' | '2K' | '4K'>('1K');

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    try {
      const img = await geminiService.generateMealImage(prompt, size);
      setGeneratedImage(img);
    } catch (err) {
      alert("Please check your internet connection. If everything looks fine, then I’m still Gareeb.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400 text-sm font-bold mb-6"
        >
          <Sparkles size={16} />
          Dishcovery AI Powered
        </motion.div>
        <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
          AI Meal <span className="text-indigo-500">Lab</span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
          Describe any imaginary dish, and let Gemini bring it to life with stunning photorealistic visuals.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Controls */}
        <div className="lg:col-span-5 space-y-8 order-2 lg:order-1">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-indigo-500/5">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wider">
                  Describe Your Vision
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., 'A cyberpunk ramen bowl in a rainy Tokyo alley with neon lights reflecting off the broth'"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 transition-all h-32 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wider">
                  Output Resolution
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['1K', '2K', '4K'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`py-3 rounded-xl text-sm font-bold transition-all border ${
                        size === s 
                        ? 'bg-indigo-500 border-indigo-500 text-white shadow-lg shadow-indigo-500/20' 
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-indigo-300'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={isLoading || !prompt.trim()}
                className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-indigo-600/20 disabled:opacity-50 flex items-center justify-center gap-3 active:scale-[0.98]"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Baking Your Image...
                  </>
                ) : (
                  <>
                    <Wand2 size={24} />
                    Generate Concept
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800/50 p-6 rounded-3xl flex items-start gap-4">
            <Info className="text-indigo-500 flex-shrink-0" size={20} />
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Generation usually takes 5-10 seconds. For best results, mention lighting styles like "dramatic", "warm sunlit", or "cinematic".
            </p>
          </div>
        </div>

        {/* Preview Area */}
        <div className="lg:col-span-7 order-1 lg:order-2">
          <div className="relative aspect-square w-full bg-slate-100 dark:bg-slate-800 rounded-[2rem] border-4 border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center overflow-hidden group shadow-2xl">
            {isLoading ? (
              <div className="text-center space-y-4 px-6">
                <div className="relative">
                   <div className="w-24 h-24 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin mx-auto" />
                   <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-500 animate-pulse" size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Gemini is creative...</h3>
                <p className="text-slate-500">Dreaming up your {size} masterpiece</p>
              </div>
            ) : generatedImage ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-full relative">
                <img src={generatedImage} alt="AI Generated Meal" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                   <button className="bg-white text-slate-900 p-4 rounded-full hover:scale-110 transition-transform">
                      <Download size={24} />
                   </button>
                   <button className="bg-white text-slate-900 p-4 rounded-full hover:scale-110 transition-transform">
                      <Share2 size={24} />
                   </button>
                </div>
              </motion.div>
            ) : (
              <div className="text-center text-slate-400 dark:text-slate-600">
                <Box size={64} className="mx-auto mb-4 opacity-20" />
                <p className="text-lg font-medium">Your creation will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIMealLabPage;
