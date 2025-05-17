import QRCode from 'qrcode';
import { getBase64FromUrl, getCurrentSession } from "../helpher";
import { Student } from '@/types/type';

const generateQRCode = async (student: Student, institute) => {
  const qrText = [
    `Institute: ${institute.instName}`,
    `Address: ${institute.instAddr}`,
    `Phone: +91-${institute.instMobile}`,
    `Website: ${institute.instUrl}`,
    `Email: ${institute.instEmail}`,
    ``,
    `Student Name: ${student.name}`,
    `Admission No: ${student.admissionNumber}`,
    `Class: ${student.currentClass} (${student.section})`,
    `Father Name: ${student.fatherName}`,
    `Mobile: ${student.mobile}`,
    `Issued: ${new Date().toLocaleDateString()}`
  ].join("\n");

  return QRCode.toDataURL(qrText, {
    width: 100,
    margin: 1,
    color: { dark: "#205D80", light: "#ffffff" },
  });
};

export const generateIdCardHTML = async (student: Student, institute) => {
  const [photoBase64, qrDataUrl] = await Promise.all([
    getBase64FromUrl(student.photo || " "),
    generateQRCode(student, institute)
  ]);
  const academicSession = getCurrentSession();

  return `
    <div class="id-card">
    <div class="inst-name">${institute.instName}</div>
      <div class="header">
        <img src="${institute.logoUrl}" alt="Logo" class="logo" />
        <div class="center">
          
          <div class="inst-details">${institute.instAddr}</div>
          <div class="inst-details">📞 +91-${institute.instMobile} | 🌐 ${institute.instUrl}</div>
          <div class="session"><strong>Academic Session : ${academicSession}</strong></div>
        </div>
      </div>

      <div class="body">
        <img src="${photoBase64}" class="photo" />
        <div class="info">
          <div class="name">${student.name}</div>
          <div class="row"><strong>Addm No:</strong> ${student.admissionNumber}</div>
          <div class="row"><strong>DoB:</strong> ${new Date(student.dob).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  })}</div>
          <div class="row"><strong>Class:</strong> ${student.currentClass} (${student.section})</div>
          <div class="row"><strong>Father Name:</strong> ${student.fatherName}</div>
          <div class="row"><strong>Mobile:</strong> ${student.mobile}</div>
        </div>
        <div class="qr">
          <img src="${qrDataUrl}" class="qr-img" />
          <div class="scan">Scan Me</div>
        </div>
      </div>

      <div class="bottom">
        <div><strong>Issued:</strong> ${new Date().toLocaleDateString()}</div>
        <div class="sign">
          <div>_________________________</div>
          <div><strong>Authorized Signature</strong></div>
          <div class="small">Principal / Director</div>
        </div>
      </div>
    </div>
  `;
};