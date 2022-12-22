export const name = 'KPMG website';

export const viewport = { width: 1350, height: 940 };
export const settings = {
  screenEmulation: {
    mobile: false,
    width: 1350,
    height: 940,
    deviceScaleFactor: 1,
    disabled: false,
  },
  formFactor: 'desktop',
};

let DEFAULT_HOME_PAGE;
let DEFAULT_FEMME_PAGE;
let DEFAULT_MAISON_PAGE;
let DEFAULT_BEAUTE_PAGE;
let DEFAULT_HOMME_PAGE;
let DEFAULT_ENFANTS_PAGE;
let DEFAULT_BEAUTE_PPODUCT;

const getEnvironment = () => {
  const nodeEnv = process.env.NODE_ENV.toUpperCase();
  DEFAULT_HOME_PAGE = process.env[`DEFAULT_HOME_PAGE_${nodeEnv}`];
  DEFAULT_FEMME_PAGE = process.env[`DEFAULT_FEMME_PAGE_${nodeEnv}`];
  DEFAULT_MAISON_PAGE = process.env[`DEFAULT_MAISON_PAGE_${nodeEnv}`];
  DEFAULT_BEAUTE_PAGE = process.env[`DEFAULT_BEAUTE_PAGE_${nodeEnv}`];
  DEFAULT_HOMME_PAGE = process.env[`DEFAULT_HOMME_PAGE_${nodeEnv}`];
  DEFAULT_ENFANTS_PAGE = process.env[`DEFAULT_ENFANTS_PAGE_${nodeEnv}`];
  DEFAULT_BEAUTE_PPODUCT = process.env[`DEFAULT_BEAUTE_PPODUCT_${nodeEnv}`];
};

export const flow = async ({ info }, lighthouse, page) => {
  info('Initialization of environment variables');
  getEnvironment();
  info('Start testing flow...');

  info('navigate to home page');
  await lighthouse.startTimespan({ stepName: 'navigate to home page' });
  await page.goto(DEFAULT_HOME_PAGE);

  info('navigate to femme page');
  await lighthouse.startTimespan({ stepName: 'navigate to femme page' });
  await page.goto(DEFAULT_FEMME_PAGE);
  await lighthouse.endTimespan();

  info('navigate to maison page');
  await lighthouse.startTimespan({ stepName: 'navigate to maison page' });
  await page.goto(DEFAULT_MAISON_PAGE);
  await lighthouse.endTimespan();

  info('navigate to beaute page');
  await lighthouse.startTimespan({ stepName: 'navigate to beaute page' });
  await page.goto(DEFAULT_BEAUTE_PAGE);
  await lighthouse.endTimespan();

  info('navigate to homme page');
  await lighthouse.startTimespan({ stepName: 'navigate to homme page' });
  await page.goto(DEFAULT_HOMME_PAGE);
  await lighthouse.endTimespan();

  info('navigate to enfants page');
  await lighthouse.startTimespan({ stepName: 'navigate to enfants page' });
  await page.goto(DEFAULT_ENFANTS_PAGE);
  await lighthouse.endTimespan();

  info('navigate to beaute ppoduct page');
  await lighthouse.startTimespan({ stepName: 'navigate to beaute ppoduct page' });
  await page.goto(DEFAULT_BEAUTE_PPODUCT);
  await lighthouse.endTimespan();

  info('LOGIN TO THE WEB APP TO ADD PRODUCTS TO THE SHOPPING CART');

  info('login to the web app by providing a valid username and password');
  await lighthouse.startTimespan({ stepName: 'login to the web app by providing a valid username and password' });
  const loginPageLink = await page.waitForSelector('.icon-account');
  await loginPageLink.click();
  const linkButtonLink = await page.waitForSelector('.link-btn');
  await linkButtonLink.click();

  info('set value to the input username field form');
  const usernameFormInput = await page.waitForSelector('#username');
  await usernameFormInput.type(process.env.LOGIN_PAGE_USERNAME, { delay: 100 });

  info('set value to the input password field form');
  const passwordFormInput = await page.waitForSelector('#password');
  await passwordFormInput.type(process.env.LOGIN_PAGE_PASSWORD, { delay: 100 });

  info('click to the submit button after providing username and password value');
  const submitLoginButton = await page.waitForSelector('#submitLogin');
  await submitLoginButton.click();

  info('click on the nouveautes link page');
  const nouveauteLink = await page.waitForXPath('//*[@id="app"]/div[2]/header/div/div[2]/div/div/ul/li[4]');
  await nouveauteLink.click();

  info('click on the nouveautes homme link page');
  const nouveauteHommeLink = await page.waitForXPath('//*[@id="app"]/section/section/div[2]/div/a[2]');
  await nouveauteHommeLink.click();

  info('click on one of the displayed products');
  const selectOneProductLink = await page.waitForXPath('//*[@id="86799901-119"]/article/section[2]/div[1]/section');
  await selectOneProductLink.click();

  info('click on the drop-down menu to select a size for the selected product');
  const sizeBlockLink = await page.waitForSelector('#size-block');
  await sizeBlockLink.click();

  info('click to select one size on the drop-down menu for the selected product');
  const selectLProductSizeLink = await page.waitForXPath('//*[@id="size-block"]/option[5]');
  await selectLProductSizeLink.click();

  info('click to add the selected product to the shopping cart');
  // eslint-disable-next-line max-len
  const addProductToShoppingCartLink = await page.waitForXPath('/html/body/div[2]/div/div/section/section[3]/section/section[2]/section[1]/div[5]/div[1]/button');
  await addProductToShoppingCartLink.click();

  await lighthouse.endTimespan();

  info('flow successfully run');
};
