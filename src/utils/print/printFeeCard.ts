import { Student } from "@/types/type";
import { getInstituteDetails } from "../helpher";
import { generateFeeCardHTML } from "../html/getFeeCardHTML";


const printHtmlContent = (title: string, content: string) => {
    const printWindow = window.open("", "", "height=700,width=1000");
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

export const printMultipleStudentFeeCards = async (students: Student[]) => {
    const institute = getInstituteDetails();
    const htmlCards = await Promise.all(
        students.map(student =>
            generateFeeCardHTML(student, institute)
        )
    );
    printHtmlContent("Fee Cards", htmlCards.join("\n"));
};