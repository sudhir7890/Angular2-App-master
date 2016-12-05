import {Component} from '@angular/core';
import {NavbarComponent} from './navbar.component';
import {RouteConfig, RouterOutlet} from '@angular/router-deprecated';
import {HomeComponent} from './home.component';
import {UserListComponent} from './users/user-list.component';
import {UserFormComponent} from './users/user-form.component';
import {PostComponent} from './posts/post.component';
import {NotFoundComponent} from './shared/notfound.component';

@RouteConfig([
    {path:'/', name:"Home", component:HomeComponent, useAsDefault:true},
    {path:'/users', name:"Users", component:UserListComponent},
    {path:'/users/new', name:"NewUser", component:UserFormComponent},
    {path:'/users/{Id}', name:"EditUser", component:UserFormComponent},    
    {path:'/posts', name:"Posts", component:PostComponent},
    {path:'/notfound',name:'NotFound', component:NotFoundComponent},
    {path:'/*other',name:'Other', redirectTo:['Home']}
    
])
@Component({
    selector: 'my-app',
    template: `
        <nav-bar></nav-bar>
        <div class="container">
            <router-outlet></router-outlet>
        </div>
    `,
    directives:[NavbarComponent, RouterOutlet]
})
export class AppComponent { }