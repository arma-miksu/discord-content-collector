import ContentDiscoverer from "./ContentDiscoverer"
import { Client } from "discord.js"
import { mock, instance } from "ts-mockito"
import { expect } from "chai"

describe('ContentDiscoverer', () => {
  it('calls event listeners', () => {
    const contentDiscoverer = new ContentDiscoverer({ client: instance(mock(Client)) })
    expect(contentDiscoverer.registeredEventListeners).to.be.empty

    let calls: number = 0;

    contentDiscoverer.trigger('noEvents', [])
    expect(calls).to.be.equal(0)

    contentDiscoverer.on('someEvent', () => calls++)
    expect(contentDiscoverer.registeredEventListeners.has('someEvent')).to.be.true

    expect(calls).to.be.equal(0)
    contentDiscoverer.trigger('someEvent', [])
    expect(calls).to.be.equal(1)
    contentDiscoverer.trigger('someOtherEvent', [])
    expect(calls).to.be.equal(1)
  })
})
