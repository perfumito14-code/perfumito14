import type { Producto } from '@/types/product'

/**
 * Catálogo de demostración. Nombres y descripciones ficticios de perfumería
 * italiana de nicho — sustituir por el catálogo real del proveedor.
 *
 * Para editar el catálogo basta con modificar este array: cada producto debe
 * mantener un `slug` único y al menos una variante.
 */
export const productos: Producto[] = [
  {
    id: 'p01',
    slug: 'mare-di-liguria',
    nombre: 'Mare di Liguria',
    casaPerfumeria: 'Inspirado en la costa de las Cinque Terre',
    familiaOlfativa: 'acuatico',
    notasSalida: ['Bergamota de Calabria', 'Sal marina', 'Mandarina verde'],
    notasCorazon: ['Romero silvestre', 'Algas', 'Jazmín de mar'],
    notasFondo: ['Ámbar gris', 'Almizcle blanco', 'Madera flotante'],
    descripcionCorta:
      'La brisa salina del Mediterráneo ligur capturada en un frasco luminoso.',
    descripcionLarga:
      'Mare di Liguria evoca el instante en que el sol roza el agua frente a los pueblos colgados de la roca. La bergamota y la sal marina abren un horizonte fresco que se asienta sobre un fondo ambarino, cálido como la piedra al atardecer. Una fragancia para quien lleva el mar en la memoria.',
    imagenes: ['/images/products/mare-di-liguria.png'],
    variantes: [
      { tamano: '30ml', precio: 45, sku: 'ML-30' },
      { tamano: '50ml', precio: 68, sku: 'ML-50' },
    ],
    destacado: true,
    nuevoLanzamiento: false,
  },
  {
    id: 'p02',
    slug: 'legno-toscano',
    nombre: 'Legno Toscano',
    casaPerfumeria: 'Inspirado en la tradición de la Toscana',
    familiaOlfativa: 'amaderado',
    notasSalida: ['Pimienta negra', 'Enebro', 'Bergamota'],
    notasCorazon: ['Cedro de Virginia', 'Iris', 'Cuero suave'],
    notasFondo: ['Vetiver', 'Sándalo', 'Haba tonka'],
    descripcionCorta:
      'El alma de los bosques toscanos: madera noble, tierra y serenidad.',
    descripcionLarga:
      'Legno Toscano nace del silencio de los bosques de cedro que rodean las colinas de Siena. La pimienta y el enebro despiertan los sentidos antes de ceder paso a un corazón de iris y cuero. En el fondo, el vetiver y el sándalo dejan una estela profunda, masculina y atemporal.',
    imagenes: ['/images/products/legno-toscano.png'],
    variantes: [
      { tamano: '30ml', precio: 49, sku: 'LT-30' },
      { tamano: '50ml', precio: 74, sku: 'LT-50' },
    ],
    destacado: true,
    nuevoLanzamiento: false,
  },
  {
    id: 'p03',
    slug: 'fiori-di-firenze',
    nombre: 'Fiori di Firenze',
    casaPerfumeria: 'Inspirado en los jardines de Florencia',
    familiaOlfativa: 'floral',
    notasSalida: ['Pera', 'Grosella negra', 'Neroli'],
    notasCorazon: ['Rosa de mayo', 'Peonía', 'Iris florentino'],
    notasFondo: ['Almizcle', 'Cedro blanco', 'Ámbar suave'],
    descripcionCorta:
      'Un ramo de flores recién cortadas en los jardines de Boboli.',
    descripcionLarga:
      'Fiori di Firenze es un homenaje al iris florentino, símbolo de la ciudad del Renacimiento. La rosa de mayo y la peonía componen un corazón delicado y luminoso, mientras el almizcle envuelve la composición en una caricia limpia y elegante. Femenino, sereno, profundamente italiano.',
    imagenes: ['/images/products/fiori-di-firenze.png'],
    variantes: [
      { tamano: '30ml', precio: 47, sku: 'FF-30' },
      { tamano: '50ml', precio: 70, sku: 'FF-50' },
    ],
    destacado: true,
    nuevoLanzamiento: true,
  },
  {
    id: 'p04',
    slug: 'agrumi-di-sicilia',
    nombre: 'Agrumi di Sicilia',
    casaPerfumeria: 'Inspirado en los huertos de cítricos sicilianos',
    familiaOlfativa: 'citrico',
    notasSalida: ['Limón de Siracusa', 'Naranja sanguina', 'Petitgrain'],
    notasCorazon: ['Flor de azahar', 'Hoja de higuera', 'Menta'],
    notasFondo: ['Almizcle blanco', 'Cedro', 'Vetiver ligero'],
    descripcionCorta:
      'La explosión solar de los cítricos sicilianos bajo un cielo infinito.',
    descripcionLarga:
      'Agrumi di Sicilia destila la energía de los huertos de la isla, donde el limón y la naranja sanguina maduran bajo el sol mediterráneo. Una salida chispeante y vibrante se suaviza con la flor de azahar, dejando una estela limpia y radiante. La fragancia del verano eterno.',
    imagenes: ['/images/products/agrumi-di-sicilia.png'],
    variantes: [
      { tamano: '30ml', precio: 44, sku: 'AS-30' },
      { tamano: '50ml', precio: 66, sku: 'AS-50' },
    ],
    destacado: true,
    nuevoLanzamiento: false,
  },
  {
    id: 'p05',
    slug: 'notte-veneziana',
    nombre: 'Notte Veneziana',
    casaPerfumeria: 'Inspirado en las noches de Venecia',
    familiaOlfativa: 'oriental',
    notasSalida: ['Azafrán', 'Cardamomo', 'Mandarina'],
    notasCorazon: ['Rosa de Damasco', 'Incienso', 'Oud suave'],
    notasFondo: ['Ámbar', 'Vainilla negra', 'Pachulí'],
    descripcionCorta:
      'El misterio de los palacios venecianos envuelto en especias y ámbar.',
    descripcionLarga:
      'Notte Veneziana es un viaje a las calles secretas de la Serenísima al caer la noche. El azafrán y el cardamomo abren una composición opulenta, donde la rosa y el incienso danzan sobre un fondo de ámbar y vainilla. Una fragancia intensa, hipnótica, hecha para perdurar.',
    imagenes: ['/images/products/notte-veneziana.png'],
    variantes: [
      { tamano: '30ml', precio: 54, sku: 'NV-30' },
      { tamano: '50ml', precio: 82, sku: 'NV-50' },
    ],
    destacado: true,
    nuevoLanzamiento: true,
  },
  {
    id: 'p06',
    slug: 'dolce-amalfi',
    nombre: 'Dolce Amalfi',
    casaPerfumeria: 'Inspirado en los postres de la costa amalfitana',
    familiaOlfativa: 'gourmand',
    notasSalida: ['Limón de Amalfi', 'Almendra', 'Bergamota'],
    notasCorazon: ['Crema de vainilla', 'Flor de almendro', 'Heliotropo'],
    notasFondo: ['Haba tonka', 'Caramelo', 'Sándalo'],
    descripcionCorta:
      'La dulzura de un postre artesano frente al mar de Amalfi.',
    descripcionLarga:
      'Dolce Amalfi captura el placer de un dolce recién horneado en una terraza sobre el Tirreno. El limón de Amalfi aporta frescura a una composición golosa de vainilla, almendra y caramelo, equilibrada por la calidez del sándalo. Reconfortante y adictiva, sin resultar empalagosa.',
    imagenes: ['/images/products/dolce-amalfi.png'],
    variantes: [
      { tamano: '30ml', precio: 46, sku: 'DA-30' },
      { tamano: '50ml', precio: 69, sku: 'DA-50' },
    ],
    destacado: false,
    nuevoLanzamiento: false,
  },
  {
    id: 'p07',
    slug: 'pioggia-di-milano',
    nombre: 'Pioggia di Milano',
    casaPerfumeria: 'Inspirado en la lluvia sobre la ciudad de Milán',
    familiaOlfativa: 'acuatico',
    notasSalida: ['Notas de lluvia', 'Pomelo', 'Hoja de violeta'],
    notasCorazon: ['Lirio de agua', 'Té blanco', 'Geranio'],
    notasFondo: ['Musgo', 'Almizcle', 'Cedro húmedo'],
    descripcionCorta:
      'El aroma limpio del asfalto tras la lluvia en una tarde milanesa.',
    descripcionLarga:
      'Pioggia di Milano evoca ese momento singular en que la lluvia despierta los aromas de la ciudad. Las notas acuáticas y el pomelo crean una frescura mineral, mientras el té blanco y el musgo aportan una serenidad contemporánea. Urbana, sofisticada y profundamente original.',
    imagenes: ['/images/products/pioggia-di-milano.png'],
    variantes: [
      { tamano: '30ml', precio: 48, sku: 'PM-30' },
      { tamano: '50ml', precio: 72, sku: 'PM-50' },
    ],
    destacado: false,
    nuevoLanzamiento: false,
  },
  {
    id: 'p08',
    slug: 'oro-di-roma',
    nombre: 'Oro di Roma',
    casaPerfumeria: 'Inspirado en la grandeza de la Roma eterna',
    familiaOlfativa: 'oriental',
    notasSalida: ['Pimienta rosa', 'Naranja amarga', 'Canela'],
    notasCorazon: ['Mirra', 'Rosa', 'Laurel'],
    notasFondo: ['Benjuí', 'Cuero', 'Ámbar dorado'],
    descripcionCorta:
      'El esplendor imperial de Roma traducido en una estela cálida y dorada.',
    descripcionLarga:
      'Oro di Roma rinde tributo a la ciudad eterna y a su historia milenaria. La pimienta rosa y la canela abren una composición regia, sostenida por la mirra y el laurel, símbolos de victoria. El cuero y el benjuí cierran con una elegancia rotunda. Una fragancia para presencias inolvidables.',
    imagenes: ['/images/products/oro-di-roma.png'],
    variantes: [
      { tamano: '30ml', precio: 56, sku: 'OR-30' },
      { tamano: '50ml', precio: 85, sku: 'OR-50' },
    ],
    destacado: false,
    nuevoLanzamiento: true,
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
