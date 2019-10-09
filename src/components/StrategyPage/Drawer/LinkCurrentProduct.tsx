import React, { PureComponent } from 'react';
import { Icon, TreeSelect } from 'antd';

import { EditCellProps } from './EditCell';
import { ProposePopupWrapper } from '../../ProductOptimizer/styled';
import { LinkCurrentProductWrapper } from './styled';

interface LinkCurrentProductStates {
  value: any;
  open: boolean;
}

interface CurrentDataTree {
  description: string;
  id?: number;
  children?: CurrentDataTree[];
}

export const mapDataToTreeData = (arrayData: CurrentDataTree[], baseIndex: number = 0): any =>
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

class LinkCurrentProduct extends PureComponent<EditCellProps, LinkCurrentProductStates> {
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
    prevProps: Readonly<EditCellProps>,
    prevState: Readonly<LinkCurrentProductStates>,
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
    const { onChange, name, options } = this.props;
    let products: any[] = [];
    options.data.map((parent: { children?: Array<{ id: number }> }) => {
      if (parent.children && parent.children.length > 0) {
        products = [
          ...products,
          // @ts-ignore
          ...parent.children.filter((product: any) => this.state.value.includes(product.id)),
        ];
      }
    });
    onChange(products, name);
    this.setState({ value: [] });
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

  public getTreeData = () => mapDataToTreeData(this.props.options.data);

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
      <LinkCurrentProductWrapper>
        <Icon type="link" style={{ transform: 'rotate(45deg)' }} onClick={this.openPopover} />
        {this.state.open && (
          <ProposePopupWrapper onClick={this.onPopoverClick}>
            <TreeSelect {...tProps} dropdownClassName="new-proposed-product" />
          </ProposePopupWrapper>
        )}
      </LinkCurrentProductWrapper>
    );
  }
}

export default LinkCurrentProduct;
