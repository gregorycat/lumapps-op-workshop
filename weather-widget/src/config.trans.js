"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;/* eslint-disable import/no-extraneous-dependencies */ /**
 *  Create-LumApps-Widget config file
 *  update the following to fit your needs
 */ /**
 * The ids of your partner and extension
 */var partnerId='558b1bb2-6f67-4d3c-b9b7-9204fcbdd019';var extensionId='93598637149586173654076898294087259899';var description={en:'Weather widget based on Open Weather API',fr:"Widget météo utilisant les API d'Open Weather"};var name={en:'Open Weather',fr:'Open Weather'};var icon={en:'https://nocodeapi.com/static/db4bcf69ede0f4a974b733bf81d1d701/497c6/ow.png',fr:'https://nocodeapi.com/static/db4bcf69ede0f4a974b733bf81d1d701/497c6/ow.png'};var oauth=false;/**
 * Define the availability of your extension :
 * - open : available for everyone
 * - marketplace : the customer need to have access to the marketplace
 */var availability='marketplace';/**
 * Define if your extension needs to connect to extenal service through an application declare on provider side.
 *
 * Uncomment the following block to declare application usage for your extension.
 * Do not forget to add the application attribute in the config object.
 */ /* const application = {
    providerType: '',
}; */ /**
 * The documentation's url of the extension.
 */var links={documentation:'https://openweathermap.org/guide'};/**
 * The components available for your extensions
 * 'content' : For the Widget content itself (required)
 * 'settings' : For your widget settings
 * 'globalSettings' : For global settings used by platform admin.
 */var components=['content','settings','global_settings'];// Whether the extension is public or not in the marketplace.
var isPublic=true;/**
 * The list of authorized customer ids.
 *
 * If your extension is not public only these customers will see and
 * will be able to install this extensions.
 */var whitelist=[];// do not change the following unless you know what you are doing
var config={// application,
availability:availability,category:'widget',components:components,description:description,oauth:oauth,extensionId:extensionId,icon:icon,isPublic:isPublic,links:links,name:name,partnerId:partnerId,public:isPublic,whitelist:whitelist};var _default=config;exports.default=_default;