import { Injectable } from '@angular/core';

@Injectable()
export class StreamData {
  messageId: string;
  deviceId: string;
  temperature: string;
  humidity: string;
  pressure: string;
  pointInfo: string;
  ioTHub: string;
  eventEnqueuedUtcTime: string;
  eventProcessedUtcTime: string;
  partitionId: string;
  locationId: number;
  from: string;
  to: string;
}
