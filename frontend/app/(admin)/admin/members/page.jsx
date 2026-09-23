"use client";
import { useState } from "react";
import { AdminCrudPage, StatusBadge } from "@/components/admin/crud-page";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Loader2,
  ShieldCheck,
  XCircle,
  Eye,
  AlertTriangle,
  Printer,
  Download,
} from "lucide-react";
import api from "@/service/api";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/features/userSlice";
import { canAccessAdminModule } from "@/lib/admin-permissions";
import { IdCard } from "@/components/shared/id-card";

const memberSchema = [
  { name: "fullName", label: "Full Name", type: "text", required: true },
  { name: "email", label: "Email Address", type: "email", required: true },
  { name: "mobile", label: "Mobile Number", type: "text", required: true },
  {
    name: "password",
    label: "Set User Password",
    type: "text",
    required: true,
    placeholder: "Create a password for this user",
  },
  { name: "guardianName", label: "Guardian Name (S/O, W/O, D/O)", type: "text" },
  { name: "guardianMobile", label: "Guardian Mobile Number", type: "text" },
  {
    name: "bloodGroup",
    label: "Blood Group",
    type: "select",
    options: [
      { label: "A+", value: "A+" },
      { label: "A-", value: "A-" },
      { label: "B+", value: "B+" },
      { label: "B-", value: "B-" },
      { label: "AB+", value: "AB+" },
      { label: "AB-", value: "AB-" },
      { label: "O+", value: "O+" },
      { label: "O-", value: "O-" },
    ],
  },
  { name: "profession", label: "Profession", type: "text" },
  { name: "aadharNo", label: "Aadhar Number", type: "text" },
  {
    name: "idProofType",
    label: "ID Proof Type",
    type: "select",
    options: [
      { label: "Aadhar Card", value: "Aadhar Card" },
      { label: "PAN Card", value: "PAN Card" },
      { label: "Voter ID", value: "Voter ID" },
      { label: "Driving License", value: "Driving License" }
    ]
  },
  {
    name: "roleApplied",
    label: "Membership Tier",
    type: "select",
    options: [
      { label: "General Member (₹199)", value: "General Member" },
      { label: "Ward Level (₹501)", value: "Ward Level" },
      { label: "Panchayat Level (₹1001)", value: "Panchayat Level" },
      { label: "Block Level (₹2001)", value: "Block Level" },
      { label: "District Level (₹2501)", value: "District Level" },
      { label: "Division Level (₹5001)", value: "Division Level" },
      { label: "State Level (₹10001)", value: "State Level" },
      { label: "Sthayi Sadasya (₹11000)", value: "Sthayi Sadasya" }
    ],
    onChange: (value, setFormData) => {
      const prices = {
        "General Member": 199,
        "Ward Level": 501,
        "Panchayat Level": 1001,
        "Block Level": 2001,
        "District Level": 2501,
        "Division Level": 5001,
        "State Level": 10001,
        "Sthayi Sadasya": 11000
      };
      if (prices[value]) {
        setFormData(prev => ({ ...prev, paymentAmount: prices[value] }));
      }
    }
  },
  { name: "paymentAmount", label: "Payment Amount (₹)", type: "number" },
  { name: "transactionId", label: "Transaction ID", type: "text" },
  { name: "dob", label: "Date of Birth", type: "date" },
  { name: "address", label: "Full Address", type: "textarea" },
  { name: "state", label: "State", type: "text" },
  { name: "district", label: "District", type: "text" },
  { name: "profileImage", label: "Profile Photo", type: "file" },
  { name: "idProof", label: "ID Proof Document", type: "file" },
  { name: "paymentScreenshot", label: "Payment Screenshot", type: "file" }
];

