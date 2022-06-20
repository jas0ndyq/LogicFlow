import { BaseEdgeModel, BaseNodeModel } from '@logicflow/core';
import React, { useCallback, useEffect, useState } from 'react';
import style from './index.module.css';
import { PropertyViewerItem } from './PropertyViewerItem';

type Props = {
  source: BaseNodeModel | BaseEdgeModel | null;
  type: string | undefined;
  isActive: boolean;
};

export const PropertyViewer = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (props.isActive && !!props.source) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [props.isActive, setIsOpen, props.source]);
  const keyList = Object.keys(props.source || {});
  console.log('keyList', keyList);
  return (
    <div
      className={style.container + ' ' + (isOpen ? style.open : style.close)}
    >
      {isOpen && !!props.source && (
        <ul>
          {keyList.map((k) => (
            <li className={style.list_item} key={'key_' + k}>
              <PropertyViewerItem title={k} value={(props.source as any)[k]} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
