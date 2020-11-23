import { EventSummary, StoredEvent } from "../event/event.dto";

export interface DatabaseSchema {
  
  events: EventSummary[];

  [key: string]: StoredEvent;

}
