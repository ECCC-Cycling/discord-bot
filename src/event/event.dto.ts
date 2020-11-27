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

  announceChannel?: string;

  chatChannel?: string;

  voiceChannel?: string;
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

  private readonly announceChannel?: string;

  private readonly chatChannel?: string;

  private readonly voiceChannel?: string;

  public constructor(
    id: string,
    name: string,
    date: number,
    subtitle: string,
    additional?: StoredEvent,
  ) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.subtitle = subtitle;
    if(additional) {
      this.announceChannel = additional.announceChannel;
      this.chatChannel = additional.chatChannel;
      this.voiceChannel = additional.voiceChannel;
    }
  }

  public setAnnounceChannel(channelId: string): Event {
    const data = this.serialize();
    data.announceChannel = channelId;
    return Event.fromStored(data);
  }

  public setChatChannel(channelId: string): Event {
    const data = this.serialize();
    data.chatChannel = channelId;
    return Event.fromStored(data);
  }

  public setVoiceChannel(channelId: string): Event {
    const data = this.serialize();
    data.voiceChannel = channelId;
    return Event.fromStored(data);
  }

  public embed(
    react: boolean = false,
  ): MessageEmbed {
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
    if(react) {
      embed.addField(
        `\u200B`,
        `React with ${TICK_YES.mention()} to join this event's announcement and chat channels`,
      );
    }
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
      announceChannel: this.announceChannel,
      chatChannel: this.chatChannel,
      voiceChannel: this.voiceChannel,
    };
  }

}
