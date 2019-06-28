import React, { Component } from 'react';
import { isEqual } from 'lodash';
import { InputNumber } from 'antd';

interface EditCellProps {
  name: string;
  value: number;
  onChange: (value: any) => void;
  className?: string;
}

interface EditaCellState {
  value: any;
}

class EditCell extends Component<EditCellProps, EditaCellState> {
  public state = {
    value: 0,
  };

  public shouldComponentUpdate(
    nextProps: Readonly<EditCellProps>,
    nextState: Readonly<EditaCellState>,
    nextContext: any,
  ): boolean {
    // const { value } = this.props;
    // const { value: nextValue } = nextProps;
    const { value } = this.state;
    const { value: nextValue } = nextState;

    return !isEqual(value, nextValue);
  }

  public onChange = (value: number | undefined) => {
    const { onChange } = this.props;
    // const value = e.target && e.target.value;

    this.setState({ value });
    onChange(value);
  }

  public render() {
    const { name } = this.props;
    const { value } = this.state;

    return <InputNumber name={name} onChange={this.onChange} value={value} className={'edit-cell'} />;
  }
}

export default EditCell;
