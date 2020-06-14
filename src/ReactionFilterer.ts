import { MessageReaction, Role, GuildMember, Collection } from "discord.js"

interface ReactionFiltererOptions {
  reaction: string
  roles?: Array<string>
}

export default class ReactionFilterer {
  reaction: string
  roles?: Array<string>
  constructor(opts: ReactionFiltererOptions) {
    this.reaction = opts.reaction
    this.roles = opts.roles
  }
  match(reaction: MessageReaction, member: GuildMember): boolean {
    if (!this.matchEmoji(reaction)) {
      return false
    }
    if (this.roles && !this.matchRoles(member.roles.cache.array(), this.roles)) {
      return false
    }
    return true
  }
  matchEmoji(reaction: MessageReaction): boolean {
    return reaction.emoji.name === this.reaction
  }
  matchRoles(memberRoles: Array<Role>, rolesToTest: Array<string>): boolean {
    return memberRoles.some((role: Role) => rolesToTest.includes(role.name))
  }
}
