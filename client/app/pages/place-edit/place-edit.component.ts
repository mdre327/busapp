// Import Libraries
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

// Import Services
import { PlaceService } from '../../services/place.service';

// Import Models
import { Place } from '../../domain/locations_db/place';

// START - USED SERVICES
/*
 *	placeService.create
 *		PARAMS: 
 *		
 *
 *	placeService.get
 *		PARAMS: 
 *					ObjectId id - Id 
 *		
 *
 *	placeService.update
 *		PARAMS: 
 *					ObjectId id - Id
 *		
 *
 */
// END - USED SERVICES

// START - REQUIRED RESOURCES
/*
 * placeService  
 */
// END - REQUIRED RESOURCES

/**
 * Edit component for placeEdit
 */
@Component({
    selector: 'place-edit',
    templateUrl : './place-edit.component.html',
    styleUrls: ['./place-edit.component.css']
})
export class PlaceEditComponent implements OnInit {

    item: Place;
    model: Place;
    
    constructor(
        private placeService: PlaceService,
        private route: ActivatedRoute,
        private location: Location) {
        // Init item
        this.item = new Place();
    }

    ngOnInit(): void {
            this.route.params.subscribe(param => {
                let id: string = param['id'];
                if (id !== 'new') {
                    // Get item from server 
                    this.placeService.get(id).subscribe(item => this.item = item);
                    
                    
                } else {
                    this.item.latitude = 41.890251;
                    this.item.longitude = 12.492373;
                }
            });
    }
    markerMoved(event: any) {
        this.item.latitude = event.coords.lat;
        this.item.longitude = event.coords.lng;
    }

    /**
     * Save Item
     */
    save (formValid:boolean, item: Place): void{
        if (formValid) {
            if(item._id){
                this.placeService.update(item).subscribe(data => this.goBack());
            } else {
                this.placeService.create(item).subscribe(data => this.goBack());
            }  
        }
    }

    /**
     * Go Back
     */
    goBack(): void {
        this.location.back();
    }

}