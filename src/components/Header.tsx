import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './Header.css'

export const Header = () => {

  const { cart } = useCart()

  return (
    <header className='header'>
      <div className='container-header'>
        <Link to='/' className='logo'>Elektra</Link>
        <nav className='menu'>
          <Link to='/category/electronics'>Electronics</Link>
          <Link to='/category/jewelery'>Jewelery</Link>
          <Link to='/cart'>🛒{cart.length}</Link>
        </nav>
      </div>
    </header>
  )
}
