import Discord from "discord.js";

export interface EmojiInterface {

  mention(): string;

  react(message: Discord.Message): Promise<Discord.MessageReaction>;

}

export class CustomEmoji implements EmojiInterface {

  private readonly name: string;

  private readonly id: string;

  public constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }

  public mention(): string {
    return `<:${this.name}:${this.id}>`;
  }

  public react(message: Discord.Message): Promise<Discord.MessageReaction> {
    return message.react(this.id);
  }

}

export const TICK_YES = new CustomEmoji("yes", "780251056838934560");
