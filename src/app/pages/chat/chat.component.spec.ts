import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ChatComponent} from './chat.component';
import {PromptService} from '../../core/services/prompts';
import {provideHttpClient} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatComponent, BrowserAnimationsModule],
      providers: [PromptService, provideHttpClient()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
