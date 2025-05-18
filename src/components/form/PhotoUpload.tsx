"use client";
import { useState, useRef, ChangeEvent } from "react";
import { Loader2, UploadCloud, X } from "lucide-react";
import toast from "react-hot-toast";
import { uploadImage } from "@/services/common";
import Image from "next/image";

type PhotoUploadProps = {
    photo: string,
    setPhoto: (val: string) => void;
    label?: string,
};

export default function PhotoUpload({
    photo,
    setPhoto,
    label = "Upload Photo",
}: PhotoUploadProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setLoading(true);
            try {
                const uploadedUrl = await uploadImage(file);
                setPhoto(uploadedUrl || "");
                toast.success("Photo Uploaded")
            } catch (err) {
                console.log(err)
                toast.error("Photo not uploaded")
            }
            setLoading(false);

        }
    };

    const handleRemove = () => {
        setPhoto("");
    };
    return (
        <div>
            <label className="block text-sm font-medium mb-2">{label}</label>
            <div className="flex items-center gap-4">
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={loading}
                />
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={loading}
                    className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg transition ${loading
                        ? "bg-gray-200 dark:bg-gray-700 cursor-not-allowed"
                        : "bg-[#205D80] hover:bg-[#17425a] text-white"
                        }`}
                >
                    {loading ? (
                        <Loader2 size={18} className="animate-spin" />
                    ) : (
                        <UploadCloud size={18} />
                    )}
                    {photo ? "Change Image" : "Upload Image"}
                </button>

                {photo && (
                    <div className="relative group">
                        <Image
                            src={photo}
                            alt="Preview"
                            width={64}
                            height={64}
                            className="w-16 h-16 rounded-lg object-cover border border-gray-300 dark:border-gray-600"
                        />
                        <button
                            type="button"
                            onClick={handleRemove}
                            className="absolute -top-2 -right-2 cursor-pointer bg-white dark:bg-gray-800 rounded-full p-0.5 shadow-sm hover:scale-105 transition"
                        >
                            <X size={16} className="text-red-600" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
