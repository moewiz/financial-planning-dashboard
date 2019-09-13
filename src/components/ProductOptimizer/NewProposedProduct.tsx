import React, { PureComponent } from 'react';
import { Icon, TreeSelect } from 'antd';

import { NewProposedProductStyled, ProposePopup } from './styled';
import { HeaderTitleTable, TextTitle } from '../../pages/client/styled';

interface NewProposedProductProps {
  data: CurrentDataTree[];
  onAdd: (productIds: number[]) => void;
}

interface NewProposedProductState {
  value: any;
  open: boolean;
}

interface CurrentDataTree {
  description: string;
  id?: number;
  children?: CurrentDataTree[];
}

const mapDataToTreeData = (arrayData: CurrentDataTree[], baseIndex: number = 0): any =>
  arrayData.map((data: CurrentDataTree, index: number) => {
    if (data.children && data.children.length > 0) {
      return {
        key: `${index}`,
        value: `parent-${index}`,
        title: data.description,
        children: mapDataToTreeData(data.children, index),
      };
    }

    return {
      key: `${baseIndex}-${index}`,
      value: data.id,
      title: data.description,
    };
  });

class NewProposedProduct extends PureComponent<NewProposedProductProps, NewProposedProductState> {
  public state = {
    value: [],
    open: false,
  };
  public preventNextClose = true;

  // When the popover is open and users click anywhere on the page,
  // the popover should close
  public componentDidMount() {
    document.addEventListener('click', this.closePopover);
  }

  public componentDidUpdate(
    prevProps: Readonly<NewProposedProductProps>,
    prevState: Readonly<NewProposedProductState>,
    snapshot?: any,
  ): void {
    if (prevState.open !== this.state.open && !this.state.open) {
      this.addProducts();
    }
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
      });
    }

    this.preventNextClose = false;
  }

  public addProducts = () => {
    const { onAdd } = this.props;
    onAdd(this.state.value);
    this.setState({ value: undefined });
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
    this.setState({ value });
  }

  public getTreeData = () => mapDataToTreeData(this.props.data);

  public render() {
    const tProps = {
      treeData: this.getTreeData(),
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
      treeNodeFilterProp: 'title',
    };

    return (
      <NewProposedProductStyled>
        <HeaderTitleTable>
          <Icon type={'plus-square'} theme={'filled'} onClick={this.openPopover} />
          <TextTitle small={true}>Proposed</TextTitle>
        </HeaderTitleTable>
        {this.state.open && (
          <ProposePopup onClick={this.onPopoverClick}>
            <TreeSelect {...tProps} dropdownClassName="new-proposed-product" />
          </ProposePopup>
        )}
      </NewProposedProductStyled>
    );
  }
}

export default NewProposedProduct;
