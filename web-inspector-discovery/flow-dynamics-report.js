// import puppeteer from 'puppeteer';

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
  info('Start testing flow...');

  info('Home page...');
  await lighthouse.startTimespan({ stepName: 'Home page' });

  await page.setDefaultNavigationTimeout(0);
  await page.goto(process.env.DISCOVERY_URL, { waitUntil: 'networkidle2' });
  await lighthouse.endTimespan();

  // Se connecter en tant que collaborateur
  info('Login frame...');
  await lighthouse.startTimespan({ stepName: 'login frame' });
  const login = await page.waitForXPath([
    '//form[@id=\'gigya-login-form\']',
    '//a[@class=\'gigya-composite-control gigya-composite-control-link collabConnect\']',
  ].join(''));
  await login.click();

  await lighthouse.endTimespan();
  //  display the html content of the page of email step
  /* let bodyHTMLemail = await page.evaluate(() => {
    return document.body.innerHTML
    })
    console.log(bodyHTMLemail) */
  // remplir la case de l'email
  info('saisir l\'adresse email...');
  await lighthouse.startTimespan({ stepName: 'saisir l\'adresse email' });
  // await page.setDefaultNavigationTimeout(0);
  const username = await page.waitForXPath('//*[@id="i0116"]');
  await username.type(process.env.DISCOVERY_USERNAME, { delay: 100 });
  await lighthouse.endTimespan();

  /* let bodyHTMLnext = await page.evaluate(() => {
    return document.body.innerHTML
    })
    console.log(bodyHTMLnext) */
  // cliquer sur le bouton suivant
  info('suivant...');
  await lighthouse.startTimespan({ stepName: 'suivant' });
  // await page.setDefaultNavigationTimeout(0);
  const suivant = await page.waitForXPath('//*[@id="idSIButton9"]');
  await suivant.click();
  await lighthouse.endTimespan();

  /* let bodyHTMLpassword = await page.evaluate(() => {
    return document.body.innerHTML
    })
    console.log(bodyHTMLpassword)
  */
  // remplir la case du mot de passe
  info('password...');
  await lighthouse.startTimespan({ stepName: 'password' });
  await page.setDefaultNavigationTimeout(0);
  const password = await page.waitForXPath('(//input[@id=\'passwordInput\'])[1] ');
  // *[@id="passwordInput"]
  await password.type(process.env.DISCOVERY_PASSWORD, { delay: 50 });
  await lighthouse.endTimespan();

  // cliquer sur le bouton connexion
  info('connexion...');
  await lighthouse.startTimespan({ stepName: 'connexion' });
  // await page.setDefaultNavigationTimeout(0);
  const connexion = await page.waitForXPath('(//span[@id=\'submitButton\'])[1] ');
  await connexion.click();
  await lighthouse.endTimespan();

  // DynamicReports
  info('DynamicReports...');
  await lighthouse.startTimespan({ stepName: 'DynamicReports' });
  const DynamicReports = await page.waitForXPath('/html/body/div[1]/div[1]/div/div[1]/div[2]/div/div[8]/div[2]/div[2]');
  await DynamicReports.click();
  await lighthouse.endTimespan();
  /*
  // initierDemande
  info('initierDemande...');
  await lighthouse.startTimespan({ stepName: 'initierDemande' });
  const initierDemande = await page.waitForXPath('/html/body/div[1]/div[1]/div/div[1]/div[2]/div/div[1]/button');
  await initierDemande.click();
  await lighthouse.endTimespan();

  // A partir d'un engagement existant
  info('A partir d\'un engagement existant...');
  await lighthouse.startTimespan({ stepName: 'A partir d\'un engagement existant' });
  const engagementExistant = await page.waitForXPath([
    '//*[@id="app"]/div/div[2]/div[2]/div[2]',
    '/div[1]/div/div/div[2]/button[1]',
  ].join(''));
  await engagementExistant.click();

  await lighthouse.endTimespan();
  // ??tape1
  info('Type de la demande...');
  // saisir un code engagement
  info('saisir un code engagement...');
  await lighthouse.startTimespan({ stepName: 'saisir un code engagement' });
  const codeEngagement = await page.waitForXPath('//*[@id="input-386"]');
  await codeEngagement.type('2507199400');
  await lighthouse.endTimespan();

  // s??l??ctionner le code en question
  info('s??l??ctionner le code en question...');
  await lighthouse.startTimespan({ stepName: 's??l??ctionner le code en question' });
  const selectionnerCode = await page.waitForXPath('//*[@id="list-item-412-0"]/div');
  await selectionnerCode.click();
  await lighthouse.endTimespan();

  // modifier le nom de la demmande
  info('modifier le nom de la demmande...');
  const nomDemande = await page.waitForXPath('//*[@id="input-394"]');
  await nomDemande.type('Test-kyengui_17');

  // Passer ?? l'??tape suivante
  info('Passer ?? l\'??tape suivante...');
  await lighthouse.startTimespan({ stepName: 'Passer ?? l\'??tape suivante ' });
  const etapeSuivante = await page.waitForXPath('//*[@id="app"]/div/div[2]/div[3]/div/button');
  await etapeSuivante.click();
  await lighthouse.endTimespan();

  // ??tape 2
  info('Ajout membres ??quipe...');
  // activer le droit de validation
  info('activer le droit de validation...');
  await lighthouse.startTimespan({ stepName: 'activer le droit de validation' });
  const activerDroitValidation = await page.waitForXPath([
    '/html/body/div[1]/div[1]/div/div[2]/div[1]/div[1]/div/div/div[2]',
    '/div[2]/div[2]/div[2]/div/div/div[3]/div/div/div[3]/div[4]/div/div[1]/div/input',
  ].join(''));

  await activerDroitValidation.click();
  await lighthouse.endTimespan();
  // Ajouter contact
  info('Ajouter contact...');
  await lighthouse.startTimespan({ stepName: 'Ajouter contact ' });
  const AjouterContact = await page.waitForXPath([
    '//*[@id="app"]/div/div[2]/div[2]/div[2]',
    '/div[2]/div/div/div[4]/div/button',
  ].join(''));
  // waitForXPath('//*[@id="app"]/div/div[2]/div[2]/div[2]/div[2]/div/div/div[4]/div/button');
  await AjouterContact.click();
  await lighthouse.endTimespan();

  // rechercher contact
  info('rechercher contact...');
  await lighthouse.startTimespan({ stepName: 'rechercher contact ' });
  const rechercherContact = await page.waitForXPath('//*[@id="input-59"]');
  await rechercherContact.type('asliti@kpmg.fr');
  await lighthouse.endTimespan();

  // choisir le contact en question
  info('choisir le contact en question...');
  await lighthouse.startTimespan({ stepName: 'choisir le contact en question ' });
  const choisirContact = await page.waitForXPath('/html/body/div[1]/div[1]/div/div[2]/div[1]/div[15]/div/div/div');
  await choisirContact.click();
  await lighthouse.endTimespan();

  // enregistrer
  info('enregistrer...');
  await lighthouse.startTimespan({ stepName: 'enregistrer ' });
  const enregistrer = await page.waitForXPath('//*[@id="app"]/div[4]/div/div/div[3]/button[2]');
  await enregistrer.click();
  await lighthouse.endTimespan();

  // Passer ?? l'??tape suivante
  info('Passer ?? l\'??tape suivante...');
  await lighthouse.startTimespan({ stepName: 'Passer ?? l\'??tape suivante ' });
  const ??tapeSuivante = await page.waitForXPath('//*[@id="app"]/div/div[2]/div[3]/div/button');
  await ??tapeSuivante.click();
  await lighthouse.endTimespan();
  // ??tape3

  info('Ajout membres tiers...');
  const yopmail = 'kpmgtest_tmaqa_oghrbel6@yopmail.com';
  // acc??der ?? yopmail
  /* info('acc??der ?? yopmail...');
  await lighthouse.startTimespan({ stepName: 'acc??der ?? yopmail' });
  // await page.setDefaultNavigationTimeout(0);
  const browser = await puppeteer.launch();
  const yopmailPage = await browser.newPage();
  await yopmailPage.goto('https://yopmail.com/fr/', { waitUntil: 'networkidle2' });
  await lighthouse.endTimespan();

  // cr??er un yopmail
  info('cr??er un yopmail...');
  await lighthouse.startTimespan({ stepName: 'cr??er un yopmail' });
  const cr??erYopmail = await yopmailPage.waitForXPath('//*[@id="login"]');
  const yopmail = 'kpmgtest_tmaqa_oghrbel5@yopmail.com';
  await cr??erYopmail.type(yopmail);
  await lighthouse.endTimespan();

  // valider Yopmail
  info('valider Yopmail ...');
  await lighthouse.startTimespan({ stepName: 'valider Yopmail ' });
  const validerYopmail = await yopmailPage.waitForXPath('//*[@id="refreshbut"]/button/i');
  await validerYopmail.click();
  await lighthouse.endTimespan(); */
  /*
  // Ajouter contact
  info('Ajouter contact...');
  await lighthouse.startTimespan({ stepName: 'Ajouter contact ' });
  const AjouterContactS3 = await page.waitForXPath([
    '//*[@id="app"]/div/div[2]/div[2]/div[2]/div[3]/div/',
    'div/div[6]/div/div[1]/div[1]/button[2]',
  ].join(''));
  await AjouterContactS3.click();
  await lighthouse.endTimespan();
  // remplir Titre
  info('remplir Titre...');
  await lighthouse.startTimespan({ stepName: 'remplir Titre ' });
  const remplirTitre = await page.waitForXPath('//*[@id="input-102"]');
  await remplirTitre.type('ing??nieur Devops contact');
  await lighthouse.endTimespan();
  // nom
  info('nom...');
  await lighthouse.startTimespan({ stepName: 'nom ' });
  const nom = await page.waitForXPath('//*[@id="input-105"]');
  await nom.type('Omar');
  await lighthouse.endTimespan();
  // pr??nom
  info('Pr??nom...');
  await lighthouse.startTimespan({ stepName: 'Pr??nom' });
  const Pr??nom = await page.waitForXPath('//*[@id="input-108"]');
  await Pr??nom.type('ghorbel');
  await lighthouse.endTimespan();
  // pr??nom
  info('Email...');
  await lighthouse.startTimespan({ stepName: 'Email' });
  const Email = await page.waitForXPath('//*[@id="input-111"]');
  await Email.type(yopmail);
  await lighthouse.endTimespan();
  // Fonction
  info('Fonction...');
  await lighthouse.startTimespan({ stepName: 'Fonction' });
  const Fonction = await page.waitForXPath('//*[@id="input-114"]');
  await Fonction.type('ing??nieur Devops');
  await lighthouse.endTimespan();
  // T??l??phone
  info('T??l??phone...');
  await lighthouse.startTimespan({ stepName: 'T??l??phone' });
  const T??l??phone = await page.waitForXPath('//*[@id="input-117"]');
  await T??l??phone.type('+21698888890');
  await lighthouse.endTimespan();
  // D??l??gation des droits de visualisation
  info('D??l??gation des droits de visualisation...');
  await lighthouse.startTimespan({ stepName: 'D??l??gation des droits de visualisation' });
  const D??l??gationdDroitsVisualisation = await page.waitForXPath('//*[@id="input-120"]');
  await D??l??gationdDroitsVisualisation.click();
  await lighthouse.endTimespan();

  // Enregistrer
  info('Enregistrer...');
  await lighthouse.startTimespan({ stepName: 'Enregistrer' });
  const EnregistrerS3 = await page.waitForXPath('//*[@id="app"]/div[6]/div/div/div[3]/button[2]');
  await EnregistrerS3.click();
  await lighthouse.endTimespan();

  // Passer ?? l'??tape suivante
  info('Passer ?? l\'??tape suivante...');
  await lighthouse.startTimespan({ stepName: 'Passer ?? l\'??tape suivante ' });
  const etapeSuivanteS3 = await page.waitForXPath('//*[@id="app"]/div/div[2]/div[3]/div/button[2]');
  await etapeSuivanteS3.click();
  await lighthouse.endTimespan();

  // ??tape4
  info('Valider la demande...');
  // Sauvegarder et valider la demande de planification
  info('Sauvegarder et valider la demande de planification...');
  await lighthouse.startTimespan({ stepName: 'Sauvegarder et valider la demande de planification ' });
  const validerDemandePlanification = await page.waitForXPath('//*[@id="app"]/div/div[2]/div[3]/div/button[2]');
  await validerDemandePlanification.click();
  await lighthouse.endTimespan();
*/
  // Publier Rapport
  info('Publier Rapport...');
  await lighthouse.startTimespan({ stepName: 'Publier Rapport ' });
  const PublierRapport = await page.waitForXPath('/html/body/div[1]/div[1]/div/div[1]/div[2]/div/div[3]/button/span');
  await PublierRapport.click();
  await lighthouse.endTimespan();

  // ??tape 1
  // Rechercher une demande
  info('Rechercher une demande...');
  await lighthouse.startTimespan({ stepName: 'Rechercher une demande' });
  const RechercherDemande = await page.waitForXPath('//*[@id="input-563"]');
  await RechercherDemande.type('TMA_Discovrey_01a');
  await lighthouse.endTimespan();

  // Selectionner une demande
  info('Selectionner une demande...');
  await lighthouse.startTimespan({ stepName: 'Selectionner une demande' });
  const SelectionnerDemande = await page.waitForXPath([
    '/html/body/div[1]/div[1]/div/div[2]',
    '/div[1]/div[30]/div/div[1]/div',
  ].join(''));
  await SelectionnerDemande.click();
  await lighthouse.endTimespan();

  // Selectionner
  info('Selectionner...');
  await lighthouse.startTimespan({ stepName: 'Selectionner' });
  const Selectionner = await page.waitForXPath([
    '//*[@id="app"]/div/div/div[9]/div[2]',
    '/div[2]/div[1]/div/div/div[4]/button',
  ].join(''));
  await Selectionner.click();
  await lighthouse.endTimespan();

  // Importer un document ?? voir comment g??rer les f??n??tres avec javascript
  info('Importer un document...');
  // get the selector (for upload file)
  await page.waitForSelector('input[type=file]');
  await page.waitFor(1000);
  // get the ElementHandle of the selector above
  const inputUploadHandle = await page.$('input[type=file]');
  // prepare file to upload,
  const fileToUpload = 'C:\\Users\\kyengui\\OneDrive - KPMG\\Desktop\\web-inspector\\web-inspector-discovery\\files_to_upload\\Compliance_DLP_2.pbix';
  // Sets the value of the file input to fileToUpload
  inputUploadHandle.uploadFile(fileToUpload);

  await new Promise(resolve => setTimeout(resolve, 120000));
  console.log("temp d'attente 2 minutes");

  // visualiser le rapport
  info(' visualiser le rapport...');
  await lighthouse.startTimespan({ stepName: 'visualiser le rapport' });
  const visualiserRapport = await page.waitForXPath('/html/body/div[1]/div[1]/div/div[2]/div[1]/div[33]/div/div/div[2]/div[3]/div/button');
  await visualiserRapport.click();
  await lighthouse.endTimespan();

  // Fermer
  info(' Fermer...');
  await lighthouse.startTimespan({ stepName: 'Fermer' });
  const Fermer = await page.waitForXPath('/html/body/div[1]/div[1]/div/div[2]/div[1]/div[14]/div/div/div[2]/button');
  await Fermer.click();
  await lighthouse.endTimespan();

  // passer ?? l'??tape suivante
  info(' passer ?? l\'??tape suivante...');
  await lighthouse.startTimespan({ stepName: 'passer ?? l\'??tape suivante' });
  const EtapeSuivante = await page.waitForXPath('//*[@id="app"]/div/div[2]/div[2]/button[2]');
  await EtapeSuivante.click();
  await lighthouse.endTimespan();
  /*
  // Ajout documents ?? voir comment g??rer les f??n??tres avec javascript
  // passer ?? l'??tape suivante
  info(' passer ?? l\'??tape suivante...');
  await lighthouse.startTimespan({ stepName: 'passer ?? l\'??tape suivante' });
  const EtapeSuivanteS2 = await page.waitForXPath('//*[@id="app"]/div/div[2]/div[2]/button[2]');
  await EtapeSuivanteS2.click();
  await lighthouse.endTimespan();

  // droit d'acc??s
  // passer ?? l'??tape suivante
  info(' passer ?? l\'??tape suivante...');
  await lighthouse.startTimespan({ stepName: 'passer ?? l\'??tape suivante' });
  const EtapeSuivanteS3 = await page.waitForXPath('//*[@id="app"]/div/div[2]/div[2]/button[2]');
  await EtapeSuivanteS3.click();
  await lighthouse.endTimespan(); */
};
