import { Client, MessageReaction, User, PartialUser } from "discord.js";
import GuildFilterer from "./GuildFilterer";
import ReactionFilterer from "./ReactionFilterer";
import { GuildConfig } from "./types";

interface ContentDiscovererOptions {
  client: Client
  guilds: Array<GuildConfig>
}

export default class ContentDiscoverer {
  client: Client
  guilds: Array<GuildConfig>
  registeredEventListeners: Map<string, Array<Function>> = new Map()

  /**
   * Constructs ContentDiscoverer with given options.
   * @param opts 
   */
  constructor(opts: ContentDiscovererOptions) {
    this.client = opts.client
    this.guilds = opts.guilds
    this.setupOnMessageReactionAdd()
  }

  setupOnMessageReactionAdd(): void {
    this.client.on('messageReactionAdd', async (messageReaction: MessageReaction, user: User | PartialUser) => {

      // Only accept messages on guilds
      if (!messageReaction.message.guild) return

      // Fetch whole message reaction if it's given partially
      if (messageReaction.partial) {
        try {
          await messageReaction.fetch()
        } catch (err) {
          throw Error('Failed fetching partial reaction')
        }
      }

      for (let guildConfig of this.guilds) {

        // Filter out unmatching guild names
        const guildFilterer = new GuildFilterer({ guildName: guildConfig.guild })
        if (!guildFilterer.match(messageReaction.message.guild)) return
  
        for (let reactionConfig of guildConfig.reactions) {

          // Filter out unmatching reaction's emojis and reaction user's role
          const reactionFilterer = new ReactionFilterer({ reaction: reactionConfig.emojiName, roles: reactionConfig.roles })
          const reactionGuildMember = await messageReaction.message.guild?.members.fetch(user.id);
          if (!reactionFilterer.match(messageReaction, reactionGuildMember)) return
    
          // At this point we have matching guild, mathing emoji and if roles
          // were configured, the roles too.
          this.trigger('contentDiscover', [messageReaction.message])
        }
      }
    })
  }

  /**
   * Registers an event listener.
   * @param eventName Name of the event that will be subscribed to.
   * @param callback Callback function that is being called on event invokation.
   */
  on(eventName: string, callback: Function): void {
    const callbacks = this.registeredEventListeners.get(eventName) || []
    callbacks.push(callback)
    this.registeredEventListeners.set(eventName, callbacks)
  }

  /**
   * Trigger an event so listeners can react on it.
   * @param eventName Name of the event that is triggered.
   * @param args Arguments given for events callbacks.
   */
  trigger(eventName: string, args: any[]): void {
    const callbacks: Function[] = this.registeredEventListeners.get(eventName) || []
    callbacks.forEach((callback: Function) => callback(...args))
  }
}
