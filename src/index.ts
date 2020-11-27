import Discord from "discord.js";
import { Observable, fromEvent } from "rxjs";
import { filter } from "rxjs/operators";
import moment from "moment";
import { command, getArg, getLine } from "./util/command-util";
import { isGuildTextChannel } from "./util/channel";
import { DB } from "./db/DB";
import { DatabaseSchema } from "./db/schema";
import { Event } from "./event/event.dto";
import { MemberService } from "./member/member.service";
import { EventService } from "./event/event.service";
import { PREFIX } from "./config";

const TOKEN = process.env.DISCORD_TOKEN;

const db = new DB<DatabaseSchema>();

const client = new Discord.Client({
  partials: [
    "MESSAGE",
    "CHANNEL",
    "REACTION",
  ],
});

const memberService = new MemberService(client);
const eventService = new EventService(
    db,
    client,
);

const messages = fromEvent<Discord.Message>(client, "message");
const commands = messages.pipe(
    filter((message: Discord.Message) => message.content.startsWith(PREFIX)),
);

interface MessageReactionData {
  reaction: Discord.MessageReaction;
  user: Discord.User | Discord.PartialUser;
}

const addedReactions = new Observable<MessageReactionData>(subscriber => {
  client.on("messageReactionAdd", (reaction, user) => {
    subscriber.next({ reaction, user });
  });
});

const removedReactions = fromEvent<Discord.MessageReaction>(client, "messageReactionRemove");

commands
  .pipe(
    command("info"),
  )
  .subscribe((message: Discord.Message) => {
    const admin = memberService.codelenny().mention();
    message.channel.send(`Admin: ${admin}`);
  });

commands
  .pipe(
    command("db ls"),
    memberService.fromAdmin(),
  )
  .subscribe(async (message: Discord.Message) => {
    const keys = await db.client.list();
    message.channel.send(keys);
  });

const DB_RM = "db rm";
commands
  .pipe(
    command(DB_RM),
    memberService.fromAdmin(),
  )
  .subscribe(async (message: Discord.Message) => {
    const key = getArg(message, DB_RM, 1, "the database key to delete");
    await db.client.delete(key);
    message.channel.send(`Deleted ${key}.`);
  });

const DB_CAT = "db cat";
commands
  .pipe(
    command(DB_CAT),
    memberService.fromAdmin(),
  )
  .subscribe(async (message: Discord.Message) => {
    const key = getArg(message, DB_CAT, 1, "the database key to read");
    const val = await db.client.get(key);
    message.channel.send("```\n"+JSON.stringify(val, null, 2)+"\n```");
  });

const CHANNEL_INFO = "i channel";
commands
  .pipe(
    command(CHANNEL_INFO),
  )
  .subscribe(async (message: Discord.Message) => {
    const channel = message.mentions.channels.first();
    if(!channel) {
      message.channel.send("No channel found.");
      return;
    }
    message.channel.send(`Channel ${channel.name}'s ID is \`${channel.id}\`, and is in category ${channel.parent} (\`${channel.parentID}\`)'`);
  });

const CREATE_EVENT = "event create";
commands
  .pipe(
    command(CREATE_EVENT),
    memberService.fromAdmin(),
  )
  .subscribe(async (message: Discord.Message) => {
    try {
      const id = getArg(message, CREATE_EVENT, 1, "the event ID", /\n/);
      const name = getLine(message, 1, "the event name");
      const rawDate = getLine(message, 2, "the event date");
      const subtitle = getLine(message, 3, "the event subtitle");
      const date = moment(rawDate, "YYYY-MM-DD h:mma").valueOf();
      const event = new Event(id, name, date, subtitle);
      await eventService.createEvent(event);
      message.channel.send("Created event.");
      message.channel.send(event.embed());
    } catch (err) {
      console.error(err);
      message.channel.send(`Error: ${err.message}`);
    }
  });

const LIST_EVENTS = "event list";
commands
  .pipe(
    command(LIST_EVENTS),
    memberService.fromAdmin(),
  )
  .subscribe(async (message: Discord.Message) => {
    try {
      const events = await eventService.getEvents();
      console.log(events);
      const list = events.map(event => `- ${event.id} (${event.name})`);
      message.channel.send(`Events:\n${list.join("\n")}`);
    } catch (err) {
      console.error(err);
      message.channel.send(`Error: ${err.message}`);
    }
  });

const EVENT_EMBED = "event embed";
commands
  .pipe(
    command(EVENT_EMBED),
    memberService.fromAdmin(),
  )
  .subscribe(async (message: Discord.Message) => {
    try {
      const id = getArg(message, CREATE_EVENT, 1, "the event ID");
      const event = await eventService.getEvent(id);
      const embed = event.embed();
      message.channel.send(embed);
    } catch (err) {
      console.error(err);
      message.channel.send(`Error: ${err.message}`);
    }
  });

const EVENT_CHANNELS_CREATE = "event channel create";
commands
  .pipe(
    command(EVENT_CHANNELS_CREATE),
    memberService.fromAdmin(),
  )
  .subscribe(async (message: Discord.Message) => {
    const id = getArg(message, CREATE_EVENT, 1, "the event ID");
    const event = await eventService.getEvent(id);
    const channel = message.channel;
    if(!isGuildTextChannel(channel) || !channel.guild.available) {
      message.channel.send("This command only works inside the ECCC server.");
      throw new Error(`${EVENT_CHANNELS_CREATE} run outside of the server.`);
    }
    const server = channel.guild;
    //server.channels.create(``)
  });

/*addedReactions
  .subscribe(async (data: MessageReactionData) => {
    if(data.reaction.partial) {
      try {
        await data.reaction.fetch();
      } catch (err) {
        console.error(`Couldn't fetch message on reaction: `, err);
      }
    }
    console.log(`${data.reaction.message.author}'s message was reacted to with ${data.reaction.emoji.name}'`);
  });*/

client.login(TOKEN);

/*const DELETE_EVENT = "event delete";
commands
  .pipe(
    command(DELETE_EVENT),
    memberService.fromAdmin(),
  )
  .subscribe(async (message: Discord.Message) => {
    try {
      eventService.deleteEvent()
    }
  });*/


const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('ok');
});
server.listen(3001);

console.log("Starting server.");