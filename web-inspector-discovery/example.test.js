export const name = 'DISCOVERY website';

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

export const flow = async ({ info }, lighthouse, page) => {
  // set some options (set headless to false so we can see
  // this automated browsing experience)
  // let launchOptions = { headless: false, args: ['--start-maximized'] };

  // const browser = await puppeteer.launch(launchOptions);
  // const page = await browser.newPage();

  // set viewport and user agent (just in case for nice viewing)
  // await page.setViewport({width: 1366, height: 768});
  //  await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64)
  // AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');

  // go to the target web
  info('home page ');
  await lighthouse.startTimespan({ stepName: 'passer à l\'étape suivante' });
  await page.goto('https://easyupload.io/');

  // get the selector input type=file (for upload file)
  await page.waitForSelector('input[type=file]');
  await page.waitFor(1000);

  // get the ElementHandle of the selector above
  const inputUploadHandle = await page.$('input[type=file]');
  console.log('inputUploadHandle');
  console.log(inputUploadHandle);

  // prepare file to upload, I'm using test_to_upload.jpg file on same directory as this script
  // Photo by Ave Calvar Martinez from Pexels https://www.pexels.com/photo/lighthouse-3361704/
  const fileToUpload = 'C:\\Users\\kyengui\\OneDrive - KPMG\\Desktop\\pptr-project\\tests\\test_to_upload.jpg';

  // Sets the value of the file input to fileToUpload
  inputUploadHandle.uploadFile(fileToUpload);

  console.log('inputUploadHandle')

  console.log( inputUploadHandle)

  // doing click on button to trigger upload file
  await page.waitForSelector('#upload');
  await page.evaluate(() => document.getElementById('upload').click());

  // wait for selector that contains the uploaded file URL
  await page.waitForSelector('#upload-link');
  await page.waitFor(5000);

  // get the download URL
  const downloadUrl = await page.evaluate(() => document.getElementById('upload-link').value);

  // display the result on console
  console.log({
    file: fileToUpload,
    download_url: downloadUrl,
  });
  await lighthouse.endTimespan();
  // close the browser
   //await browser.close();
};
