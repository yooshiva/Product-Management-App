# Stockroom — Product Management App

A React app for managing a product catalog: browse and filter products, view a
dedicated detail page per product, adjust quantities, add items to a cart, and
add brand-new products through a validated form. Subtotals and the overall
inventory total update live as you interact with the app.

## Getting Started

You'll need [Node.js](https://nodejs.org) (v18 or later) installed.

```bash
npm install
npm run dev
```

Then open the URL Vite prints in your terminal (usually `http://localhost:5173`).

## Project Structure

```
src/
  main.jsx                  # App entry point, sets up React Router
  App.jsx                   # Top-level state (products, cart) and routes
  App.css                   # All styling
  data/products.js          # 5 default seed products
  components/
    Navbar.jsx               # Top navigation with cart count
    ProductList.jsx          # Catalog page: filter + grid + inventory total
    CategoryFilter.jsx       # Category filter chips
    ProductCard.jsx          # Single product card (list view)
    ProductDetail.jsx        # Dedicated /product/:id detail page
    AddProductForm.jsx       # /add-product form with validation
    Cart.jsx                 # /cart page with per-item and total computation
```

## How it maps to the project requirements

**1. Display Product List**
- 5 default products, each with feature image, name, price, quantity, and a
  computed subtotal (`ProductCard.jsx`, `data/products.js`).
- Category filter chips at the top of the catalog (`CategoryFilter.jsx`).
- Card-grid layout (`.product-grid` in `App.css`).
- Each product links to its own `/product/:id` page with full description,
  specification, and rating (`ProductDetail.jsx`).
- "Add to Cart" button plus +/- quantity steppers, with conditional
  rendering: an "Out of Stock" state, a temporary "✓ Added to Cart"
  confirmation state, and a normal "Add to Cart" state.

**2. Add New Product**
- Form with inputs for feature image (file upload with preview), name,
  category, description, specification, rating, price, and quantity
  (`AddProductForm.jsx`).
- Submitting appends the product to the shared `products` state in `App.jsx`,
  so it immediately shows up in the catalog.
- Client-side validation blocks submission (and shows an inline error) until
  every field is filled and price/quantity/rating are sensible numbers.

**3. Compute Totals**
- Subtotal = price × quantity, computed per product on both the list and
  detail views.
- The catalog page shows a running "Total Inventory Value" computed with
  `.reduce()` across all products (`inventoryTotal` in `App.jsx`).
- Because it's derived from `products` state with `useMemo`, it recalculates
  automatically whenever a product is added or a quantity changes.
- The Cart page performs the same subtotal/total computation for whatever the
  user has added to their cart.

**4. Design and Functionality**
- Clean card/grid layout with a consistent type system (Space Grotesk for
  headings, Inter for body text, IBM Plex Mono for all numeric values).
- Consistent naming conventions (camelCase props/handlers, kebab-case CSS
  classes) and component-per-file organization.
- Conditional formatting: a "Low Stock" badge appears whenever a product's
  quantity drops below 5, and an "Out of Stock" state appears at 0.

## Notes

- Images for the 5 default products are loaded from `picsum.photos` as
  placeholders — swap the `image` URLs in `src/data/products.js` for real
  product photos if you have them.
- Cart and product state live in memory only (React state), so they reset on
  page refresh. That's expected for this assignment; it keeps the app free of
  any backend/database requirement.
