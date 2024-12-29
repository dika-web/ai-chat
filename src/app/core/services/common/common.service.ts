import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  protected _BASE_URL = 'http://localhost:3000';
  protected _http = inject(HttpClient);
}
