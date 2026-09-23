"use client"
import { useState } from "react"
import { AdminCrudPage, StatusBadge } from "@/components/admin/crud-page"
import { Button } from "@/components/ui/button"
import { Eye, XCircle, Mail, Phone, User, CalendarDays, Briefcase, HandHeart, CheckCircle2, AlertCircle } from "lucide-react"
import api from "@/service/api"
import { toast } from "sonner"
import { mutate } from "swr"

export default function Page() {
  const [viewItem, setViewItem] = useState(null)
  const [rejecting, setRejecting] = useState(false)
  const [rejectionReason, setRejectionReason] = useState("")

  const schema = [
    { name: "fullName", label: "Full Name", type: "text", required: true },
    { name: "email", label: "Email Address", type: "email", required: true },
    { name: "phone", label: "Mobile Number", type: "text", required: true },
    { name: "password", label: "Create Password", type: "password" },
    { name: "profession", label: "Profession", type: "text", required: true },
    { name: "skills", label: "Skills", type: "text", required: true },
    { name: "availability", label: "Availability", type: "text", required: true },
    { name: "dob", label: "Date of Birth", type: "date" },
    { name: "address", label: "Address", type: "text" },
    { name: "state", label: "State", type: "text" },
    { name: "district", label: "District", type: "text" },
  ]

  const columns = [
    { 
      key: "fullName", 
      label: "Volunteer Details", 
      render: (r) => (
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 border border-blue-100 overflow-hidden">
            {r.profileImage?.url ? (
              <img src={r.profileImage.url} alt={r.fullName} className="h-full w-full object-cover" />
            ) : (
              <HandHeart className="size-5 text-blue-500" />
            )}
          </div>
          <div>
            <div className="font-bold text-navy text-sm">{r.user?.fullName || r.fullName}</div>
            <div className="text-[11px] font-medium text-slate-500 mt-0.5 flex flex-col gap-0.5">
              <span>Applied as: {r.email}</span>
              {r.user?.email && r.user.email !== r.email && (
                <span className="text-amber-600 font-semibold">Login Email: {r.user.email}</span>
              )}
            </div>
          </div>
        </div>
      )
    },
    { 
      key: "profession", 
      label: "Profession & Availability", 
      render: (r) => (
        <div>
          <div className="font-bold text-slate-800 text-sm max-w-[250px] truncate">{r.profession}</div>
          <div className="text-[11px] font-medium text-slate-500 mt-0.5 flex items-center gap-1.5">
            <CalendarDays className="size-3 text-slate-400" />
            Available: {r.availability}
          </div>
        </div>
      )
    },
    { 
      key: "phone", 
      label: "Phone", 
      render: (r) => (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
            <Phone className="size-3.5 text-slate-400" /> {r.user?.mobile || r.phone}
          </div>
          {r.volunteerId && (
             <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 border border-blue-100 rounded px-1.5 py-0.5 w-fit">
               ID: {r.volunteerId}
             </span>
          )}
        </div>
      ) 
    },
    { 
      key: "status", 
      label: "Status", 
      render: (r) => <StatusBadge status={r.status} /> 
    }
  ]

  const handleApprove = async () => {
    if (!confirm("Approve this volunteer application? This will generate a Volunteer ID and send an approval email.")) return;
    try {
      await api.put(`/volunteer/${viewItem._id}/approve`);
      toast.success("Volunteer approved and email sent!");
      window.location.reload();
      setViewItem({ ...viewItem, status: "approved" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to approve volunteer");
    }
  }

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      toast.error("Please provide a rejection reason");
      return;
    }
    try {
      await api.put(`/volunteer/${viewItem._id}/reject`, { reason: rejectionReason });
      toast.success("Volunteer rejected and email sent!");
      window.location.reload();
      setViewItem({ ...viewItem, status: "rejected", rejectionReason });
      setRejecting(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reject volunteer");
    }
  }

  return (
    <>
      <AdminCrudPage
        title="Volunteers"
        description="Manage volunteer applications. Approved volunteers will get access to the volunteer portal."
        endpoint="/volunteer"
        schema={schema}
        columns={columns}
        primaryAction="Add Volunteer"
        customActions={(item) => (
          <Button 
            onClick={() => setViewItem(item)} 
            variant="outline" 
            size="sm" 
            className="h-7 px-3 bg-navy/5 text-navy hover:bg-navy hover:text-white border-navy/20 rounded-lg ml-2"
          >
            <Eye className="size-3.5 mr-1.5" /> View
          </Button>
        )}
      />

      {viewItem && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-navy/60 backdrop-blur-md p-4">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden flex flex-col max-h-[90vh] ring-1 ring-black/5">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-navy/5 bg-gradient-to-r from-navy to-[#022c1d] px-6 py-5 shrink-0">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <HandHeart className="size-5 text-white" />
                </div>
                <h3 className="text-xl font-extrabold text-white tracking-wide">
                  Volunteer Application Details
                </h3>
              </div>
              <button onClick={() => { setViewItem(null); setRejecting(false); }} className="rounded-full bg-white/10 p-2 text-white/80 transition-all hover:bg-rose-500 hover:text-white">
                <XCircle className="size-4" />
              </button>
            </div>

            {/* Body */}
            <div className="overflow-y-auto p-6 bg-slate-50/50">
              <div className="flex flex-col gap-6">
                
                {/* Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center border border-slate-200 overflow-hidden shrink-0">
                      {viewItem.profileImage?.url ? (
                        <img src={viewItem.profileImage.url} alt="Profile" className="h-full w-full object-cover" />
                      ) : (
                        <User className="size-7 text-slate-400" />
                      )}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Applicant Info</p>
                      <p className="text-base font-bold text-navy flex items-center gap-2">
                        {viewItem.fullName}
                        {viewItem.volunteerId && (
                           <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded">
                             {viewItem.volunteerId}
                           </span>
                        )}
                      </p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-1">
                        <a href={`mailto:${viewItem.user?.email || viewItem.email}`} className="text-xs font-semibold text-blue-600 flex items-center gap-1.5 hover:underline">
                          <Mail className="size-3.5" /> {viewItem.user?.email || viewItem.email}
                        </a>
                        {(viewItem.user?.mobile || viewItem.phone) && (
                          <a href={`tel:${viewItem.user?.mobile || viewItem.phone}`} className="text-xs font-semibold text-slate-600 flex items-center gap-1.5 hover:underline">
                            <Phone className="size-3.5" /> {viewItem.user?.mobile || viewItem.phone}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right sm:border-l sm:border-slate-100 sm:pl-6">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Current Status</p>
                    <StatusBadge status={viewItem.status} />
                  </div>
                </div>

                {/* Status Action Cards */}
                {viewItem.status === 'pending' && (
                  <div className="bg-white rounded-xl border border-amber-200 shadow-sm overflow-hidden p-5 flex flex-col gap-4">
                    <div className="flex items-start gap-3">
                       <AlertCircle className="size-5 text-amber-500 mt-0.5 shrink-0" />
                       <div>
                         <h4 className="font-bold text-amber-900 text-sm">Action Required</h4>
                         <p className="text-xs font-medium text-amber-700/80 mt-1">Review the details and approve or reject this application. Approving will generate a Volunteer ID and email the volunteer.</p>
                       </div>
                    </div>
                    
                    {!rejecting ? (
                      <div className="flex gap-3">
                        <Button onClick={handleApprove} className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold h-10 rounded-xl">
                          <CheckCircle2 className="size-4 mr-2" /> Approve Application
                        </Button>
                        <Button onClick={() => setRejecting(true)} variant="outline" className="flex-1 border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700 font-bold h-10 rounded-xl">
                          <XCircle className="size-4 mr-2" /> Reject Application
                        </Button>
                      </div>
                    ) : (
                      <div className="bg-rose-50 p-4 rounded-xl border border-rose-100 space-y-3">
                        <h5 className="text-xs font-bold uppercase tracking-widest text-rose-800">Reason for Rejection</h5>
                        <textarea 
                          className="w-full text-sm rounded-lg border-rose-200 bg-white p-3 focus:ring-rose-500 focus:border-rose-500" 
                          placeholder="Please provide a reason to send to the volunteer..."
                          rows={3}
                          value={rejectionReason}
                          onChange={(e) => setRejectionReason(e.target.value)}
                        />
                        <div className="flex gap-2 justify-end">
                          <Button onClick={() => setRejecting(false)} variant="ghost" size="sm" className="text-rose-600 hover:bg-rose-100 h-8 rounded-lg font-semibold">Cancel</Button>
                          <Button onClick={handleReject} size="sm" className="bg-rose-600 hover:bg-rose-700 text-white h-8 rounded-lg font-bold shadow-sm">Confirm Rejection</Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {viewItem.status === 'rejected' && viewItem.rejectionReason && (
                  <div className="bg-rose-50 p-4 rounded-xl border border-rose-200">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-rose-800 mb-1">Rejection Reason</p>
                    <p className="text-sm text-rose-900 font-medium">{viewItem.rejectionReason}</p>
                  </div>
                )}

                {/* Professional Info */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="bg-blue-50/50 p-4 border-b border-slate-100 flex items-center gap-2">
                    <Briefcase className="size-4 text-blue-600" />
                    <h4 className="font-bold text-navy text-sm uppercase tracking-wide">Professional Details & Skills</h4>
                  </div>
                  <div className="p-5 space-y-4">
                    <div>
                      <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Profession / Designation</h5>
                      <p className="text-sm font-semibold text-slate-800">{viewItem.profession}</p>
                    </div>
                    <div>
                      <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Skills / Areas of Expertise</h5>
                      <p className="text-sm font-medium text-slate-600">{viewItem.skills}</p>
                    </div>
                    <div>
                      <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Availability</h5>
                      <p className="text-sm font-medium text-slate-600">{viewItem.availability}</p>
                    </div>
                    {viewItem.user?.dob && (
                      <div>
                        <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Date of Birth</h5>
                        <p className="text-sm font-medium text-slate-600">{new Date(viewItem.user.dob).toLocaleDateString()}</p>
                      </div>
                    )}
                    {(viewItem.user?.address || viewItem.user?.district || viewItem.user?.state) && (
                      <div>
                        <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Location Details</h5>
                        <p className="text-sm font-medium text-slate-600">
                          {viewItem.user.address && `${viewItem.user.address}, `}
                          {viewItem.user.district && `${viewItem.user.district}, `}
                          {viewItem.user.state}
                        </p>
                      </div>
                    )}
                    {viewItem.idProof?.url && (
                      <div>
                        <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">ID Proof</h5>
                        <a href={viewItem.idProof.url} target="_blank" rel="noreferrer" className="text-sm font-semibold text-blue-600 hover:underline">
                          View Uploaded Document
                        </a>
                      </div>
                    )}
                    {viewItem.message && (
                      <div>
                        <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Message</h5>
                        <div className="text-sm text-slate-600 font-medium leading-relaxed whitespace-pre-wrap bg-slate-50 p-4 rounded-lg border border-slate-100">
                          {viewItem.message}
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                        <CalendarDays className="size-3.5" />
                        Applied on: {new Date(viewItem.createdAt).toLocaleString("en-IN", { dateStyle: 'medium', timeStyle: 'short' })}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Footer */}
            <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 shrink-0 flex justify-end">
              <Button variant="outline" onClick={() => { setViewItem(null); setRejecting(false); }} className="h-10 rounded-xl px-6 font-bold uppercase tracking-widest text-xs text-slate-600 hover:bg-slate-200 hover:text-navy">
                Close
              </Button>
            </div>

          </div>
        </div>
      )}
    </>
  )
}