export default function Page() {
  const user = useSelector(selectUser);
  const canReviewMembers = user?.role === "admin";
  const [selectedMember, setSelectedMember] = useState(null);
  const [idCardMember, setIdCardMember] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const handleAction = async (action, id, explicitReason = null) => {
    let payload = {};
    if (action === "reject") {
      const reasonToUse =
        explicitReason !== null ? explicitReason : rejectReason;
      if (!reasonToUse?.trim()) {
        alert("A reason is required to reject an application.");
        return;
      }
      payload.reason = reasonToUse;
    }

    setIsProcessing(true);
    try {
      await api.put(`/members/${id}/${action}`, payload);
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || "Action failed");
      setIsProcessing(false);
    }
  };

  return (
    <>
      <AdminCrudPage
        title="Members"
        description="Manage all trust members, their types, and approval statuses."
        endpoint="/members"
        schema={memberSchema}
        mapEditData={(item) => ({
          ...item,
          fullName: item.user?.fullName || "",
          email: item.user?.email || "",
          mobile: item.user?.mobile || "",
          dob: item.user?.dob ? new Date(item.user.dob).toISOString().split('T')[0] : "",
          address: item.user?.address || "",
          state: item.user?.state || "",
          district: item.user?.district || "",
          profileImage: item.profileImage || item.user?.profileImage || null,
        })}
        columns={[
          { key: "memberId", label: "Member ID" },
          {
            key: "name",
            label: "Name",
            render: (r) => r.user?.fullName || "N/A",
          },
          {
            key: "email",
            label: "Email",
            render: (r) => r.user?.email || "N/A",
          },
          {
            key: "roleApplied",
            label: "Membership Tier",
            render: (r) => r.roleApplied || "N/A",
          },
          {
            key: "paymentAmount",
            label: "Amount (₹)",
            render: (r) => r.paymentAmount ? `₹${r.paymentAmount}` : "N/A",
          },
          {
            key: "status",
            label: "Status",
            render: (r) => <StatusBadge status={r.membershipStatus} />,
          },
        ]}
        customActions={(r) => (
          <div className="flex gap-2 items-center">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setSelectedMember(r);
                setIsRejecting(false);
                setRejectReason("");
              }}
              className="rounded-lg h-7 px-3 bg-navy/5 text-navy hover:bg-navy hover:text-black border-navy/20"
            >
              <Eye className="size-3.5 mr-1.5" /> View
            </Button>
            {canReviewMembers && r.membershipStatus === "pending" && (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    handleAction("approve", r._id || r.memberId)
                  }
                  disabled={isProcessing}
                  className="rounded-lg h-7 px-3 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-black border-blue-200"
                >
                  <ShieldCheck className="size-3.5 mr-1.5" /> Approve
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const reason = prompt("Enter reason for rejection:");
                    if (reason) {
                      handleAction("reject", r._id || r.memberId, reason);
                    }
                  }}
                  disabled={isProcessing}
                  className="rounded-lg h-7 px-3 bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-black border-rose-200"
                >
                  <XCircle className="size-3.5 mr-1.5" /> Reject
                </Button>
              </>
            )}
            {r.membershipStatus === "approved" && (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIdCardMember(r)}
                  className="rounded-lg h-7 px-3 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-black border-blue-200"
                >
                  <Printer className="size-3.5 mr-1.5" /> ID Card
                </Button>

                {r.appointmentLetterUrl && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(r.appointmentLetterUrl, "_blank")}
                    className="rounded-lg h-7 px-3 bg-amber-50 text-amber-700 hover:bg-amber-600 hover:text-black border-amber-200"
                  >
                    <Download className="size-3.5 mr-1.5" /> Appt. Letter
                  </Button>
                )}
              </>
            )}
          </div>
        )}
      />

      {idCardMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <style
            dangerouslySetInnerHTML={{
              __html: `
            @media print {
              @page { size: auto; margin: 0; }
              body { 
                -webkit-print-color-adjust: exact !important; 
                print-color-adjust: exact !important; 
              }
              body * { visibility: hidden; }
              #id-card, #id-card * { visibility: visible; }
              #id-card { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); }
            }
          `,
            }}
          />
          <div className="w-full max-w-md rounded-2xl bg-slate-50 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between border-b border-border/50 bg-white px-6 py-4 shrink-0">
              <h3 className="text-xl font-bold text-navy">
                Member ID Card
              </h3>
              <button
                onClick={() => setIdCardMember(null)}
                className="text-muted-foreground hover:text-navy transition-colors"
              >
                <XCircle className="size-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto bg-slate-100/50 flex justify-center">
              <IdCard
                member={idCardMember}
                user={idCardMember.user}
                verificationUrl={`${typeof window !== "undefined" ? window.location.origin : "https://real-human-trust-nu.vercel.app"}/verify-member/${idCardMember.memberId}`}
              />
            </div>

            <div className="bg-white px-6 py-4 border-t border-border/50 shrink-0 flex gap-4">
              <Button
                onClick={() => window.print()}
                className="flex-1 bg-navy text-white hover:bg-navy/90 h-10 rounded-xl font-bold"
              >
                <Printer className="size-4 mr-2" /> Print Card
              </Button>
              <Button
                variant="outline"
                onClick={() => setIdCardMember(null)}
                className="flex-1 h-10 rounded-xl font-semibold"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {selectedMember && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 print:hidden">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between border-b border-border/50 bg-slate-50 px-6 py-4 shrink-0">
              <h3 className="text-xl font-bold text-navy">
                Review Application
              </h3>
              <button
                onClick={() => !isProcessing && setSelectedMember(null)}
                className="text-muted-foreground hover:text-navy transition-colors"
              >
                <XCircle className="size-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                <div>
                  <p className="text-[10px] font-bold uppercase text-slate-500">Full Name</p>
                  <p className="font-semibold text-slate-800">{selectedMember.user?.fullName || "N/A"}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-slate-500">Member ID</p>
                  <p className="font-mono font-semibold text-slate-800">{selectedMember.memberId}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-slate-500">Email Address</p>
                  <p className="font-semibold text-slate-800">{selectedMember.user?.email || "N/A"}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-slate-500">Mobile Number</p>
                  <p className="font-semibold text-slate-800">{selectedMember.user?.mobile || "N/A"}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-slate-500">Date of Birth</p>
                  <p className="font-semibold text-slate-800">{selectedMember.user?.dob ? new Date(selectedMember.user.dob).toLocaleDateString() : "N/A"}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-slate-500">Blood Group</p>
                  <p className="font-semibold text-slate-800">{selectedMember.bloodGroup || "N/A"}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-slate-500">Guardian's Name</p>
                  <p className="font-semibold text-slate-800">{selectedMember.guardianName || "N/A"}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-slate-500">Guardian's Mobile</p>
                  <p className="font-semibold text-slate-800">{selectedMember.guardianMobile || "N/A"}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-slate-500">Profession / Occupation</p>
                  <p className="font-semibold text-slate-800">{selectedMember.profession || "N/A"}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-slate-500">Aadhar Number</p>
                  <p className="font-semibold text-slate-800">{selectedMember.aadharNo || "N/A"}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-slate-500">ID Proof Type</p>
                  <p className="font-semibold text-slate-800">{selectedMember.idProofType || "N/A"}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-slate-500">Gender</p>
                  <p className="font-semibold text-slate-800">{selectedMember.user?.gender || "N/A"}</p>
                </div>

                <div className="col-span-2 border-t border-slate-100 my-2"></div>

                <div className="col-span-2">
                  <p className="text-[10px] font-bold uppercase text-slate-500">Full Address</p>
                  <p className="font-semibold text-slate-800">{selectedMember.user?.address || "N/A"}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-slate-500">District</p>
                  <p className="font-semibold text-slate-800">{selectedMember.user?.district || "N/A"}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-slate-500">State</p>
                  <p className="font-semibold text-slate-800">{selectedMember.user?.state || "N/A"}</p>
                </div>

                <div className="col-span-2 border-t border-slate-100 my-2"></div>

                <div>
                  <p className="text-[10px] font-bold uppercase text-slate-500">Membership Tier</p>
                  <p className="font-semibold text-slate-800">{selectedMember.roleApplied || "N/A"}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-slate-500">Payment Amount</p>
                  <p className="font-semibold text-slate-800">{selectedMember.paymentAmount ? `₹${selectedMember.paymentAmount}` : "N/A"}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-[10px] font-bold uppercase text-slate-500">Transaction ID / UTR No.</p>
                  <p className="font-semibold text-slate-800">{selectedMember.transactionId || "N/A"}</p>
                </div>

                <div className="col-span-2 border-t border-slate-100 my-2"></div>

                <div>
                  <p className="text-[10px] font-bold uppercase text-slate-500">
                    Status
                  </p>
                  <StatusBadge status={selectedMember.membershipStatus} />
                </div>

                {selectedMember.membershipStatus === "rejected" &&
                  selectedMember.rejectionReason && (
                    <div className="col-span-2 mt-2 bg-rose-50 border border-rose-100 rounded-lg p-3">
                      <p className="text-[10px] font-bold uppercase text-rose-700 mb-1">
                        Rejection Reason
                      </p>
                      <p className="text-sm font-medium text-rose-900">
                        {selectedMember.rejectionReason}
                      </p>
                    </div>
                  )}
              </div>

              <div className="mt-8 grid grid-cols-4 gap-4 border-t border-dashed border-border/60 pt-6">
                <div>
                  <p className="text-[10px] font-bold uppercase text-slate-500 mb-2">
                    Profile Photo
                  </p>
                  {selectedMember.profileImage?.url ? (
                    <a
                      href={selectedMember.profileImage.url}
                      target="_blank"
                      rel="noreferrer"
                      className="block rounded-xl border border-border/60 overflow-hidden hover:opacity-80 transition-opacity"
                    >
                      <img
                        src={selectedMember.profileImage.url}
                        alt="Profile"
                        className="w-full h-24 object-cover"
                      />
                    </a>
                  ) : (
                    <div className="h-24 rounded-xl bg-slate-100 flex items-center justify-center text-xs text-slate-400">
                      No Image
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-slate-500 mb-2">
                    ID Proof
                  </p>
                  {selectedMember.idProof?.url ? (
                    <a
                      href={selectedMember.idProof.url}
                      target="_blank"
                      rel="noreferrer"
                      className="block rounded-xl border border-border/60 overflow-hidden hover:opacity-80 transition-opacity"
                    >
                      {selectedMember.idProof.url.endsWith(".pdf") ? (
                        <div className="h-24 bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-xs">
                          View PDF Proof
                        </div>
                      ) : (
                        <img
                          src={selectedMember.idProof.url}
                          alt="ID Proof"
                          className="w-full h-24 object-cover"
                        />
                      )}
                    </a>
                  ) : (
                    <div className="h-24 rounded-xl bg-slate-100 flex items-center justify-center text-xs text-slate-400">
                      No Document
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-slate-500 mb-2">
                    Other Doc
                  </p>
                  {selectedMember.otherDoc?.url ? (
                    <a
                      href={selectedMember.otherDoc.url}
                      target="_blank"
                      rel="noreferrer"
                      className="block rounded-xl border border-border/60 overflow-hidden hover:opacity-80 transition-opacity"
                    >
                      {selectedMember.otherDoc.url.endsWith(
                        ".pdf",
                      ) ? (
                        <div className="h-24 bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-xs">
                          View PDF Doc
                        </div>
                      ) : (
                        <img
                          src={selectedMember.otherDoc.url}
                          alt="Other Document"
                          className="w-full h-24 object-cover"
                        />
                      )}
                    </a>
                  ) : (
                    <div className="h-24 rounded-xl bg-slate-100 flex items-center justify-center text-xs text-slate-400">
                      No Document
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase text-slate-500 mb-2">
                    Payment SS
                  </p>
                  {selectedMember.paymentScreenshot?.url ? (
                    <a
                      href={selectedMember.paymentScreenshot.url}
                      target="_blank"
                      rel="noreferrer"
                      className="block rounded-xl border border-border/60 overflow-hidden hover:opacity-80 transition-opacity"
                    >
                      <img
                        src={selectedMember.paymentScreenshot.url}
                        alt="Payment Screenshot"
                        className="w-full h-24 object-cover"
                      />
                    </a>
                  ) : (
                    <div className="h-24 rounded-xl bg-slate-100 flex items-center justify-center text-xs text-slate-400 text-center px-2">
                      No Screenshot
                    </div>
                  )}
                </div>
              </div>
            </div>

            {canReviewMembers &&
              selectedMember.membershipStatus === "pending" && (
                <div className="bg-slate-50 px-6 py-4 border-t border-border/50 shrink-0">
                  {isRejecting ? (
                    <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2">
                      <div>
                        <p className="text-sm font-bold text-rose-800 flex items-center gap-1.5 mb-2">
                          <AlertTriangle className="size-4" /> Why are you
                          rejecting this application?
                        </p>
                        <Textarea
                          placeholder="E.g., ID proof is not clear, please upload a valid Aadhar card."
                          className="bg-white resize-none"
                          value={rejectReason}
                          onChange={(e) => setRejectReason(e.target.value)}
                        />
                      </div>
                      <div className="flex gap-3">
                        <Button
                          disabled={isProcessing}
                          onClick={() =>
                            handleAction("reject", selectedMember._id)
                          }
                          className="flex-1 bg-rose-600 text-white hover:bg-rose-700 h-10 rounded-lg text-sm font-bold"
                        >
                          {isProcessing ? (
                            <Loader2 className="animate-spin size-4" />
                          ) : (
                            "Confirm Reject"
                          )}
                        </Button>
                        <Button
                          disabled={isProcessing}
                          variant="outline"
                          onClick={() => setIsRejecting(false)}
                          className="flex-1 h-10 rounded-lg text-sm font-semibold"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-4">
                      <Button
                        disabled={isProcessing}
                        onClick={() =>
                          handleAction("approve", selectedMember._id)
                        }
                        className="flex-1 bg-blue-600 text-white hover:bg-blue-700 h-12 rounded-xl text-base font-bold shadow-sm"
                      >
                        {isProcessing ? (
                          <Loader2 className="animate-spin size-5" />
                        ) : (
                          <>
                            <ShieldCheck className="size-5 mr-2" /> Approve
                            Membership
                          </>
                        )}
                      </Button>
                      <Button
                        disabled={isProcessing}
                        onClick={() => setIsRejecting(true)}
                        variant="outline"
                        className="flex-1 border-rose-200 text-rose-600 hover:bg-rose-50 h-12 rounded-xl text-base font-bold"
                      >
                        <XCircle className="size-5 mr-2" /> Reject
                      </Button>
                    </div>
                  )}
                </div>
              )}
          </div>
        </div>
      )}
    </>
  );
}
