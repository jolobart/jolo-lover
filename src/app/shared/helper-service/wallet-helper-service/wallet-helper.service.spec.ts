import { TestBed } from '@angular/core/testing';

import { WalletHelperService } from './wallet-helper.service';

describe('WalletHelperService', () => {
  let service: WalletHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WalletHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
