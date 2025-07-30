

import { MiddlewareConfig, NextRequest, NextResponse } from "next/server"


const publicRoutes = [
    {path: '/signIn', wheAuthenticated: 'redirect'}, //Ele não pode acessar o sign-in se já estiver logado
    {path: '/signInAdmin', wheAuthenticated: 'redirect'}, //Ele não pode acessar o sign-in se já estiver logado
    {path: '/', wheAuthenticated: 'next'}, //Ele não pode acessar o register se já estiver logado
    {path: '/pedidos', wheAuthenticated: 'next'}, // Ele pode acessar o pricing se não estiver logado
] as const

const REDIRECT_WHE_NOT_AUTHENTICATED = '/signIn'

// Middleware to check if user is authenticated
export function middleware(request: NextRequest){
    const path = request.nextUrl.pathname //
    const publicRoute = publicRoutes.find(route => route.path === path)
    const authToken = request.cookies.get('__Secure-next-auth.session-token') || request.cookies.get('next-auth.session-token');
    console.log('authToken', authToken)

    // If user is not authenticated and is trying to access a public route, allow access
    if(!authToken && publicRoute){
        return NextResponse.next()
    }
    // If user is not authenticated and is trying to access a private route, redirect to /signin
    if(!authToken && !publicRoute){
        const redirectUrl = request.nextUrl.clone()
        redirectUrl.pathname = REDIRECT_WHE_NOT_AUTHENTICATED

        return NextResponse.redirect(redirectUrl)
    }
    // If user is authenticated and is trying to access a public route, redirect to dashboard
    if(authToken && publicRoute && publicRoute.wheAuthenticated === 'redirect'){
        const redirectUrl = request.nextUrl.clone()
        redirectUrl.pathname = '/dashboard'

        return NextResponse.redirect(redirectUrl)
    }

    if(authToken && !publicRoute){
        // verifcar se o JWT não está expirado

        return NextResponse.next()
    }

    return NextResponse.next()
} 

export const config: MiddlewareConfig = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
      ]
}