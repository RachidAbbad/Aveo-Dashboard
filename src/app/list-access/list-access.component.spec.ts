import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAccessComponent } from './list-access.component';

describe('ListAccessComponent', () => {
  let component: ListAccessComponent;
  let fixture: ComponentFixture<ListAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
