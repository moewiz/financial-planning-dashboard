import styled from 'styled-components';
interface HomePageProps {
  readonly select?: boolean;
}

/* background-image: ${(props) =>
    props.select
      ? 'url(/images/bg-home-select.jpg)'
      : 'url(http://sgp18.siteground.asia/~whistle4/images/login-bg.png)'}; */
export const HomePage = styled.div<HomePageProps>`
  min-height: calc(100vh - 60px);
  padding: 15px;
  background-image: ${(props) =>
    props.select
      ? 'url(http://sgp18.siteground.asia/~whistle4/images/login-bg.png)'
      : 'url(http://sgp18.siteground.asia/~whistle4/images/login-bg.png)'};
  height: calc(100vh - 56px);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
  display: flex;
  .ant-typography {
    margin-bottom: 10px !important;
  }
`;

export const HomeDesc = styled.span`
  font-size: 22px;
  color: #515c83;
  display: inline-block;
  width: 100%;
  text-align: center;
`;
