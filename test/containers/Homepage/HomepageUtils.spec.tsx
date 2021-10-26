import HompageUtils from '../../../src/containers/Homepage/HomepageUtils';

describe('HomepageUtils', () => {
  let compStub: any = {};
  beforeEach(() => {
    const res:any = Promise.resolve({ status: 200 });
    const sSend: any = ({ send: () => res });
    const putR: any = () => ({
      set: () => ({ set: () => sSend }),
    });
    compStub = {
      state: { editBlog: {} },
      props: { auth: {} },
      superagent: { put: putR },
      finishAPI: jest.fn(),
    };
  });

  it('putAPI returns an error message', async () => {
    const res2:any = Promise.reject( new Error('Bad') );
    const sSend2: any = ({ send: () => res2 });
    const putR2: any = () => ({
      set: () => ({ set: () => sSend2 }),
    });
    compStub.superagent.put = putR2;
    const r = await HompageUtils.putAPI(compStub);
    expect(r.includes('Bad')).toBe(true);
  });
  it('putAPI is successful', async () => {
    const r = await HompageUtils.putAPI(compStub);
    expect(compStub.finishAPI).toHaveBeenCalled();
  });
});