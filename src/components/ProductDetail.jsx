import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

export default function ProductDetail({ products, onChangeQuantity, onAddToCart }) {
  const { id } = useParams()
  const product = products.find((p) => String(p.id) === id)
  const [justAdded, setJustAdded] = useState(false)

  useEffect(() => {
    if (!justAdded) return
    const timer = setTimeout(() => setJustAdded(false), 1400)
    return () => clearTimeout(timer)
  }, [justAdded])

  if (!product) {
    return (
      <section className="product-detail-page">
        <p>Product not found.</p>
        <Link to="/" className="btn btn-secondary">
          Back to Catalog
        </Link>
      </section>
    )
  }

  const subtotal = product.price * product.quantity
  const isLowStock = product.quantity > 0 && product.quantity < 5
  const isOutOfStock = product.quantity === 0

  return (
    <section className="product-detail-page">
      <Link to="/" className="back-link">
        ← Back to Catalog
      </Link>

      <div className="detail-grid">
        <div className="detail-image-wrap">
          <img src={product.image} alt={product.name} className="detail-image" />
          {isLowStock && <span className="badge badge-low-stock">Low Stock</span>}
          {isOutOfStock && <span className="badge badge-out-of-stock">Out of Stock</span>}
        </div>

        <div className="detail-info">
          <span className="product-category-tag">{product.category}</span>
          <h1>{product.name}</h1>
          <div className="detail-rating" aria-label={`Rated ${product.rating} out of 5`}>
            {'★'.repeat(Math.round(product.rating))}
            {'☆'.repeat(5 - Math.round(product.rating))}
            <span className="mono rating-number">{product.rating.toFixed(1)}</span>
          </div>

          <p className="detail-description">{product.description}</p>

          <dl className="detail-spec">
            <dt>Specification</dt>
            <dd>{product.specification}</dd>
          </dl>

          <div className="detail-price mono">₱{product.price.toLocaleString()}</div>

          <div className="quantity-row">
            <span className="quantity-label">Quantity in stock</span>
            <div className="stepper">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => onChangeQuantity(product.id, -1)}
                disabled={product.quantity === 0}
              >
                −
              </button>
              <span className="mono">{product.quantity}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => onChangeQuantity(product.id, 1)}
              >
                +
              </button>
            </div>
          </div>

          <div className="product-card-subtotal">
            <span>Subtotal</span>
            <span className="mono">₱{subtotal.toLocaleString()}</span>
          </div>

          {isOutOfStock ? (
            <button type="button" className="btn btn-disabled" disabled>
              Out of Stock
            </button>
          ) : justAdded ? (
            <button type="button" className="btn btn-added" disabled>
              ✓ Added to Cart
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                onAddToCart(product)
                setJustAdded(true)
              }}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
