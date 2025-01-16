import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'http://localhost:3000/api/items';
  constructor(private http: HttpClient) {}

  getItems(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl);
  }

  addItem(newItem: string): Observable<any> {
    return this.http.post(this.apiUrl, { item: newItem });
  }

  deleteItem(id: string): Observable<any> {
    const itemToDelete = encodeURIComponent(id);
    return this.http.delete(`${this.apiUrl}/${itemToDelete}`);
  }

  private dataSubject = new BehaviorSubject<string[]>([
    'Item 1',
    'Item 2',
    'Item 3',
  ]);
  data$: Observable<string[]> = this.dataSubject.asObservable();

  // addItem(newItem: string): void {
  //   const currentData = this.dataSubject.value;
  //   this.dataSubject.next([...currentData, newItem]);
  // }
}
