import React, { PureComponent } from 'react';
import { map } from 'lodash';
import { Dropdown, Icon, Menu } from 'antd';
const { SubMenu, Item } = Menu;

import { NewProposedProductStyled } from './styled';
import { HeaderTitleTable, TextTitle } from '../../pages/client/styled';
import { Product } from './Drawer/DrawerProduct';
import { proposedChoices } from '../../enums/proposedChoices';

interface NewProposedProductProps {
  currentProducts: Product[];
  onAdd: (productIds: string[]) => void;
}

class NewProposedProduct extends PureComponent<NewProposedProductProps> {
  public renderItems = (option: any, index: number, keys: string[] = []) => {
    const { onAdd } = this.props;
    if (option.children && option.children.length > 0) {
      return (
        <SubMenu title={option.label} key={index}>
          {map(option.children, (otp, idx: number) => this.renderItems(otp, idx, [...keys, option.value]))}
        </SubMenu>
      );
    }
    const onClickItem = () => {
      onAdd([...keys, option.value]);
    };

    return (
      <Item onClick={onClickItem} key={index}>
        {option.label}
      </Item>
    );
  }

  public renderMenu = () => {
    const { currentProducts } = this.props;
    const childProducts = map(currentProducts, (product) => ({ value: product.id, label: product.description }));
    const options = [
      {
        ...proposedChoices.new,
      },
      {
        ...proposedChoices.rebalance,
        children: childProducts,
      },
      {
        ...proposedChoices.retain,
        children: childProducts,
      },
    ];
    const menu = map(options, (option, index) => this.renderItems(option, index));

    return <Menu>{menu}</Menu>;
  }

  public render() {
    return (
      <NewProposedProductStyled>
        <HeaderTitleTable>
          <Dropdown overlay={this.renderMenu()} trigger={['click']}>
            <Icon type={'plus-square'} theme={'filled'} />
          </Dropdown>
          <TextTitle small={true}>Proposed</TextTitle>
        </HeaderTitleTable>
      </NewProposedProductStyled>
    );
  }
}

export default NewProposedProduct;
