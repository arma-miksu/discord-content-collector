import ContentDiscoverer from "./ContentDiscoverer"
import { Client } from "discord.js"
import { mock, instance } from "ts-mockito"
import { expect } from "chai"

describe('ContentDiscoverer', () => {
  it('adds event listeners', () => {
    const mockedClient: Client = mock(Client)
    const contentDiscoverer = new ContentDiscoverer({ client: instance(mockedClient) })
    expect(contentDiscoverer.registeredEventListeners).to.be.empty

    contentDiscoverer.on('someEvent', () => 'hello')
    expect(contentDiscoverer.registeredEventListeners.has('someEvent')).to.be.true
  })
})
