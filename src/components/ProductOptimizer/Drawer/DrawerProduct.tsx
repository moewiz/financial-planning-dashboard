import React, { PureComponent } from 'react';
import { Drawer } from 'antd';

interface DrawerProductProps {
  isOpen: boolean;
  close: () => void;
}

class DrawerProduct extends PureComponent<DrawerProductProps> {
  public render() {
    const { close, isOpen } = this.props;

    return (
      <Drawer width={1100} onClose={close} visible={isOpen} destroyOnClose={true}>
        Drawer Product
      </Drawer>
    );
  }
}

export default DrawerProduct;
