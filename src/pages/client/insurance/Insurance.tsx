import React, { PureComponent } from 'react';
import { Button, Tabs, Table, Icon } from 'antd';
import { get } from 'lodash';
import cn from 'classnames';

import { StrategyPageWrapper } from '../../../components/StrategyPage/styled';
import { TabPanStyled } from '../productOptimizer/styled';
import { ActionDrawerGeneral } from '../../../components/StrategyPage/Drawer/styled';
import { HeaderTitleTable, TableEntryContainer, TextTitle } from '../styled';
import { Product } from '../../../components/ProductOptimizer/Drawer/DrawerProduct';
import { Projections } from '../../../components/Icons';
import { EditCellType } from '../../../components/StrategyPage/Drawer/EditCell';
import { components } from '../../../containers/productOptimizer/CurrentProduct';

interface InsuranceProps {
  clientId: number;
  pageData: any;
}

const client = {
  current: [
    {
      id: 1,
      provider: 'OnePath OneCare',
      type: 'Life',
      cover: '500000',
      premium: 'Stepped',
    },
    {
      id: 2,
      provider: 'OnePath OneCare',
      type: 'TPD',
      cover: '500000',
      premium: 'Stepped',
    },
    {
      id: 3,
      provider: 'OnePath OneCare',
      type: 'Trauma',
      cover: '150000',
      premium: 'Stepped',
    },
    {
      id: 4,
      provider: 'OnePath OneCare',
      type: 'Income Protection',
      cover: '7000',
      premium: 'Stepped',
    },
  ],
  proposed: [
    {
      id: 5,
      provider: 'OnePath OneCare',
      type: 'Life',
      cover: '500000',
      premium: 'Stepped',
    },
    {
      id: 6,
      provider: 'OnePath OneCare',
      type: 'TPD',
      cover: '500000',
      premium: 'Stepped',
    },
    {
      id: 7,
      provider: 'OnePath OneCare',
      type: 'Trauma',
      cover: '150000',
      premium: 'Stepped',
    },
    {
      id: 8,
      provider: 'OnePath OneCare',
      type: 'Income Protection',
      cover: '7000',
      premium: 'Stepped',
    },
  ],
};

const partner = {
  current: [
    {
      id: 1,
      provider: 'OnePath OneCare',
      type: 'Life',
      cover: '500000',
      premium: 'Stepped',
    },
    {
      id: 2,
      provider: 'OnePath OneCare',
      type: 'TPD',
      cover: '500000',
      premium: 'Stepped',
    },
    {
      id: 3,
      provider: 'OnePath OneCare',
      type: 'Trauma',
      cover: '150000',
      premium: 'Stepped',
    },
    {
      id: 4,
      provider: 'OnePath OneCare',
      type: 'Income Protection',
      cover: '7000',
      premium: 'Stepped',
    },
  ],
  proposed: [
    {
      id: 5,
      provider: 'OnePath OneCare',
      type: 'Life',
      cover: '500000',
      premium: 'Stepped',
    },
    {
      id: 6,
      provider: 'OnePath OneCare',
      type: 'TPD',
      cover: '500000',
      premium: 'Stepped',
    },
    {
      id: 7,
      provider: 'OnePath OneCare',
      type: 'Trauma',
      cover: '150000',
      premium: 'Stepped',
    },
    {
      id: 8,
      provider: 'OnePath OneCare',
      type: 'Income Protection',
      cover: '7000',
      premium: 'Stepped',
    },
  ],
};

const dummyInsuranceData = {
  client,
  partner,
};

interface TableProps {
  dataList: Product[];
  columns: any[];
  title: string;
  className?: string;
}

const BasicTable = ({ title, dataList, columns, className }: TableProps) => (
  <TableEntryContainer smallPadding>
    <HeaderTitleTable>
      {title === 'Proposed' && <Icon type={'plus-square'} theme={'filled'} />}
      <TextTitle small={true}>{title}</TextTitle>
    </HeaderTitleTable>
    <Table
      rowKey={(rowKey) => (rowKey.id ? rowKey.id.toString() : 'new')}
      className={cn(`table-general optimizer-table`, className)}
      columns={columns}
      dataSource={dataList}
      pagination={false}
      components={components}
    />
  </TableEntryContainer>
);

class Insurance extends PureComponent<InsuranceProps> {
  public columns = [
    {
      title: 'Provider',
      dataIndex: 'provider',
      key: '0',
      width: 160,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: '1',
      width: 130,
    },
    {
      title: 'Cover',
      dataIndex: 'cover',
      key: '2',
      width: 90,
      editable: true,
      dollar: true,
      type: EditCellType.number,
      className: 'text-align-right',
    },
    {
      title: 'Premium',
      dataIndex: 'premium',
      key: '3',
      width: 68,
    },
    {
      title: '',
      key: 'operation',
      render: (text: any, record: any, index: number) => {
        return (
          <>
            <Icon className={cn('projection')} component={Projections} />
            <Icon className="remove" type="close-square" />
          </>
        );
      },
      width: 55,
    },
  ];

  public onEdit = (value: any, name: string, rowIndex: number) => {
    console.log({ value });
  }

  public getColumns = () => {
    return this.columns.map((col) => {
      if (col.editable) {
        console.log('col', col);
        return {
          ...col,
          onCell: (record: any, rowIndex: number) => ({
            ...col,
            record,
            rowIndex,
            type: col.type || 'text',
            onEdit: this.onEdit,
          }),
        };
      }

      return col;
    });
  }

  public render() {
    return (
      <StrategyPageWrapper>
        <Tabs defaultActiveKey="1">
          <TabPanStyled tab="Client" key="1">
            <BasicTable
              title="Current"
              columns={this.getColumns()}
              dataList={get(dummyInsuranceData, 'client.current', [])}
              className="current-product-table"
            />
            <BasicTable
              title="Proposed"
              columns={this.getColumns()}
              dataList={get(dummyInsuranceData, 'client.proposed', [])}
              className="current-product-table"
            />
          </TabPanStyled>
          <TabPanStyled tab="Partner" key="2">
            <BasicTable
              title="Current"
              columns={this.getColumns()}
              dataList={get(dummyInsuranceData, 'partner.current', [])}
              className="current-product-table"
            />
            <BasicTable
              title="Proposed"
              columns={this.getColumns()}
              dataList={get(dummyInsuranceData, 'partner.proposed', [])}
              className="current-product-table"
            />
          </TabPanStyled>
        </Tabs>
        <ActionDrawerGeneral visible>
          <Button htmlType={'button'} type={'default'}>
            <span>Discard</span>
          </Button>
          <Button htmlType={'submit'} type={'primary'}>
            <span>Save</span>
          </Button>
        </ActionDrawerGeneral>
      </StrategyPageWrapper>
    );
  }
}

export default Insurance;
