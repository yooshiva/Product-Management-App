export default function CategoryFilter({ categories, activeCategory, onSelect }) {
  return (
    <div className="category-filter" role="tablist" aria-label="Filter products by category">
      {categories.map((category) => (
        <button
          key={category}
          role="tab"
          aria-selected={activeCategory === category}
          className={`chip ${activeCategory === category ? 'chip-active' : ''}`}
          onClick={() => onSelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
