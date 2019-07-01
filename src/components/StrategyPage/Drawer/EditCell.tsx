import React, { PureComponent } from 'react';
import { isEqual } from 'lodash';
import { Input, InputNumber } from 'antd';

interface EditCellProps {
  name: string;
  type?: EditCellType;
  value: any;
  onChange: (value: any) => void;
  className?: string;
}

interface EditaCellState {
  value: any;
}

export enum EditCellType {
  text,
  number,
}

class EditCell extends PureComponent<EditCellProps, EditaCellState> {
  public state = {
    value: this.props.value,
  };

  public componentWillReceiveProps(nextProps: Readonly<EditCellProps>, nextContext: any): void {
    if (!isEqual(this.props.value, nextProps.value)) {
      this.setState({ value: nextProps.value });
    }
  }

  // public shouldComponentUpdate(
  //   nextProps: Readonly<EditCellProps>,
  //   nextState: Readonly<EditaCellState>,
  //   nextContext: any,
  // ): boolean {
  //   // const { value } = this.props;
  //   // const { value: nextValue } = nextProps;
  //   const { value } = this.state;
  //   const { value: nextValue } = nextState;
  //
  //   return !isEqual(value, nextValue);
  // }

  public onChange = (value: number | undefined) => {
    const { onChange } = this.props;

    this.setState({ value });
    onChange(value);
  }

  public onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { onChange } = this.props;
    const value = e.target.value;

    this.setState({ value });
    onChange(value);
  }

  public render() {
    const { name, type = EditCellType.text } = this.props;
    const { value } = this.state;

    if (type === EditCellType.number) {
      return <InputNumber name={name} onChange={this.onChange} value={value} className={'edit-cell'} />;
    }

    return <Input name={name} value={value} onChange={this.onChangeText} className={'edit-cell text'} />;
  }
}

export default EditCell;
