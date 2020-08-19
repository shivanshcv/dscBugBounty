import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZippassComponent } from './zippass.component';

describe('ZippassComponent', () => {
  let component: ZippassComponent;
  let fixture: ComponentFixture<ZippassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZippassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZippassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
