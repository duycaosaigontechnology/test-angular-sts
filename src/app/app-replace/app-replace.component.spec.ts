import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppReplaceComponent } from './app-replace.component';

describe('AppReplaceComponent', () => {
  let component: AppReplaceComponent;
  let fixture: ComponentFixture<AppReplaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppReplaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppReplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
