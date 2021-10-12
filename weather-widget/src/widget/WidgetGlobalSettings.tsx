import React, { useState, useEffect } from 'react';
import { TextField } from '@lumx/react';

import { useDebounce, useExportProps } from 'lumapps-sdk-js';

import { IntlProvider, useIntl } from 'react-intl';
import defaultGlobalSettings from './defaultGlobalSettings';

import messagesEn from '../translations/en.json';
import messagesFr from '../translations/fr.json';

/**
 * Render the widget Picsum settings form.
 *
 * @param {Object} props The settings component properties.
 */
export const WithIntlGlobalSettings = ({ properties = {}, exportProp }: any) => {
    const intl = useIntl();
    const [apiKey, setApiKey] = useState(properties.apiKey || defaultGlobalSettings.apiKey);

    const debouncedApiKey = useDebounce(apiKey, 800);
    const displayLanguage = 'en';

    useExportProps(debouncedApiKey, 'apiKey', properties, exportProp);

    const messages: any = {
        en: messagesEn,
        fr: messagesFr,
    };
    return (
        <IntlProvider locale={displayLanguage} messages={messages[displayLanguage]}>
            <div>
                <TextField
                    className="mt0 ml"
                    label={intl.formatMessage({ id: 'global_settings.api_key' })}
                    value={apiKey}
                    onChange={setApiKey}
                />
            </div>
        </IntlProvider>
    );
};

export const WidgetGlobalSettings:React.FC<any> = ({ properties = {}, exportProp = undefined }) => {
    const messages: any = {
        en: messagesEn,
        fr: messagesFr,
    };

    const [lang, setLang] = useState<string>('en');
    const displayLanguage = 'en';

    useEffect(() => {
        const getContext = async () => {
            const isLangInTrad = Object.keys(messages).includes(displayLanguage);

            setLang(isLangInTrad ? displayLanguage : 'en');
        };
        getContext();
    }, [displayLanguage, messages]);

    return (
        <IntlProvider locale={lang} messages={messages[lang]}>
            <WithIntlGlobalSettings properties={properties} exportProp={exportProp} />
        </IntlProvider>
    );
};