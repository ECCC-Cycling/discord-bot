import { TextChannel, DMChannel, NewsChannel } from "discord.js";

export function isGuildTextChannel(
  channel: TextChannel | DMChannel | NewsChannel
): channel is TextChannel {
  return channel.type === "text";
}