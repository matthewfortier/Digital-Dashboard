import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentSelectorFlyoutComponent } from './component-selector-flyout.component';

describe('ComponentSelectorFlyoutComponent', () => {
  let component: ComponentSelectorFlyoutComponent;
  let fixture: ComponentFixture<ComponentSelectorFlyoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentSelectorFlyoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentSelectorFlyoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
