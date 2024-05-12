package com.chatapp.ChatApp.exception;

import lombok.Getter;

import java.util.List;

@Getter
public class IncorrectInputException extends RuntimeException {

    private List<String> errorMessages;

    public IncorrectInputException(List<String> errorMessages) {
        this.errorMessages = errorMessages;
    }
}
