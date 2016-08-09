import Outbound   from '../src/outbound.js';
import Client     from '../src/client.js';

import chai, { expect } from 'chai';
import sinon            from 'sinon';
import sinonChai        from 'sinon-chai';

chai.use(sinonChai);

let outbound;
let client;
let callback = () => {};
let options = { limit: 1 };

describe('Outbound', () => {
  it('should export a Outbound object', () => {
    expect(Outbound).to.not.be.null;
    expect(Outbound.name).to.equal('Outbound');
  });

  describe('.instance', () => {
    beforeEach(() => {
      client  = sinon.createStubInstance(Client);
      outbound = new Outbound(client);
    });

    it('should be an Outbound object', () => {
      expect(outbound).to.be.an.instanceof(Outbound);
    });

    it('should save the client', () => {
      expect(outbound._client).to.be.equal(client);
    });

    describe('.all', () => {
      beforeEach(() => {
        client.get.returns(null);
      });

      it('should call the client', () => {
        outbound.all(callback);
        expect(client.get).to.have.been.calledWith('/outbound/faxes', callback, undefined);
      });

      it('should allow for options', () => {
        outbound.all(options, callback);
        expect(client.get).to.have.been.calledWith('/outbound/faxes', options, callback);
      });
    });
  });
});
