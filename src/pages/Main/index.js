import React, { useEffect, useState, useRef } from 'react';
import { StatusBar, View } from 'react-native';
import {
  format, parse, getHours, getDay,
} from 'date-fns';
import ptLocale from 'date-fns/locale/pt';
import api from '~/services/api';

import {
  BGContainer,
  LinearGradientContainer,
  TextCity,
  TextDate,
  TextTemperature,
  TextWeather,
  Diviser,
  SlidePreditRain,
  SlideItem,
} from './styles';

const getRandomIndex = (max) => {
  const maxFloor = Math.floor(max);
  return Math.floor(Math.random() * (maxFloor - 0)) + 0;
};

const bgColorTemperature = {
  low: ['#BEE1F477', '#19546Cdd'],
  medium: ['#D1AB7E77', '#5F4B30dd'],
  hight: ['#FF9E5377', '#BC6151dd'],
};

const getBgColorTemperature = (temp) => {
  if (temp < 18) {
    return bgColorTemperature.low;
  } if (temp < 26) {
    return bgColorTemperature.medium;
  }
  return bgColorTemperature.hight;
};

const getMomentDay = () => {
  const hoursNow = getHours(new Date());
  if (hoursNow <= 11) {
    return 'nature tree';
  } if (hoursNow <= 17) {
    return 'mountain';
  }
  return 'night sky';
};

function Main() {
  const [weatherData, setWeatherData] = useState(null);
  const [preditData, setPreditData] = useState([]);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    api.get('http://apiadvisor.climatempo.com.br/api/v1/weather/locale/3477/current?token=1ba88a3d44eb2b16e1a13d68b51710d9')
      .then(({ data }) => {
        api.get(`https://pixabay.com/api/?key=5747409-46d57c865d11c6d8676868468&q=${getMomentDay()}&image_type=photo&per_page=5`)
          .then(({ data: { hits } }) => setWeatherData({
            ...data,
            bgImage: hits[getRandomIndex(hits.length - 1)].largeImageURL,
          }));

        api.get(`http://apiadvisor.climatempo.com.br/api/v1/forecast/locale/${data.id}/hours/72?token=1ba88a3d44eb2b16e1a13d68b51710d9`)
          .then(({ data: predit }) => {
            const preditCollection = predit.data.filter(item => getDay(item.date) === getDay(new Date()));
            setPreditData(preditCollection);
            if (scrollViewRef && scrollViewRef.current && preditCollection.length) {
              scrollViewRef.current.scrollTo({ x: getHours(new Date()) * 100, animated: true });
            }
          });
      })
      .catch(error => console.error(error));
  }, [scrollViewRef.current]);

  return (
    <BGContainer
      source={{
        uri: weatherData ? weatherData.bgImage : 'https://s3-sa-east-1.amazonaws.com/rocketseat-cdn/background.png',
      }}
      resizeMode="cover"
    >
      <LinearGradientContainer colors={getBgColorTemperature(weatherData ? weatherData.data.temperature : ['#00000055', '#000000bb'])}>
        <StatusBar hidden />
        {weatherData && (
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <TextCity>{`${weatherData.name}, ${weatherData.state}`}</TextCity>
            <TextDate>{`${format(parse(weatherData.data.date), 'dddd[,] DD [de] MMM[,] YYYY', { locale: ptLocale })}`}</TextDate>
            <TextTemperature>{`${Math.round(weatherData.data.temperature)}°`}</TextTemperature>
            <View>
              <TextWeather>{`${weatherData.data.condition}`}</TextWeather>
            </View>
            <Diviser />
            <TextWeather>{`${weatherData.data.humidity}% de Humidade`}</TextWeather>
          </View>
          <View>
            <SlidePreditRain ref={scrollViewRef}>
              {preditData.map(item => (
                <SlideItem key={item.date} style={{ backgroundColor: getHours(item.date) === getHours(new Date()) ? '#0002' : 'transparent' }}>
                  <TextWeather>{`C: ${item.rain.precipitation}%`}</TextWeather>
                  <TextWeather>{`T: ${item.temperature.temperature}°`}</TextWeather>
                  <TextDate>{format(parse(item.date), 'HH:mm')}</TextDate>
                </SlideItem>
              ))}
            </SlidePreditRain>
          </View>
        </View>
        )}
      </LinearGradientContainer>
    </BGContainer>
  );
}

export default Main;
