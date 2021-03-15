import Utils from '../../../src/components/BlogEditor/blogEditorUtils';

describe('blogEditorUtils', () => {
  it('returns the Editor', () => {
    const r = Utils.editor('howdy', jest.fn());
    expect(typeof r).toBe('object');
  });
});
