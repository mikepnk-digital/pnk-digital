interface MockupFrameProps {
  url: string;
  children: React.ReactNode;
}

export function MockupFrame({ url, children }: MockupFrameProps) {
  return (
    <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40">
      {/* Browser chrome */}
      <div className="bg-[#2a2a2e] px-4 py-3 flex items-center gap-3 border-b border-white/5">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 bg-[#1a1a1e] rounded-md px-3 py-1.5 text-xs text-gray-400 font-mono truncate">
          {url}
        </div>
      </div>
      {/* Mockup content — scoped styles */}
      <div className="mockup-scope overflow-x-auto">
        <div style={{ minWidth: 900 }}>
          {children}
        </div>
      </div>
    </div>
  );
}
