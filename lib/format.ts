/**
 * Formatea un importe en euros con el formato español (1.234,50 €).
 */
export function formatearPrecio(valor: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(valor)
}
