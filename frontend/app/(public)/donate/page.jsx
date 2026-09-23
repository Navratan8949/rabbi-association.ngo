"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Camera, Building2, Smartphone, ShieldCheck, Target, Wallet } from "lucide-react";
import api from "@/service/api";
import { getSiteContentById } from "@/service/site-content.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function DonatePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    amount: 1000,
    customAmount: "1000",
    purpose: "General Fund (Where Needed Most)",
    fullName: "",
    email: "",
    phone: "",
    city: "",
    paymentMethod: "online",
    transactionId: ""
  });

  const [campaignId, setCampaignId] = useState(null);
  const [projectId, setProjectId] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      setCampaignId(urlParams.get("campaignId"));
      setProjectId(urlParams.get("projectId"));
    }
  }, []);

  const [bankDetails, setBankDetails] = useState(null);

  useEffect(() => {
    getSiteContentById("donate_details")
      .then((res) => {
        if (res?.success && res?.content?.content) {
          setBankDetails(JSON.parse(res.content.content));
        }
      })
      .catch((err) => console.error("Failed to fetch bank details:", err));
  }, []);

  const [portraitFile, setPortraitFile] = useState(null);
  const [paymentProofFile, setPaymentProofFile] = useState(null);
  const fileInputRef = useRef(null);
  const proofInputRef = useRef(null);

  const predefinedAmounts = [
    { value: 1000, label: "PROVIDES MEALS" },
    { value: 2500, label: "EDUCATION KIT" },
    { value: 5000, label: "MEDICAL CAMP" }
  ];

  const handleAmountClick = (value) => {
    setFormData({ ...formData, amount: value, customAmount: value.toString() });
  };

  const handleCustomAmountChange = (e) => {
    const val = e.target.value;
    setFormData({ ...formData, amount: val, customAmount: val });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePortraitChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPortraitFile(e.target.files[0]);
    }
  };

  const handleProofChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPaymentProofFile(e.target.files[0]);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const submitDonation = async (e) => {
    e.preventDefault();
    const donationAmount = formData.customAmount ? parseInt(formData.customAmount) : formData.amount;
    
    if (!donationAmount || donationAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    if (!formData.fullName || !formData.email || !formData.phone || !formData.city) {
      toast.error("Please fill in all personal details");
      return;
    }
    setLoading(true);

    if (formData.paymentMethod === "online") {
      const res = await loadRazorpayScript();
      if (!res) {
        toast.error("Razorpay SDK failed to load.");
        setLoading(false);
        return;
      }
      try {
        const payload = new FormData();
        payload.append("amount", donationAmount);
        payload.append("paymentMethod", "online");
        payload.append("fullName", formData.fullName);
        payload.append("email", formData.email);
        payload.append("phone", formData.phone);
        payload.append("city", formData.city);
        payload.append("purpose", formData.purpose);
        if (campaignId) payload.append("campaignId", campaignId);
        if (projectId) payload.append("projectId", projectId);
        if (portraitFile) payload.append("portrait", portraitFile);

        const orderRes = await api.post("/donation/create-order", payload, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        if (!orderRes.data.success) {
          toast.error("Failed to initialize payment");
          setLoading(false);
          return;
        }

        const { order, donationId } = orderRes.data;
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_YourTestKeyHere",
          amount: order.amount,
          currency: order.currency,
          name: "Rabbi Association",
          description: `Donation for ${formData.purpose}`,
          image: "/logo.png",
          order_id: order.id,
          handler: async function (response) {
            try {
              const verifyRes = await api.post("/donation/verify-payment", {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                donationId: donationId,
              });
              if (verifyRes.data.success) {
                toast.success("Donation Successful! Thank you.");
                router.push("/donation-success");
              } else {
                toast.error("Payment verification failed.");
              }
            } catch (err) {
              toast.error("An error occurred during verification.");
            }
          },
          prefill: { name: formData.fullName, email: formData.email, contact: formData.phone },
          theme: { color: "#f47600" },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response){
          toast.error(`Payment Failed: ${response.error.description}`);
        });
        rzp1.open();
      } catch (err) {
        toast.error("Error creating donation request");
      } finally {
        setLoading(false);
      }
    } else {
      if (!formData.transactionId) {
        toast.error("Please enter the Transaction ID");
        setLoading(false);
        return;
      }
      if (!paymentProofFile) {
        toast.error("Please upload payment screenshot");
        setLoading(false);
        return;
      }
      try {
        const payload = new FormData();
        payload.append("amount", donationAmount);
        payload.append("paymentMethod", "manual");
        payload.append("transactionId", formData.transactionId);
        payload.append("fullName", formData.fullName);
        payload.append("email", formData.email);
        payload.append("phone", formData.phone);
        payload.append("city", formData.city);
        payload.append("purpose", formData.purpose);
        if (campaignId) payload.append("campaignId", campaignId);
        if (projectId) payload.append("projectId", projectId);
        if (portraitFile) payload.append("portrait", portraitFile);
        if (paymentProofFile) payload.append("paymentProof", paymentProofFile);

        const res = await api.post("/donation/manual", payload, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        if (res.data.success) {
          toast.success("Manual donation submitted for verification.");
          router.push("/donation-success");
        } else {
          toast.error(res.data.message || "Failed to submit donation");
        }
      } catch (err) {
        toast.error("Error submitting manual donation");
      } finally {
        setLoading(false);
      }
    }
  };

  // Safe Inline Styles to bypass Tailwind JIT failures completely
  const styles = {
    main: { backgroundColor: '#f9fafb', minHeight: '100vh', paddingBottom: '5rem', fontFamily: 'system-ui, sans-serif' },
    header: { paddingTop: '6rem', paddingBottom: '3rem', textAlign: 'center', paddingLeft: '1rem', paddingRight: '1rem' },
    badge: { display: 'inline-block', padding: '6px 16px', borderRadius: '999px', backgroundColor: '#fff3e0', color: '#f97316', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.5rem' },
    title: { fontSize: '2.5rem', fontWeight: '900', color: '#111827', marginBottom: '1.5rem', letterSpacing: '-0.02em' },
    subtitle: { maxWidth: '42rem', margin: '0 auto', color: '#4b5563', fontSize: '1.125rem', lineHeight: '1.75' },
    
    cardContainer: { maxWidth: '1152px', margin: '0 auto', padding: '0 1rem' },
    card: { backgroundColor: '#ffffff', borderRadius: '24px', overflow: 'hidden', display: 'flex', flexWrap: 'wrap', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', border: '1px solid #e5e7eb' },
    
    leftCol: { flex: '1 1 60%', padding: '3rem', minWidth: '320px' },
    rightCol: { flex: '1 1 35%', backgroundColor: '#0f4c3a', padding: '3rem', color: '#ffffff', minWidth: '320px', position: 'relative' },
    
    sectionTitle: { fontSize: '0.875rem', fontWeight: 'bold', color: '#f97316', textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' },
    
    amountGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px', marginBottom: '16px' },
    amountBtn: (isActive) => ({ padding: '24px 12px', borderRadius: '16px', border: isActive ? '2px solid #f97316' : '2px solid #f3f4f6', backgroundColor: isActive ? '#fff7ed' : '#ffffff', color: isActive ? '#f97316' : '#6b7280', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'all 0.2s' }),
    amountVal: { fontSize: '1.75rem', fontWeight: '900', marginBottom: '4px' },
    amountLabel: { fontSize: '0.65rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' },
    
    inputWrapper: { position: 'relative', marginBottom: '2.5rem' },
    input: { width: '100%', padding: '16px', paddingLeft: '44px', borderRadius: '16px', border: '1px solid #e5e7eb', backgroundColor: '#ffffff', fontSize: '1.125rem', fontWeight: 'bold', color: '#111827', outline: 'none' },
    currencySymbol: { position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', fontWeight: 'bold', fontSize: '1.125rem' },
    
    select: { width: '100%', padding: '16px', borderRadius: '16px', border: '1px solid #e5e7eb', backgroundColor: '#ffffff', fontSize: '1rem', fontWeight: 'bold', color: '#111827', outline: 'none', marginBottom: '2.5rem', appearance: 'none' },
    
    formGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '1.5rem' },
    formLabel: { display: 'block', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', color: '#6b7280', marginBottom: '8px' },
    formInput: { width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e5e7eb', backgroundColor: '#ffffff', fontSize: '0.875rem', fontWeight: '600', color: '#111827', outline: 'none', boxSizing: 'border-box' },
    
    dropzone: { border: '2px dashed #d1d5db', borderRadius: '16px', padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backgroundColor: '#f9fafb', marginBottom: '2.5rem' },
    
    payMethodGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '1.5rem' },
    payMethodBtn: (isActive) => ({ padding: '16px', borderRadius: '16px', border: isActive ? '2px solid #f97316' : '2px solid #e5e7eb', backgroundColor: isActive ? '#fff7ed' : '#ffffff', color: isActive ? '#f97316' : '#6b7280', fontWeight: 'bold', fontSize: '0.875rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }),
    
    manualBox: { backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '16px', padding: '24px', marginBottom: '2.5rem' },
    
    submitBtn: { width: '100%', padding: '20px', borderRadius: '16px', backgroundColor: '#f97316', color: '#ffffff', fontWeight: '900', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '2px', cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 10px 15px -3px rgba(249, 115, 22, 0.3)' },
    
    vaultTitle: { fontSize: '1.5rem', fontWeight: '900', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px', marginBottom: '32px' },
    bankBlock: { marginBottom: '32px' },
    bankName: { color: '#a7f3d0', fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '16px' },
    bankGrid: { display: 'grid', gridTemplateColumns: '120px 1fr', gap: '12px', borderLeft: '2px solid #059669', paddingLeft: '16px', fontSize: '0.875rem' },
    bankLabel: { color: 'rgba(255,255,255,0.6)' },
    bankValue: { fontWeight: 'bold', textAlign: 'right' },
    bankAcc: { fontWeight: 'bold', textAlign: 'right', color: '#f97316' },
    
    qrBox: { backgroundColor: '#ffffff', padding: '16px', borderRadius: '16px', textAlign: 'center', width: '160px', margin: '24px auto 0' },
    qrText: { color: '#0f4c3a', fontSize: '0.65rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '8px' }
  };

  return (
    <main style={styles.main}>
      <div style={styles.header}>
        <span style={styles.badge}>MAKE AN IMPACT</span>
        <h1 style={styles.title}>Fund The Future.</h1>
        <p style={styles.subtitle}>
          Your generosity transcends monetary value. It provides environmental education, resources, and a sustainable future to those who need it most. 100% of your donation directly funds ground operations.
        </p>
      </div>

      <div style={styles.cardContainer}>
        <div style={styles.card}>
          
          {/* Left Form Column */}
          <div style={styles.leftCol}>
            <form onSubmit={submitDonation}>
              
              <h3 style={styles.sectionTitle}><span style={{ fontSize: '1.25rem' }}>₹</span> Choose Your Impact</h3>
              <div style={styles.amountGrid}>
                {predefinedAmounts.map((amt) => {
                  const isActive = formData.amount === amt.value && !formData.customAmount;
                  return (
                    <button key={amt.value} type="button" onClick={() => handleAmountClick(amt.value)} style={styles.amountBtn(isActive)}>
                      <span style={styles.amountVal}>₹{amt.value.toLocaleString('en-IN')}</span>
                      <span style={styles.amountLabel}>{amt.label}</span>
                    </button>
                  )
                })}
              </div>
              <div style={styles.inputWrapper}>
                <span style={styles.currencySymbol}>₹</span>
                <input type="number" placeholder="Enter custom amount" value={formData.customAmount} onChange={handleCustomAmountChange} style={styles.input} />
              </div>

              <h3 style={styles.sectionTitle}><Target size={18} /> Direct Funds To</h3>
              <select name="purpose" value={formData.purpose} onChange={handleInputChange} style={styles.select}>
                <option value="General Fund (Where Needed Most)">General Fund (Where Needed Most)</option>
                <option value="Education Kits">Education Kits</option>
                <option value="Medical Camps">Medical Camps</option>
                <option value="Women Empowerment">Women Empowerment</option>
              </select>

              <h3 style={styles.sectionTitle}><ShieldCheck size={18} /> Digital Record</h3>
              <div style={styles.formGrid}>
                <div>
                  <label style={styles.formLabel}>Full Name <span style={{color: '#ef4444'}}>*</span></label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required style={styles.formInput} />
                </div>
                <div>
                  <label style={styles.formLabel}>Email Address <span style={{color: '#ef4444'}}>*</span></label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} required style={styles.formInput} />
                </div>
                <div>
                  <label style={styles.formLabel}>Phone Number <span style={{color: '#ef4444'}}>*</span></label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required style={styles.formInput} />
                </div>
                <div>
                  <label style={styles.formLabel}>City <span style={{color: '#ef4444'}}>*</span></label>
                  <input type="text" name="city" value={formData.city} onChange={handleInputChange} required style={styles.formInput} />
                </div>
              </div>

              <div style={{ marginBottom: '2.5rem' }}>
                <label style={styles.formLabel}>Optional: Portrait for Honor Roll</label>
                <div onClick={() => fileInputRef.current?.click()} style={styles.dropzone}>
                  <input type="file" ref={fileInputRef} onChange={handlePortraitChange} accept="image/*" style={{ display: 'none' }} />
                  {portraitFile ? (
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ fontWeight: 'bold', color: '#111827' }}>{portraitFile.name}</p>
                      <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '8px' }}>Click to change</p>
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', color: '#9ca3af' }}>
                      <Camera size={32} style={{ margin: '0 auto 12px' }} />
                      <span style={{ fontSize: '0.875rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Click or drop photo here</span>
                    </div>
                  )}
                </div>
              </div>

              <h3 style={styles.sectionTitle}><Wallet size={18} /> Payment Method</h3>
              <div style={styles.payMethodGrid}>
                <button type="button" onClick={() => setFormData({ ...formData, paymentMethod: "online" })} style={styles.payMethodBtn(formData.paymentMethod === "online")}>
                  <Smartphone size={18} /> Pay Online (Gateway)
                </button>
                <button type="button" onClick={() => setFormData({ ...formData, paymentMethod: "manual" })} style={styles.payMethodBtn(formData.paymentMethod === "manual")}>
                  <Building2 size={18} /> Manual Transfer
                </button>
              </div>

              {formData.paymentMethod === "manual" && (
                <div style={styles.manualBox}>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={styles.formLabel}>Transaction / UTR ID <span style={{color: '#ef4444'}}>*</span></label>
                    <input type="text" name="transactionId" value={formData.transactionId} onChange={handleInputChange} placeholder="e.g. UPI123456789" required style={styles.formInput} />
                  </div>
                  <div>
                    <label style={styles.formLabel}>Upload Payment Screenshot <span style={{color: '#ef4444'}}>*</span></label>
                    <input type="file" ref={proofInputRef} onChange={handleProofChange} accept="image/*,.pdf" required style={{ width: '100%', fontSize: '0.875rem', padding: '8px', border: '1px solid #e5e7eb', borderRadius: '8px', backgroundColor: '#fff' }} />
                  </div>
                </div>
              )}

              <button type="submit" disabled={loading} style={styles.submitBtn}>
                {loading ? "Processing..." : "Make Impact Now ➔"}
              </button>
            </form>
          </div>

          {/* Right Vault Column */}
          <div style={styles.rightCol}>
            <h2 style={styles.vaultTitle}>Official Vault</h2>

            {bankDetails && (bankDetails.bankName || bankDetails.upiId) ? (
              <div style={styles.bankBlock}>
                <h3 style={styles.bankName}>{bankDetails.bankName || "Bank Details"}</h3>
                <div style={styles.bankGrid}>
                  <span style={styles.bankLabel}>Account Name</span>
                  <span style={styles.bankValue}>{bankDetails.accountName || "N/A"}</span>
                  
                  <span style={styles.bankLabel}>Account No.</span>
                  <span style={styles.bankAcc}>{bankDetails.accountNumber || "N/A"}</span>
                  
                  <span style={styles.bankLabel}>IFSC Code</span>
                  <span style={styles.bankValue}>{bankDetails.ifscCode || "N/A"}</span>
                  
                  <span style={styles.bankLabel}>UPI ID</span>
                  <span style={styles.bankValue}>{bankDetails.upiId || "N/A"}</span>
                </div>
                {bankDetails.qrImage && (
                  <div style={styles.qrBox}>
                    <Image src={bankDetails.qrImage} alt="QR" width={120} height={120} style={{ margin: '0 auto' }} />
                    <p style={styles.qrText}>Scan Securely</p>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ padding: '32px 0', textAlign: 'center', opacity: 0.7 }}>
                <Wallet size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
                <p style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>No Bank Details Available</p>
                <p style={{ fontSize: '0.875rem', marginTop: '8px' }}>Official bank details will be updated by the administration shortly.</p>
              </div>
            )}

            <div style={{ marginTop: 'auto', paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <h4 style={{ fontSize: '0.65rem', fontWeight: '900', color: '#f97316', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Tax Exemption</h4>
              <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', lineHeight: '1.6' }}>
                All donations made to Rabbi Association are eligible for tax deduction under section 80G of the Income Tax Act. A digital receipt will be automatically emailed to you upon verification.
              </p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
