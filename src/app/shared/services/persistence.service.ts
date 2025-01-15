import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PersistenceService {
  /**
   * Saves data to localStorage under the specified key.
   *
   * @param key - The key under which the data should be stored.
   * @param data - The data to be stored, which will be stringified.
   *
   * Logs an error message to the console if saving fails.
   */

  set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Error saving to localStorage: ${error}`);
    }
  }

  /**
   * Retrieves data from localStorage under the specified key.
   *
   * @param key - The key under which the data should be stored.
   *
   * Returns the data if it could be retrieved and parsed, otherwise null.
   *
   * Logs an error message to the console if retrieving or parsing fails.
   */
  get(key: string): any {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(`Error getting data "${key}" from localStorage: ${error}`);
      return null;
    }
  }

  /**
   * Deletes data from localStorage under the specified key.
   *
   * @param key - The key under which the data should be stored.
   *
   * Logs an error message to the console if deleting fails.
   */
  delete(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error deleting data "${key}" from localStorage: ${error}`);
    }
  }
}
