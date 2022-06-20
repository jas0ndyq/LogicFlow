import { BaseEdgeModel, BaseNodeModel } from '@logicflow/core';
import React, { useContext, useEffect, useState } from 'react';
import { TeachEditContext } from '../..';
import { TSelect } from '../../config';
import style from './index.module.css';
import { PropertyEditorItem } from './PropertyEditorItem';

type Props = {
  source: BaseNodeModel | BaseEdgeModel;
  nodeIns: BaseNodeModel;
  style: {
    [k: string]: any;
  };
  type: string | undefined;
  isActive: boolean;
};

export const PropertyViewer = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const ctx = useContext(TeachEditContext);
  console.log('ctx', ctx.config);
  useEffect(() => {
    if (props.isActive && !!props.source) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [props.isActive, setIsOpen, props.source]);
  // const keyList = Object.keys(props.source || {});
  const styleKeyList = Object.keys(props.style || {});
  return (
    <div
      className={style.container + ' ' + (isOpen ? style.open : style.close)}
    >
      {isOpen && !!props.source && (
        <ul>
          {styleKeyList
            .map((k) => ctx.config.get(k))
            .filter((item) => !!item)
            .map((item) => (
              <li className={style.list_item} key={'key_' + item!.key}>
                <PropertyEditorItem
                  nodeIns={props.nodeIns}
                  type={item!.type}
                  k={item!.key}
                  optionList={(item as TSelect)!.optionList || []}
                  value={(props.style as any)[item!.key]}
                  title={item!.name}
                />
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};
