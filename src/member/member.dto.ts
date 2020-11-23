import { Client, User } from "discord.js";

export class Member {

  private readonly client: Client;

  private readonly id: string;

  public constructor(
    client: Client,
    id: string,
  ) {
    this.client = client;
    this.id = id;
  }

  public is(user: User): boolean {
    return user.id === this.id;
  }

  public mention(): User | undefined {
    return this.client.users.cache.get(this.id);
  }

}
