import { useMemo } from 'react'
import { Link } from 'react-router-dom'

export default function Cart({ cart, onChangeCartQuantity, onRemoveFromCart }) {
  const cartTotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.cartQty, 0),
    [cart]
  )

  return (
    <section className="cart-page">
      <div className="page-header">
        <div>
          <h1>Your Cart</h1>
          <p className="page-subtitle">
            {cart.length === 0 ? 'No items yet.' : `${cart.length} product${cart.length > 1 ? 's' : ''} in cart`}
          </p>
        </div>
        <Link to="/" className="btn btn-secondary">
          ← Continue Shopping
        </Link>
      </div>

      {cart.length === 0 ? (
        <div className="empty-state">
          Your cart is empty. Head back to the catalog and add something you like.
        </div>
      ) : (
        <>
          <div className="cart-list">
            {cart.map((item) => (
              <div className="cart-row" key={item.id}>
                <img src={item.image} alt={item.name} className="cart-row-image" />
                <div className="cart-row-info">
                  <Link to={`/product/${item.id}`} className="product-card-title">
                    {item.name}
                  </Link>
                  <span className="product-category-tag">
                    {Array.isArray(item.category)
                    ? item.category.join(", ")
                    : item.category}
                  </span>
                </div>
                <div className="mono cart-row-price">₱{item.price.toLocaleString()}</div>
                <div className="stepper">
                  <button
                    type="button"
                    aria-label="Decrease cart quantity"
                    onClick={() => onChangeCartQuantity(item.id, -1)}
                  >
                    −
                  </button>
                  <span className="mono">{item.cartQty}</span>
                  <button
                    type="button"
                    aria-label="Increase cart quantity"
                    onClick={() => onChangeCartQuantity(item.id, 1)}
                  >
                    +
                  </button>
                </div>
                <div className="mono cart-row-subtotal">
                  ₱{(item.price * item.cartQty).toLocaleString()}
                </div>
                <button
                  type="button"
                  className="btn-remove"
                  onClick={() => onRemoveFromCart(item.id)}
                  aria-label={`Remove ${item.name} from cart`}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="ledger-footer">
            <span>Cart Total</span>
            <span className="mono ledger-total">₱{cartTotal.toLocaleString()}</span>
          </div>
        </>
      )}
    </section>
  )
}
