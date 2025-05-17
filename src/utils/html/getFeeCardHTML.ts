import { Student } from "@/types/type";
import { getBase64FromUrl } from "../helpher";

export async function generateFeeCardHTML(student: Student, institute) {
  const academicSession = institute?.session || "2024-2025";
  const photoBase64 = await getBase64FromUrl(student.photo || " ")

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>${institute.instName} - Student Fee Card</title>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        margin: 40px;
        color: #333;
      }

      .letterpad-container {
        border: 2px solid #205D80;
        padding: 30px;
        border-radius: 10px;
        margin-top: 20px;
      }
        .watermark {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 0.018;
        z-index: -200;
        width: 500px;
        height: 500px;
        pointer-events: none;
        user-select: none;
        }

      .institute-header {
        border-bottom: 3px solid #205D80;
        padding-bottom: 10px;
        margin-bottom: 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left:20px;
      }

      .logo {
        height: 80px;
        width: 80px;
        object-fit: contain;
      }

      .center-content {
        flex: 1;
        text-align: center;
        margin-left: -120px; /* compensate for logo width for perfect centering */
      }

      .inst-name {
        font-size: 22px;
        font-weight: bold;
        color: #205D80;
        margin-bottom: 0px;
        text-align: center;
        text-transform:uppercase;
      }

      .inst-details {
        font-size: 15px;
        color: #444;
      }

       .session {
        font-size: 16px;
        margin-top: 4px;
        font-style: italic;
        color: #205D80;
        font-weight:600;
        margin-top:8px;
    }

      .title {
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        text-decoration: underline;
        margin-bottom: 20px;
        color: #205D80;
      }

      .student-info {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px 40px;
        margin-bottom: 30px;
        font-size: 16px;
        text-transform:upperCase;
      }

      .student-info div {
        margin-bottom: 5px;
      }

      .fee-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 15px;
      }

      .fee-table th, .fee-table td {
        border: 1px solid #999;
        padding: 10px;
        text-align: center;
      }

       .fee-table th {
            background-color: #f0f6fa;
            color: #205D80;
        }

      .signature-box {
        margin-top: 50px;
        display: flex;
        justify-content: flex-end;
        font-size: 14px;
      }

      .signature-box div {
        text-align: center;
      }

      .photo {
        float: right;
        width: 100px;
        height: 120px;
        object-fit: cover;
        border: 1px solid #999;
        margin-bottom: 10px;
      }

      @media print {
        @page {
          margin: 10mm;
        }
        body {
          margin: 0;
        }

        body, .watermark {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .letterhead-container {
            page-break-before: always;
          }
      }
        
    </style>
  </head>
  <body>

    

  <img src="${institute.logoUrl}" alt="Logo" class="watermark" />
    <div class="letterpad-container">
          <div class="inst-name">${institute.instName}</div>
        <div class="institute-header">
            <img src="${institute.logoUrl}" alt="Logo" class="logo" />
            <div class="center-content">
                <div class="inst-details">${institute.instAddr}</div>
                <div class="inst-details">📞 +91-${institute.instMobile} | 🌐 ${institute.instUrl}</div>
                <div class="session">Academic Session: ${academicSession}</div>
            </div>
        </div>
      <div class="title">STUDENT FEE CARD</div>

      <img class="photo" src="${photoBase64}" alt="Student Photo" />

      <div class="student-info">
        <div><strong>Name:</strong> ${student.name}</div>
        <div><strong>Admission No:</strong> ${student.admissionNumber}</div>
        <div><strong>Father's Name:</strong> ${student.fatherName}</div>
        <div><strong>Class:</strong> ${student.currentClass}</div>
        <div><strong>Mother's Name:</strong> ${student.motherName}</div>
        <div><strong>Section:</strong> ${student.section}</div>
        <div><strong>Mobile:</strong> ${student.mobile}</div>
        <div><strong>DOB:</strong> ${new Date(student.dob).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  })}</div>
        
      </div>

      <table class="fee-table">
        <thead>
          <tr>
            <th>Month</th>
            <th>Amount (₹)</th>
            <th>Payment Date</th>
            <th>Signature</th>
          </tr>
        </thead>
        <tbody>
          ${[
      "April", "May", "June", "July", "August", "September",
      "October", "November", "December", "January", "February", "March",
    ]
      .map(
        (month) =>
          `<tr><td>${month}</td><td></td><td></td><td></td></tr>`
      )
      .join("")}
        </tbody>
      </table>

      <div class="signature-box">
        <div>
          __________________________<br />
          Authorized Signature
        </div>
      </div>
    </div>
  </body>
  </html>
  `;
}
