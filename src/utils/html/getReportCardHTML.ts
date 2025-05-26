import { getBase64FromUrl } from "../helpher";
import { MarksheetInput } from "@/types/marksheet";

export async function generateReportCardHTML(marksheet: MarksheetInput, institute) {
    const academicSession = marksheet.session || "-";
    const photoBase64 = await getBase64FromUrl(marksheet.photo || " ");

    // Calculate term totals
    let term1TotalMax = 0, term1TotalObt = 0;
    let term2TotalMax = 0, term2TotalObt = 0;
    let term3TotalMax = 0, term3TotalObt = 0;

    marksheet.subjectMarks.forEach(subject => {
        term1TotalMax += subject.term1.max;
        term1TotalObt += subject.term1.obtained;
        term2TotalMax += subject.term2.max;
        term2TotalObt += subject.term2.obtained;
        term3TotalMax += subject.term3.max;
        term3TotalObt += subject.term3.obtained;
    });

    const formatDate = (date: string) => date ? new Date(date).toLocaleDateString("en-IN") : "-";
    const formatPercentage = (obt: number, max: number) =>
        max ? `${((obt / max) * 100).toFixed(2)}%` : "-";
    const getGrade = (obt: number, max: number) => {
        if (!max) return "-";
        const percent = (obt / max) * 100;
        if (percent >= 90) return "A+";
        if (percent >= 80) return "A";
        if (percent >= 70) return "B+";
        if (percent >= 60) return "B";
        if (percent >= 50) return "C";
        return "F";
    };
    const toUpper = (val: string) => (val || "-").toUpperCase();

    const renderSubjectRows = () =>
        marksheet.subjectMarks.map(subject => `
            <tr>
                <td>${toUpper(subject.subjectName)}</td>
                <td>${subject.term1.max}</td>
                <td>${subject.term1.obtained}</td>
                <td>${subject.term1.grade}</td>
                <td>${subject.term2.max}</td>
                <td>${subject.term2.obtained}</td>
                <td>${subject.term2.grade}</td>
                <td>${subject.term3.max}</td>
                <td>${subject.term3.obtained}</td>
                <td>${subject.term3.grade}</td>
                <td>${subject.totalMax}</td>
                <td>${subject.totalObtained}</td>
                <td>${subject.subjectGrade}</td>
            </tr>
        `).join("");

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>${marksheet.admissionNumber}-${marksheet.name}-Report Card</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                color: #333;
            }
            .letterpad-container {
                border: 3px solid #205D80;
                padding: 30px;
                background: #fff;
                // max-width: 950px;
                margin-left: auto;
                margin-right: auto;
                box-shadow: 0 0 24px rgba(32,93,128,0.08);
                position: relative;
            }
            .watermark {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                opacity: 0.07;
                z-index: 2100;
                width: 600px;
                height: 500px;
                pointer-events: none;
                user-select: none;
                }
            .institute-header {
                border-bottom: 3px solid #205D80;
                padding:0 30px;
                padding-bottom: 10px;
                margin-bottom: 20px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap:100px;
                
            }
            .logo {
                height: 90px;
                width: 90px;
                object-fit: contain;
            }
            .center-content {
                flex: 1;
                text-align: center;
                margin-left: -120px;
            }
            .inst-name {
                // border: 3px solid #205D80;
                font-size: 26px;
                font-weight: bold;
                color: #205D80;
                margin-bottom: 0px;
                text-align: center;
                   text-transform:uppercase;
            }
            .inst-details {
                font-size: 18px;
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
                gap: 10px 20px;
                padding-left:4px;
                margin-bottom: 7px;
                font-size: 16px;
                text-transform:uppercase;
            }
            .student-info div {
                margin-bottom: 5px;
            }
            .photo {
                float: right;
                width: 100px;
                height: 120px;
                object-fit: cover;
                border: 1px solid #999;
                margin-bottom: 10px;
            }
            .report-table {
             width:835px;
                border-collapse: collapse;
                font-size: 15px;
                margin-bottom: 30px;
            }
            .report-table th, .report-table td {
                border: 1px solid #999;
                padding: 10px;
                text-align: center;
            }
            .report-table th {
                background-color: #f0f6fa;
                color: #205D80;
            }
            .report-table tr:nth-child(even) {
                background: #f7fbfd;
            }
            .summary-row {
                display: grid;
                grid-template-columns: repeat(4, 1fr); /* 4 equal columns */
                gap: 15px;
                margin: 30px 0;
            }

            .summary-box {
                /* Remove flex properties */
                width: 100%; 
                min-width: unset; 
                box-sizing: border-box;
                /* Keep other styles */
                background: linear-gradient(135deg, #e3f2fd 60%, #fafdff 100%);
                border: 2px solid #3498db;
                border-radius: 10px;
                padding: 12px;
                text-align: center;
                box-shadow: 0 2px 8px rgba(32,93,128,0.05);
            }

            /* For the last summary box */
            .summary-box:last-child {
                background: linear-gradient(135deg, #d1f7e8 60%, #fafdff 100%); 
                border-color: #16a085;
            }
                .std-add {
                margin-bottom:30px;
                max-width:700px;
                padding-left:4px;

                }
            .summary-title {
                font-size: 15px;
                font-weight: bold;
                color: #205D80;
                margin-bottom: 8px;
                border-bottom: 1.5px solid #3498db;
                padding-bottom: 6px;
                letter-spacing: 0.5px;
            }
            .summary-value {
                font-size: 20px;
                font-weight: bold;
                color: #205D80;
                margin-bottom: 4px;
            }
            .summary-label {
                font-size: 13px;
                color: #3b4b5c;
                margin-bottom: 2px;
            }
            .signature-box {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 20px;
                margin-top: 40px;
            }
            .signature {
                text-align: center;
                padding-top: 40px;
            }
            .signature span {
                display: block;
                margin-top: 8px;
                font-size: 13px;
                color: #7f8c8d;
            }
                .school-stamp {
                    width: 110px;
                    position: absolute;
                    right: 12%;
                    bottom: 10px;
                    opacity: 0.85;
                    z-index: 3;
                }
                .principal-signature {
                    position: absolute;
                    right: 8%;
                    bottom: 35px;
                    width: 140px;
                    z-index: 3;
                }
        #marksheet{
        width:900px;}
            @media print {
                body {
                    margin: 0;
                    padding: 0;
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                }
                .letterpad-container {
                    box-shadow: none;
                    padding: 30px;
                    
                }
                    
            }

     </style>
    </head>
    <body>
    <div id="marksheet">
        <img src="${institute.logoUrl}" class="watermark" alt="institute watermark" />
        <div class="letterpad-container">
            <div class="inst-name">${institute.instName}</div>
            <div class="institute-header">
                <img src="${institute.logoUrl}" alt="Logo" class="logo" />
                <div class="center-content">
                    <div class="inst-details">${institute.instAddr}</div>
                    <div class="inst-details">📞 ${institute.instMobile} | 🌐 ${institute.instUrl}</div>
                    <div class="session">Academic Session: ${academicSession}</div>
                </div>
            </div>
            <div class="title">STUDENT REPORT CARD</div>
            <img class="photo" src="${photoBase64}" alt="Student Photo" />
            <div class="student-info">
                <div><strong>Name:</strong> ${toUpper(marksheet.name)}</div>
                <div><strong>Admission No:</strong> ${toUpper(marksheet.admissionNumber)}</div>
                <div><strong>Father's Name:</strong> ${toUpper(marksheet.fatherName)}</div>
                <div><strong>Class:</strong> ${toUpper(marksheet.currentClass)}(${toUpper(marksheet.section)})</div>
                <div><strong>Mother's Name:</strong> ${toUpper(marksheet.motherName || "-")}</div>
                <div><strong>DOB:</strong> ${formatDate(marksheet.dob)}</div>
            </div>
            <div class="std-add"><strong>Address:</strong> ${toUpper(marksheet.address || "-")}</div>
            <table class="report-table">
                <thead>
                    <tr>
                        <th rowspan="2">Subject</th>
                        <th colspan="3">Term 1</th>
                        <th colspan="3">Term 2</th>
                        <th colspan="3">Term 3</th>
                        <th colspan="3">Overall</th>
                    </tr>
                    <tr>
                        <th>Max</th><th>Obt</th><th>Grade</th>
                        <th>Max</th><th>Obt</th><th>Grade</th>
                        <th>Max</th><th>Obt</th><th>Grade</th>
                        <th>Total</th><th>Obt</th><th>Grade</th>
                    </tr>
                </thead>
                <tbody>
                    ${renderSubjectRows()}
                </tbody>
            </table>
            <div class="summary-row">
                <div class="summary-box">
                    <div class="summary-title">TERM 1</div>
                    <div class="summary-value">${term1TotalObt} / ${term1TotalMax}</div>
                    <div class="summary-label">Marks</div>
                    <div class="summary-value">${formatPercentage(term1TotalObt, term1TotalMax)}</div>
                    <div class="summary-label">Percentage</div>
                    <div class="summary-value">${getGrade(term1TotalObt, term1TotalMax)}</div>
                    <div class="summary-label">Grade</div>
                </div>
                <div class="summary-box">
                    <div class="summary-title">TERM 2</div>
                    <div class="summary-value">${term2TotalObt} / ${term2TotalMax}</div>
                    <div class="summary-label">Marks</div>
                    <div class="summary-value">${formatPercentage(term2TotalObt, term2TotalMax)}</div>
                    <div class="summary-label">Percentage</div>
                    <div class="summary-value">${getGrade(term2TotalObt, term2TotalMax)}</div>
                    <div class="summary-label">Grade</div>
                </div>
                <div class="summary-box">
                    <div class="summary-title">TERM 3</div>
                    <div class="summary-value">${term3TotalObt} / ${term3TotalMax}</div>
                    <div class="summary-label">Marks</div>
                    <div class="summary-value">${formatPercentage(term3TotalObt, term3TotalMax)}</div>
                    <div class="summary-label">Percentage</div>
                    <div class="summary-value">${getGrade(term3TotalObt, term3TotalMax)}</div>
                    <div class="summary-label">Grade</div>
                </div>
                <div class="summary-box" style="background: linear-gradient(135deg, #d1f7e8 60%, #fafdff 100%); border-color: #16a085;">
                    <div class="summary-title">OVERALL</div>
                    <div class="summary-value">${marksheet.totalObtainedMarks} / ${marksheet.totalMarks}</div>
                    <div class="summary-label">Marks</div>
                    <div class="summary-value">${marksheet.totalMarks ? ((marksheet.totalObtainedMarks / marksheet.totalMarks) * 100).toFixed(2) + "%" : "-"}</div>
                    <div class="summary-label">Percentage</div>
                    <div class="summary-value">${marksheet.grade}</div>
                    <div class="summary-label">Grade</div>
                </div>
            </div>
            <div class="signature-box">
                <div class="signature">
                    <div style="border-top: 1px solid #205D80; width: 80%; margin: 0 auto"></div>
                    <span>Class Teacher</span>
                </div>
                <div class="signature">
                    
                    <div style="border-top: 1px solid #205D80; width: 80%; margin: 0 auto"></div>
                    <span>Exam Controller</span>
                </div>
                <div class="signature">
                    <img src="/school/snscea-sign.png" alt="Signature" class="principal-signature" />
                    <img src="/school/snscea-stamp.png" alt="Stamp" class="school-stamp" />
                    <div style="border-top: 1px solid #205D80; width: 80%; margin: 0 auto"></div>
                    <span>Principal</span>
                </div>
            </div>
        </div>
        </div>
    </body>
    </html>
    `;
}
