import { useState, useMemo } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import ProductList from './components/ProductList.jsx'
import ProductDetail from './components/ProductDetail.jsx'
import AddProductForm from './components/AddProductForm.jsx'
import Cart from './components/Cart.jsx'
import defaultProducts from './data/products.js'

let nextId = defaultProducts.length + 1

export default function App() {
  const [products, setProducts] = useState(defaultProducts)
  const [cart, setCart] = useState([])


  function addProduct(newProduct) {
    setProducts((prev) => [
      ...prev,
      {
        ...newProduct,
        id: nextId++,
        price: Number(newProduct.price),
        quantity: Number(newProduct.quantity),
        rating: Number(newProduct.rating),
      },
    ])
  }

  function changeQuantity(id, delta) {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, quantity: Math.max(0, p.quantity + delta) } : p
      )
    )
  }


  function addToCart(product) {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, cartQty: item.cartQty + 1 } : item
        )
      }
      return [...prev, { ...product, cartQty: 1 }]
    })
  }

  function changeCartQuantity(id, delta) {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, cartQty: item.cartQty + delta } : item
        )
        .filter((item) => item.cartQty > 0)
    )
  }

  function removeFromCart(id) {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }


  const inventoryTotal = useMemo(
    () => products.reduce((sum, p) => sum + p.price * p.quantity, 0),
    [products]
  )

  const cartCount = useMemo(() => cart.reduce((n, item) => n + item.cartQty, 0), [cart])

  return (
    <div className="app-shell">
      <Navbar cartCount={cartCount} />
      <main className="app-main">
        <Routes>
          <Route
            path="/"
            element={
              <ProductList
                products={products}
                onChangeQuantity={changeQuantity}
                onAddToCart={addToCart}
                inventoryTotal={inventoryTotal}
              />
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProductDetail
                products={products}
                onChangeQuantity={changeQuantity}
                onAddToCart={addToCart}
              />
            }
          />
          <Route path="/add-product" element={<AddProductForm onAddProduct={addProduct} />} />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                onChangeCartQuantity={changeCartQuantity}
                onRemoveFromCart={removeFromCart}
              />
            }
          />
        </Routes>
      </main>
    </div>
  )
}
