'use client'

const ITEMS = [
  'VERSACE',
  'DIOR',
  'CAROLINA HERRERA',
  'YSL',
  'PACO RABANNE',
  'HUGO BOSS',
  'ARMANI',
  'STOCK LIMITADO',
  'HOY DISPONIBLE · MAÑANA PUEDE NO ESTAR',
  'FORMATO 5ML, 7ML Y 15ML',
  'PEDIDO POR WHATSAPP',
]

export function UrgencyTicker({ dark = false }: { dark?: boolean }) {
  const repeated = [...ITEMS, ...ITEMS]

  return (
    <div
      className={`overflow-hidden border-y-2 border-black py-3 ${dark ? 'bg-black text-white' : 'bg-white text-black'}`}
    >
      <div className="flex animate-ticker whitespace-nowrap">
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="px-6 text-[0.65rem] font-black uppercase tracking-[0.3em]">
              {item}
            </span>
            <span className="text-[0.5rem] opacity-40">◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}
