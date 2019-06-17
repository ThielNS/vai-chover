import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

export const BGContainer = styled.ImageBackground`
  flex: 1;
`;

export const LinearGradientContainer = styled(LinearGradient)`
  flex: 1;
`;

export const TextCity = styled.Text`
  font-size: 22px;
  font-weight: bold;
  text-shadow: 0 3px 10px rgba(0,0,0,.16);
  margin-bottom: 5px;
  color: #fff;
  text-align: center;
`;

export const TextDate = styled.Text`
  font-size: 16px;
  font-weight: 100;
  text-shadow: 0 2px 5px rgba(0,0,0,.16);
  color: #fff;
  text-align: center;
`;

export const TextTemperature = styled.Text`
  margin-top: 50px;
  margin-bottom: 20px;
  font-size: 90px;
  font-weight: bold;
  text-shadow: 0 3px 10px rgba(0,0,0,.16);
  color: #fff;
  text-align: center;
`;

export const TextWeather = styled.Text`
  font-size: 18px;
  font-weight: bold;
  text-shadow: 0 3px 10px rgba(0,0,0,.16);
  color: #fff;
  text-align: center;
`;

export const Diviser = styled.View`
  width: 40%;
  border-top-width: 1px;
  border-top-color: rgba(255,255,255,0.7);
  margin: 10px auto;
`;

export const SlidePreditRain = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})`
  background-color: #0001;
  height: auto;
`;

export const SlideItem = styled.View`
  height: 80px;
  width: 100px;
  justify-content: center;
  align-items: center;
`;
