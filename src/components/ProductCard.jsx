import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ProductCard({
  product,
  onChangeQuantity,
  onAddToCart,
}) {
  const [justAdded, setJustAdded] = useState(false);

  const subtotal = product.price * product.quantity;
  const isLowStock = product.quantity > 0 && product.quantity < 5;
  const isOutOfStock = product.quantity === 0;

  useEffect(() => {
    if (!justAdded) return;

    const timer = setTimeout(() => setJustAdded(false), 1400);
    return () => clearTimeout(timer);
  }, [justAdded]);

  function handleAddToCart() {
    onAddToCart(product);
    setJustAdded(true);
  }

  return (
    <article className={`product-card ${isOutOfStock ? "is-out-of-stock" : ""}`}>
      <Link
        to={`/product/${product.id}`}
        className="product-card-image-link"
      >
        <img
          src={product.image}
          alt={product.name}
          className="product-card-image"
          loading="lazy"
        />

        {isLowStock && (
          <span className="badge badge-low-stock">Low Stock</span>
        )}

        {isOutOfStock && (
          <span className="badge badge-out-of-stock">Out of Stock</span>
        )}
      </Link>

      <div className="product-card-body">

       
        <div className="product-category-tags">
          {product.category.map((genre) => (
            <span key={genre} className="product-category-tag">
              {genre}
            </span>
          ))}
        </div>

     
        <Link
          to={`/product/${product.id}`}
          className="product-card-title"
        >
          {product.name}
        </Link>

      
        <div className="product-rating">
          ⭐ {product.rating}
        </div>

      
        <div className="product-card-price mono">
          ₱{product.price.toLocaleString()}
        </div>

        <div className="quantity-row">
          <span className="quantity-label">Qty</span>

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

          <span className="mono">
            ₱{subtotal.toLocaleString()}
          </span>
        </div>

       
        {isOutOfStock ? (
          <button className="btn btn-disabled" disabled>
            Out of Stock
          </button>
        ) : justAdded ? (
          <button className="btn btn-added" disabled>
            ✓ Added to Cart
          </button>
        ) : (
          <button
            className="btn btn-primary"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        )}
      </div>
    </article>
  );
}