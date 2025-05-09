import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname
    if (pathname.startsWith('/todos')) {
        const token = request.cookies.get('token')

        if (token == undefined) {
            return NextResponse.rewrite(new URL('/login', request.url))
        }
    }

    return NextResponse.next();
}