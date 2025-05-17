import { getBase64FromUrl } from "../helpher";

export async function getAdmissionConfirmationHTML(admission) {
    const formatDate = (dateStr: Date) => {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        return d.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
    };
    const photoUrl = await getBase64FromUrl(admission.photo)

    return `
  <div style="margin:0 auto;padding:4px;font-family:'Segoe UI',sans-serif;background:#fff;">
    <!-- Header -->
    <div style="display:flex;align-items:start;justify-content:space-between;margin-bottom:24px;">
      <div>
        <h1 style="margin:0;color:#1A4D8C;font-size:2rem;letter-spacing:0.5px;">🎓 Admission Confirmation</h1>
        <p style="margin:4px 0 0 0;color:#444; text-align:center; font-size:1rem;">Session: <strong>${admission.session || '-'}</strong></p>
      </div>
      ${admission.photo
            ? `<img src="${photoUrl}" alt="Student Photo" style="width:90px;height:90px;object-fit:cover;border-radius:8px;border:1.5px solid #1A4D8C;background:#f5f5f5;" />`
            : `<div style="width:90px;height:90px;border:1.5px dashed #ccc;border-radius:8px;background:#f5f5f5;display:flex;align-items:center;justify-content:center;color:#aaa;">No Photo</div>`
        }
    </div>

    <hr style="border:none;border-top:1px solid #1A4D8C;margin-bottom:24px;" />

    <!-- Personal Details -->
    <h2 style="color:#1A4D8C;font-size:1.15rem;margin-bottom:10px;margin-top:0;">🧍 Personal Details</h2>
    <table style="width:100%;border-collapse:collapse;font-size:1rem;">
      <tr>
        <td style="padding:10px 8px;font-weight:600;width:30%;">Name</td>
        <td style="padding:10px 8px;">${admission.name || '-'}</td>
        <td style="padding:10px 8px;font-weight:600;">Gender</td>
        <td style="padding:10px 8px;">${admission.gender || '-'}</td>
      </tr>
      <tr>
        <td style="padding:10px 8px;font-weight:600;">Date of Birth</td>
        <td style="padding:10px 8px;">${formatDate(admission.dob)}</td>
        <td style="padding:10px 8px;font-weight:600;">Aadhaar Number</td>
        <td style="padding:10px 8px;">${admission.aadhaarNumber || '-'}</td>
      </tr>
    </table>

    <!-- Parent Details -->
    <h2 style="color:#1A4D8C;font-size:1.15rem;margin:22px 0 10px;">👨‍👩‍👧 Parent Details</h2>
    <table style="width:100%;border-collapse:collapse;font-size:1rem;">
      <tr>
        <td style="padding:10px 8px;font-weight:600;width:30%;">Father's Name</td>
        <td style="padding:10px 8px;">${admission.fatherName || '-'}</td>
        <td style="padding:10px 8px;font-weight:600;">Mother's Name</td>
        <td style="padding:10px 8px;">${admission.motherName || '-'}</td>
      </tr>
    </table>

    <!-- Academic Details -->
    <h2 style="color:#1A4D8C;font-size:1.15rem;margin:22px 0 10px;">📘 Academic Details</h2>
    <table style="width:100%;border-collapse:collapse;font-size:1rem;">
      <tr>
        <td style="padding:10px 8px;font-weight:600;width:30%;">Admission No.</td>
        <td style="padding:10px 8px;">${admission.admissionNumber || '-'}</td>
        <td style="padding:10px 8px;font-weight:600;">Roll No.</td>
        <td style="padding:10px 8px;">${admission.rollNumber || '-'}</td>
      </tr>
      <tr>
        <td style="padding:10px 8px;font-weight:600;">Class & Section</td>
        <td style="padding:10px 8px;">${admission.currentClass || '-'}${admission.section ? ` (${admission.section})` : ''}</td>
        <td style="padding:10px 8px;font-weight:600;">PEN No.</td>
        <td style="padding:10px 8px;">${admission.penNumber || '-'}</td>
      </tr>
      <tr>
        <td style="padding:10px 8px;font-weight:600;">Admission Date</td>
        <td style="padding:10px 8px;">${formatDate(admission.admittedAt)}</td>
        <td style="padding:10px 8px;font-weight:600;">Status</td>
        <td style="padding:10px 8px;">${admission.status || '-'}</td>
      </tr>
    </table>

    <!-- Contact Details -->
    <h2 style="color:#1A4D8C;font-size:1.15rem;margin:22px 0 10px;">📞 Contact Details</h2>
    <table style="width:100%;border-collapse:collapse;font-size:1rem;">
      <tr>
        <td style="padding:10px 8px;font-weight:600;width:30%;">Email</td>
        <td style="padding:10px 8px;">${admission.email || '-'}</td>
        <td style="padding:10px 8px;font-weight:600;">Mobile</td>
        <td style="padding:10px 8px;">${admission.mobile || '-'}</td>
      </tr>
      <tr>
        <td style="padding:10px 8px;font-weight:600;">Address</td>
        <td colspan="3" style="padding:10px 8px;">${admission.address || '-'}</td>
      </tr>
    </table>

    <!-- Other Info -->
    <h2 style="color:#1A4D8C;font-size:1.15rem;margin:22px 0 10px;">📌 Other Information</h2>
    <table style="width:100%;border-collapse:collapse;font-size:1rem;">
      <tr>
        <td style="padding:10px 8px;font-weight:600;width:30%;">Blood Group</td>
        <td style="padding:10px 8px;">${admission.bloodGroup || '-'}</td>
        <td style="padding:10px 8px;font-weight:600;">Category</td>
        <td style="padding:10px 8px;">${admission.category || '-'}</td>
      </tr>
      <tr>
        <td style="padding:10px 8px;font-weight:600;">Religion</td>
        <td style="padding:10px 8px;">${admission.religion || '-'}</td>
        <td style="padding:10px 8px;font-weight:600;">Nationality</td>
        <td style="padding:10px 8px;">${admission.nationality || '-'}</td>
      </tr>
    </table>

    <!-- Footer -->
    <div style="margin-top:44px;text-align:right;">
      <span style="font-size:1rem;color:#1A4D8C;font-weight:bold;">Principal / Headmaster</span>
    </div>
    <p style="margin-top:28px;text-align:center;color:#888;font-size:0.95rem;">
      <em>This is a system-generated admission confirmation letter. Please keep it for your reference.</em>
    </p>
  </div>
  `;
}
