package io.github.zhengyhn.ohmygod.mediator.common.aspect;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.EnumSet;
import java.util.Set;
import java.util.stream.Collectors;

public class StringEnumerationValidator implements ConstraintValidator<StringEnumeration, String> {
    private Set<String> allowedValues;

    @Override
    public void initialize(StringEnumeration stringEnumeration) {
        Class<? extends Enum> enumSelected = stringEnumeration.enumClass();
        allowedValues = (Set<String>)EnumSet.allOf(enumSelected).stream().map(e -> ((Enum<? extends Enum<?>>) e).name())
                .collect(Collectors.toSet());
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null) {
            return true;
        } else {
            return allowedValues.contains(value);
        }
    }
}
