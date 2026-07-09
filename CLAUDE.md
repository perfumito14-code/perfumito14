# perfumito14 — estado del proyecto

Repo: `perfumito14-code/perfumito14` (Next.js, app router). Trabajo vía
GitHub Codespace `effective-adventure-p77rx67w465x35wr` (branch `main`),
accedido con `gh codespace ssh -c effective-adventure-p77rx67w465x35wr -- "<comando>"`.
Cuenta gh activa para este repo: `perfumito14-code` (distinta de `kayaosv`,
que se usa para Alcosa — recordar `gh auth switch` antes de tocar cada repo).
Push: usar `bash -lc '... git push ...'` (login shell) — el credential
helper de Codespaces (`GITHUB_TOKEN`/`GITHUB_SERVER_URL`) solo se carga
en shells de login, no en `gh codespace ssh -- "cmd"` directo.

Supabase: proyecto propio, `project_ref=hevjlwjdwicgmdzllhjb`
(`hevjlwjdwicgmdzllhjb.supabase.co`), separado del de Alcosa. MCP
`supabase-perfumito14` autenticado (2026-07-10) — usar sus tools
directamente (`list_tables`, `execute_sql`, `apply_migration`, etc.)
en vez de pedirle SQL manual al cliente.

Vercel: equipo `jessi-space` (https://vercel.com/jessi-space). Vercel CLI
aún no instalado/logueado en el entorno del usuario a fecha 2026-07-09.

## Hecho (2026-07-09 / 2026-07-10)

- Galería/catálogo/ficha de producto/destacados del home/sitemap
  conectados a Supabase real (`lib/supabase/products.ts`), ya no usan
  el array placeholder `data/products.ts` (eliminado).
- Precio de card sin prefijo "desde", precio directo.
- Home reordenado: Hero, BrandStory, banner (UrgencyTicker), "Más
  vendidos" (galería real, max 6, CTA "Ingresar a galería" → /catalogo),
  Comprar en 3 pasos, **nuevo** carrusel horizontal "Fragancias
  destacadas" (`components/home/FeaturedCarousel.tsx` +
  `CarouselTrack.tsx`, productos con `destacado=true`), Testimonios.
  Newsletter eliminado.
- **Volúmenes de producto → variantes libres.** Migración de Supabase
  `add_variantes_column`: se agregó columna `productos.variantes`
  (jsonb, `[{ "ml": number, "precio": number }]`), migrando los datos
  que ya estaban en `precio_30ml`/`precio_50ml` (columnas viejas se
  mantienen sin usar, no se borraron todavía). `ProductoForm.tsx`
  ahora tiene una lista dinámica de variantes (input ml + precio, botón
  "+ Añadir variante", botón quitar por fila) en vez de los campos fijos
  `precio30ml`/`precio50ml`. Volúmenes de referencia del cliente: 5, 7
  y 15 ml (no son un enum fijo en el código, el input es libre).
  `lib/supabase/products.ts` lee `variantes` y ordena por ml ascendente.
  `ProductCard.tsx` muestra el precio de la variante más chica como
  principal y el resto de precios al lado (ej. "12,00 € 5ML  +18,00 € ·
  25,00 €") cuando hay más de una variante.

## Pendiente

1. **Quitar filtros de volumen en catálogo cliente** (pedido
   2026-07-09, no implementado). Revisar
   `components/catalog/ProductFilters.tsx` y `CatalogView.tsx`.
2. **Preloader más largo.** Candidatos: `app/catalogo/loading.tsx` y
   `app/producto/[slug]/loading.tsx`. No identificado aún el
   componente/timeout exacto.
3. **Hero: rediseño** (pedido 2026-07-10, solo a analizar/planificar
   todavía, no implementado). Layout deseado: imagen a la izquierda,
   texto a la derecha; navbar superior sólido desde el inicio (hoy
   probablemente transparente sobre el hero) y que se mantenga sólido
   al hacer scroll (sticky). Revisar `components/home/Hero.tsx` y el
   navbar (`components/layout/`).
4. **Stock por variante** (pedido 2026-07-10, solo a analizar). El
   cliente quiere indicar stock por variante/ml en el admin. Falta
   definir: ¿se muestra públicamente en la web (ej. "agotado")? ¿se
   descuenta automático? (la tienda no tiene checkout online, los
   pedidos se confirman por WhatsApp, así que "descontar stock" no
   tiene un trigger de compra real — probablemente sea manual desde
   admin). Definir esto con el cliente antes de tocar schema otra vez.
5. **Marca y nombre del perfume en admin** (pedido 2026-07-10, a
   analizar). Ya existen `nombre` y `casa_perfumeria` en
   `ProductoForm.tsx`, pero el campo "Casa / Inspiración" está pensado
   como texto libre tipo "Inspirado en las noches de Venecia", no como
   un campo de marca estricto. Confirmar con el cliente si quiere un
   campo "Marca" separado y más literal (ej. "Dior") antes de tocar.
6. **Mantener este archivo actualizado** como fuente de verdad del
   estado del proyecto, accesible desde cualquier terminal/codespace
   sin depender de la memoria de la conversación (pedido explícito del
   cliente el 2026-07-09).

## Próxima sesión
Antes de tocar Hero o stock, confirmar con el cliente los puntos 3-5
(son ideas a analizar, no specs cerradas todavía). Los puntos 1 y 2
son más directos y se pueden implementar sin más aclaraciones.
