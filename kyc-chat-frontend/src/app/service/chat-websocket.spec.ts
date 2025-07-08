import { TestBed } from '@angular/core/testing';

import { ChatWebsocket } from './chat-websocket';

describe('ChatWebsocket', () => {
  let service: ChatWebsocket;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatWebsocket);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
