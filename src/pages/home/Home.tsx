import React from 'react';
import { Layout, Icon } from 'antd';
import { HomePage, HomeDesc } from './styled';
import Heading from '../../components/Heading/Heading';
import { ButtonModalFixed } from '../../components/NameAndBirthDay/styled';
const { Content } = Layout;

class Home extends React.PureComponent {
  public render(): JSX.Element {
    return (
      <HomePage select="true">
        <Content>
          <Heading level={2} className="subHeading" titleText="Hi John we missed you." />
          <HomeDesc>Click the plus button to start your advice</HomeDesc>
          <ButtonModalFixed size="large" shape="circle" type="primary">
            <Icon type="plus" />
          </ButtonModalFixed>
        </Content>
      </HomePage>
    );
  }
}

export default Home;
