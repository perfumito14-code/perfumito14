# perfumito14 — estado del proyecto

Repo: `perfumito14-code/perfumito14` (Next.js, app router). Trabajo vía
GitHub Codespace `effective-adventure-p77rx67w465x35wr` (branch `main`),
accedido con `gh codespace ssh -c effective-adventure-p77rx67w465x35wr -- "<comando>"`.
Cuenta gh activa para este repo: `perfumito14-code` (distinta de `kayaosv`,
que se usa para Alcosa — recordar `gh auth switch` antes de tocar cada repo).
Push: usar `bash -lc '... git push ...'` (login shell) — el credential
helper de Codespaces (`GITHUB_TOKEN`/`GITHUB_SERVER_URL`) solo se carga
en shells de login, no en `gh codespace ssh -- "cmd"` directo.

**Gestor de paquetes: pnpm, NO npm.** El repo trae `pnpm-lock.yaml`
(no `package-lock.json`). Usar siempre `pnpm install` / `pnpm add` /
`pnpm run build` en este proyecto. Ver "Notas de implementación" abajo
para el incidente que esto causó el 2026-07-13.

Supabase: proyecto propio, `project_ref=hevjlwjdwicgmdzllhjb`
(`hevjlwjdwicgmdzllhjb.supabase.co`), separado del de Alcosa. MCP
`supabase-perfumito14` autenticado (2026-07-10) — usar sus tools
directamente (`list_tables`, `execute_sql`, `apply_migration`, etc.)
en vez de pedirle SQL manual al cliente.

