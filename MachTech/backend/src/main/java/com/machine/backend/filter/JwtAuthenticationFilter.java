package com.machine.backend.filter;

import com.machine.backend.utils.JwtTokenUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenUtil jwtTokenUtil;
    private final UserDetailsService userDetailsService;

    public JwtAuthenticationFilter(JwtTokenUtil jwtTokenUtil, UserDetailsService userDetailsService) {
        this.jwtTokenUtil = jwtTokenUtil;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        
        // Skip filter for login and register endpoints
        String path = request.getRequestURI();
        if (path.equals("/api/jwt/login") || path.equals("/api/jwt/register")) {
            filterChain.doFilter(request, response);
            return;
        }
        
        System.out.println("JwtAuthenticationFilter processing request: " + request.getRequestURI());
        
        // Get Authorization header
        final String authorizationHeader = request.getHeader("Authorization");
        System.out.println("Authorization header: " + (authorizationHeader != null ? "present" : "missing"));

        String email = null;
        String jwtToken = null;

        // Check if the Authorization header is present and starts with "Bearer "
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwtToken = authorizationHeader.substring(7);
            System.out.println("JWT Token extracted, length: " + jwtToken.length());
            
            try {
                email = jwtTokenUtil.extractEmail(jwtToken);
                System.out.println("Email extracted from token: " + email);
            } catch (Exception e) {
                System.err.println("JWT Token validation failed: " + e.getMessage());
                e.printStackTrace();
            }
        }

        // If email was extracted and there's no authentication in the SecurityContext
        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            System.out.println("Loading user details for: " + email);
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(email);
            
            // Validate the token
            boolean isTokenValid = jwtTokenUtil.validateToken(jwtToken);
            System.out.println("Token validation result: " + (isTokenValid ? "valid" : "invalid"));
            
            if (isTokenValid) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                
                // Set the authentication in the SecurityContext
                SecurityContextHolder.getContext().setAuthentication(authToken);
                System.out.println("Authentication set in SecurityContext");
            }
        }
        
        filterChain.doFilter(request, response);
    }
}