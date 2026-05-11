'use client';

import { motion } from 'framer-motion';
import presentationData from '../data/presentation.json';
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
          className="text-5xl lg:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
        >
          {presentation.title}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl text-slate-400"
        >
          Scroll to view the strategic roadmap
        </motion.p>
        <ChevronDown className="mt-12 animate-bounce text-blue-500 w-8 h-8" />
      </section>

      {/* Dynamic Sections mapped from JSON */}
      {presentation.sections.map((rawSection, index) => {
        // Typecast to bypass strict TS errors for dynamic JSON rendering
        const section = rawSection as any; 

        return (
          <section key={section.id} className="min-h-screen flex items-center p-8 lg:p-24 border-t border-slate-800/50">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full max-w-7xl mx-auto"
            >
              {/* Left Column: Narrative */}
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl lg:text-4xl font-semibold mb-6 text-slate-100">{section.heading}</h2>
                <p className="text-lg text-slate-300 leading-relaxed mb-8">{section.narrative}</p>
                
                {/* Render Quote if it exists */}
                {section.quote && (
                  <blockquote className="border-l-4 border-blue-500 pl-6 py-2 italic text-slate-400 bg-slate-900/50 rounded-r-lg">
                    {section.quote}
                  </blockquote>
                )}
              </div>

              {/* Right Column: Visuals / Tables / Timelines */}
              <div className="bg-slate-900/50 rounded-2xl p-8 border border-slate-800 shadow-2xl flex flex-col justify-center backdrop-blur-sm">
                
                {/* Render Image if it exists */}
                {section.image_file && (
                  <div className="rounded-xl overflow-hidden shadow-2xl border border-slate-700/50">
                    {/* Using standard img tag to avoid Next.js unoptimized static export issues */}
                    <img 
                      src={`/virtuozzo-storage${section.image_file}`} 
                      alt={section.heading} 
                      className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700" 
                    />
                  </div>
                )}

                {/* Render Table Data if it exists */}
                {section.data && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-800/80 text-slate-200">
                        <tr>
                          <th className="p-4 rounded-tl-lg">Category</th>
                          <th className="p-4">TAM</th>
                          <th className="p-4">SAM (15%)</th>
                          <th className="p-4 rounded-tr-lg">ARR Uplift</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/50">
                        {section.data.map((row: any, i: number) => (
                          <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                            <td className="p-4 font-semibold text-blue-400">{row.category}</td>
                            <td className="p-4 text-slate-300">${row.tam_b}B</td>
                            <td className="p-4 text-slate-300">${row.sam_m}M</td>
                            <td className="p-4 text-green-400 font-medium">{row.arr_uplift_m}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Render Timeline if it exists */}
                {section.timeline && (
                  <div className="space-y-8">
                    {section.timeline.map((item: any, i: number) => (
                      <div key={i} className="relative pl-6 border-l-2 border-blue-500/50">
                        <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[7px] top-2 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                        <h4 className="text-xl font-bold text-slate-100">{item.quarter} <span className="text-slate-500 font-normal ml-2">| {item.theme}</span></h4>
                        <div className="mt-3 space-y-2">
                          <p className="text-sm"><span className="text-blue-400 font-semibold uppercase tracking-wider text-xs mr-2">Product:</span> <span className="text-slate-300">{item.product_deliverables.join(' • ')}</span></p>
                         <p className="text-sm"><span className="text-emerald-400 font-semibold uppercase tracking-wider text-xs mr-2">Use Case:</span> <span className="text-slate-300">{item.scenarios.join(' • ')}</span></p>
                         {section.points && (
  <ul className="space-y-4">
    {section.points.map((point: string, i: number) => (
      <li key={i} className="flex items-start text-slate-300 text-lg leading-relaxed">
        <span className="text-blue-500 mr-3 mt-1">⯈</span>
        {point}
      </li>
    ))}
  </ul>
)}
                          <p className="text-sm"><span className="text-purple-400 font-semibold uppercase tracking-wider text-xs mr-2">Eng:</span> <span className="text-slate-300">{item.engineering_enablers.join(' • ')}</span></p>
                        </div>
                        <p className="text-sm text-slate-400 mt-4 bg-slate-950/50 p-3 rounded-lg border border-slate-800">{item.business_impact}</p>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            </motion.div>
          </section>
        );
      })}
    </main>
  );
}