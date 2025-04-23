import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { ProductDetail } from './pages/ProductDetail'
import { Cart } from './pages/Cart'
import { CartProvider } from './context/CartContext'
import { Header } from './components/Header'
import { Category } from './pages/Category'
import { ErrorPage } from './pages/ErrorPage'
import { Footer } from './components/Footer'

export const App = () => {
  return (
    <CartProvider>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/category/:name' element={<Category />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
      <Footer />
    </CartProvider>
  )
}
