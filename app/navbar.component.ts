import {Component} from '@angular/core';
import {RouterLink,Router} from '@angular/router-deprecated';

@Component({
    selector:'nav-bar',
    templateUrl:'app/navbar.html',
    directives:[RouterLink]    
})
export class NavbarComponent{

    constructor(private router:Router){
        
    }

}