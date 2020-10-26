import styled, {css} from 'styled-components/native';

interface PlaceholderLabelProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.SafeAreaView<{fullLine: boolean}>`
  height: 50px;
  margin-top: 20px;
  border-bottom-width: 1px;
  padding: 0;
  border-bottom-color: #7C7C7C;
  ${(props) =>
    props.fullLine
      ? css`
          width: 100%;
        `
      : css`
          width: 47.5%;
        `}
`;

export const PlaceholderLabel = styled.Text<PlaceholderLabelProps>`
  position: absolute;
  left: 0;
  color: #7C7C7C;
  ${(props) =>
    props.isFocused || props.isFilled
      ? css`
          transform: translateY(-15px);
          font-size: 13px;
        `
      : css`
          transform: translateY(+20px);
          font-size: 16px;
        `}
`;

export const LabeledInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: #1E1E1E;
  padding: 0;
  margin: 0;
`;
