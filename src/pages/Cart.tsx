import { useCart } from '../context/CartContext'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Spinner } from '../components/Spinner'
import './Cart.css'

export const Cart = () => {

  const navigate = useNavigate()
  const { cart, removeFromCart, clearCart } = useCart()
  const [isPaying, setIsPaying] = useState(false)
  const [paid, setPaid] = useState(false)

  const handlePayment = () => {
    setIsPaying(true)
    setTimeout(() => {
      setIsPaying(false)
      setPaid(true)
      clearCart()
    }, 2000)
  }

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  useEffect(() => {
    if (paid) {
      setTimeout(() => {
        navigate('/')
      }, 2000)
    }
  }, [paid])

  if (cart.length === 0 && !paid) return <div className='cart-empty'>Tu carrito está vacío</div>
  if (paid) return <div className='cart-paid-message'>🎉 ¡Productos pagados con éxito!</div>
  if (isPaying) return <Spinner />

  return (
    <div className='cart'>
      <h1 className='cart-title'>🛒 Carrito de compras</h1>
      {
        cart.map(item =>
          <div className='cart-item' key={item.id}>
            <Link to={`/product/${item.id}`} className='cart-link'>
              <div className='container-cart-image'>
                <img src={item.image} alt={item.title} className='cart-image' />
              </div>
              <div className='cart-details'>
                <h2 className='cart-name'>{item.title}</h2>
                <p className='cart-category'>{item.category}</p>
                <p className='cart-price'>Precio: ${item.price}</p>
                <p className='cart-quantity'>Cantidad: {item.quantity}</p>
                <p className='cart-subtotal'>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </Link>
            <button onClick={() => removeFromCart(item.id)} className='cart-remove'>
              Quitar
            </button>
          </div>
        )
      }
      <div className='cart-total'>
        <h2>Total a pagar: <strong>${total.toFixed(2)}</strong></h2>
        <button className='pay-button' onClick={handlePayment}>Pagar ahora</button>
      </div>
    </div>
  )
}
