import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ClipboardButtonComponent} from './clipboard-button.component';

describe('CliboardButtonComponent', () => {
  let component: ClipboardButtonComponent;
  let fixture: ComponentFixture<ClipboardButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClipboardButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ClipboardButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
