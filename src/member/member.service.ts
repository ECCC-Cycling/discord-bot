import { Message, Client } from "discord.js";
import { filter } from "rxjs/operators";
import { Member } from "./member.dto";

export class MemberService {

  private readonly client: Client;

  public constructor(
    client: Client,
  ) {
    this.client = client;
  }

  public fromAdmin() {
    return this.fromUsers(this.admins());
  }

  public fromUsers(validUsers: Member[]) {
    return filter((message: Message) => {
      const author = message.author;
      return validUsers.some(user => user.is(author));
    });
  }

  public admins(): Member[] {
    return [
      this.codelenny(),
      this.kolie(),
    ];
  }

  public codelenny(): Member {
    return new Member(this.client, "207671003134951424");
  }

  public kolie(): Member {
      return new Member(this.client, "749678204142485570");
  }

}
