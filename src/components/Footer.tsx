export default function Footer() {
  return (
    <footer className="bg-background py-10 relative z-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        
        {/* Thin Gold Line */}
        <div className="w-full h-[1px] bg-border mb-10" />

        <div className="font-sans text-gold tracking-[0.3em] text-sm font-semibold mb-4 text-center">
          NERASALA MOHAN
        </div>
        
        <p className="font-mono text-muted text-xs tracking-wider text-center">
          Built with React + TypeScript + AI — {new Date().getFullYear()}
        </p>

      </div>
    </footer>
  );
}
