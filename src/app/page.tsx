'use client';

import { motion } from 'framer-motion';
import presentationData from '@/data/presentation.json';
import { ChevronDown } from 'lucide-react';

export default function Home() {
  const { presentation } = presentationData;

  return (
    <main className="bg-slate-950 text-slate-50 min-h-screen selection:bg-blue-600">
      
      {/* Title Slide */}
      <section className="h-screen flex flex-col justify-center items-center text-center p-8">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-bold tracking-tight mb-4"
        >
          {presentation.title}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl text-slate-400"
        >
          Scroll to begin
        </motion.p>
        <ChevronDown className="mt-8 animate-bounce text-blue-500" />
      </section>

      {/* Dynamic Sections mapped from JSON */}
      {presentation.sections.map((section, index) => (
        <section key={section.id} className="min-h-screen flex items-center p-12 lg:p-24 border-t border-slate-800">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full max-w-7xl mx-auto"
          >
            {/* Left Column: Narrative */}
            <div>
              <h2 className="text-4xl font-semibold mb-6 text-blue-400">{section.heading}</h2>
              <p className="text-lg text-slate-300 leading-relaxed">{section.narrative}</p>
            </div>

            {/* Right Column: Visuals / Tables / Mockups */}
            <div className="bg-slate-900 rounded-xl p-8 border border-slate-800 shadow-2xl flex items-center justify-center">
               {/* Note: Render specific components here based on section.visual_type */}
               <p className="text-slate-500">[ Insert {section.visual_type} Component Here ]</p>
            </div>
          </motion.div>
        </section>
      ))}
    </main>
  );
}