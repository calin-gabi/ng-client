import { MyangtestPage } from './app.po';

describe('myangtest App', () => {
  let page: MyangtestPage;

  beforeEach(() => {
    page = new MyangtestPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
