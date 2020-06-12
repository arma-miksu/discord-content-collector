// I have no idea why this import allows other *.ts files to include these types
import {} from './types'

interface GuildConfig {
  guild: string,
  filter: FilterConfig
}

interface FilterConfig {
  reaction: Object<string, ReactionFilterConfig>
}

interface ReactionFilterConfig {
  roles: Array<string>
}
