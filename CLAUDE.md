# perfumito14 — estado del proyecto

Repo: `perfumito14-code/perfumito14` (Next.js, app router). Trabajo vía
GitHub Codespace `effective-adventure-p77rx67w465x35wr` (branch `main`),
accedido con `gh codespace ssh -c effective-adventure-p77rx67w465x35wr -- "<comando>"`.
Cuenta gh activa para este repo: `perfumito14-code` (distinta de `kayaosv`,
que se usa para Alcosa — recordar `gh auth switch` antes de tocar cada repo).

Supabase: proyecto propio, `project_ref=hevjlwjdwicgmdzllhjb`
(`hevjlwjdwicgmdzllhjb.supabase.co`), separado del de Alcosa. MCP local
`supabase-perfumito14` ya agregado en la config de Claude Code del usuario.

Vercel: equipo `jessi-space` (https://vercel.com/jessi-space). Vercel CLI
aún no instalado/logueado en el entorno del usuario a fecha 2026-07-09.

## Pendiente (pedido por el cliente, 2026-07-09 — aún no implementado)

1. **Volúmenes de producto → input de texto libre.** Al cargar un
   producto, el campo de volumen debe ser texto libre en ml (0 hasta lo
   que el dueño quiera ofrecer), no una lista fija. Hoy `ProductoForm.tsx`
   (`app/admin/productos/_components/ProductoForm.tsx`) tiene los campos
   **hardcodeados** `precio30ml` / `precio50ml` (líneas ~22-23, 42-43,
   106, 128-129, 188-195) — esto es justo lo que hay que reemplazar por
   un volumen + precio de texto libre (probablemente una lista de
   variantes `{ volumen_ml, precio }` en vez de dos columnas fijas).
2. **La web debe mostrar el ml exacto cargado**, tomado directamente de
   esos datos reales del producto — no un valor redondeado ni una
   categoría de volumen predefinida.
3. **Quitar volúmenes fijos de la UI/copy** ("perfumes de 10ml", "de
   x ml", etc.) y **quitar filtros de volumen en la vista de catálogo
   para el cliente** — no son necesarios. Revisar
   `components/catalog/ProductFilters.tsx` y
   `components/catalog/CatalogView.tsx` (no se encontró un filtro de
   volumen explícito todavía en `ProductFilters.tsx`, pero ahí es donde
   iría si existe en otro lado — confirmar antes de tocar).
4. **El preloader debe durar un poco más.** Candidatos revisados:
   `app/catalogo/loading.tsx` y `app/producto/[slug]/loading.tsx` (Next.js
   App Router loading UI). No se identificó aún el componente/timeout
   exacto que controla la duración — revisar esos dos archivos primero.
5. **Mantener este archivo actualizado** como fuente de verdad del estado
   del proyecto, accesible desde cualquier terminal/codespace sin
   depender de la memoria de la conversación (pedido explícito del
   cliente el 2026-07-09).

## Próxima sesión
Implementar los 4 puntos de arriba. Empezar por (1)+(2) juntos ya que
son el mismo cambio de modelo de datos (variantes de volumen libre en
vez de columnas fijas `precio_30ml`/`precio_50ml` en la tabla de
productos en Supabase) — probablemente requiere migración de schema.
