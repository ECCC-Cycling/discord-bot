import { Client } from "discord.js";
import { DB } from "../db/DB";
import { DatabaseSchema } from "../db/schema";
import { EventSummary, StoredEvent, Event } from "./event.dto";

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

  public async getEvents(): Promise<EventSummary[]> {
    const events = await this.db.get("events");
    if(!events || !Array.isArray(events)) {
      return [];
    }
    return events;
  }

  public async createEvent(event: Event): Promise<StoredEvent> {
    const summary = event.summarize();
    const stored = event.serialize();
    const events = await this.getEvents();
    events.push(summary);
    console.log(events);
    await this.db.set("events", events);
    return await this.db.setEvent(stored);
  }

}
