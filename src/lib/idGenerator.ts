import Counter from '@/models/counter.model';

export async function generateAdmissionNumber(session: string): Promise<string> {
    const shortYear = String(session).split('-')[0].slice(-2);

    // Find or create a session-based counter
    const sessionKey = `admission_${shortYear}`;
    const counter = await Counter.findOneAndUpdate(
        { name: sessionKey },
        { $inc: { count: 1 } },
        { new: true, upsert: true }
    );

    const admissionNumber = `${shortYear}${String(counter.count).padStart(2, '0')}`;
    return admissionNumber;
}


export async function generateEmployeeId(): Promise<string> {
    const counter = await Counter.findOneAndUpdate(
        { name: "employee" },
        { $inc: { count: 1 } },
        { new: true, upsert: true }
    );
    const paddedCounter = String(counter.count).padStart(2, '0');
    const year = new Date().getFullYear().toString().slice(-2)

    return ("EM" + year + paddedCounter);
}


export async function generateFeeReciptNumber(): Promise<string> {
    const counter = await Counter.findOneAndUpdate(
        { name: 'fee' },
        { $inc: { count: 1 } },
        { new: true, upsert: true }
    );
    const paddedCounter = String(counter.count).padStart(4, '0');
    const year = new Date().getFullYear().toString().slice(-2)

    return ("FR" + year + paddedCounter);
}