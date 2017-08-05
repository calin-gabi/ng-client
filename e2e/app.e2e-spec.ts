import { NgclPage } from './app.po';

describe('ngcl App', () => {
  let page: NgclPage;

  beforeEach(() => {
    page = new NgclPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
