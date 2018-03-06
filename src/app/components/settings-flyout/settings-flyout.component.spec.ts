import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsFlyoutComponent } from './settings-flyout.component';

describe('SettingsFlyoutComponent', () => {
  let component: SettingsFlyoutComponent;
  let fixture: ComponentFixture<SettingsFlyoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsFlyoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsFlyoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
