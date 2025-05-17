import Counter from '@/models/counter.model';

export async function generateAdmissionNumber(): Promise<string> {
    const counter = await Counter.findOneAndUpdate(
        { name: "admissionNumber" },
        { $inc: { count: 1 } },
        { new: true, upsert: true }
    );
    const paddedCounter = String(counter.count).padStart(4, '0');
    const year = new Date().getFullYear().toString().slice(-2)

    return (year + paddedCounter);
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