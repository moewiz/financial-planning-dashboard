import React, { PureComponent } from 'react';
import { Table } from 'antd';
import { ExpandIconProps, TableProps } from 'antd/lib/table';
import Icon from 'antd/es/icon';
import { TweenOneGroup } from 'rc-tween-one';
import EditableCell from './assets/EditableCell';

const enterAnim = [
  {
    opacity: 0,
    x: 30,
    backgroundColor: '#fffeee',
    duration: 0,
  },
  {
    height: 0,
    duration: 200,
    type: 'from',
    delay: 250,
    ease: 'easeOutQuad',
  },
  {
    opacity: 1,
    x: 0,
    duration: 250,
    ease: 'easeOutQuad',
  },
  { delay: 1000, backgroundColor: '#fff' },
];
const leaveAnim = [
  { duration: 250, opacity: 0 },
  { height: 0, duration: 200, ease: 'easeOutQuad' },
  { delay: 100, display: 'none', backgroundColor: '#fff' },
];

function AnimTag($props: any) {
  return <TweenOneGroup component="tbody" enter={enterAnim} leave={leaveAnim} appear={false} exclusive {...$props} />;
}
const components = {
  body: {
    wrapper: AnimTag,
    cell: EditableCell,
  },
};

function CustomExpandIcon(props: ExpandIconProps<any>) {
  if (!props.expandable) {
    return null;
  }
  let text;
  if (props.expanded) {
    text = 'down';
  } else {
    text = 'right';
  }
  return (
    <Icon
      type={text}
      // @ts-ignore
      onClick={(e) => props.onExpand(props.record, e)}
    />
  );
}

interface GeneralTableProps {
  columns: any;
  dataSource: object[];
}

class GeneralTable extends PureComponent<GeneralTableProps & TableProps<any>> {
  protected static defaultProps = {
    className: 'table-enter-leave',
  };

  public render() {
    const { columns, dataSource, ...props } = this.props;

    return (
      <Table
        {...props}
        rowKey={(record) => record.key}
        expandIcon={CustomExpandIcon}
        rowClassName={() => 'editable-row'}
        components={components}
        columns={columns}
        dataSource={dataSource}
        className={`table-general ` + this.props.className}
      />
    );
  }
}

export default GeneralTable;
