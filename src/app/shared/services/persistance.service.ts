import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PersistanceService {
  set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Error saving to localStorage: ${error}`);
    }
  }

  get(key: string): string | null {
    try {
      return localStorage.getItem(key)
        ? JSON.parse(localStorage.getItem(key)!)
        : null;
    } catch (error) {
      console.error(`Error reading from localStorage: ${error}`);

      return null;
    }
  }
}
