import styled, {css} from 'styled-components/native';

export const Container = styled.SafeAreaView`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

export const ContainerHeader = styled.SafeAreaView`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Form = styled.SafeAreaView`
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

export const Title = styled.Text`
  font-size: 14px;
  font-weight: bold;
`;

export const SubTitle = styled.Text`
  font-size: 11px;
`;

export const CardIcons = styled.SafeAreaView`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 10px;
`;

export const CardIconImage = styled.Image`
  height: 30px;
  width: 30px;
  margin-left: 4px;
`;
