import Logger from '../logger';
const Conosle = require('winston').transports.Console;
import { MESSAGE } from 'triple-beam';

const mockLog = jest.fn().mockImplementation((msg, callback) => {
  if (callback) callback();
});

jest.spyOn(Conosle.prototype, 'log').mockImplementation(mockLog);
jest.useFakeTimers().setSystemTime(1466424490000);

describe('Logger', () => {
  let logger: Logger;
  beforeEach(() => {
    jest.clearAllMocks();
    logger = new Logger('test');
  });

  it('log finish', () => {
    const handle = logger.begin({});
    logger.end(handle);
    expect(mockLog.mock.calls[0][0][MESSAGE]).toBe(
      '[test] | 2016-06-20T12:08:10.000Z | info | complete the process | {"_duration":0}',
    );
  });

  it('log error', () => {
    const handle = logger.begin({});
    logger.fail(handle);
    expect(mockLog.mock.calls[0][0][MESSAGE]).toBe(
      '[test] | 2016-06-20T12:08:10.000Z | error | the process is faulted | {"_duration":0}',
    );
  });

  it('do no thing if no begin for handle', () => {
    const handle = 'fake_handle';
    logger.end(handle);
    logger.fail(handle);
    expect(mockLog.mock.calls.length).toBe(0);
  });

  it("can warp wiston logger's info and error func", () => {
    logger.info('aaa');
    logger.error('bbb');
    console.log(mockLog.mock.calls);
    expect(mockLog.mock.calls[0][0][MESSAGE]).toBe(
      '[test] | 2016-06-20T12:08:10.000Z | info | aaa | {}',
    );
    expect(mockLog.mock.calls[1][0][MESSAGE]).toBe(
      '[test] | 2016-06-20T12:08:10.000Z | error | bbb | {}',
    );
  });
});
