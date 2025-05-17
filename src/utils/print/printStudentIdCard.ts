import { Student } from "@/types/type";
import { getInstituteDetails } from "../helpher";
import { generateIdCardHTML } from "../html/getIdCardHTML";

const baseStyles = `
  body {
    font-family: Arial, sans-serif;
    padding: 10mm;
    margin: 0;
    background: #f0f0f0;
  }
  .id-card {
    background: white;
    border: 2px solid #205D80;
    border-radius: 12px;
    padding: 16px;
    width: 500px;
    box-sizing: border-box;
    page-break-inside: avoid;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: auto;
  }
  .header {
    display: flex;
    align-items: center;
    border-bottom: 2px solid #205D80;
    padding-bottom: 8px;
    margin-bottom: 15px;
  }
  .logo {
    height: 50px;
    margin-right: 10px;
  }
  .center {
    flex: 1;
    text-align: center;
    font-size: 13px;
    color: #333;
  }
  .inst-name {
    font-size: 16px;
    padding-bottom:5px;
    text-align:center;
    font-weight: bold;
    color: #205D80;
    text-transform:uppercase;
  }
  .inst-details {
    font-size: 12px;
    color: #444;
  }
  .session {
    font-size: 12px;
    margin-top: 4px;
    font-style: italic;
    color: #205D80;
  }
  .body {
    display: flex;
    gap: 10px;
    margin-bottom: 4px;
        text-transform:uppercase;
  }
  .photo {
    width: 130px;
    height: 140px;
    object-fit: cover;
    border: 2px solid #205D80;
    border-radius: 6px;
  }
  .info {
  margin-top:7px;
    flex: 1;
    font-size: 13px;
    color: #333;
    text-transform:uppercase;
  }
  .name {
    font-size: 16px;
    font-weight: bold;
    color: #205D80;
    margin-bottom: 6px;
        text-transform:uppercase;
  }
  .row {
    margin-bottom: 4px;
  }
  .qr {
    text-align: center;
    width: 100px;
  }
  .qr-img {
    width: 80px;
    height: 80px;
    padding: 4px;
    background: #fff;
    border: 1px solid #205D80;
    border-radius: 6px;
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
    font-size: 11px;
    color: #444;
    margin-top: 0;
  }
  .sign {
    text-align: center;
  }
  .sign .small {
    font-size: 11px;
    color: #777;
  }
  .grid {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: space-between;
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
  printWindow.print();
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