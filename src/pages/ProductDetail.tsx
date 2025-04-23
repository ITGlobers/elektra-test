import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useParams } from 'react-router-dom'
import { fetchProductById } from '../services/products'
import { useAsyncData } from '../hooks/useAsyncData'
import { Spinner } from '../components/Spinner'
import './ProductDetail.css'

export const ProductDetail = () => {

  const { id } = useParams<{ id: string }>()
  const { data: product, loading, error } = useAsyncData(() => fetchProductById(id!), [id])
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1000)
  }

  if (loading) return <Spinner />
  if (error) return <div className='error'>Error al cargar el producto. Intenta más tarde.</div>

  return (
    <div className='product-detail'>
      <img className='product-image' src={product?.image} alt={product?.title} />
      <div className='product-info'>
        <h1 className='product-title'>{product?.title}</h1>
        <p className='product-description'>{product?.description}</p>
        <div className='product-price'>${product?.price}</div>
        <button
          className={`product-button ${added ? 'added' : ''}`}
          onClick={handleAddToCart}
        >
          {added ? 'Agregado ✅' : 'Agregar al carrito'}
        </button>
      </div>
    </div>
  )
}
