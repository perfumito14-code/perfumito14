import { AdminSidebar } from '@/components/admin/AdminSidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-[200] flex flex-col overflow-hidden bg-stone-50 md:flex-row">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-5 pb-16 pt-5 md:p-10">
          {children}
        </div>
      </main>
    </div>
  )
}
