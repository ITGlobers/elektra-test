import { Product } from '../types/Product'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import './ProductCard.css'

interface ProductCardProps {
  product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {

  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1000)
  }

  return (
    <div className='product-card'>
      <Link to={`/product/${product.id}`} className='product-link'>
        <div className='container-product-image'>
          <img src={product.image} alt={product.title} className='product-image' />
        </div>
        <h3 className='product-title'>{product.title}</h3>
        <div className='category'>{product.category}</div>
        <div className='price'>${product.price}</div>
      </Link>
      <button
        onClick={handleAdd}
        className={`add-button ${added ? 'added' : ''}`}
        disabled={added}
      >
        {added ? 'Agregado ✅' : 'Agregar al carrito'}
      </button>
    </div>
  )
}
