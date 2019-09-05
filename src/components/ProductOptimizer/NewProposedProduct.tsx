import React, { PureComponent } from 'react';
import { Icon, TreeSelect } from 'antd';
import { isFunction } from 'lodash';

import { NewProposedProductStyled, ProposeItem, ProposePopup } from './styled';
import { HeaderTitleTable, TextTitle } from '../../pages/client/styled';

const treeData = [
  {
    title: 'Super',
    value: '0-1',
    key: '0-1',
    children: [
      {
        title: 'Product A',
        value: 'Product A',
        key: '0-1-0',
      },
      {
        title: 'Product B',
        value: 'Product B',
        key: '0-1-1',
      },
      {
        title: 'Product C',
        value: 'Product C',
        key: '0-1-2',
      },
    ],
  },
];

interface NewProposedProductProps {
  onAdd: (data: any) => void;
}

interface NewProposedProductState {
  value: any;
  open: boolean;
}

class NewProposedProduct extends PureComponent<NewProposedProductProps, NewProposedProductState> {
  public state = {
    value: undefined,
    open: false,
  };
  public preventNextClose = true;

  // When the popover is open and users click anywhere on the page,
  // the popover should close
  public componentDidMount() {
    document.addEventListener('click', this.closePopover);
  }

  public componentWillUnmount() {
    document.removeEventListener('click', this.closePopover);
  }
  // Note: make sure whenever a click happens within the popover it is not closed
  public onPopoverClick = () => {
    this.preventNextClose = true;
  }

  public closePopover = () => {
    if (!this.preventNextClose && this.state.open) {
      this.setState({
        open: false,
        value: undefined,
      });
    }

    this.preventNextClose = false;
  }

  public openPopover = () => {
    if (!this.state.open) {
      this.preventNextClose = true;
      this.setState({
        open: true,
      });
    }
  }

  public onChange = (value: any) => {
    console.log('onChange ', value);
    this.setState({ value });
  }

  public render() {
    const tProps = {
      treeData,
      value: this.state.value,
      onChange: this.onChange,
      treeCheckable: true,
      searchPlaceholder: '',
      allowClear: true,
      treeDefaultExpandAll: true,
      style: {
        width: 300,
      },
      open: true,
    };

    return (
      <NewProposedProductStyled>
        <HeaderTitleTable>
          <Icon type={'plus-square'} theme={'filled'} onClick={this.openPopover} />
          <TextTitle small={true}>Proposed</TextTitle>
        </HeaderTitleTable>
        {this.state.open && (
          <ProposePopup onClick={this.onPopoverClick}>
            <ProposeItem>Add new propose product</ProposeItem>
            <ProposeItem>Copy from current</ProposeItem>
            <TreeSelect {...tProps} dropdownClassName="new-proposed-product" />
          </ProposePopup>
        )}
      </NewProposedProductStyled>
    );
  }
}

export default NewProposedProduct;
