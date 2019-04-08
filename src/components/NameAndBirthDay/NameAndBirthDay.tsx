import React from 'react';
import { Modal, Icon, Button, Form, Input, DatePicker } from 'antd';
import { ModalNameBirthDay, TitleForm, ModalFormHome } from './styled';
import { ButtonSideBar } from '../../layouts/Sidebar/styled';
import { sendGAEventCreateClientButtonClicked, sendGAEventNewClientCreated } from '../../../src/utils/GA'

class NameAndBirthDay extends React.PureComponent {
  public state = {
    visible: false,
    confirmLoading: false,
  };

  public showModal = () => {
    this.setState({
      visible: true,
    });
    sendGAEventCreateClientButtonClicked();
  }

  public handleOk = () => {
    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        confirmLoading: false,
        visible: false,
      });
    }, 2000);
    sendGAEventNewClientCreated();
  }

  public handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

  public render(): JSX.Element {
    const { visible, confirmLoading } = this.state;
    return (
      <ModalNameBirthDay>
        <ButtonSideBar onClick={this.showModal} size="large" type="primary">
          <Icon type="plus" />
          <span>New Client</span>
        </ButtonSideBar>
        <Modal
          centered
          wrapClassName="modal-customize"
          title="Let’s get to know each other"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          width={920}
          style={{ padding: 0, left: '20' }}
          bodyStyle={{ padding: 0 }}
          footer={
          <>
            <Button type="default" onClick={this.handleCancel}>
              Cancel
            </Button>
            <Button type="primary" loading={confirmLoading} onClick={this.handleOk}>
              Next
            </Button>
          </>
          }
        >
          <TitleForm>What’s your name?</TitleForm>
          <ModalFormHome className="modal-from-home" layout="horizontal">
            <Form.Item label="FIRST NAME">
              <Input placeholder="Jack" />
            </Form.Item>
            <Form.Item label="LAST NAME">
              <Input placeholder="Rayan" />
            </Form.Item>
            <Form.Item label="DATE OF BIRTH">
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </ModalFormHome>
        </Modal>
      </ModalNameBirthDay>
    );
  }
}

export default NameAndBirthDay;
