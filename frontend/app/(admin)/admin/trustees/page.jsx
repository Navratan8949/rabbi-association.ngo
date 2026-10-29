"use client"
import { useState } from "react"
import { AdminCrudPage, StatusBadge } from "@/components/admin/crud-page"
import { Button } from "@/components/ui/button"
import { Eye, XCircle, User, Mail, Phone, Globe, ShieldCheck, Heart, Sparkles, Building2 } from "lucide-react"

const TRUSTEE_SCHEMA = [
  { name: "name", label: "Full Name", type: "text", required: true },
  { 
    name: "category", 
    label: "Role Category", 
    type: "select", 
    options: [
      { label: "Trustee", value: "trustee" },
      { label: "Inspirational Person / Guiding Light", value: "inspirational_person" },
      { label: "Founder / President", value: "founder" },
      { label: "Patron / Advisor", value: "advisory" },
      { label: "Other Leadership", value: "other" }
    ],
    required: true
  },
  { name: "designation", label: "Designation / Title", type: "text", required: true, placeholder: "e.g. Managing Trustee, Inspiration & Guiding Light" },
  { name: "description", label: "Biography / Message / Tribute (Optional)", type: "textarea", placeholder: "A brief description of their contribution, vision, or inspiration..." },
  { name: "photo", label: "Photo / Portrait", type: "file" },
  { name: "email", label: "Email Address (Optional)", type: "email" },
  { name: "phone", label: "Phone Number (Optional)", type: "text" },
  { name: "website", label: "Website / Profile Link (Optional)", type: "text" },
  { name: "order", label: "Display Order (e.g. 1, 2, 3)", type: "number" },
  { 
    name: "status", 
    label: "Status", 
    type: "select", 
    options: [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" }
    ],
    required: true
  }
]

const getCategoryBadge = (category) => {
  switch (category) {
    case "inspirational_person":
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-bold text-amber-700 border border-amber-200">
          <Sparkles className="size-3" /> Inspiration
        </span>
      )
    case "founder":
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-0.5 text-[11px] font-bold text-indigo-700 border border-indigo-200">
          <Building2 className="size-3" /> Founder
        </span>
      )
    case "advisory":
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-2.5 py-0.5 text-[11px] font-bold text-purple-700 border border-purple-200">
          <ShieldCheck className="size-3" /> Advisor
        </span>
      )
    default:
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-bold text-blue-700 border border-blue-200">
          <ShieldCheck className="size-3" /> Trustee
        </span>
      )
  }
}

const COLUMNS = [
  { 
    key: "member", 
    label: "Person Details", 
    render: (r) => (
      <div className="flex items-center gap-3">
        <div className="size-12 shrink-0 overflow-hidden rounded-full border-2 border-slate-200 bg-slate-100 shadow-sm flex items-center justify-center">
          <img 
            src={r.photo?.url || `https://ui-avatars.com/api/?name=${encodeURIComponent(r.name || "Trustee")}&background=051e57&color=fff&size=256`} 
            alt={r.name} 
            className="size-full object-cover" 
            onError={(e) => { e.currentTarget.src = "/placeholder-user.svg"; }}
          />
        </div>
        <div>
          <div className="font-bold text-navy text-sm leading-none">{r.name}</div>
          <div className="text-[11px] font-semibold text-blue-600 mt-1 uppercase tracking-wide">{r.designation}</div>
        </div>
      </div>
    )
  },
  { 
    key: "category", 
    label: "Category", 
    render: (r) => getCategoryBadge(r.category)
  },
  { 
    key: "contact", 
    label: "Contact", 
    render: (r) => (
      <div className="flex flex-col gap-0.5 text-[11px] text-slate-600 font-medium">
        {r.email && (
          <div className="flex items-center gap-1.5 truncate max-w-[200px]">
            <Mail className="size-3 text-slate-400 shrink-0" /> {r.email}
          </div>
        )}
        {r.phone && (
          <div className="flex items-center gap-1.5">
            <Phone className="size-3 text-slate-400 shrink-0" /> {r.phone}
          </div>
        )}
        {!r.email && !r.phone && <span className="text-slate-400 italic">No contact info</span>}
      </div>
    )
  },
  { key: "order", label: "Order", render: (r) => <span className="font-mono font-bold text-slate-600">{r.order || 0}</span> },
  { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> }
]

export default function TrusteesAdminPage() {
  const [viewItem, setViewItem] = useState(null)

  return (
    <>
      <AdminCrudPage
        title="Founders & Trustees"
        description="Add and manage organization founders, board of trustees, and inspirational figures."
        endpoint="/trustees"
        schema={TRUSTEE_SCHEMA}
        columns={COLUMNS}
        customActions={(item) => (
          <Button 
            onClick={() => setViewItem(item)} 
            variant="outline" 
            size="sm" 
            className="h-7 px-3 bg-navy/5 text-navy hover:bg-navy hover:text-white border-navy/20 rounded-lg text-xs font-semibold"
          >
            <Eye className="size-3.5 mr-1" /> View
          </Button>
        )}
      />

      {/* Details View Modal */}
      {viewItem && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-navy/60 backdrop-blur-md p-4">
          <div className="w-full max-w-xl rounded-2xl bg-white shadow-2xl overflow-hidden flex flex-col max-h-[90vh] ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-navy/5 bg-gradient-to-r from-navy to-[#022c1d] px-6 py-4">
              <h3 className="text-lg font-extrabold text-white">Trustee Details</h3>
              <button 
                onClick={() => setViewItem(null)} 
                className="rounded-full bg-white/10 p-2 text-white/80 hover:bg-rose-500 hover:text-white transition-all"
              >
                <XCircle className="size-4" />
              </button>
            </div>

            {/* Body */}
            <div className="overflow-y-auto p-6 bg-slate-50 space-y-6">
              <div className="flex items-center gap-5 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="size-20 shrink-0 overflow-hidden rounded-full border-2 border-slate-200 bg-slate-100 shadow-sm flex items-center justify-center">
                  <img 
                    src={viewItem.photo?.url || `https://ui-avatars.com/api/?name=${encodeURIComponent(viewItem.name || "Trustee")}&background=051e57&color=fff&size=256`} 
                    alt={viewItem.name} 
                    className="size-full object-cover" 
                    onError={(e) => { e.currentTarget.src = "/placeholder-user.svg"; }}
                  />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-navy">{viewItem.name}</h4>
                  <p className="text-sm font-semibold text-blue-600 mt-0.5">{viewItem.designation}</p>
                  <div className="mt-2 flex items-center gap-2">
                    {getCategoryBadge(viewItem.category)}
                    <StatusBadge status={viewItem.status} />
                  </div>
                </div>
              </div>

              {viewItem.description && (
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Biography / Tribute / Vision</p>
                  <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-wrap">{viewItem.description}</p>
                </div>
              )}

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block font-semibold mb-0.5">Email</span>
                  <span className="font-semibold text-navy">{viewItem.email || "N/A"}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold mb-0.5">Phone</span>
                  <span className="font-semibold text-navy">{viewItem.phone || "N/A"}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold mb-0.5">Website</span>
                  <span className="font-semibold text-navy truncate block">{viewItem.website || "N/A"}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold mb-0.5">Display Order</span>
                  <span className="font-semibold text-navy">{viewItem.order || 0}</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-200 bg-slate-50 px-6 py-3.5 flex justify-end">
              <Button 
                onClick={() => setViewItem(null)} 
                variant="outline" 
                size="sm" 
                className="rounded-xl px-5 text-xs font-bold text-slate-600"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

