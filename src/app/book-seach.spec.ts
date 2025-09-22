import { TestBed } from '@angular/core/testing';

import { BookSeach } from './book-seach';

describe('BookSeach', () => {
  let service: BookSeach;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookSeach);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
