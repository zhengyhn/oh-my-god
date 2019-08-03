package io.github.zhengyhn.ohmygod.mediator.common;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
@Slf4j
public class ControllerValidationHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public ResponseResult processValidationError(MethodArgumentNotValidException ex) {
        BindingResult result = ex.getBindingResult();
        FieldError error = result.getFieldError();

        return processFieldError(error);
    }

    @ExceptionHandler(BindException.class)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public ResponseResult processValidationError(BindException ex) {
        BindingResult result = ex.getBindingResult();
        FieldError error = result.getFieldError();

        return processFieldError(error);
    }

    @ExceptionHandler(BusinessException.class)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public ResponseResult processValidationError(BusinessException ex) {
        return new ResponseResult(ResponseResult.ResponseCode.FAIL.getValue(), ex.getMessage());
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public ResponseResult processValidationError(Exception ex) {
        return new ResponseResult(ResponseResult.ResponseCode.FAIL.getValue(), "System internal error");
    }

    private ResponseResult processFieldError(FieldError error) {
        ResponseResult result = null;
        if (error != null) {
            String msg = String.format("%s %s", error.getField(), error.getDefaultMessage());
            result = new ResponseResult(ResponseResult.ResponseCode.FAIL.getValue(), msg);
        }
        return result;
    }
}
