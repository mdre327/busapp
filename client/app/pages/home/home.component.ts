// Import Libraries
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { PlaceService } from '../../services/place.service';
import { Place } from '../../domain/locations_db/place';
import { NgForm } from '@angular/forms';
import { MatDialog, PageEvent } from '@angular/material';
import { ModalRemoveComponent } from '../../components/modal-remove.component';

// Import Services

// START - USED SERVICES

// END - USED SERVICES

// START - REQUIRED RESOURCES

// END - REQUIRED RESOURCES

/**
 * Home Component
 */
@Component({
    selector: 'home',
    templateUrl : './home.component.html',
    styleUrls: ['./home.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class HomeComponent implements OnInit{
    title: string = 'My first AGM project';
    lat: number = 51.610000;
    lng: number = 7.800000;
    places: Place[] = [];
    selectedPlace: Place;
    item:Place = new Place();
    search: any = {};
    length: number;
    pageSize = 5;
    pageSizeOptions = [5, 10];
    pageIndex: number = 0;
    pageEvent: PageEvent;
    listSlice: any[];
    constructor(
        private location: Location,
        private placeService: PlaceService,
        public dialog: MatDialog,
    ) { }

    ngOnInit(): void {
        this.placeService.list().subscribe(list => {
            this.places = list;
            this.length = list.length;
            this.listSlice = list.slice(0, this.pageSize);
            if(this.places.length > 0) {
                this.lat = this.places[0].latitude;
                this.lng = this.places[0].longitude;
            }
        });
    }

    select(place: Place) {
        this.selectedPlace = place;
        this.lat = place.latitude;
        this.lng = place.longitude;
    }

    save (formValid:NgForm, item: Place): void{
        if (formValid.valid) {
                this.placeService.create(item).subscribe(data => {
                    this.placeService.list().subscribe(list => {
                        this.places = list;
                        if(this.pageEvent)
                            this.listSlice = list.slice(this.pageEvent.pageIndex * this.pageEvent.pageSize, this.pageEvent.pageIndex * this.pageEvent.pageSize + this.pageEvent.pageSize);
                        else
                            this.listSlice = list.slice(0, this.pageSize);
                    });
                    formValid.resetForm()
                });
            }
        }
        removePlace(id: string): void {
            let dialogRef = this.dialog.open(ModalRemoveComponent, {
                width: '250px',
                data: () => {
                    // Execute on confirm
                    this.placeService.remove(id).subscribe(() => {
                        dialogRef.close();
                    });
                    this.places = this.places.filter(item => item._id != id);
                    this.listSlice = this.listSlice.filter(item => item._id != id);
                    if(this.pageEvent)
                        this.listSlice = this.places.slice(this.pageEvent.pageIndex * this.pageEvent.pageSize, this.pageEvent.pageIndex * this.pageEvent.pageSize + this.pageEvent.pageSize);
                    else
                        this.listSlice = this.places.slice(0, this.pageSize);                }
            });
        }

        page(list: any[]) {
            this.pageIndex = this.pageEvent.pageIndex;
            this.listSlice = list.slice(this.pageEvent.pageIndex * this.pageEvent.pageSize, this.pageEvent.pageIndex * this.pageEvent.pageSize + this.pageEvent.pageSize);
        }
        setPageSizeOptions(setPageSizeOptionsInput: string) {
            this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
        }
}