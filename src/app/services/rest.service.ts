import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IObject } from '../utils/interfaces';
import { catchError } from 'rxjs/operators';

@Injectable()
export class RestService {

	readonly CLOUD_BASE_PATH = 'http://35.185.38.132:8080';
	useCloudEndpoint = true;

	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json'
		})
	};

	constructor(private http: HttpClient) {}

	determineUrl(originalUrl: string): string {
		let url = originalUrl;

		if (this.useCloudEndpoint) {
			url = this.CLOUD_BASE_PATH + originalUrl;
		}

		return url;
	}

	post(path: string, body: any): Observable<any> {
		let url = this.determineUrl(path);

		return this.http.post<any>(url, body, this.httpOptions)
			.pipe(catchError(this.handleError<any>('post', [])));
	}

	delete(path: string) : Observable<any> {
		let url = this.determineUrl(path);

		return this.http.delete<any>(url)
			.pipe(catchError(this.handleError<any>('delete', [])));
	}
	
	get(path: string): Observable<any> {
		let url = this.determineUrl(path);

		return this.http.get<any>(url)
			.pipe(catchError(this.handleError<any>('get', [])));
	}

	promiseGet(path: string, subject: BehaviorSubject<IObject>): Promise<any> {
		let url = this.determineUrl(path);

		return new Promise((resolve, reject) => {
			this.get(url).subscribe(response => {
				if (response > 300) {
					subject.next({ ...response.body });
					resolve(response);
				} else {
					reject();
				}
			});
		});
	}

	promisePost(path: string, subject: BehaviorSubject<IObject>, payload: any): Promise<any> {
		let url = this.determineUrl(path);

		return new Promise((resolve, reject) => {
			this.post(url, payload).subscribe(response => {
				if (response > 300) {
					subject.next({ ...response.body });
					resolve(response);
				} else {
					reject();
				}
			});
		});
	}

	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			console.error(error);
			return of(result as T);
		}
	}
}