import cloudinary from '@/lib/cloudinary';

export async function POST(request: Request) {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || typeof file === 'string') {
        return Response.json({ success: false, error: 'No file uploaded' }, { status: 400 });
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary using upload_stream
    try {
        const uploadResult = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: 'nextjs_uploads' },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );
            stream.end(buffer);
        });

        return Response.json({ success: true, url: uploadResult.secure_url });
    } catch (error) {
        return Response.json({ success: false, error: error.message }, { status: 500 });
    }
}
