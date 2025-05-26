'use client';

interface Props {
    email: string;
    mobile: string;
    address: string;
    setEmail: (val: string) => void;
    setMobile: (val: string) => void;
    setAddress: (val: string) => void;

}

export default function ContactDetails({
    email,
    mobile,
    address,
    setEmail,
    setMobile,
    setAddress,
}: Props) {
    return (
        <div className="w-full space-y-4 shadow-sm p-6 rounded-sm border border-blue-100">
            {/* <h2 className="text-2xl font-bold  text-[#205D80] text-center drop-shadow-sm">
                Contact Details
            </h2> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email Address
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email address"
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#13222f] text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Mobile Number
                    </label>
                    <input
                        required
                        minLength={10}
                        maxLength={10}
                        type="text"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="Enter mobile number"
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#13222f] text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                </div>

            </div>
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Address
                </label>
                <textarea
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter address"
                    className="w-full h-24 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#13222f] text-gray-900 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
            </div>
        </div>
    );
}
