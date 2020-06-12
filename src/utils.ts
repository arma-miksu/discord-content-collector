import { GuildConfig, FilterConfig, ReactionFilterConfig } from './types'
import { Guild, MessageReaction, Role, PartialUser, User } from 'discord.js';

export function guildConfigMatcher(config: Array<GuildConfig>, guild: Guild): GuildConfig | undefined {
  return config.find((value: GuildConfig) => value.guild === guild.name)
}

export async function filterMatcher(
    config: FilterConfig,
    reaction: MessageReaction,
    user: PartialUser | User
  ): Promise<boolean> {

  // Filter by reaction
  let reactionMatch: any
  for (let [key, value] of Object.entries(config.reaction)) {
    if (key === reaction.emoji.name) {
      reactionMatch = value
      break;
    }
  }
  if (!reactionMatch) return false

  // Filter by role when they are configured
  if (!reactionMatch.roles) return true
  const guildMember = await reaction.message.guild?.members.fetch(user.id);
  if (!guildMember) return false

  return guildMember.roles.cache.some((role: Role) => reactionMatch.roles.includes(role.name))
}
