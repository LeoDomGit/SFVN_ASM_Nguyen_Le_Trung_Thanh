<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CustomMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if the request is from Postman or localhost:3000
        $allowedOrigins = ['http://localhost:3000', 'https://www.getpostman.com','https://dashboad-test-sfvn.vercel.app','https://user-test-sfvn.vercel.app'];
        
        // Check if the request has the 'Origin' header
        $origin = $request->header('Origin');

        if (in_array($origin, $allowedOrigins) || $request->header('Postman-Token')) {
            // Allow the request to proceed
            return $next($request);
        }

        // If the request is not from an allowed origin, return a Forbidden response
        return response()->json(['message' => 'Not allowed.'], 403);
    }
}
