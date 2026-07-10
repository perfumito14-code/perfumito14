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
  Comprar en 3 pasos, carrusel horizontal "Fragancias destacadas"
  (`components/home/FeaturedCarousel.tsx` + `CarouselTrack.tsx`,
  productos con `destacado=true`), Testimonios. Newsletter eliminado.
- **Volúmenes de producto → variantes libres.** Columna
  `productos.variantes` (jsonb, `[{ "ml", "precio", "stock" }]`).
  `ProductoForm.tsx` tiene lista dinámica de variantes (ml + precio +
  stock, botón "+ Añadir variante"). Volúmenes de referencia del
  cliente: 5, 7 y 15 ml (input libre, no es un enum fijo).
  `ProductCard.tsx` muestra el precio de la variante más chica como
  principal y el resto al lado cuando hay más de una.
- **Hero rediseñado**: imagen a la izquierda, texto a la derecha
  (`components/home/Hero.tsx`). Navbar (`components/layout/Header.tsx`)
  ahora siempre sólido (antes transparente hasta hacer scroll) y sigue
  `fixed` (ya lo era).
- **Stock por variante + pedidos.** Migración `add_stock_and_pedidos`:
  - `productos.variantes[].stock` (unidades disponibles por ml).
  - Tabla `pedidos` (items jsonb, subtotal, status, stock_descontado,
    created_at) con RLS: insert público (el checkout es anónimo),
    gestión (select/update/delete) solo `authenticated` (mismo patrón
    que `productos`).
  - Trigger `trg_descontar_stock_pedido` (BEFORE UPDATE en `pedidos`):
    cuando `status` pasa a `pagado` o `enviado` y `stock_descontado`
    todavía es `false`, descuenta automáticamente el stock de cada
    variante según `items` y marca `stock_descontado = true` (idempotente,
    probado manualmente: no descuenta dos veces al pasar pagado→enviado).
  - Web pública: `ProductCard`/`ProductInfo` muestran "Agotado" y
    deshabilitan compra cuando una variante llega a 0 stock.
  - `WhatsAppCheckoutButton.tsx`: al confirmar, además de abrir
    WhatsApp, inserta el pedido en la tabla `pedidos` (antes no se
    persistía nada).
  - Nueva sección `/admin/pedidos`: lista pedidos con selector de
    status (pendiente/confirmado/pagado/enviado/entregado/cancelado).
  - Admin: listado de productos muestra stock junto a cada precio.

## Pendiente

1. **Quitar filtros de volumen en catálogo cliente** (pedido
   2026-07-09, no implementado). Revisar
   `components/catalog/ProductFilters.tsx` y `CatalogView.tsx`.
2. **Preloader más largo.** Candidatos: `app/catalogo/loading.tsx` y
   `app/producto/[slug]/loading.tsx`. No identificado aún el
   componente/timeout exacto.
3. **Marca y nombre del perfume en admin** (pedido 2026-07-10, sin
   confirmar todavía). Ya existen `nombre` y `casa_perfumeria` en
   `ProductoForm.tsx`, pero "Casa / Inspiración" está pensado como
   texto libre tipo "Inspirado en las noches de Venecia", no como un
   campo de marca estricto. Confirmar con el cliente si quiere un
   campo "Marca" separado y literal (ej. "Dior") antes de tocar.
4. **Mantener este archivo actualizado** como fuente de verdad del
   estado del proyecto (pedido explícito del cliente el 2026-07-09).

## Notas de implementación (pedidos/stock)

- El campo `ml` en `pedidos.items` se calcula en el checkout parseando
  `tamano` (ej. "5ml" → 5) — si en algún momento se permiten unidades
  no-ml en `tamano`, hay que revisar `WhatsAppCheckoutButton.tsx`.
- El trigger solo actúa en UPDATE, no en INSERT — si algún día se
  insertan pedidos ya con status `pagado`/`enviado` directamente, no
  descontará stock (no es el flujo actual, que siempre inserta en
  `pendiente`).
- No hay reserva de stock al agregar al carrito (solo se valida/
  descuenta al confirmar el pago) — dos clientes pueden agregar el
  último ítem en simultáneo; el `greatest(0, ...)` en el trigger evita
  que el stock quede negativo pero no evita la sobreventa en sí.
