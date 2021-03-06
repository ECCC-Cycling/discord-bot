import { Client } from "discord.js";
import { DB } from "../db/DB";
import { DatabaseSchema } from "../db/schema";
import { StoredEvent, Event } from "./event.dto";

export class EventService {

  private readonly db: DB<DatabaseSchema>;

  private readonly client: Client;

  public constructor(
    db: DB<DatabaseSchema>,
    client: Client,
  ) {
    this.client = client;
    this.db = db;
  }

  public async getEvents(): Promise<StoredEvent[]> {
    const events = await this.db.get("events");
    if(!events || !Array.isArray(events)) {
      return [];
    }
    return events;
  }

  public async getEvent(eventId: string): Promise<Event> {
    const events = await this.getEvents();
    const stored = events.filter(event => event.id === eventId);
    if(stored.length < 1) {
      throw new ReferenceError(`Couldn't find event with ID ${eventId}`);
    }
    return Event.fromStored(stored[0]);
  }

  public async createEvent(event: Event): Promise<StoredEvent> {
    const stored = event.serialize();
    const events = await this.getEvents();
    events.push(stored);
    await this.db.set("events", events);
    return stored;
  }

  public async updateEvent(event: Event): Promise<StoredEvent> {
    const stored = event.serialize();
    const events = await this.getEvents();
    const updatedEvents = events.map(e => {
      if(e.id === stored.id) {
        return stored;
      }
      return e;
    });
    await this.db.set("events", updatedEvents);
    return stored;
  }

}
