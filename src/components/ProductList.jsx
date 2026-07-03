import { useMemo, useState } from 'react'
import ProductCard from './ProductCard.jsx'
import CategoryFilter from './CategoryFilter.jsx'

export default function ProductList({ products, onChangeQuantity, onAddToCart, inventoryTotal }) {
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = useMemo(
    () => [
      'All',
      ...new Set(products.flatMap((p) => p.category)),
    ],
    [products]
  )

  const visibleProducts = useMemo(
    () =>
      activeCategory === 'All'
        ? products
        : products.filter((p) =>
            p.category.includes(activeCategory)
          ),
    [products, activeCategory]
  )

  return (
    <section className="product-list-page">
      <div className="page-header">
        <div>
          <h1>Product Catalog</h1>
          <p className="page-subtitle">
            {products.length} products · Track stock, update quantities, and add items to cart.
          </p>
        </div>
      </div>

      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        onSelect={setActiveCategory}
      />

      {visibleProducts.length === 0 ? (
        <div className="empty-state">No products in this category yet.</div>
      ) : (
        <div className="product-grid">
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onChangeQuantity={onChangeQuantity}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}

      <div className="ledger-footer">
        <span>Total Inventory Value ({products.length} products)</span>
        <span className="mono ledger-total">
          ₱{inventoryTotal.toLocaleString()}
        </span>
      </div>
    </section>
  )
}