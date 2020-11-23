import _Client from "@replit/database";
import { EventSummary, StoredEvent } from "../event/event.dto";

const Client = _Client as any;

export class DB<Schema> {

  private readonly client;

  public constructor() {
    this.client = new Client();
  }

  public async get<K extends keyof Schema>(key: K): Promise<Schema[K]> {
    return this.client.get(key);
  }

  public async set<K extends keyof Schema>(key: K, val: Schema[K]): Promise<Schema[K]> {
      await this.client.set(key, val);
      return val;
  }

  public async getEvent(eventId: string): Promise<StoredEvent> {
    return this.client.get(`event-${eventId}`);
  }

  public async setEvent(event: StoredEvent): Promise<StoredEvent> {
    await this.client.set(`event-${event.id}`, event);
    return event;
  }

}
