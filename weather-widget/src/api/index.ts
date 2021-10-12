import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5',
});

export const getWeather = async ({ location, unit, apiKey, lang = 'en' }: any) => {
    const { data: cityData } = await axiosInstance.get(`/weather?q=${encodeURI(location)}&appid=${apiKey}`);

    if (cityData.code) {
        return cityData.message;
    }

    const { coord, name, sys } = cityData;

    const { data } = await axiosInstance.get(
        `/onecall?lat=${coord.lat}&lon=${coord.lon}&units=${unit.type}&exclude=minutely&lang=${lang}&appid=${apiKey}`,
    );

    return { ...data, name, country: sys.country };
};
