import { useParams } from 'react-router-dom'
import { Product } from '../types/Product'
import { ProductCard } from '../components/ProductCard'
import { Spinner } from '../components/Spinner'
import { fetchCategoryProducts } from '../services/products'
import { useAsyncData } from '../hooks/useAsyncData'

export const Category = () => {

  const { name } = useParams<{ name: string }>()

  const { data: products, loading, error } = useAsyncData(() => fetchCategoryProducts(name!), [name])

  if (loading) return <Spinner />
  if (error) return <div className='error'>Error al cargar la categoría. Intenta más tarde.</div>

  return (
    <div className='home'>
      <div className='grid'>
        {
          products?.map((product: Product) =>
            <ProductCard key={product.id} product={product} />
          )
        }
      </div>
    </div>
  )
}
