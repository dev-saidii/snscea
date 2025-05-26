import QRCode from 'qrcode';
import { getBase64FromUrl, getCurrentSession } from "../helpher";
import { Student } from '@/types/type';

const generateQRCode = async (student: Student, institute) => {
  const qrText = [
    `Institute: ${institute.instName}`,
    `Student Name: ${student.name}`,
    `Admission No: ${student.admissionNumber}`,
    `Class: ${student.currentClass} (${student.section})`,
    `Father Name: ${student.fatherName}`,
    `Mobile: ${student.mobile}`,
    `Issued: ${new Date().toLocaleDateString()}`
  ].join("\n");

  return QRCode.toDataURL(qrText, {
    width: 200,
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
    <div class="wave">
      <svg viewBox="0 0 480 70" width="100%" height="70" preserveAspectRatio="none">
        <path d="M0,30 Q120,80 240,30 T480,30 L480,0 L0,0 Z" fill="#205D80"/>
        <path d="M0,40 Q120,60 240,40 T480,40 L480,0 L0,0 Z" fill="#b2ebf2" opacity="0.7"/>
      </svg>
    </div>
    <div class="inst-name">${institute.instName}</div>
      <div class="header">
        <img src="${institute.logoUrl}" alt="Logo" class="logo" />
        <div class="center">
          
          <div class="inst-details">${institute.instAddr}</div>
          <div class="inst-details">📞 ${institute.instMobile} | 🌐 ${institute.instUrl}</div>
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
        <img src="/school/snscea-stamp.png" alt="Stamp" class="stamp" />
        <img src="/school/snscea-sign.png" alt="Signature" class="signature" />
        <div><strong>Authorized Signature</strong></div>
        <div class="small">Principal / Director</div>
      </div>
    </div>

    </div>
  `;
};