import {Control} from '@angular/common';

export class EmailValidator{

    static validateEmail(emailCntrl:Control) {
        var email = emailCntrl.value;
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(email)){
            return {emailInValid: true};
        }
        return null;
    }
}