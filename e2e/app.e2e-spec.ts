import { PruebaPaperPage } from './app.po';

describe('prueba-paper App', () => {
  let page: PruebaPaperPage;

  beforeEach(() => {
    page = new PruebaPaperPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
