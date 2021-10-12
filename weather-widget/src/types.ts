export interface CurrentWeatherType {
    id: string;
    main: string;
    description: string;
    icon: string;
}

export interface WeatherDataType {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: number;
    uvi: number;
    pressuer: number;
    weather: CurrentWeatherType[];
    wind_speed: number;
    humidity: number;
}
export interface WeatherDataDetailedType {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: {
        day: number;
        min: number;
        max: number;
    };
    pressuer: number;
    weather: CurrentWeatherType[];
    wind_speed: number;
    humidity: number;
}

export interface WeatherAlert {
    sender_name: string;
    start: number;
    end: number;
    event: string;
    description: string;
}

export interface WeatherType {
    name: string;
    country: string;
    alerts?: WeatherAlert[];
    current: WeatherDataType;
    hourly: WeatherDataType[];
    daily: WeatherDataDetailedType[];
}
