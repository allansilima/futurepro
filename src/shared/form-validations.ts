
export class FormValidations {

  static getErrorMsg(fieldName: string, validatorName: string, validatorValue?: any, message?: string) {
    const config = {
      'required': `${fieldName} é obrigatório`,
      'minlength': `${fieldName} deve ter no mínimo ${validatorValue.requiredLength} caracteres`,
      'maxlength': `${fieldName} deve ter no máximo ${validatorValue.requiredLength} caracteres`,
      'email': `${fieldName} inválido`,
      'pattern': `${fieldName} inválido`,
//      'sponsor_username': `${fieldName} não existe`,
//      'cpf': `${fieldName} inválido`,
//      'password': `${fieldName} fraca`,
      'error': `${fieldName} ${message}`,
    };

    return config[validatorName];
  }
}
