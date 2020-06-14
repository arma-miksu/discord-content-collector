import { mock, instance, when } from 'ts-mockito'
import ReactionFilterer from "./ReactionFilterer"
import { MessageReaction, ReactionEmoji, Role, Collection } from "discord.js"
import { expect } from 'chai'

describe('ReactionFilterer', () => {
  it('matches with given emojis', () => {
    const testSet = [
      { givenEmoji: '😂', testEmoji: '😂', result: true },
      { givenEmoji: 'annoyed', testEmoji: '😂', result: false },
      { givenEmoji: '😂', testEmoji: 'annoyed', result: false }
    ];
    for (let { givenEmoji, testEmoji, result } of testSet) {
      // Mock reaction emoji and emoji name
      const mockedReactionEmoji:ReactionEmoji = mock(ReactionEmoji)
      when(mockedReactionEmoji.name).thenReturn(givenEmoji)
      const reactionEmoji = instance(mockedReactionEmoji)

      // Mock reaction
      const mockedReaction:MessageReaction = mock(MessageReaction)
      when(mockedReaction.emoji).thenReturn(reactionEmoji)
      const reaction = instance(mockedReaction)

      const reactionFilterer = new ReactionFilterer({ reaction: testEmoji })
      expect(reactionFilterer.matchEmoji(reaction)).to.be.equal(result, `${givenEmoji} - ${testEmoji} = ${result}`)
    }
  })
  it('matches with given roles', () => {throw 'Unimplemented test'})
})
