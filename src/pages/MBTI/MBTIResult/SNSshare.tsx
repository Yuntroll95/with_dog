import styled from 'styled-components/macro';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducers';
import TitlePaw from 'assets/svg/TitlePawPositoin.svg';
import Kakao from 'assets/svg/kakao-logo2.svg';
import Twitter from 'assets/svg/twitter.svg';
import FaceBook from 'assets/svg/Facebook_2.svg';
import { sendKakaoLink } from './kakaoShare/KakaoShareData';
import { BASE_URL } from 'config';

const SNSshare = () => {
  const mbtiResultText = useSelector((state: RootState) => state.mbtiText);
  const getMBTIResult: string = Object.values(mbtiResultText).toString();
  const kakaoShare = () => {
    sendKakaoLink();
  };

  const facebookShare = () => {
    const sharedUrl = `${BASE_URL}/mbti-share/${getMBTIResult}`;
    window.open('http://www.facebook.com/sharer/sharer.php?u=' + sharedUrl);
  };

  const twiiterShare = () => {
    const sharedUrl = `${BASE_URL}/mbti-share/${getMBTIResult}`;
    const sendText = '함께하개';
    window.open(
      'https://twitter.com/intent/tweet?text=' + sendText + '&url=' + sharedUrl
    );
  };
  return (
    <SNSshareCotainer>
      <TitleContainer>
        <TitleIMG src={TitlePaw} />
        <TitleText>SNS 공유하기</TitleText>
        <TitleIMG src={TitlePaw} />
      </TitleContainer>
      <HorizontalAlign>
        <SNSImg src={Kakao} onClick={kakaoShare} />
        <SNSImg src={Twitter} onClick={twiiterShare} />
        <SNSImg src={FaceBook} onClick={facebookShare} />
      </HorizontalAlign>
    </SNSshareCotainer>
  );
};

const SNSshareCotainer = styled.div`
  ${props => props.theme.flex.flexBox('column', 'center', 'space-between')};
  margin: 5rem 0;
`;

const TitleContainer = styled.div`
  ${props => props.theme.flex.flexBox('row', 'center', 'space-between')};
  width: 25rem;
`;

const TitleIMG = styled.img`
  width: 1.563rem;
`;

const TitleText = styled.span`
  color: #333333;
  font-size: 1.563rem;
  text-align: center;
`;

const HorizontalAlign = styled.div`
  ${props => props.theme.flex.flexBox('row', 'center', 'space-between')};
  width: 27.5rem;
  margin-top: 2.5rem;
`;

const SNSImg = styled.img`
  width: 4.375rem;
  &:hover {
    border: 0.313rem solid #7dccc7;
    border-radius: 100%;
    cursor: pointer;
  }
`;

export default SNSshare;
