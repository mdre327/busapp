import { EventEmitter } from 'events';
import { Injectable } from '@angular/core';

/**
 * This class emit an event when user login or logout
 */
@Injectable()
export class TokenEmitter {
    emitter : EventEmitter = new EventEmitter();
}