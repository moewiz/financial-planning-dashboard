import React, { Component } from 'react';
import { isEqual } from 'lodash';

interface EditCellProps {
  name: string;
  value: number;
  onChange: (value: any) => void;
}

class EditCell extends Component<EditCellProps> {
  public shouldComponentUpdate(nextProps: Readonly<EditCellProps>, nextState: Readonly<{}>, nextContext: any): boolean {
    const { value } = this.props;
    const { value: nextValue } = nextProps;

    return !isEqual(value, nextValue);
  }

  public onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { onChange } = this.props;
    const value = e.target && e.target.value;

    onChange(value);
  }

  public render() {
    const { name, value } = this.props;

    return <input type="number" name={name} onChange={this.onChange} value={value} />;
  }
}

export default EditCell;
