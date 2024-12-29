import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TypingMarkdownComponent} from './typing-markdown.component';
import {MarkdownModule, MarkdownService} from 'ngx-markdown';

describe('TypingMarkdownComponent', () => {
  let component: TypingMarkdownComponent;
  let fixture: ComponentFixture<TypingMarkdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypingMarkdownComponent, MarkdownModule.forRoot()],
      providers: [MarkdownService]
    }).compileComponents();

    fixture = TestBed.createComponent(TypingMarkdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
