import { ProductoForm } from '../_components/ProductoForm'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditarProductoPage({ params }: Props) {
  const { id } = await params
  return <ProductoForm id={id} />
}
