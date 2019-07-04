import React, { PureComponent } from 'react';
import { Checkbox, Icon, Popconfirm } from 'antd';
import { HeaderTitleTable, TextTitle } from '../../../pages/client/styled';
import { StrategyTypes } from '../../../enums/strategies';
import {
  StrategyTableContent,
  StrategyTableItems,
  CheckboxCustomize,
  StrategyTableText,
  StrategyTableIcon,
  StrategyTableIconDel,
  CheckboxCustomizeX,
  HeaderTitleMargin,
  HeaderTitleMark,
  HeaderTitleStrategy,
} from './styled';

interface StrategyTableProps {
  type: StrategyTypes;
  strategies: object[];
}

class StrategyTable extends PureComponent<StrategyTableProps> {
  public render() {
    const { type } = this.props;

    if (type === StrategyTypes.EstatePlanning) {
      return (
        <>
          <HeaderTitleStrategy>
            <Icon type={'plus-square'} theme={'filled'} />
            <TextTitle small={true}>Strategy</TextTitle>
            <HeaderTitleMark>Mark</HeaderTitleMark>
            <HeaderTitleMargin>Margin</HeaderTitleMargin>
          </HeaderTitleStrategy>
          <StrategyTableContent>
            <StrategyTableItems>
              <CheckboxCustomize>
                <Checkbox />
              </CheckboxCustomize>
              <StrategyTableText>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius, quia?
              </StrategyTableText>
              <CheckboxCustomizeX>
                <Checkbox />
              </CheckboxCustomizeX>
              <CheckboxCustomizeX>
                <Checkbox />
              </CheckboxCustomizeX>
              <StrategyTableIcon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </StrategyTableIcon>
              <StrategyTableIconDel>
                <Popconfirm title="Really delete?" okText="Yes" cancelText="No" placement="topRight">
                  <Icon type="close-square" />
                </Popconfirm>
              </StrategyTableIconDel>
            </StrategyTableItems>
            <StrategyTableItems>
              <CheckboxCustomize>
                <Checkbox />
              </CheckboxCustomize>
              <StrategyTableText>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius, quia?
              </StrategyTableText>
              <CheckboxCustomizeX>
                <Checkbox />
              </CheckboxCustomizeX>
              <CheckboxCustomizeX>
                <Checkbox />
              </CheckboxCustomizeX>
              <StrategyTableIcon>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </StrategyTableIcon>
              <StrategyTableIconDel>
                <Popconfirm title="Really delete?" okText="Yes" cancelText="No" placement="topRight">
                  <Icon type="close-square" />
                </Popconfirm>
              </StrategyTableIconDel>
            </StrategyTableItems>
          </StrategyTableContent>
        </>
      );
    }

    return (
      <>
        <HeaderTitleStrategy>
          <Icon type={'plus-square'} theme={'filled'} />
          <TextTitle small={true}>Strategy</TextTitle>
        </HeaderTitleStrategy>
        <StrategyTableContent>
          <StrategyTableItems>
            <CheckboxCustomize>
              <Checkbox />
            </CheckboxCustomize>
            <StrategyTableText>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius, quia?
            </StrategyTableText>
            <StrategyTableIcon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </StrategyTableIcon>
            <StrategyTableIconDel>
              <Popconfirm title="Really delete?" okText="Yes" cancelText="No" placement="topRight">
                <Icon type="close-square" />
              </Popconfirm>
            </StrategyTableIconDel>
          </StrategyTableItems>
          <StrategyTableItems>
            <CheckboxCustomize>
              <Checkbox />
            </CheckboxCustomize>
            <StrategyTableText>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius, quia?
            </StrategyTableText>
            <StrategyTableIcon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </StrategyTableIcon>
            <StrategyTableIconDel>
              <Popconfirm title="Really delete?" okText="Yes" cancelText="No" placement="topRight">
                <Icon type="close-square" />
              </Popconfirm>
            </StrategyTableIconDel>
          </StrategyTableItems>
          <StrategyTableItems>
            <CheckboxCustomize>
              <Checkbox />
            </CheckboxCustomize>
            <StrategyTableText>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius, quia?
            </StrategyTableText>
            <StrategyTableIcon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </StrategyTableIcon>
            <StrategyTableIconDel>
              <Popconfirm title="Really delete?" okText="Yes" cancelText="No" placement="topRight">
                <Icon type="close-square" />
              </Popconfirm>
            </StrategyTableIconDel>
          </StrategyTableItems>
        </StrategyTableContent>
      </>
    );
  }
}

export default StrategyTable;
