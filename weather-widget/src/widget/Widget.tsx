/* eslint-disable radix */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';

import { Icon, Theme, Tooltip, Avatar, Size } from '@lumx/react';
import { mdiSunglasses, mdiWater, mdiWeatherWindy } from '@lumx/icons';
import moment from 'moment';
import 'moment/locale/fr';

import { FormattedMessage, IntlProvider, useIntl } from 'react-intl';
import { PredefinedErrorBoundary, NotificationsProvider } from '@lumapps-extensions-playground/common';

import messagesEn from '../translations/en.json';
import messagesFr from '../translations/fr.json';

import defaultGlobalSettings from './defaultGlobalSettings';

import { getWeather } from '../api';
import { WeatherType } from '../types';

interface WidgetProps {
    value: any;
    globalValue: any;
    theme: Theme;
}

const Widget = ({ value = {}, globalValue = {}, theme = Theme.light }: WidgetProps): React.ReactElement => {
    const intl = useIntl();
    const [weather, setWeather] = useState<WeatherType>();

    const { cityName, unit, color, isCurrentUser, isDisplayForecast }: any = value;
    const { apiKey = defaultGlobalSettings.apiKey }: any = globalValue;

    const displayLanguage = 'en';

    moment.locale(displayLanguage);

    const generateGreetings = () => {
        const currentHour = parseInt(moment().format('HH'));

        if (currentHour >= 3 && currentHour < 12) {
            return 'Good Morning';
        }
        if (currentHour >= 12 && currentHour < 15) {
            return 'Good Afternoon';
        }
        if (currentHour >= 15 && currentHour < 20) {
            return 'Good Evening';
        }
        if (currentHour >= 20 && currentHour < 3) {
            return 'Good Night';
        }
        return 'Hello';
    };

    const getInfo = async () => {
        const weatherData = await getWeather({
            location: cityName,
            unit,
            apiKey,
            lang: displayLanguage,
        });
        setWeather(weatherData);
    };

    useEffect(() => {
        getInfo();
    }, [cityName, apiKey, unit, isCurrentUser, displayLanguage, isDisplayForecast]);

    return (
        <div className="openweather-extension" style={{ color: theme === Theme.dark ? '#FFFFFF' : '#000000' }}>
            <div
                style={{
                    display: 'flex',
                }}
            >
                <span
                    className="lumx-typography-subtitle2"
                    style={{
                        flex: 1,
                        margin: 'auto',
                    }}
                >
                    {generateGreetings()}, John Doe
                </span>
                <Avatar
                    theme={theme}
                    image="https://randomuser.me/api/portraits/men/91.jpg"
                    alt="Profile picture"
                    size={Size.m}
                />
            </div>

            {weather && (
                <>
                    <div
                        className="lumx-spacing-padding-huge"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <div className="lumx-typography-headline" style={{ margin: 'auto', textAlign: 'center' }}>
                            {weather.name}, {weather.country}{' '}
                            <img
                                style={{
                                    height: '13pt',
                                    marginLeft: 8,
                                }}
                                alt="country flag"
                                src={`https://openweathermap.org/images/flags/${weather.country.toLowerCase()}.png`}
                            />
                        </div>

                        <div style={{ margin: 'auto', textAlign: 'center' }}>
                            <Tooltip label={weather.current.weather[0].description}>
                                <img
                                    alt={weather.current.weather[0].description}
                                    src={`http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`}
                                />
                            </Tooltip>
                            <div className="lumx-typography-caption" style={{ textTransform: 'capitalize' }}>
                                {weather.current.weather[0].description}
                            </div>
                            <div className="lumx-typography-display1">{Math.round(weather.current.temp)}°</div>
                        </div>
                    </div>
                    <div
                        className="lumx-spacing-padding-huge lumx-spacing-margin-horizontal-huge"
                        style={{
                            display: 'flex',
                            backgroundColor: `#${color && color.code}`,
                            color: '#FFFF',
                            borderRadius: 4,
                        }}
                    >
                        <div style={{ flex: 1, textAlign: 'center' }}>
                            <Tooltip label={intl.formatMessage({ id: 'humidity' })}>
                                <Icon style={{ margin: 'auto' }} icon={mdiWater} size={Size.m} />
                                {Math.round(weather.current.humidity)} %
                            </Tooltip>
                        </div>
                        <div style={{ flex: 1, margin: 'auto', textAlign: 'center' }}>
                            <Tooltip label={intl.formatMessage({ id: 'wind' })}>
                                <Icon style={{ margin: 'auto' }} icon={mdiWeatherWindy} size={Size.m} />
                                {Math.round(weather.current.wind_speed)} <FormattedMessage id="speed_unit" />
                            </Tooltip>
                        </div>
                        <div style={{ flex: 1, margin: 'auto', textAlign: 'center' }}>
                            <Tooltip label={intl.formatMessage({ id: 'uv' })}>
                                <Icon style={{ margin: 'auto' }} icon={mdiSunglasses} size={Size.m} />
                                {Math.round(weather.current.uvi)}
                            </Tooltip>
                        </div>
                    </div>
                </>
            )}

            {weather && isDisplayForecast && (
                <div style={{ display: 'flex' }} className="lumx-spacing-margin-huge">
                    {weather.daily.slice(0, 3).map((daily) => (
                        <div style={{ flex: 1, margin: 'auto', textAlign: 'center' }} key={daily.dt}>
                            <div>
                                <Tooltip label={daily.weather[0].description}>
                                    <img
                                        alt={daily.weather[0].main}
                                        src={`http://openweathermap.org/img/wn/${daily.weather[0].icon}@2x.png`}
                                    />
                                </Tooltip>
                            </div>
                            <div>
                                <span className="lumx-typography-headline">{Math.round(daily.temp.max)}°</span>
                                <span className="lumx-typography-subtitle1">{Math.round(daily.temp.min)}°</span>
                            </div>
                            <div className="lumx-typography-title">{moment.unix(daily.dt).format('ddd')}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const NotificationAwareWidget = (props: any) => {
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
    }, []);

    return (
        <IntlProvider messages={messages[lang]} locale={lang}>
            <NotificationsProvider>
                <PredefinedErrorBoundary>
                    <Widget {...props} />
                </PredefinedErrorBoundary>
            </NotificationsProvider>
        </IntlProvider>
    );
};

export { NotificationAwareWidget as Widget };
