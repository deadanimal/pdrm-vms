import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BdaComponent } from './bda.component';

describe('BdaComponent', () => {
  let component: BdaComponent;
  let fixture: ComponentFixture<BdaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BdaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BdaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
