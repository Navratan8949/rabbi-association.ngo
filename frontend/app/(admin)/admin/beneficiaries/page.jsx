"use client"
import { AdminCrudPage, StatusBadge } from "@/components/admin/crud-page"
import { Users, FileText, Calendar, Image as ImageIcon } from "lucide-react"

export default function Page() {
  const schema = [
    { name: "name", label: "Full Name", type: "text", required: true },
    { name: "age", label: "Age", type: "number" },
    { 
      name: "gender", 
      label: "Gender", 
      type: "select", 
      options: [
        { label: "Male", value: "Male" },
        { label: "Female", value: "Female" },
        { label: "Other", value: "Other" },
        { label: "Unknown", value: "Unknown" }
      ],
      default: "Unknown"
    },
    { name: "contactNumber", label: "Contact Number", type: "text" },
    { name: "address", label: "Address", type: "textarea" },
    { name: "projectAssisted", label: "Assisted Project ID", type: "text" }, // Optionally populate via select if you fetch projects
    { name: "assistanceType", label: "Assistance Type", type: "text", required: true },
    { name: "assistanceDate", label: "Date of Assistance", type: "date" },
    { name: "notes", label: "Notes/Remarks", type: "textarea" },
    { name: "image", label: "Photo", type: "image" },
    { 
      name: "status", 
      label: "Status", 
      type: "select", 
      options: [
        { label: "Active", value: "active" },
        { label: "Completed", value: "completed" }
      ],
      default: "active"
    }
  ]

  const columns = [
    { 
      key: "image", 
      label: "Photo", 
      render: (r) => (
        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-100 bg-slate-50">
          {r.image?.url ? (
            <img src={r.image.url} alt={r.name} className="h-full w-full object-cover" />
          ) : (
            <ImageIcon className="size-5 text-slate-300" />
          )}
        </div>
      ) 
    },
    { 
      key: "name", 
      label: "Beneficiary Details", 
      render: (r) => (
        <div>
          <div className="font-bold text-navy text-sm">{r.name}</div>
          <div className="text-[11px] font-medium text-slate-500 mt-0.5">
            {r.gender !== "Unknown" ? `${r.gender}, ` : ''}{r.age ? `${r.age} yrs` : ''}
          </div>
        </div>
      )
    },
    { 
      key: "assistanceType", 
      label: "Assistance Type", 
      render: (r) => (
        <div>
          <div className="font-bold text-slate-800 text-sm">{r.assistanceType}</div>
          {r.projectAssisted && r.projectAssisted.title && (
            <div className="text-[11px] font-medium text-slate-500 mt-0.5 flex items-center gap-1.5">
              <FileText className="size-3 text-slate-400" /> {r.projectAssisted.title}
            </div>
          )}
        </div>
      )
    },
    { 
      key: "assistanceDate", 
      label: "Assistance Date", 
      render: (r) => (
        <div className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
          <Calendar className="size-3.5 text-slate-400" />
          {r.assistanceDate ? new Date(r.assistanceDate).toLocaleDateString("en-IN", { day: '2-digit', month: 'short', year: 'numeric' }) : "N/A"}
        </div>
      )
    },
    { 
      key: "status", 
      label: "Status", 
      render: (r) => <StatusBadge status={r.status} /> 
    }
  ]

  return (
    <AdminCrudPage
      title="Beneficiaries"
      description="Manage records of individuals or communities assisted by the organization."
      endpoint="/beneficiaries"
      schema={schema}
      columns={columns}
      icon={<Users className="size-8 text-blue-500" />}
    />
  )
}
