
export default function InterestFilters({ 
  categories, 
  activeCategory, 
  onSelectCategory, 
  counts, 
  language 
}) {
  return (
    <div className="w-full mb-10 overflow-x-auto hide-scrollbar py-2">
      <div className="flex items-center gap-2 min-w-max">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          const label = language === 'fr' ? cat.labelFr : cat.labelEn;
          const count = counts[cat.id] ?? 0;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`group relative px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-none interactive-hover ${
                isActive 
                  ? 'bg-charcoal text-white shadow-sm' 
                  : 'bg-white/60 hover:bg-white text-charcoal border border-border-light hover:border-violet'
              }`}
            >
              <span>{label}</span>
              <span 
                className={`text-[9px] px-1.5 py-0.5 rounded-full font-mono transition-colors ${
                  isActive 
                    ? 'bg-violet text-charcoal font-bold' 
                    : 'bg-charcoal/5 text-charcoal-muted group-hover:bg-violet/30 group-hover:text-charcoal'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
