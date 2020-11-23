import _Client from "@replit/databae";

const Client = _Client as any;

export class DB<Schema> {

  private readonly client;

  public constructor() {
    this.client = new Client();
  }

  public async get<K extends keyof Schema>(key: K): Promise<Schema[K]> {
    return this.client.get(key);
  }

  public async set<K extends keyof Schema>(key: K, val: Schema[K]): Promise<Schema[K]> {
      await this.client.set(key, val);
      return val;
  }

}
