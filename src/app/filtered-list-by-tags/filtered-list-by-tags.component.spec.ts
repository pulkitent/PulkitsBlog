import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredListByTagsComponent } from './filtered-list-by-tags.component';

describe('FilteredListByTagsComponent', () => {
  let component: FilteredListByTagsComponent;
  let fixture: ComponentFixture<FilteredListByTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilteredListByTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilteredListByTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
