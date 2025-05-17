import { getInstituteDetails } from "../helpher";

export const printOnLetterPad = (htmlContent: string) => {
  const logoUrl = `${window.location.origin}/logo.png`;

  const win = window.open("", "", "height=700,width=1000");
  if (!win) {
    alert("Unable to open print window. Please allow pop-ups.");
    return;
  }
  const institute = getInstituteDetails();

  win.document.write(`
  <html>
    <head>
      <title>${institute.instName} - Letter Pad</title>
      <style>
        body {
          font-family: 'Segoe UI', Arial, sans-serif;
          color: #222;
          padding: 0px 0px;
          position: relative;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        .watermark {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          opacity: 0.1;
          z-index: 0;
          width: 600px;
          height: 500px;
          pointer-events: none;
          user-select: none;
        }
        .letterhead {
          border-bottom: 3px solid #205D80;
          padding-bottom: 20px;
          margin-bottom: 30px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          z-index: 2;
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
        font-size: 24px;
        font-weight: bold;
        color: #205D80;
        margin-bottom: 0px;
        text-align: center;
        text-transform:uppercase;
      }

      .inst-details {
        font-size: 17px;
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
        table {
          border-collapse: collapse;
          width: 100%;
          margin-top: 20px;
          position: relative;
          z-index: 2;
        }
        th, td {
          border: 1px solid #aaa;
          padding: 8px 10px;
          text-align: left;
        }
        th {
          background-color: #eaf6fb;
          color: #205D80;
          font-weight: 600;
        }
        tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        @media print {
          body, .watermark {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .letterhead {
            page-break-before: always;
          }
        }
      </style>
    </head>
    <body>
      <img src="${logoUrl}" alt="Watermark" class="watermark" />
      <div>
        <div class="letterpad-container">
          <div class="inst-name">${institute.instName}</div>
          <div class="institute-header">
              <img src="${institute.logoUrl}" alt="Logo" class="logo" />
              <div class="center-content">
                  <div class="inst-details">${institute.instAddr}</div>
                  <div class="inst-details">📞 +91-${institute.instMobile} | 🌐 ${institute.instUrl}</div>
                  <div class="session">Academic Session: ${institute.session}</div>
              </div>
          </div>
        </div>
      </div>
      ${htmlContent}
    </body>
  </html>
  `);

  win.document.close();
  win.focus();
  win.print();
};