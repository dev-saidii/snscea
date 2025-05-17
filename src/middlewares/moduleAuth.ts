import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

export function authenticateModuleAccess(req: NextRequest, requiredModule: string) {
    const token = req.cookies.get('saidii-accessToken')?.value;
    // console.log(token)
    if (!token) {
        return NextResponse.json({ message: 'Unauthorized: No token' }, { status: 401 });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if (!decoded.access?.includes(requiredModule)) {
            return NextResponse.json({ message: `Forbidden: No access to '${requiredModule}'` }, { status: 403 });
        }

        return decoded; // user data
    } catch (error) {
        console.error('JWT verification failed:', error);
        return NextResponse.json({ message: 'Unauthorized: Invalid token' }, { status: 401 });
    }
}



export function authenticate(req: NextRequest) {
    try {
        const token = req.cookies.get('saidii-accessToken')?.value;
        if (!token) {
            return NextResponse.json({ message: 'Unauthorized: No token' }, { status: 401 });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET || " ");
        return decoded;
    } catch (error) {
        console.log(error)
        return null;
    }
}
