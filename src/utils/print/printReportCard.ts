import { getInstituteDetails } from "../helpher";
import { generateReportCardHTML } from "../html/getReportCardHTML";
import { MarksheetInput } from "@/types/marksheet";


const printHtmlContent = (content: string) => {
    const printWindow = window.open("", "", "height=700,width=900");
    if (!printWindow) {
        alert("Popup blocked! Please allow popups to print.");
        return;
    }

    printWindow.document.write(`
    ${content}
  `);

    printWindow.document.close();
    printWindow.focus();
    // printWindow.print();
};

export const printReportCard = async (marksheet: MarksheetInput) => {
    const institute = getInstituteDetails();
    const content = await generateReportCardHTML(marksheet, institute)
    printHtmlContent(content)
};