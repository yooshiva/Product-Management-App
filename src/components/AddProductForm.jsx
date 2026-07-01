import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const emptyForm = {
  name: '',
  category: '',
  description: '',
  specification: '',
  rating: '',
  price: '',
  quantity: '',
}

export default function AddProductForm({ onAddProduct }) {
  const [form, setForm] = useState(emptyForm)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleImageChange(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  function validate() {
    if (!imageFile) return 'Please upload a feature image.'
    for (const [key, value] of Object.entries(form)) {
      if (String(value).trim() === '') {
        return `Please fill in the "${key}" field.`
      }
    }
    if (Number(form.price) <= 0) return 'Price must be greater than 0.'
    if (Number(form.quantity) < 0) return 'Quantity cannot be negative.'
    if (Number(form.rating) < 0 || Number(form.rating) > 5) return 'Rating must be between 0 and 5.'
    return ''
  }

  function handleSubmit(e) {
    e.preventDefault()
    const validationError = validate()
    if (validationError) {
      setError(validationError)
      setSuccess(false)
      return
    }

    onAddProduct({ ...form, image: imagePreview })
    setError('')
    setSuccess(true)
    setForm(emptyForm)
    setImageFile(null)
    setImagePreview('')

    setTimeout(() => navigate('/'), 900)
  }

  return (
    <section className="add-product-page">
      <div className="page-header">
        <div>
          <h1>Add New Product</h1>
          <p className="page-subtitle">All fields are required before the product can be listed.</p>
        </div>
      </div>

      <form className="product-form" onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="image">Feature Image</label>
          <input id="image" type="file" accept="image/*" onChange={handleImageChange} />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="form-image-preview" />
          )}
        </div>

        <div className="form-field">
          <label htmlFor="name">Product Name</label>
          <input id="name" name="name" type="text" value={form.name} onChange={handleChange} />
        </div>

        <div className="form-field">
          <label htmlFor="category">Product Category</label>
          <input
            id="category"
            name="category"
            type="text"
            placeholder="e.g. Audio, Wearables, Office"
            value={form.category}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows="3"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label htmlFor="specification">Product Specification</label>
          <textarea
            id="specification"
            name="specification"
            rows="2"
            value={form.specification}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <div className="form-field">
            <label htmlFor="rating">Rating (0–5)</label>
            <input
              id="rating"
              name="rating"
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={form.rating}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="price">Price (₱)</label>
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="quantity">Quantity</label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              min="0"
              value={form.quantity}
              onChange={handleChange}
            />
          </div>
        </div>

        {error && <p className="form-error">{error}</p>}
        {success && <p className="form-success">Product added! Redirecting to catalog…</p>}

        <button type="submit" className="btn btn-primary">
          Add Product
        </button>
      </form>
    </section>
  )
}
