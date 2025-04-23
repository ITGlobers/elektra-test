import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { Product } from '../types/Product'

interface CartItem extends Product {
  quantity: number
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType>({} as CartContextType)

const CART_KEY = 'cart_items'

export const CartProvider = ({ children }: { children: ReactNode }) => {

  const [cart, setCart] = useState<CartItem[]>(() => {
    const stored = sessionStorage.getItem(CART_KEY)
    return stored ? JSON.parse(stored) : []
  })

  useEffect(() => {
    sessionStorage.setItem(CART_KEY, JSON.stringify(cart))
  }, [cart])

  const addToCart = (product: Product) => {
    setCart(products => {
      const existing = products.find(item => item.id === product.id)
      if (existing) {
        return products.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...products, { ...product, quantity: 1 }]
    })
  }

  const clearCart = () => {
    setCart([])
    sessionStorage.removeItem('cart')
  }

  const removeFromCart = (id: number) => setCart(products => products.filter(item => item.id !== id))

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
