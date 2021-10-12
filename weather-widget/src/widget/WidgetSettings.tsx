/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from 'react';
import { TextField, Select, List, ListItem, Size, Switch } from '@lumx/react';

import { FormattedMessage, IntlProvider } from 'react-intl';
import { PredefinedErrorBoundary, useDebounce, useExportProps } from '@lumapps-extensions-playground/common';

import messagesEn from '../translations/en.json';
import messagesFr from '../translations/fr.json';

interface WithIntlSettingsProps {
    properties?: any;
    exportProp: any;
}

const UNITS = [
    {
        label: '°C',
        type: 'metric',
    },
    {
        label: '°F',
        type: 'imperial',
    },
];

const COLORS = [
    {
        code: '6E49F5',
        label: 'Majorell Blue',
    },
    {
        code: '011638',
        label: 'Oxford Blue',
    },
    {
        code: 'ED6A5A',
        label: 'Terra Cotta',
    },
    {
        code: '004F2D',
        label: 'Forest Green Traditional Cotta',
    },
    {
        code: '9FA2B2',
        label: 'Manatee',
    },
    {
        code: '310D20',
        label: 'Dark Purple',
    },
    {
        code: '03B5AA',
        label: 'Light Sea Green',
    },
];

const WithIntlSettings: React.FC<WithIntlSettingsProps> = ({ properties = {}, exportProp }) => {
    const [cityName, setCityName] = useState('');
    const [isUnitOpen, setUnitOpen] = useState(false);
    const [isColorOpen, setColorOpen] = useState(false);
    const [isCurrentUser, setCurentuser] = useState(false);
    const [isDisplayForecast, setDisplayForecast] = useState(false);
    const [unit, setUnit] = React.useState(UNITS[0]);
    const [color, setColor] = React.useState(COLORS[0]);

    const debouncedCityName = useDebounce(cityName, 800);
    useExportProps(debouncedCityName, 'cityName', properties, exportProp);
    useExportProps(unit, 'unit', properties, exportProp);
    useExportProps(color, 'color', properties, exportProp);
    useExportProps(isCurrentUser, 'isCurrentUser', properties, exportProp);
    useExportProps(isDisplayForecast, 'isDisplayForecast', properties, exportProp);

    const closeUnitSelect = () => setUnitOpen(false);
    const toggleUnitSelect = () => setUnitOpen(!isUnitOpen);
    const selectUnit = (item: any) => () => {
        setUnit(item);
        closeUnitSelect();
    };

    const closeColorSelect = () => setColorOpen(false);
    const toggleColorSelect = () => setColorOpen(!isUnitOpen);
    const selectColor = (item: any) => () => {
        setColor(item);
        closeColorSelect();
    };

    return (
        <>
            <Switch isChecked={isCurrentUser} onChange={setCurentuser}>
                <FormattedMessage id="settings.user_switch" />
            </Switch>
            {!isCurrentUser && (
                <TextField
                    className="mt0 ml lumx-spacing-margin-vertical-big"
                    label={(<FormattedMessage id="settings.city_name" />) as any}
                    value={cityName}
                    onChange={setCityName}
                />
            )}
            <div style={{ marginTop: 12, marginBottom: 12 }}>
                <Select
                    style={{ width: '100%' }}
                    isOpen={isUnitOpen}
                    value={unit.label}
                    label={(<FormattedMessage id="settings.unit" />) as any}
                    onInputClick={toggleUnitSelect}
                    onDropdownClose={closeUnitSelect}
                >
                    <List>
                        {UNITS.length > 0
                            ? UNITS.map((choice) => (
                                  <ListItem
                                      isSelected={unit.type === choice.type}
                                      key={choice.type}
                                      onItemSelected={selectUnit(choice)}
                                      size={Size.tiny}
                                  >
                                      {choice.label}
                                  </ListItem>
                              ))
                            : [
                                  <ListItem key={0} size={Size.tiny}>
                                      No data
                                  </ListItem>,
                              ]}
                    </List>
                </Select>
            </div>

            <Switch isChecked={isDisplayForecast} onChange={setDisplayForecast}>
                <FormattedMessage id="settings.display_forecast" />
            </Switch>

            <div style={{ marginTop: 12, marginBottom: 12 }}>
                <Select
                    style={{ width: '100%' }}
                    isOpen={isColorOpen}
                    value={color.label}
                    label={(<FormattedMessage id="settings.color" />) as any}
                    onInputClick={toggleColorSelect}
                    onDropdownClose={closeColorSelect}
                >
                    <List>
                        {COLORS.length > 0
                            ? COLORS.map((choice) => (
                                  <ListItem
                                      isSelected={color.code === choice.code}
                                      key={choice.code}
                                      onItemSelected={selectColor(choice)}
                                      size={Size.tiny}
                                      before={
                                          <div
                                              style={{
                                                  width: 24,
                                                  height: 24,
                                                  backgroundColor: `#${choice.code}`,
                                                  borderWidth: 2,
                                                  borderStyle: 'solid',
                                                  borderColor: '#FFFFFF',
                                                  borderRadius: '50%',
                                              }}
                                          />
                                      }
                                  >
                                      {choice.label}
                                  </ListItem>
                              ))
                            : [
                                  <ListItem key={0} size={Size.tiny}>
                                      No data
                                  </ListItem>,
                              ]}
                    </List>
                </Select>
            </div>
        </>
    );
};

export const WidgetSettings: React.FC<any> = ({ properties = {}, exportProp = undefined }) => {
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
        <PredefinedErrorBoundary lang={lang}>
            <IntlProvider locale={lang} messages={messages[lang]}>
                <WithIntlSettings properties={properties} exportProp={exportProp} />
            </IntlProvider>
        </PredefinedErrorBoundary>
    );
};
