import Discord from "discord.js";
import { fromEvent } from "rxjs";
import { filter } from "rxjs/operators";
import moment from "moment";
import { command, getArg, getLine } from "./util/command-util";
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

commands
  .pipe(
    command("info"),
  )
  .subscribe((message: Discord.Message) => {
    const admin = memberService.codelenny().mention();
    message.channel.send(`Admin: ${admin}`);
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
      const date = moment(rawDate, "YYYY-MM-DD").valueOf();
      const event = new Event(id, name, date, subtitle);
      await eventService.createEvent(event);
      message.channel.send("Created event.");
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

client.login(TOKEN);


const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('ok');
});
server.listen(3001);

console.log("Starting server.");