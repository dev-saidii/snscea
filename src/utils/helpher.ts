export const getBase64FromUrl = async (url: string): Promise<string> => {
    const response = await fetch(url);
    const blob = await response.blob();
    return await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = () => reject("Failed to convert to base64");
    });
};

// Helper functions
export function getCurrentSession(): string {
    const d = new Date();
    const m = d.getMonth();
    const currentYear = new Date().getFullYear();
    const session = m >= 3 ? `${currentYear}-${currentYear + 1}` : `${currentYear - 1}-${currentYear}`;
    return session;
}

export function generateLast5Sessions(): string[] {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 6 }, (_, i) => {
        const year = currentYear - i + 1;
        return `${year - 1}-${year}`;
    });
}

// Shared configuration and utilities
export const getInstituteDetails = () => ({
    logoUrl: `/logo-bgrm.png`,
    instName: process.env.NEXT_PUBLIC_INSTITUTE_NAME || "",
    instAddr: process.env.NEXT_PUBLIC_INSTITUTE_ADDRESS || "",
    instMobile: process.env.NEXT_PUBLIC_INSTITUTE_MOBILE || "",
    instUrl: process.env.NEXT_PUBLIC_INSTITUTE_URL || "",
    instEmail: process.env.NEXT_PUBLIC_INSTITUTE_EMAIL || "",
    session: getCurrentSession()
});


export function calculateGrade(obtained: number, max: number): string {
    if (max === 0) return '-';
    const percent = (obtained / max) * 100;
    if (percent >= 90) return 'A+';
    if (percent >= 80) return 'A';
    if (percent >= 70) return 'B+';
    if (percent >= 60) return 'B';
    if (percent >= 45) return 'C';
    if (percent >= 33) return 'D';
    return 'F';
}

export const gradeColor = (grade: string) => {
    switch (grade) {
        case 'A+': return "bg-green-100 text-green-800";
        case 'A': return "bg-green-200 text-green-900";
        case 'B+': return "bg-blue-100 text-blue-800";
        case 'B': return "bg-blue-200 text-blue-900";
        case 'C': return "bg-yellow-100 text-yellow-800";
        case 'D': return "bg-yellow-200 text-yellow-800";
        case 'F': return "bg-red-100 text-red-800";
        default: return "bg-gray-100 text-gray-700";
    }
};


