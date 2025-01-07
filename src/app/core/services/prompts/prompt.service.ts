import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ChatInterface} from '../../models';
import {CommonService} from '../common';
import {WebSocketSubject} from "rxjs/internal/observable/dom/WebSocketSubject";

@Injectable({
  providedIn: 'root'
})
export class PromptService extends CommonService {
  private readonly WS_URL = 'ws://localhost:3000/prompts';
  stream = new WebSocket(this.WS_URL);
  constructor() {
    super();
  }

// eslint-disable-next-line @typescript-eslint/no-inferrable-types
  getPrompts(userId: string = '676da2fa10c33b536db38397'): Observable<ChatInterface[]> {
    return this._http.get<ChatInterface[]>(`${this._BASE_URL}/prompts?userId=${userId}`);
  }




  createStream(payload: {id: string; userId: string; prompt: string, projectId:string}): Observable<string> {
    return new Observable((observer) => {
      this.stream.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.content) {
          observer.next(data.content);
        } else if (data.processed) {
          observer.complete();
        } else if (data.error) {
          observer.error(data.error)
        }
      };

      this.stream.onerror = (error) => {
        observer.error('WebSocket error');
      };

      this.stream.send(JSON.stringify(payload));

      return () => {
        this.stream.close();
      };
    });
  }

}
