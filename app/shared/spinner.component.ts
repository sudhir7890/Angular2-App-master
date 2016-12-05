import {Component, Input} from '@angular/core';

@Component({
    selector:'spinner',
    template:`
        <div *ngIf="visible">
            <i class="fa fa-spinner fa-spin fa-4x"></i>
        </div>
    `

})
export class SpinnerComponent{

    @Input() visible:boolean = true;
}