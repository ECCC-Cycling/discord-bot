export interface EventSummary {
  id: string;
  name: string;
  date: number;
}

export interface StoredEvent extends EventSummary {
  subtitle: string;
}

export class Event {

  private readonly id: string;

  private readonly name: string;

  private readonly date: number;

  private readonly subtitle: string;

  public constructor(
    id: string,
    name: string,
    date: number,
    subtitle: string,
  ) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.subtitle = subtitle;
  }

  public summarize(): EventSummary {
    return {
      id: this.id,
      name: this.name,
      date: this.date,
    };
  }

  public serialize(): StoredEvent {
    return {
      ...this.summarize(),
      subtitle: this.subtitle,
    };
  }

}
