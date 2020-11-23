import { Client } from "discord.js";
import { DB } from "../db/DB";
import { DatabaseSchema } from "../db/schema";
import { EventSummary, StoredEvent, Event } from "./event.dto";

export class EventService {

  private readonly client: Client;

  private readonly db: DB<DatabaseSchema>;

  public constructor(
    client: Client,
    db: DB<DatabaseSchema>,
  ) {
    this.client = client;
    this.db = db;
  }

  public async getEvents(): Promise<EventSummary[]> {
    return this.db.get("events");
  }

  public async createEvent(event: Event): StoredEvent {
    const summary = event.summarize();
    const stored = event.serialize();
    const events = await this.getEvents();
    events.push(summary);
    await this.db.set("events", events);
    return this.db.set(`event-${summary.id}`, stored);
  }

}
