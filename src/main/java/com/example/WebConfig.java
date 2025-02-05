package com.example;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Allow CORS for all routes with specific allowed origins
    	registry.addMapping("/api/**")
        .allowedOrigins("*")  // Allow all origins 
        .allowedMethods("GET", "POST", "PUT", "DELETE")
        .allowedHeaders("*");

            
    }
}