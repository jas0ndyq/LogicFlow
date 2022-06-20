import { BaseNodeModel } from '@logicflow/core';
import React, { useCallback, useState } from 'react';
import { PropertyEditorType } from '../../config';

type Props = {
  title: string;
  k: string;
  value: any;
  type: PropertyEditorType;
  optionList?: any;
  nodeIns: BaseNodeModel;
};

type Option = {
  label: string;
  value: string;
};

const PropertyEditorItemSelect = (props: {
  value: string;
  k: string;
  optionList?: Option[];
  nodeIns: BaseNodeModel;
}) => {
  const [value, setValue] = useState(props.value);
  const handleSelectChange = useCallback(
    (e) => {
      props.nodeIns.setProperties({
        ...props.nodeIns.properties,
        [props.k]: e.target.value,
      });
      setValue(e.target.value);
    },
    [props],
  );
  return (
    <select onChange={handleSelectChange} value={value}>
      {props.optionList &&
        props.optionList.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
    </select>
  );
};

const PropertyEditorItemInput = (props: {
  value: string;
  k: string;
  nodeIns: BaseNodeModel;
}) => {
  return <input type="text" value={props.value} />;
};

const PropertyEditorItemColor = (props: {
  value: string;
  k: string;
  nodeIns: BaseNodeModel;
}) => {
  const [value, setValue] = useState(props.value);
  const handleColorChange = useCallback(
    (e) => {
      console.log('ins', props.nodeIns);
      console.log('e', e);
      props.nodeIns.setProperties({
        ...props.nodeIns.properties,
        [props.k]: e.target.value,
      });
      setValue(e.target.value);
    },
    [props],
  );
  return <input onChange={handleColorChange} type="color" value={value} />;
};

const PropertyEditorItemValue = (props: {
  type: PropertyEditorType;
  k: string;
  value: string;
  nodeIns: BaseNodeModel;
  optionList?: any[];
}) => {
  switch (props.type) {
    case PropertyEditorType.color:
      return (
        <PropertyEditorItemColor
          nodeIns={props.nodeIns}
          k={props.k}
          value={props.value}
        />
      );
    case PropertyEditorType.input:
      return (
        <PropertyEditorItemInput
          k={props.k}
          nodeIns={props.nodeIns}
          value={props.value}
        />
      );
    case PropertyEditorType.select:
      return (
        <PropertyEditorItemSelect
          k={props.k}
          nodeIns={props.nodeIns}
          value={props.value}
          optionList={props.optionList}
        />
      );
    default:
      return null;
  }
};

export const PropertyEditorItem = (props: Props) => {
  return (
    <div className="flex justify-between items-center">
      <p className="font-bold px-4">{props.title}:</p>
      <div className="">
        <PropertyEditorItemValue {...props} />
      </div>
    </div>
  );
};
