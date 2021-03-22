describe('Home', () => {
  it('should be titled "Change In Christ"', async () => {
    const page = await browser.newPage();
    await page.goto('http://localhost:9010/', {
      waitUntil: 'load',
    });
    await expect(page.title()).resolves.toMatch('Change In Christ');
  });
});

// eslint-disable-next-line jest/no-export
export {};
