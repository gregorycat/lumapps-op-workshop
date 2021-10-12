/* eslint-disable import/no-extraneous-dependencies */
/**
 *  Create-LumApps-Widget config file
 *  update the following to fit your needs
 */

/**
 * The ids of your partner and extension
 */
const partnerId = '558b1bb2-6f67-4d3c-b9b7-9204fcbdd019';
const extensionId = '93598637149586173654076898294087259899';

const description = {
    en: 'Weather widget based on Open Weather API',
    fr: "Widget météo utilisant les API d'Open Weather",
};

const name = {
    en: 'Open Weather',
    fr: 'Open Weather',
};

const icon = {
    en: 'https://nocodeapi.com/static/db4bcf69ede0f4a974b733bf81d1d701/497c6/ow.png',
    fr: 'https://nocodeapi.com/static/db4bcf69ede0f4a974b733bf81d1d701/497c6/ow.png',
};

const oauth = false;

/**
 * Define the availability of your extension :
 * - open : available for everyone
 * - marketplace : the customer need to have access to the marketplace
 */

const availability = 'marketplace';

/**
 * Define if your extension needs to connect to extenal service through an application declare on provider side.
 *
 * Uncomment the following block to declare application usage for your extension.
 * Do not forget to add the application attribute in the config object.
 */
/* const application = {
    providerType: '',
}; */

/**
 * The documentation's url of the extension.
 */
const links = {
    documentation: 'https://openweathermap.org/guide',
};

/**
 * The components available for your extensions
 * 'content' : For the Widget content itself (required)
 * 'settings' : For your widget settings
 * 'globalSettings' : For global settings used by platform admin.
 */
const components = ['content', 'settings', 'global_settings'];

// Whether the extension is public or not in the marketplace.
const isPublic = true;

/**
 * The list of authorized customer ids.
 *
 * If your extension is not public only these customers will see and
 * will be able to install this extensions.
 */
const whitelist = [];

// do not change the following unless you know what you are doing
const config = {
    // application,
    availability,
    category: 'widget',
    components,
    description,
    oauth,
    extensionId,
    icon,
    isPublic,
    links,
    name,
    partnerId,
    public: isPublic,
    whitelist,
};

export default config;
