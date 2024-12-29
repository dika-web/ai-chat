import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ChatInterface} from '../../models';
import {CommonService} from '../common';

@Injectable({
  providedIn: 'root'
})
export class PromptService extends CommonService {
  constructor() {
    super();
  }

// eslint-disable-next-line @typescript-eslint/no-inferrable-types
  getPrompts(userId: string = '676da2fa10c33b536db38397'): Observable<ChatInterface[]> {
    return this._http.get<ChatInterface[]>(`${this._BASE_URL}/prompts?userId=${userId}`);
  }

  createPrompt(payload: {id: string; userId: string; prompt: string}): Observable<ChatInterface> {
    return this._http.post<ChatInterface>(`${this._BASE_URL}/prompts`, payload, {headers: {'Content-Type': 'application/json'}});
  }
}
