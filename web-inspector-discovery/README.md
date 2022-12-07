# KPMG Pulse - Web Inspector

<p align="center"><img src="https://developers.google.com/web/tools/lighthouse/images/lighthouse-logo.svg" /></p>

_KPMG Web Inspector_ is an automated product for generating  [Google Lighthouse](https://developers.google.com/web/tools/lighthouse) reports from a [user flow script](#script-de-parcours).

You can find its documentation [here](https://kpmgfr.visualstudio.com/Plateforme%20Technologique/_git/web-inspector).

## Generate reports

1. Go to this [repository's pipeline](https://kpmgfr.visualstudio.com/Discovery/_build?definitionId=1157).
2. Click on the "Run Pipeline" top right button.
3. Select the `main` branch.
4. Select the environment in the `Stages to run` section.
5. Click `Run`.
6. When the repport is generated, click on the `X published, X consumed` link of the `Summary` -> `Related` section.
7. The HTML and JSON reports are available in the `web-inspector` section.

## User flow script

**Environnement variables**

**Obligatoirement dans un Keyvault, jamais dans le code.**
* `DISCOVERY_URL`: Absolute environment URL.
* `DISCOVERY_USERNAME`: Discovery account username to signin.
* `DISCOVERY_PASSWORD`: Discovery account password to signin.
