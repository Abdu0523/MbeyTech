import { TestBed } from '@angular/core/testing';

import { WavePaymentService } from './wave-payment.service';

describe('WavePaymentService', () => {
  let service: WavePaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WavePaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
