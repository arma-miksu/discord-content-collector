// I have no idea why this import allows other *.ts files to include these types
import {} from './types'

interface GuildConfig {
  guild: string,
  reactions: Array<ReactionConfig>
}

interface ReactionConfig {
  emojiName: string,
  roles?: Array<string>
}
