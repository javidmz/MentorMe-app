package com.chatapp.ChatApp.exception;

public class NotEnoughTagException extends RuntimeException{
    public NotEnoughTagException(String message){
        super(message);
    }
}
