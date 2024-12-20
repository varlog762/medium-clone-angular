import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PersistenceService {
  set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Error saving to localStorage: ${error}`);
    }
  }

  get(key: string): any {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(`Error getting data "${key}" from localStorage: ${error}`);
      return null;
    }
  }

  delete(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error deleting data "${key}" from localStorage: ${error}`);
    }
  }
}
