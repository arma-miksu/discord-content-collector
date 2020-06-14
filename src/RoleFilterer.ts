import { Role } from "discord.js"

interface RoleFiltererOptions {
  roles: Array<string>
}

export default class RoleFilterer {
  roles: Array<string>
  constructor(opts: RoleFiltererOptions) {
    this.roles = opts.roles
  }
  match(role: Role): boolean {
    return this.roles.includes(role.name)
  }
}
