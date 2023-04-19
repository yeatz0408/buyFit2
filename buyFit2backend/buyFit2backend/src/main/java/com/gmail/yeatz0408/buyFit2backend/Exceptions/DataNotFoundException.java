package com.gmail.yeatz0408.buyFit2Backend.Exceptions;

public class DataNotFoundException extends RuntimeException {

    public DataNotFoundException(String reason) {
        super("An error occured from                 " + reason);
    }
    
}
