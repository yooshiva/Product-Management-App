import { NavLink } from 'react-router-dom'

export default function Navbar({ cartCount }) {
  return (
    <header className="navbar">
      <NavLink to="/" className="brand">
        <span className="brand-mark">SR</span>
        <span className="brand-name">Stockroom</span>
      </NavLink>
      <nav className="nav-links">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
          Products
        </NavLink>
        <NavLink to="/add-product" className={({ isActive }) => (isActive ? 'active' : '')}>
          Add Product
        </NavLink>
        <NavLink to="/cart" className={({ isActive }) => (isActive ? 'active' : '')}>
          Cart
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </NavLink>
      </nav>
    </header>
  )
}
