import { MessageEmbed } from "discord.js";
import moment from "moment";
import { TICK_YES } from "../emoji";

export interface EventSummary {
  id: string;
  name: string;
  date: number;
}

export interface StoredEvent extends EventSummary {
  subtitle: string;
}

export class Event {

  public static fromStored(stored: StoredEvent) {
    const event = new Event(
      stored.id,
      stored.name,
      stored.date,
      stored.subtitle,
    );
    return event;
  }

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

  public embed(): MessageEmbed {
    let embed = new MessageEmbed()
      .setColor("#fecc02")
      .setTitle(this.name)
      .setDescription(this.subtitle)
      .setTimestamp()
      .setFooter(`Event listed via ECCCDroid.  Contact @CodeLenny with any problems.`)
      .addFields(
        {
          name: "Event Date",
          value: moment(this.date).format("dddd, MMMM Do YYYY h:mma") + " EST",
        },
      );
    embed.addField(
      `\u200B`,
      `React with ${TICK_YES.mention()} to join this event's announcement and chat channels`,
    );
    return embed;
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
