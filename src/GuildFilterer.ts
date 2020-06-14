import { Guild } from "discord.js"

interface GuildFiltererOptions {
  guildName: string
}

export default class GuildFilterer {
  guildName: string
  constructor(opts: GuildFiltererOptions) {
    this.guildName = opts.guildName
  }
  match(guild: Guild): boolean {
    return guild.name === this.guildName
  }
}
