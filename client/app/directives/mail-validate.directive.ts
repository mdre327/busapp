import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
@Directive({
  selector: '[isMail]',
  providers: [{provide: NG_VALIDATORS, useExisting: MailValidator, multi: true}]
})
export class MailValidator implements Validator {
  constructor() {}
  validate(control: AbstractControl): { [key: string]: any } {
    // self value (e.g. retype password)
    let mail = control.value;

    var regExpMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!mail) {return null};

    if (!regExpMail.test(mail)) return {
      validateEqual: false
    }
    return null;
  }
}