import { MessageReaction, Role, GuildMember, Collection } from "discord.js"

interface ReactionFiltererOptions {
  reaction: string
  roles?: Array<string>
}

export default class ReactionFilterer {
  reaction: string
  roles?: Array<string>

  /**
   * Constructs ReactionFilterer with given options.
   * @param opts 
   */
  constructor(opts: ReactionFiltererOptions) {
    this.reaction = opts.reaction
    this.roles = opts.roles
  }

  /**
   * Check if emoji and optional roles matches.
   * @param reaction 
   * @param member 
   */
  match(reaction: MessageReaction, member: GuildMember): boolean {
    if (!this.matchEmoji(reaction)) {
      return false
    }
    if (this.roles && !this.matchRoles(member.roles.cache.array(), this.roles)) {
      return false
    }
    return true
  }

  /**
   * Tells if configured emoji matches with given reaction.
   * @param reaction 
   */
  matchEmoji(reaction: MessageReaction): boolean {
    return reaction.emoji.name === this.reaction
  }

  /**
   * Tells if configured roles matches ith given member roles.
   * @param memberRoles 
   * @param rolesToTest 
   */
  matchRoles(memberRoles: Array<Role>, rolesToTest: Array<string>): boolean {
    return memberRoles.some((role: Role) => rolesToTest.includes(role.name))
  }
}
