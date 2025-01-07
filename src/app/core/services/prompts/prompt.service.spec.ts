import {TestBed} from '@angular/core/testing';

import {PromptService} from './prompt.service';
import {provideHttpClient} from '@angular/common/http';

describe('PromptService', () => {
  let service: PromptService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[provideHttpClient(), ]
    });
    service = TestBed.inject(PromptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
