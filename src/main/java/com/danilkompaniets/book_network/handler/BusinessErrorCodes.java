package com.danilkompaniets.book_network.handler;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.client.HttpClientErrorException;

public enum BusinessErrorCodes {
    NO_CODE(0, HttpStatus.NOT_IMPLEMENTED, "No code"),

    INCORRECT_PASSWORD(300, HttpStatus.BAD_REQUEST, "Incorrect password"),

    NEW_PASSWORD_DOES_NOT_MATCH(301, HttpStatus.BAD_REQUEST, "Password does not match"),

    ACCOUNT_LOCKED(302, HttpStatus.FORBIDDEN, "User account is locked"),

    ACCOUNT_DISABLED(303, HttpStatus.FORBIDDEN, "User account is disabled"),

    BAD_CREDENTIALS(304, HttpStatus.BAD_REQUEST, "Bad credentials"),

    ;
    @Getter
    private final int code;
    @Getter
    private final String description;
    @Getter
    private final HttpStatus httpStatus;


    BusinessErrorCodes(int code, HttpStatus httpStatus, String description) {
        this.code = code;
        this.description = description;
        this.httpStatus = httpStatus;
    }
}