Vercel: equipo `jessi-space` (https://vercel.com/jessi-space). Vercel CLI
aún no instalado/logueado en el entorno del usuario a fecha 2026-07-13.
El dashboard de Vercel requiere sesión — no se puede leer el log de un
build fallido con `WebFetch` sin login; para diagnosticar un deploy roto,
reproducir el build en el codespace (ver nota de env vars abajo) en vez
de intentar leer el log remoto.

## Hecho (2026-07-13)

- **Fix crítico: las fotos no cargaban en ningún lado.**
  `next.config.mjs` no tenía `images.remotePatterns` para el host de
  Supabase Storage (`hevjlwjdwicgmdzllhjb.supabase.co`) — Next.js
  rechaza silenciosamente imágenes de hosts externos no declarados.
  Afectaba `ProductGallery.tsx`, `ProductCard.tsx` y todo lo que usa
  `producto.imagenes` vía `next/image`. Las imágenes en Storage siempre
  estuvieron bien subidas y eran públicamente accesibles — el bug era
  puramente de configuración de Next, no de datos.
- **Bug encontrado de paso: el upload de imagen del Hero nunca
  funcionó.** `lib/supabase/storage.ts` apuntaba a un bucket llamado
  `products` (inglés) que no existe — el bucket real es `productos`
  (español, mismo que usa `ImageUploader.tsx` para fotos de producto).
  Corregido. Como consecuencia, `site_settings` estaba vacía (0 filas)
  porque ningún guardado había tenido éxito nunca.
- **Preloader de marca** (`components/ui/Preloader.tsx`, montado en
  `app/layout.tsx` antes de `<Header/>`). Pantalla de ~2.2s con
  "PERFUMITO14" en `font-serif`/tracking igual al wordmark del Header
  pero más grande, texto en el crema de la marca (`text-background`)
  sobre fondo oscuro (`bg-foreground`) para contraste, más una barra de
  progreso animada con framer-motion. Resuelve también el pendiente
  histórico "preloader más largo" (antes no existía ningún preloader
  global, solo los `loading.tsx` skeleton de Next para `/catalogo` y
  `/producto/[slug]`, que siguen igual).
- **Espacio para modelo 3D (.glb) en el Hero** — feature preparada
  para cuando el cliente tenga el modelo listo, todavía sin usar en
  producción:
  - Nuevo setting `hero_model` en `site_settings` (mismo patrón que
    `hero_image`, no requirió migración por ser jsonb genérico).
  - `app/admin/hero/page.tsx`: nueva sección "Modelo 3D (.glb)" con
    drag & drop + vista previa 3D real, junto a la sección de imagen
    existente. Sube a `productos` bucket, path `model-<uuid>.glb`,
    límite 25MB cliente-side.
  - `lib/supabase/storage.ts`: `uploadModel`/`deleteModel` nuevas.
  - `components/home/Hero.tsx`: si `hero_model` tiene URL, renderiza
    `<model-viewer>` (paquete `@google/model-viewer`, cargado con
    `import('@google/model-viewer')` dentro de `useEffect` — el
    paquete extiende `HTMLElement` a nivel de módulo y rompe el SSR de
    Next si se importa de forma estática) dentro del mismo cuadro
    donde antes solo iba `<Image>`. Si no hay `hero_model`, sigue
    mostrando la imagen de siempre — no se tocó el comportamiento
    actual, solo se añadió la rama nueva.
  - Tipos de `<model-viewer>` en `types/model-viewer.d.ts` — con React
    19 la augmentación es `declare module 'react' { namespace JSX
    {...} }`, **no** `declare global { namespace JSX {...} }` (el
    namespace global ya no existe en los tipos de React 19).
  - **Pendiente real**: el cliente todavía no tiene el archivo .glb.
    Cuando lo suba desde `/admin/hero`, el cambio a 3D es automático,
    no requiere ningún deploy ni código adicional.
- **Datos de cliente en el checkout + pedidos.**
  - Migración `add_cliente_datos_pedidos`: columnas `cliente_nombre`,
    `cliente_telefono`, `cliente_direccion`, `cliente_email` (todas
    `text`, nullable) en `pedidos`.
  - `lib/cartStore.ts`: nuevo slice `cliente` (`DatosCliente`) +
    `setCliente()`. En memoria como el resto del store, no persiste
    entre sesiones.
  - `components/cart/CartDrawer.tsx`: formulario "Tus datos para el
    envío" (nombre, teléfono, dirección, email opcional) antes del
    botón de confirmar.
  - `WhatsAppCheckoutButton.tsx`: bloquea el envío si falta nombre,
    teléfono o dirección; guarda esos datos en el insert de `pedidos`
    y los incluye en el texto del mensaje de WhatsApp
    (`lib/whatsapp.ts`, `construirMensajePedido`/`generarUrlWhatsApp`
    ahora reciben `cliente` como parámetro).
  - `app/admin/pedidos/page.tsx`: cada pedido muestra ahora quién
    compró (nombre, teléfono con link `tel:`, dirección, email con
    link `mailto:`), junto a qué compró. Pedidos anteriores a este
    cambio muestran "sin datos de cliente registrados" en vez de
    romper.
- **Insignias de estado por color** en `/admin/pedidos`, reemplazando
  el `<select>` plano. Semántica elegida (urgencia, no éxito/fracaso —
  pedido explícito del cliente, adaptando su idea de "rojo/gris/verde/
  amarillo" a los 6 estados reales):
  `pendiente`=rojo (requiere acción ya), `confirmado`/`pagado`=ámbar
  (en preparación), `enviado`=azul (en camino), `entregado`=verde
  (completado con éxito), `cancelado`=gris (fuera del flujo activo).
  Sigue siendo un `<select>` funcional, solo se le agregó el punto de
  color + estilos por estado (`STATUS_STYLE` en el mismo archivo).

## Pendiente

1. **Quitar filtros de volumen en catálogo cliente** (pedido
   2026-07-09, no implementado). Revisar
   `components/catalog/ProductFilters.tsx` y `CatalogView.tsx`.
2. **Marca y nombre del perfume en admin** (pedido 2026-07-10, sin
   confirmar todavía). Ya existen `nombre` y `casa_perfumeria` en
   `ProductoForm.tsx`, pero "Casa / Inspiración" está pensado como
   texto libre tipo "Inspirado en las noches de Venecia", no como un
   campo de marca estricto. Confirmar con el cliente si quiere un
   campo "Marca" separado y literal (ej. "Dior") antes de tocar.
3. **Modelo 3D del Hero**: el cliente aún no subió el .glb — el panel
   admin y el switch automático en `Hero.tsx` ya están listos, solo
   falta que suban el archivo desde `/admin/hero`.
4. **"Sidebar transparente" en tablet/móvil, reportado 2026-07-13, no
   reproducido.** Se revisó el código de todos los paneles deslizantes
   (menú móvil `Header.tsx`, `CartDrawer.tsx`, filtros móviles de
   `CatalogView.tsx`, `AdminSidebar.tsx`) y todos usan fondos sólidos
   (`bg-background`/`bg-card`/`bg-white`) — ninguno tiene transparencia
   en el código actual. Falta una captura de pantalla o la URL/pantalla
   exacta donde se ve para poder reproducirlo.
5. **Mantener este archivo actualizado** como fuente de verdad del
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

## Notas de implementación (build / deploy)

- **Incidente 2026-07-13**: se instaló `@google/model-viewer` con
  `npm install`, lo que creó un `package-lock.json` nuevo sin darse
  cuenta de que el repo ya usa `pnpm` (`pnpm-lock.yaml` preexistente).
  Vercel detectó el lockfile equivocado / la dependencia nueva no
  registrada en `pnpm-lock.yaml` y el install falló en cada deploy
  hasta que se corrigió con `pnpm install` (que regenera
  `pnpm-lock.yaml`) y se borró `package-lock.json`. **Antes de instalar
  cualquier dependencia nueva en este repo, confirmar con `ls
  pnpm-lock.yaml` que se sigue usando pnpm.**
- Para reproducir un build local igual al de Vercel (útil cuando un
  deploy falla y no se puede leer el log sin login): el codespace no
  trae `.env.local` por defecto (solo `.env.example`). Escribir un
  `.env.local` temporal con `NEXT_PUBLIC_SUPABASE_URL` y
  `NEXT_PUBLIC_SUPABASE_ANON_KEY` (sacar el anon key con
  `get_publishable_keys` del MCP `supabase-perfumito14`), correr
  `pnpm run build`, y borrar el `.env.local` antes de commitear.
- El TypeScript de este repo usa React 19 — para tipar un custom
  element/web component (como `<model-viewer>`) hay que usar `declare
  module 'react' { namespace JSX { interface IntrinsicElements
  {...} } }`, no `declare global { namespace JSX {...} }` (ese patrón
  antiguo ya no engancha con los tipos de React 19 y da "Property
  'x' does not exist on type JSX.IntrinsicElements").
