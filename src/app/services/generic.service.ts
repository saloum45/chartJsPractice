import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  constructor(private http: HttpClient) { }

  getAll(path: string): Promise<any[]>{
    return new Promise((resolve, reject) => {
      this.http.get<any[]>(path).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err) => {
          reject(err)
        }
      })
    })
  }

  add(path: string, data: any): Promise<any>{
    return new Promise<any>((resolve, reject) => {
      this.http.post<any>(path, data).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err) => {
          reject(err);
        }
      })
    })
  }

  getById(path: string, id: string): Promise<any>{
    return new Promise((resolve, reject) => {
      this.http.get<any>(`${path}/${id}`).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err) => {
          reject(err)
        }
      })
    })
  }

  getBy(path: string, param: string, value: string): Promise<any[]>{
    return new Promise((resolve, reject) => {
      this.http.get<any[]>(`${path}?${param}=${value}`).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err) => {
          reject(err)
        }
      })
    })
  }

  update(path: string, id: string, data: any): Promise<any>{
    return new Promise<any>((resolve, reject) => {
      this.http.patch<any>(`${path}/${id}`, data).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err) => {
          reject(err);
        }
      })
    })
  }

  delete(path: string, id: string): Promise<any>{
    return new Promise<any>((resolve, reject) => {
      this.http.delete<any>(`${path}/${id}`).subscribe({
        next: (res) => {
          resolve(res);
        },
        error: (err) => {
          reject(err);
        }
      })
    });
  }

  report(status: string, title: string, message: string) {
    if (status == 'success') {
      Report.success(
        title,
        message,
        'Okay',
      );
    } else {
      Report.failure(
        title,
        message,
        'Okay',
      );
    }
  }

  notify(status: string, message: string) {
    if (status == 'success') {
      Notify.success(message);
    } else {
      Notify.failure(message);
    }

  }

  loadingOn() {
    Loading.init({
      svgColor: '#f47a20',
      cssAnimation: true,
      cssAnimationDuration: 360,

    });
    Loading.hourglass();
  }

  loadingOff() {
    Loading.remove();
  }

  loadingOffAfterDelay(delay: number) {
    Loading.remove(delay);
  }

}
