"use client"
import { useState, useEffect } from "react"
import { AdminCrudPage, StatusBadge } from "@/components/admin/crud-page"
import { getMembers } from "@/service/member.service"
import api from "@/service/api"

export default function Page() {
  const [memberOptions, setMemberOptions] = useState([])
  const [volunteerOptions, setVolunteerOptions] = useState([])
  
  useEffect(() => {
    // Fetch members to populate the select dropdown
    getMembers()
      .then(res => {
        if (res.success) {
          const options = res.members.map(m => ({
            label: `${m.user?.fullName || 'Unknown'} (${m.memberId})`,
            value: m._id
          }))
          setMemberOptions(options)
        }
      })
      .catch(console.error)

    // Fetch volunteers to populate the select dropdown
    api.get('/volunteer')
      .then(res => {
        if (res.data?.success) {
          const options = res.data.volunteers
            .filter(v => v.status === "approved")
            .map(v => ({
              label: `${v.user?.fullName || 'Unknown'} (${v.volunteerId})`,
              value: v._id
            }))
          setVolunteerOptions(options)
        }
      })
      .catch(console.error)
  }, [])

  const certificateSchema = [
    { 
      name: "member", 
      label: "Select Member (Leave blank if Volunteer)", 
      type: "select", 
      required: false,
      options: [{label: "--- None ---", value: ""}, ...memberOptions]
    },
    { 
      name: "volunteer", 
      label: "Select Volunteer (Leave blank if Member)", 
      type: "select", 
      required: false,
      options: [{label: "--- None ---", value: ""}, ...volunteerOptions]
    },
    { name: "certificateNo", label: "Certificate Number", type: "text", required: true },
    { name: "title", label: "Certificate Title", type: "text", required: true },
    { name: "description", label: "Description", type: "textarea", required: false },
    { 
      name: "status", 
      label: "Status", 
      type: "select", 
      required: true,
      options: [
        { label: "Active", value: "active" },
        { label: "Cancelled", value: "cancelled" }
      ] 
    }
  ]

  const columns = [
    { key: "certificateNo", label: "Cert No." },
    { key: "title", label: "Title" },
    { 
      key: "recipient", 
      label: "Issued To",
      render: (r) => {
        if (r.member) return `${r.member.user?.fullName || "Unknown"} (Member)`;
        if (r.volunteer) return `${r.volunteer.user?.fullName || "Unknown"} (Volunteer)`;
        return "Unknown";
      }
    },
    { 
      key: "pdf", 
      label: "Document",
      render: (r) => {
        if (!r.pdf?.url) return <span className="text-muted-foreground text-xs">No File</span>
        const isImage = r.pdf.url.match(/\.(jpeg|jpg|gif|png|webp)$/i)
        return isImage ? (
          <div className="relative h-12 w-20 overflow-hidden rounded border">
            <img src={r.pdf.url} alt="Certificate" className="h-full w-full object-cover" />
          </div>
        ) : (
          <a href={r.pdf.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View PDF</a>
        )
      }
    },
    { key: "status", label: "Status", render: (r) => <StatusBadge status={r.status} /> }
  ]

  return (
    <AdminCrudPage
      title="Certificates"
      description="Issue and manage certificates for registered members and volunteers."
      endpoint="/certificates"
      schema={certificateSchema}
      columns={columns}
    />
  )
}
