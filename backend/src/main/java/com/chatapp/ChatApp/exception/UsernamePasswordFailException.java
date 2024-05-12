package com.chatapp.ChatApp.exception;

public class UsernamePasswordFailException extends RuntimeException{

    public UsernamePasswordFailException(String message) {
        super(message);
    }
}
