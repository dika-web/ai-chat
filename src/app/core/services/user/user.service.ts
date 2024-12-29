import {Injectable} from '@angular/core';
import {CommonService} from '../common/common.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends CommonService {
  constructor() {
    super();
  }
}
