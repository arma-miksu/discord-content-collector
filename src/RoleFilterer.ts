import { Role } from "discord.js"

interface RoleFiltererOptions {
  roles: Array<string>
}

export default class RoleFilterer {
  roles: Array<string>

  /**
   * Constructs RoleFilterer with given options.
   * @param opts 
   */
  constructor(opts: RoleFiltererOptions) {
    this.roles = opts.roles
  }

  /**
   * Tells if any of configured  role names matches with given role.
   * @param role 
   */
  match(role: Role): boolean {
    return this.roles.includes(role.name)
  }
}
