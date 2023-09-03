import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';

const handleParentProperty = (errors: string[], parentProperty?: string) => {
  if (!parentProperty) return errors;

  const errorsWithParent = errors.map((error) =>
    parentProperty.concat('.', error),
  );

  return errorsWithParent;
};

const handleGetMessage = (
  errors: ValidationError[],
  parentProperty?: string,
) => {
  const formattedMessageArray = errors.map((error) => {
    const hasNestedValidation = error.children.length > 0;

    if (hasNestedValidation)
      return handleGetMessage(error.children, error.property);

    const messagesArray = handleParentProperty(
      Object.values(error.constraints),
      parentProperty,
    );

    const messagesString = messagesArray.join(', ');

    return messagesString;
  });

  const formattedMessageString = formattedMessageArray.join(', ');

  return formattedMessageString;
};

const customExceptionFactory = (errors: ValidationError[]) => {
  const message = handleGetMessage(errors);

  return new BadRequestException(message);
};

export class ValidateFieldsPipe extends ValidationPipe {
  constructor() {
    super({
      transform: true,
      exceptionFactory: customExceptionFactory,
    });
  }
}
