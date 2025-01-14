import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  /**
   * Creates an array of numbers from start to end (inclusive)
   * @example range(1, 3) => [1, 2, 3]
   * @param {number} start - starting number
   * @param {number} end - end number
   * @returns {number[]} array of numbers from start to end
   */
  range(start: number, end: number): number[] {
    return [...Array(end).keys()].map(elem => elem + start);
  }
}
