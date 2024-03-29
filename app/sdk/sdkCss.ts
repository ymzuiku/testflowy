const css = `
@keyframes testflowy-fade-in-key {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
.testflowy-fade-in { animation: testflowy-fade-in-key 0.3s; }

:root {
--ux-ring-inset: ;
--ux-ring-offset-width: 0px;
--ux-ring-offset-color: #fff;
--ux-ring-color: #33f;
--ux-ring-offset-shadow: 0 0 #0000;
--ux-ring-shadow: 0 0 #0000;
--ux-ring-0: var(--ux-ring-inset) 0 0 0 calc(0px + var(--ux-ring-offset-width)) var(--ux-ring-color);
--ux-ring-1: var(--ux-ring-inset) 0 0 0 calc(1px + var(--ux-ring-offset-width)) var(--ux-ring-color);
--ux-ring-2: var(--ux-ring-inset) 0 0 0 calc(2px + var(--ux-ring-offset-width)) var(--ux-ring-color);
--ux-ring: var(--ux-ring-inset) 0 0 0 calc(3px + var(--ux-ring-offset-width)) var(--ux-ring-color);
--ux-ring-4: var(--ux-ring-inset) 0 0 0 calc(4px + var(--ux-ring-offset-width)) var(--ux-ring-color);
--ux-ring-8: var(--ux-ring-inset) 0 0 0 calc(8px + var(--ux-ring-offset-width)) var(--ux-ring-color);
--ux-radius-none: 0px;
--ux-radius-sm: 0.125em;
--ux-radius: 0.25em;
--ux-radius-md: 0.375em;
--ux-radius-lg: 0.5em;
--ux-radius-xl: 0.75em;
--ux-radius-2xl: 1em;
--ux-radius-3xl: 1.5em;
--ux-radius-full: 9999px;
--ux-screen-xs: 480px;
--ux-screen-sm: 640px;
--ux-screen-md: 768px;
--ux-screen-lg: 1024px;
--ux-screen-xl: 1280px;
--ux-screen-2xl: 1536px;
--ux-screen-3xl: 1920px;
--ux-text-xs: 0.75em;
--ux-text-sm: 0.875em;
--ux-text-base: 1em;
--ux-text-lg: 1.125em;
--ux-text-xl: 1.25em;
--ux-text-2xl: 1.5em;
--ux-text-3xl: 1.875em;
--ux-text-4xl: 2.25em;
--ux-text-5xl: 3em;
--ux-text-6xl: 3.75em;
--ux-text-7xl: 4.5em;
--ux-text-8xl: 6em;
--ux-text-9xl: 8em;
--ux-sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
--ux-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
--ux-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
--ux-shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--ux-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
--ux-shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--ux-shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--ux-shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
--ux-shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
--ux-shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
--ux-shadow-none: 0 0 #0000;
}

:root {
--ux-primary-50: #eef2ff;
--ux-primary-100: #e0e7ff;
--ux-primary-200: #c7d2fe;
--ux-primary-300: #a5b4fc;
--ux-primary-400: #818cf8;
--ux-primary-500: #6366f1;
--ux-primary-600: #4f46e5;
--ux-primary-700: #4338ca;
--ux-primary-800: #3730a3;
--ux-primary-900: #312e81;
--ux-inherit: inherit;
--ux-current: currentColor;
--ux-transparent: transparent;
--ux-black: #000;
--ux-white: #fff;
--ux-slate-50: #f8fafc;
--ux-slate-100: #f1f5f9;
--ux-slate-200: #e2e8f0;
--ux-slate-300: #cbd5e1;
--ux-slate-400: #94a3b8;
--ux-slate-500: #64748b;
--ux-slate-600: #475569;
--ux-slate-700: #334155;
--ux-slate-800: #1e293b;
--ux-slate-900: #0f172a;
--ux-gray-50: #fff;
--ux-gray-100: #f3f4f6;
--ux-gray-200: #e5e7eb;
--ux-gray-300: #d1d5db;
--ux-gray-400: #9ca3af;
--ux-gray-500: #6b7280;
--ux-gray-600: #4b5563;
--ux-gray-700: #374151;
--ux-gray-800: #1f2937;
--ux-gray-900: #000;
--ux-zinc-50: #fafafa;
--ux-zinc-100: #f4f4f5;
--ux-zinc-200: #e4e4e7;
--ux-zinc-300: #d4d4d8;
--ux-zinc-400: #a1a1aa;
--ux-zinc-500: #71717a;
--ux-zinc-600: #52525b;
--ux-zinc-700: #3f3f46;
--ux-zinc-800: #27272a;
--ux-zinc-900: #18181b;
--ux-neutral-50: #fafafa;
--ux-neutral-100: #f5f5f5;
--ux-neutral-200: #e5e5e5;
--ux-neutral-300: #d4d4d4;
--ux-neutral-400: #a3a3a3;
--ux-neutral-500: #737373;
--ux-neutral-600: #525252;
--ux-neutral-700: #404040;
--ux-neutral-800: #262626;
--ux-neutral-900: #171717;
--ux-stone-50: #fafaf9;
--ux-stone-100: #f5f5f4;
--ux-stone-200: #e7e5e4;
--ux-stone-300: #d6d3d1;
--ux-stone-400: #a8a29e;
--ux-stone-500: #78716c;
--ux-stone-600: #57534e;
--ux-stone-700: #44403c;
--ux-stone-800: #292524;
--ux-stone-900: #1c1917;
--ux-red-50: #fef2f2;
--ux-red-100: #fee2e2;
--ux-red-200: #fecaca;
--ux-red-300: #fca5a5;
--ux-red-400: #f87171;
--ux-red-500: #ef4444;
--ux-red-600: #dc2626;
--ux-red-700: #b91c1c;
--ux-red-800: #991b1b;
--ux-red-900: #7f1d1d;
--ux-orange-50: #fff7ed;
--ux-orange-100: #ffedd5;
--ux-orange-200: #fed7aa;
--ux-orange-300: #fdba74;
--ux-orange-400: #fb923c;
--ux-orange-500: #f97316;
--ux-orange-600: #ea580c;
--ux-orange-700: #c2410c;
--ux-orange-800: #9a3412;
--ux-orange-900: #7c2d12;
--ux-amber-50: #fffbeb;
--ux-amber-100: #fef3c7;
--ux-amber-200: #fde68a;
--ux-amber-300: #fcd34d;
--ux-amber-400: #fbbf24;
--ux-amber-500: #f59e0b;
--ux-amber-600: #d97706;
--ux-amber-700: #b45309;
--ux-amber-800: #92400e;
--ux-amber-900: #78350f;
--ux-yellow-50: #fefce8;
--ux-yellow-100: #fef9c3;
--ux-yellow-200: #fef08a;
--ux-yellow-300: #fde047;
--ux-yellow-400: #facc15;
--ux-yellow-500: #eab308;
--ux-yellow-600: #ca8a04;
--ux-yellow-700: #a16207;
--ux-yellow-800: #854d0e;
--ux-yellow-900: #713f12;
--ux-lime-50: #f7fee7;
--ux-lime-100: #ecfccb;
--ux-lime-200: #d9f99d;
--ux-lime-300: #bef264;
--ux-lime-400: #a3e635;
--ux-lime-500: #84cc16;
--ux-lime-600: #65a30d;
--ux-lime-700: #4d7c0f;
--ux-lime-800: #3f6212;
--ux-lime-900: #365314;
--ux-green-50: #f0fdf4;
--ux-green-100: #dcfce7;
--ux-green-200: #bbf7d0;
--ux-green-300: #86efac;
--ux-green-400: #4ade80;
--ux-green-500: #22c55e;
--ux-green-600: #16a34a;
--ux-green-700: #15803d;
--ux-green-800: #166534;
--ux-green-900: #14532d;
--ux-emerald-50: #ecfdf5;
--ux-emerald-100: #d1fae5;
--ux-emerald-200: #a7f3d0;
--ux-emerald-300: #6ee7b7;
--ux-emerald-400: #34d399;
--ux-emerald-500: #10b981;
--ux-emerald-600: #059669;
--ux-emerald-700: #047857;
--ux-emerald-800: #065f46;
--ux-emerald-900: #064e3b;
--ux-teal-50: #f0fdfa;
--ux-teal-100: #ccfbf1;
--ux-teal-200: #99f6e4;
--ux-teal-300: #5eead4;
--ux-teal-400: #2dd4bf;
--ux-teal-500: #14b8a6;
--ux-teal-600: #0d9488;
--ux-teal-700: #0f766e;
--ux-teal-800: #115e59;
--ux-teal-900: #134e4a;
--ux-cyan-50: #ecfeff;
--ux-cyan-100: #cffafe;
--ux-cyan-200: #a5f3fc;
--ux-cyan-300: #67e8f9;
--ux-cyan-400: #22d3ee;
--ux-cyan-500: #06b6d4;
--ux-cyan-600: #0891b2;
--ux-cyan-700: #0e7490;
--ux-cyan-800: #155e75;
--ux-cyan-900: #164e63;
--ux-sky-50: #f0f9ff;
--ux-sky-100: #e0f2fe;
--ux-sky-200: #bae6fd;
--ux-sky-300: #7dd3fc;
--ux-sky-400: #38bdf8;
--ux-sky-500: #0ea5e9;
--ux-sky-600: #0284c7;
--ux-sky-700: #0369a1;
--ux-sky-800: #075985;
--ux-sky-900: #0c4a6e;
--ux-blue-50: #eff6ff;
--ux-blue-100: #dbeafe;
--ux-blue-200: #bfdbfe;
--ux-blue-300: #93c5fd;
--ux-blue-400: #60a5fa;
--ux-blue-500: #3b82f6;
--ux-blue-600: #2563eb;
--ux-blue-700: #1d4ed8;
--ux-blue-800: #1e40af;
--ux-blue-900: #1e3a8a;
--ux-indigo-50: #eef2ff;
--ux-indigo-100: #e0e7ff;
--ux-indigo-200: #c7d2fe;
--ux-indigo-300: #a5b4fc;
--ux-indigo-400: #818cf8;
--ux-indigo-500: #6366f1;
--ux-indigo-600: #4f46e5;
--ux-indigo-700: #4338ca;
--ux-indigo-800: #3730a3;
--ux-indigo-900: #312e81;
--ux-violet-50: #f5f3ff;
--ux-violet-100: #ede9fe;
--ux-violet-200: #ddd6fe;
--ux-violet-300: #c4b5fd;
--ux-violet-400: #a78bfa;
--ux-violet-500: #8b5cf6;
--ux-violet-600: #7c3aed;
--ux-violet-700: #6d28d9;
--ux-violet-800: #5b21b6;
--ux-violet-900: #4c1d95;
--ux-purple-50: #faf5ff;
--ux-purple-100: #f3e8ff;
--ux-purple-200: #e9d5ff;
--ux-purple-300: #d8b4fe;
--ux-purple-400: #c084fc;
--ux-purple-500: #a855f7;
--ux-purple-600: #9333ea;
--ux-purple-700: #7e22ce;
--ux-purple-800: #6b21a8;
--ux-purple-900: #581c87;
--ux-fuchsia-50: #fdf4ff;
--ux-fuchsia-100: #fae8ff;
--ux-fuchsia-200: #f5d0fe;
--ux-fuchsia-300: #f0abfc;
--ux-fuchsia-400: #e879f9;
--ux-fuchsia-500: #d946ef;
--ux-fuchsia-600: #c026d3;
--ux-fuchsia-700: #a21caf;
--ux-fuchsia-800: #86198f;
--ux-fuchsia-900: #701a75;
--ux-pink-50: #fdf2f8;
--ux-pink-100: #fce7f3;
--ux-pink-200: #fbcfe8;
--ux-pink-300: #f9a8d4;
--ux-pink-400: #f472b6;
--ux-pink-500: #ec4899;
--ux-pink-600: #db2777;
--ux-pink-700: #be185d;
--ux-pink-800: #9d174d;
--ux-pink-900: #831843;
--ux-rose-50: #fff1f2;
--ux-rose-100: #ffe4e6;
--ux-rose-200: #fecdd3;
--ux-rose-300: #fda4af;
--ux-rose-400: #fb7185;
--ux-rose-500: #f43f5e;
--ux-rose-600: #e11d48;
--ux-rose-700: #be123c;
--ux-rose-800: #9f1239;
--ux-rose-900: #881337;
}

:root .dark {
--ux-primary-50: #312e81;
--ux-primary-100: #3730a3;
--ux-primary-200: #4338ca;
--ux-primary-300: #4f46e5;
--ux-primary-400: #6366f1;
--ux-primary-500: #818cf8;
--ux-primary-600: #a5b4fc;
--ux-primary-700: #c7d2fe;
--ux-primary-800: #e0e7ff;
--ux-primary-900: #eef2ff;
--ux-white: #fff;
--ux-black: #000;
--ux-inherit: inherit;
--ux-current: currentColor;
--ux-transparent: transparent;
--ux-slate-50: #0f172a;
--ux-slate-100: #1e293b;
--ux-slate-200: #334155;
--ux-slate-300: #475569;
--ux-slate-400: #64748b;
--ux-slate-500: #94a3b8;
--ux-slate-600: #cbd5e1;
--ux-slate-700: #e2e8f0;
--ux-slate-800: #f1f5f9;
--ux-slate-900: #f8fafc;
--ux-gray-50: #000;
--ux-gray-100: #1f2937;
--ux-gray-200: #374151;
--ux-gray-300: #4b5563;
--ux-gray-400: #6b7280;
--ux-gray-500: #9ca3af;
--ux-gray-600: #d1d5db;
--ux-gray-700: #e5e7eb;
--ux-gray-800: #f3f4f6;
--ux-gray-900: #fff;
--ux-zinc-50: #18181b;
--ux-zinc-100: #27272a;
--ux-zinc-200: #3f3f46;
--ux-zinc-300: #52525b;
--ux-zinc-400: #71717a;
--ux-zinc-500: #a1a1aa;
--ux-zinc-600: #d4d4d8;
--ux-zinc-700: #e4e4e7;
--ux-zinc-800: #f4f4f5;
--ux-zinc-900: #fafafa;
--ux-neutral-50: #171717;
--ux-neutral-100: #262626;
--ux-neutral-200: #404040;
--ux-neutral-300: #525252;
--ux-neutral-400: #737373;
--ux-neutral-500: #a3a3a3;
--ux-neutral-600: #d4d4d4;
--ux-neutral-700: #e5e5e5;
--ux-neutral-800: #f5f5f5;
--ux-neutral-900: #fafafa;
--ux-stone-50: #1c1917;
--ux-stone-100: #292524;
--ux-stone-200: #44403c;
--ux-stone-300: #57534e;
--ux-stone-400: #78716c;
--ux-stone-500: #a8a29e;
--ux-stone-600: #d6d3d1;
--ux-stone-700: #e7e5e4;
--ux-stone-800: #f5f5f4;
--ux-stone-900: #fafaf9;
--ux-red-50: #7f1d1d;
--ux-red-100: #991b1b;
--ux-red-200: #b91c1c;
--ux-red-300: #dc2626;
--ux-red-400: #ef4444;
--ux-red-500: #f87171;
--ux-red-600: #fca5a5;
--ux-red-700: #fecaca;
--ux-red-800: #fee2e2;
--ux-red-900: #fef2f2;
--ux-orange-50: #7c2d12;
--ux-orange-100: #9a3412;
--ux-orange-200: #c2410c;
--ux-orange-300: #ea580c;
--ux-orange-400: #f97316;
--ux-orange-500: #fb923c;
--ux-orange-600: #fdba74;
--ux-orange-700: #fed7aa;
--ux-orange-800: #ffedd5;
--ux-orange-900: #fff7ed;
--ux-amber-50: #78350f;
--ux-amber-100: #92400e;
--ux-amber-200: #b45309;
--ux-amber-300: #d97706;
--ux-amber-400: #f59e0b;
--ux-amber-500: #fbbf24;
--ux-amber-600: #fcd34d;
--ux-amber-700: #fde68a;
--ux-amber-800: #fef3c7;
--ux-amber-900: #fffbeb;
--ux-yellow-50: #713f12;
--ux-yellow-100: #854d0e;
--ux-yellow-200: #a16207;
--ux-yellow-300: #ca8a04;
--ux-yellow-400: #eab308;
--ux-yellow-500: #facc15;
--ux-yellow-600: #fde047;
--ux-yellow-700: #fef08a;
--ux-yellow-800: #fef9c3;
--ux-yellow-900: #fefce8;
--ux-lime-50: #365314;
--ux-lime-100: #3f6212;
--ux-lime-200: #4d7c0f;
--ux-lime-300: #65a30d;
--ux-lime-400: #84cc16;
--ux-lime-500: #a3e635;
--ux-lime-600: #bef264;
--ux-lime-700: #d9f99d;
--ux-lime-800: #ecfccb;
--ux-lime-900: #f7fee7;
--ux-green-50: #14532d;
--ux-green-100: #166534;
--ux-green-200: #15803d;
--ux-green-300: #16a34a;
--ux-green-400: #22c55e;
--ux-green-500: #4ade80;
--ux-green-600: #86efac;
--ux-green-700: #bbf7d0;
--ux-green-800: #dcfce7;
--ux-green-900: #f0fdf4;
--ux-emerald-50: #064e3b;
--ux-emerald-100: #065f46;
--ux-emerald-200: #047857;
--ux-emerald-300: #059669;
--ux-emerald-400: #10b981;
--ux-emerald-500: #34d399;
--ux-emerald-600: #6ee7b7;
--ux-emerald-700: #a7f3d0;
--ux-emerald-800: #d1fae5;
--ux-emerald-900: #ecfdf5;
--ux-teal-50: #134e4a;
--ux-teal-100: #115e59;
--ux-teal-200: #0f766e;
--ux-teal-300: #0d9488;
--ux-teal-400: #14b8a6;
--ux-teal-500: #2dd4bf;
--ux-teal-600: #5eead4;
--ux-teal-700: #99f6e4;
--ux-teal-800: #ccfbf1;
--ux-teal-900: #f0fdfa;
--ux-cyan-50: #164e63;
--ux-cyan-100: #155e75;
--ux-cyan-200: #0e7490;
--ux-cyan-300: #0891b2;
--ux-cyan-400: #06b6d4;
--ux-cyan-500: #22d3ee;
--ux-cyan-600: #67e8f9;
--ux-cyan-700: #a5f3fc;
--ux-cyan-800: #cffafe;
--ux-cyan-900: #ecfeff;
--ux-sky-50: #0c4a6e;
--ux-sky-100: #075985;
--ux-sky-200: #0369a1;
--ux-sky-300: #0284c7;
--ux-sky-400: #0ea5e9;
--ux-sky-500: #38bdf8;
--ux-sky-600: #7dd3fc;
--ux-sky-700: #bae6fd;
--ux-sky-800: #e0f2fe;
--ux-sky-900: #f0f9ff;
--ux-blue-50: #1e3a8a;
--ux-blue-100: #1e40af;
--ux-blue-200: #1d4ed8;
--ux-blue-300: #2563eb;
--ux-blue-400: #3b82f6;
--ux-blue-500: #60a5fa;
--ux-blue-600: #93c5fd;
--ux-blue-700: #bfdbfe;
--ux-blue-800: #dbeafe;
--ux-blue-900: #eff6ff;
--ux-indigo-50: #312e81;
--ux-indigo-100: #3730a3;
--ux-indigo-200: #4338ca;
--ux-indigo-300: #4f46e5;
--ux-indigo-400: #6366f1;
--ux-indigo-500: #818cf8;
--ux-indigo-600: #a5b4fc;
--ux-indigo-700: #c7d2fe;
--ux-indigo-800: #e0e7ff;
--ux-indigo-900: #eef2ff;
--ux-violet-50: #4c1d95;
--ux-violet-100: #5b21b6;
--ux-violet-200: #6d28d9;
--ux-violet-300: #7c3aed;
--ux-violet-400: #8b5cf6;
--ux-violet-500: #a78bfa;
--ux-violet-600: #c4b5fd;
--ux-violet-700: #ddd6fe;
--ux-violet-800: #ede9fe;
--ux-violet-900: #f5f3ff;
--ux-purple-50: #581c87;
--ux-purple-100: #6b21a8;
--ux-purple-200: #7e22ce;
--ux-purple-300: #9333ea;
--ux-purple-400: #a855f7;
--ux-purple-500: #c084fc;
--ux-purple-600: #d8b4fe;
--ux-purple-700: #e9d5ff;
--ux-purple-800: #f3e8ff;
--ux-purple-900: #faf5ff;
--ux-fuchsia-50: #701a75;
--ux-fuchsia-100: #86198f;
--ux-fuchsia-200: #a21caf;
--ux-fuchsia-300: #c026d3;
--ux-fuchsia-400: #d946ef;
--ux-fuchsia-500: #e879f9;
--ux-fuchsia-600: #f0abfc;
--ux-fuchsia-700: #f5d0fe;
--ux-fuchsia-800: #fae8ff;
--ux-fuchsia-900: #fdf4ff;
--ux-pink-50: #831843;
--ux-pink-100: #9d174d;
--ux-pink-200: #be185d;
--ux-pink-300: #db2777;
--ux-pink-400: #ec4899;
--ux-pink-500: #f472b6;
--ux-pink-600: #f9a8d4;
--ux-pink-700: #fbcfe8;
--ux-pink-800: #fce7f3;
--ux-pink-900: #fdf2f8;
--ux-rose-50: #881337;
--ux-rose-100: #9f1239;
--ux-rose-200: #be123c;
--ux-rose-300: #e11d48;
--ux-rose-400: #f43f5e;
--ux-rose-500: #fb7185;
--ux-rose-600: #fda4af;
--ux-rose-700: #fecdd3;
--ux-rose-800: #ffe4e6;
--ux-rose-900: #fff1f2;
}


/* self scroll */
.testflowy-sdk-scroll {
  --scrollbar-width: 7px;
  --scrollbar-bg: rgba(0, 0, 0, 0.015);
  --scrollbar-bg-shadow: rgba(0, 0, 0, 0.1);
  --scrollbar-bar: rgba(0, 0, 0, 0.12);
  --scrollbar-bar-hover: rgba(0, 0, 0, 0.32);
  --scrollbar-bar-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.1);
}

.testflowy-sdk-scroll {
  --scrollbar-bg: rgba(30, 30, 30, 0.12);
  --scrollbar-bg-shadow: rgba(30, 30, 30, 0.1);
  --scrollbar-bar: rgba(255, 255, 255, 0.1);
  --scrollbar-bar-hover: rgba(255, 255, 255, 0.32);
  --scrollbar-bar-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.1);
}

@media (pointer: fine) {
  .testflowy-sdk-scroll::-webkit-scrollbar {
    width: var(--scrollbar-width);
    height: var(--scrollbar-width);
  }

  .testflowy-sdk-scroll::-webkit-scrollbar-track-piece,
  .testflowy-sdk-scroll::-webkit-scrollbar-corner,
  .testflowy-sdk-scroll::-webkit-scrollbar-track,
  .testflowy-sdk-scroll::-webkit-scrollbar {
    background-color: var(--scrollbar-bg);
  }

  .testflowy-sdk-scroll::-webkit-scrollbar-thumb {
    border-radius: var(--scrollbar-width);
    width: var(--scrollbar-width);
    background-color: var(--scrollbar-bar);
  }

  .testflowy-sdk-scroll::-webkit-scrollbar-thumb:hover {
    background-color: var(--scrollbar-bar-hover);
  }
}
`;

const sty = document.createElement("style");
sty.innerHTML = css;
const box = document.head || document.body;
box.appendChild(sty);
export { sty };
