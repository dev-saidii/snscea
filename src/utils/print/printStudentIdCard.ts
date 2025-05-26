import { Student } from "@/types/type";
import { getInstituteDetails } from "../helpher";
import { generateIdCardHTML } from "../html/getIdCardHTML";

const baseStyles = `
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      padding: 10mm;
      margin: 0;
      background: #e5f6fd;
    }
    .id-card {
      background: linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%);
      border: none;
      border-radius: 18px;
      box-shadow: 0 8px 24px rgba(32,93,128,0.13), 0 1.5px 6px #b2ebf2;
      padding: 24px 24px 18px 24px;
      width: 470px;
      min-height: 200px;
      position: relative;
      overflow: hidden;
      margin: auto;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .id-card .wave {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100px;
      z-index: 1;
      pointer-events: none;
    }
    .id-card::after {
      /* Watermark logo in the center */
      content: '';
      position: absolute;
      top: 60%;
      left: 50%;
      width: 180px;
      height: 180px;
      background: url('/logo-bgrm.png') no-repeat center center;
      background-size: contain;
      opacity: 0.07;
      transform: translate(-50%, -50%);
      z-index: 0;
    }
    .header {
      display: flex;
      align-items: center;
      border-bottom: 2px solid #205D80;
      padding-bottom: 10px;
      margin-bottom: 14px;
      position: relative;
      z-index: 2;
      background: transparent;
    }
    .logo {
      height: 54px;
      margin-right: 14px;
      filter: drop-shadow(0 2px 4px #b2ebf2);
    }
    .center {
      flex: 1;
      text-align: center;
      font-size: 14px;
      color: #205D80;
    }
    .inst-name {
      font-size: 15px;
      font-weight: bold;
      color: #205D80;
      text-transform: uppercase;
      letter-spacing: 1px;
      text-align: center;
      margin-bottom: 2px;
      position: relative;
      z-index: 2;
    }
    .inst-details {
      font-size: 12px;
      color: #337;
      margin-bottom: 2px;
    }
    .session {
      font-size: 12px;
      margin-top: 4px;
      font-style: italic;
      color: #2576a8;
    }
    .body {
      display: flex;
      gap: 14px;
      margin-bottom: 4px;
      text-transform: uppercase;
      z-index: 2;
      position: relative;
    }
    .photo {
      width: 120px;
      height: 130px;
      object-fit: cover;
      border: 2.5px solid #205D80;
      border-radius: 10px;
      box-shadow: 0 2px 12px #b2ebf2;
      background: #fff;
    }
    .info {
      margin-top: 4 px;
      flex: 1;
      font-size: 13px;
      color: #205D80;
      text-transform: uppercase;
    }
    .name {
      font-size: 17px;
      font-weight: bold;
      color: #205D80;
      margin-bottom: 7px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .row {
      margin-bottom: 4px;
    }
    .qr {
      text-align: center;
      width: 95px;
    }
    .qr-img {
      width: 78px;
      height: 78px;
      padding: 4px;
      background: #fff;
      border: 1.5px solid #205D80;
      border-radius: 8px;
      box-shadow: 0 2px 8px #b2ebf2;
    }
    .scan {
      font-size: 11px;
      margin-top: 4px;
      color: #205D80;
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      font-size: 12px;
      color: #444;
      margin-top: 0px;
      z-index: 2;
      position: relative;
    }
    .sign {
      text-align: center;
      position: relative;
    }
    .stamp {
      width: 70px;
      position: absolute;
      right: 25px;
      bottom: -15px;
      opacity: 0.85;
      z-index: 3;
    }
    .signature {
      position: absolute;
      right: 0px;
      bottom: 5px;
      width: 110px;
      z-index: 3;
    }
    .sign .small {
      font-size: 11px;
      color: #777;
    }
    .grid {
      display: flex;
      flex-wrap: wrap;
      gap: 24px;
      justify-content: space-between;
    }
    @media print {
      .id-card {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
        background: linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%) !important;
      }
      .id-card::after {
        opacity: 0.09 !important;
      }
    }

`;

const printHtmlContent = (title: string, content: string, isMultiple: boolean = false) => {
  const printWindow = window.open("", "", "height=700,width=1000");
  if (!printWindow) {
    alert("Popup blocked! Please allow popups to print.");
    return;
  }

  printWindow.document.write(`
    <html>
      <head>
        <title>${title}</title>
        <style>
          ${baseStyles}
          ${isMultiple ? `.id-card { margin: 0 0 0px 0; }` : ''}
        </style>
      </head>
      <body>${isMultiple ? `<div class="grid">${content}</div>` : content}</body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();
  // printWindow.print();
};

// Main export functions
export const printSingleStudentIdCard = async (student: Student) => {
  const institute = getInstituteDetails();
  const content = await generateIdCardHTML(student, institute);
  printHtmlContent(`${student.name} - ID Card`, content);
};

export const printMultipleStudentIdCards = async (students: Student[]) => {
  const institute = getInstituteDetails();
  const htmlCards = await Promise.all(
    students.map(student =>
      generateIdCardHTML(student, institute)
    )
  );
  printHtmlContent("ID Cards", htmlCards.join("\n"), true);
};