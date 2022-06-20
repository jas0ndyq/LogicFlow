import React from 'react';

type Props = {
  title: string;
  value: any;
};

export const PropertyViewerItem = (props: Props) => {
  return (
    <div className="flex justify-between items-center">
      <p className="font-bold px-4">{props.title}:</p>
      <p className="px-3">{JSON.stringify(props.value)}</p>
    </div>
  );
};
