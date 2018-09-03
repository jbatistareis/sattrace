import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TleListComponent } from './tle-list.component';

describe('TleListComponent', () => {
  let component: TleListComponent;
  let fixture: ComponentFixture<TleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
