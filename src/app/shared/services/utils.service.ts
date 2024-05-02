import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  range(start: number, end: number): number[] {
    const result = [];

    for (let i = start; i <= end; i++) {
      result.push(i);
    }

    return result;
  }
}
