package com.danilkompaniets.book_network.config;


import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;

import java.lang.annotation.Inherited;

@OpenAPIDefinition(
        info = @Info(
                contact = @Contact(
                        name = "danilkompaniets",
                        email = "kompaniets1592925@gmail.com"
                ),
                description = "OPENAPI documentstion for spring security",
                title = "OPENAPI specification",
                license = @License(
                        name = "NONE",
                        url = "https://someUrl"
                )
        ),
        servers = {
                @Server(
                        description = "Local environment",
                        url = "http://localhost:8088/api/v1"
                ),
        },
        security = {
                @SecurityRequirement(
                        name = "bearerAuth"
                )
        }

)
@SecurityScheme(
        name = "bearerAuth",
        description = "JWT auth",
        scheme = "bearer",
        type = SecuritySchemeType.HTTP,
        bearerFormat = "JWT",
        in = SecuritySchemeIn.HEADER
)
public class OpenApiConfig {
}
