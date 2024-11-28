package com.danilkompaniets.book_network.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AuthenticationRequest {
    @NotEmpty(message = "password is required")
    @NotBlank(message = "password is required")
    @Size(min = 8, message = "min length of password is 8")
    private String password;
    @NotEmpty(message = "email is required")
    @NotBlank(message = "email is required")
    @Email(message = "email is not valid")
    private String email;
}
