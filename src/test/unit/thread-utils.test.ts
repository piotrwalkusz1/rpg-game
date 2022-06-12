import { ThreadUtils } from 'utils';

describe('sleep', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should sleep for given time', () => {
    void ThreadUtils.sleep({ seconds: 2 });

    expect(setTimeout).toBeCalledTimes(1);
    expect(setTimeout).lastCalledWith(expect.any(Function), 2000);

    jest.runOnlyPendingTimers();
  });
});
