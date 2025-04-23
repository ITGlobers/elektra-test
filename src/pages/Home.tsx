import { Product } from '../types/Product'
import { ProductCard } from '../components/ProductCard'
import { Spinner } from '../components/Spinner'
import { fetchProducts } from '../services/products'
import { useAsyncData } from '../hooks/useAsyncData'
import './Home.css'

export const Home = () => {

  const { data: products, loading, error } = useAsyncData(() => fetchProducts(), [])

  if (loading) return <Spinner />
  if (error) return <div className='error'>Error al cargar productos. Intenta más tarde.</div>

  return (
    <div className='home'>
      <img src='https://placehold.co/1500x400' alt='banner' width='100%' className='banner' />
      <div className='grid'>
        {
          products?.slice(0, 20).map((product: Product) =>
            <ProductCard key={product.id} product={product} />
          )
        }
      </div>
    </div>
  )
}
