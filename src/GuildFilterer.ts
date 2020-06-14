import { Guild } from "discord.js"

interface GuildFiltererOptions {
  guildName: string
}

export default class GuildFilterer {
  guildName: string

  /**
   * Constructs GuildFilterer with given options.
   * @param opts 
   */
  constructor(opts: GuildFiltererOptions) {
    this.guildName = opts.guildName
  }

  /**
   * Tells if given guild matches with configured guild name.
   * @param guild 
   */
  match(guild: Guild): boolean {
    return guild.name === this.guildName
  }
}
