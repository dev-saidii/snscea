import User from '@/models/user.model';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

export async function authenticateModuleAccess(req: NextRequest, requiredModule: string) {
    const token = req.cookies.get('saidii-accessToken')?.value;
    if (!token) {
        return null;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (!decoded) return null;
        const user = await User.findById(decoded.userId)
        if (!user || !user.access.includes(requiredModule)) return null;
        const { password, ...safeUser } = user.toObject();
        return safeUser;
    } catch (error) {
        console.error('JWT verification failed:', error);
        return null;
    }
}



export async function authenticate(req: NextRequest) {
    try {
        const token = req.cookies.get('saidii-accessToken')?.value;
        if (!token) {
            return null;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || " ");
        if (!decoded) null;
        const user = await User.findById(decoded.userId)
        if (!user) return null;
        const { password, ...safeUser } = user.toObject();
        return safeUser;
    } catch (error) {
        console.log(error)
        return null;
    }
}
