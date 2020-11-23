import { Message } from "discord.js";
import { filter } from "rxjs/operators";
import { PREFIX } from "../config";

export function command(name: string) {
  return filter((message: Message): boolean => message.content.startsWith(`${PREFIX}${name} `)
    || message.content.startsWith(`${PREFIX}${name}\n`)
    || message.content === `${PREFIX}${name}`
  );
}

export function getArg(
  message: Message,
  commandName: string,
  pos: number,
  description: string,
  split: string | RegExp = /\s+/,
): string {
  const args = message.content.slice(PREFIX.length + commandName.length).trim().split(split);
  if(args.length < pos - 1) {
    throw new ReferenceError(`Argument ${pos} missing: you must provide ${description}`);
  }
  return args[pos - 1];
}

export function getLine(
  message: Message,
  lineNum: number,
  description: string,
): string {
  const lines = message.content.split("\n");
  if(lines.length < lineNum) {
    throw new ReferenceError(`Line ${lineNum} missing: you must provide ${description}`);
  }
  return lines[lineNum];
}
