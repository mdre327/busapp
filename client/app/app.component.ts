import { ViewEncapsulation } from '@angular/core';
import { Component } from '@angular/core';

@Component({
    selector: "demo-app",
    templateUrl: "./app.component.html",

    //FOR GLOBAL CSS STYLE
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./style.css'],
})
/**
 * THIS COMPONENT CONTAINS THE TEMPLATE OF WEB SITE
 */
export class AppComponent {

}