import type { Producto } from '@/types/product'

export const productos: Producto[] = [
  {
    id: 'p01',
    slug: 'versace-eros',
    nombre: 'Versace Eros',
    casaPerfumeria: 'Versace',
    familiaOlfativa: 'oriental',
    notasSalida: ['Menta', 'Manzana verde', 'Limón'],
    notasCorazon: ['Geranio', 'Ambroxan', 'Jacinto'],
    notasFondo: ['Vainilla', 'Madera de cedro', 'Musgo de roble'],
    descripcionCorta: 'La fuerza del amor en una fragancia intensa y seductora.',
    descripcionLarga: 'Eros encarna la pasión mitológica del amor. Notas frescas de menta y manzana verde se abren paso a un corazón especiado para asentarse en un fondo amaderado y sensual.',
    imagenes: ['/images/products/placeholder.svg'],
    variantes: [
      { tamano: '5ml', precio: 14, sku: 'VE-5' },
      { tamano: '10ml', precio: 24, sku: 'VE-10' },
    ],
    destacado: true,
    nuevoLanzamiento: false,
  },
  {
    id: 'p02',
    slug: 'carolina-herrera-good-girl',
    nombre: 'Carolina Herrera Good Girl',
    casaPerfumeria: 'Carolina Herrera',
    familiaOlfativa: 'oriental',
    notasSalida: ['Almendra', 'Café', 'Bergamota'],
    notasCorazon: ['Jazmín', 'Tuberosa', 'Lirio'],
    notasFondo: ['Cacao', 'Vainilla', 'Sándalo', 'Ámbar'],
    descripcionCorta: 'Audaz, femenina, irresistible. Un icono moderno.',
    descripcionLarga: 'Good Girl juega con los opuestos: la frescura de la almendra y el café se encuentra con un corazón floral potente, mientras el cacao y la vainilla envuelven todo en una estela cálida y adictiva.',
    imagenes: ['/images/products/placeholder.svg'],
    variantes: [
      { tamano: '5ml', precio: 15, sku: 'CHGG-5' },
      { tamano: '10ml', precio: 26, sku: 'CHGG-10' },
    ],
    destacado: true,
    nuevoLanzamiento: false,
  },
  {
    id: 'p03',
    slug: 'dior-sauvage',
    nombre: 'Dior Sauvage',
    casaPerfumeria: 'Dior',
    familiaOlfativa: 'amaderado',
    notasSalida: ['Bergamota de Calabria', 'Pimienta', 'Lavanda'],
    notasCorazon: ['Pimienta de Sichuan', 'Geranio', 'Elemi'],
    notasFondo: ['Ámbar', 'Cedro', 'Vetiver'],
    descripcionCorta: 'Salvaje, libre, auténtico. El clásico masculino absoluto.',
    descripcionLarga: 'Sauvage es una inspiración abierta. Una composición fresca y radical que combina la bergamota con la pimienta de Sichuan en un fondo ambarino profundo.',
    imagenes: ['/images/products/placeholder.svg'],
    variantes: [
      { tamano: '5ml', precio: 13, sku: 'DS-5' },
      { tamano: '10ml', precio: 22, sku: 'DS-10' },
    ],
    destacado: true,
    nuevoLanzamiento: false,
  },
  {
    id: 'p04',
    slug: 'ysl-black-opium',
    nombre: 'YSL Black Opium',
    casaPerfumeria: 'Yves Saint Laurent',
    familiaOlfativa: 'oriental',
    notasSalida: ['Café', 'Pera', 'Pimienta rosa'],
    notasCorazon: ['Jazmín', 'Azahar', 'Regaliz'],
    notasFondo: ['Vainilla', 'Cacao', 'Pachulí', 'Sándalo'],
    descripcionCorta: 'El adictivo café-vainilla que conquistó el mundo.',
    descripcionLarga: 'Black Opium es la fragancia que define una generación. La explosión de café y pera se funde con un corazón floral y un fondo goloso de vainilla y cacao. Inconfundible.',
    imagenes: ['/images/products/placeholder.svg'],
    variantes: [
      { tamano: '5ml', precio: 16, sku: 'YSLBO-5' },
      { tamano: '10ml', precio: 27, sku: 'YSLBO-10' },
    ],
    destacado: true,
    nuevoLanzamiento: true,
  },
  {
    id: 'p05',
    slug: 'paco-rabanne-invictus',
    nombre: 'Paco Rabanne Invictus',
    casaPerfumeria: 'Paco Rabanne',
    familiaOlfativa: 'acuatico',
    notasSalida: ['Toronja', 'Marinos', 'Mandarina'],
    notasCorazon: ['Hoja de laurel', 'Jazmín'],
    notasFondo: ['Ámbar gris', 'Madera de gaiac', 'Musgo de roble'],
    descripcionCorta: 'El poder del triunfo en una fragancia fresca y energética.',
    descripcionLarga: 'Invictus celebra el espíritu del campeón. Notas marinas y cítricas dan paso a un corazón de laurel que desemboca en un fondo amaderado y sensual.',
    imagenes: ['/images/products/placeholder.svg'],
    variantes: [
      { tamano: '5ml', precio: 13, sku: 'PRI-5' },
      { tamano: '10ml', precio: 23, sku: 'PRI-10' },
    ],
    destacado: true,
    nuevoLanzamiento: false,
  },
  {
    id: 'p06',
    slug: 'carolina-herrera-212',
    nombre: 'Carolina Herrera 212',
    casaPerfumeria: 'Carolina Herrera',
    familiaOlfativa: 'citrico',
    notasSalida: ['Mandarina', 'Toronja', 'Pimienta rosa'],
    notasCorazon: ['Jengibre', 'Té blanco', 'Violeta'],
    notasFondo: ['Almizcle', 'Cedro', 'Sándalo'],
    descripcionCorta: 'Fresca, urbana, vibrante. La esencia de Nueva York.',
    descripcionLarga: '212 captura la energía de la ciudad que nunca duerme. Cítricos chispeantes se equilibran con un corazón de té blanco para un final almizclado y limpio.',
    imagenes: ['/images/products/placeholder.svg'],
    variantes: [
      { tamano: '5ml', precio: 12, sku: 'CH212-5' },
      { tamano: '10ml', precio: 21, sku: 'CH212-10' },
    ],
    destacado: false,
    nuevoLanzamiento: false,
  },
  {
    id: 'p07',
    slug: 'dior-jadore',
    nombre: 'Dior J\'Adore',
    casaPerfumeria: 'Dior',
    familiaOlfativa: 'floral',
    notasSalida: ['Bergamota', 'Pera', 'Melón'],
    notasCorazon: ['Jazmín', 'Rosa de mayo', 'Iris'],
    notasFondo: ['Almizcle', 'Vainilla', 'Cedro'],
    descripcionCorta: 'Femenina, luminosa, icónica. El lujo floral absoluto.',
    descripcionLarga: 'J\'Adore es un ramo floral dorado que celebra la feminidad. La pera y la bergamota abren paso a un corazón de jazmín y rosa sostenido por un fondo almizclado y cálido.',
    imagenes: ['/images/products/placeholder.svg'],
    variantes: [
      { tamano: '5ml', precio: 15, sku: 'DJD-5' },
      { tamano: '10ml', precio: 25, sku: 'DJD-10' },
    ],
    destacado: false,
    nuevoLanzamiento: true,
  },
  {
    id: 'p08',
    slug: 'paco-rabanne-1-million',
    nombre: 'Paco Rabanne 1 Million',
    casaPerfumeria: 'Paco Rabanne',
    familiaOlfativa: 'oriental',
    notasSalida: ['Pomelo', 'Pimienta', 'Menta'],
    notasCorazon: ['Canela', 'Rosa', 'Cuero'],
    notasFondo: ['Ámbar', 'Cuero', 'Madera de cedro'],
    descripcionCorta: 'Osada, dorada, inolvidable. Un golpe de efecto.',
    descripcionLarga: '1 Million es una fragancia audaz que no pasa desapercibida. El pomelo y la menta se encuentran con la canela y el cuero, creando una estela cálida y magnética.',
    imagenes: ['/images/products/placeholder.svg'],
    variantes: [
      { tamano: '5ml', precio: 14, sku: 'PRM-5' },
      { tamano: '10ml', precio: 24, sku: 'PRM-10' },
    ],
    destacado: false,
    nuevoLanzamiento: false,
  },
]

export function getProductoPorSlug(slug: string): Producto | undefined {
  return productos.find((p) => p.slug === slug)
}

export function getProductosDestacados(): Producto[] {
  return productos.filter((p) => p.destacado)
}

export function getRelacionados(producto: Producto, limite = 3): Producto[] {
  return productos
    .filter(
      (p) =>
        p.id !== producto.id &&
        p.familiaOlfativa === producto.familiaOlfativa,
    )
    .slice(0, limite)
}
