enum PropertyEditorType {
  select,
  color,
  input,
}

export type TSelect = {
  name: string;
  key: string;
  type: PropertyEditorType.select;
  optionList: { label: string; value: string }[];
};

export type TInput = {
  name: string;
  key: string;
  type: PropertyEditorType.input;
};

export type TColor = {
  name: string;
  key: string;
  type: PropertyEditorType.color;
};

const optionList = {
  strokeWidthList: ['1', '2', '3', '4', '5', '6'],
  strokeStyleList: ['solid', 'dashed', 'dotted'],
};

const PropertyKV = new Map<string, TSelect | TInput | TColor>();
PropertyKV.set('fill', {
  name: '背景颜色',
  key: 'fill',
  type: PropertyEditorType.color,
});
PropertyKV.set('stroke', {
  name: '线条颜色',
  key: 'stroke',
  type: PropertyEditorType.color,
});
PropertyKV.set('strokeWidth', {
  name: '线条宽度',
  key: 'strokeWidth',
  type: PropertyEditorType.select,
  optionList: optionList.strokeWidthList.map((v) => {
    return {
      label: v + 'px',
      value: v,
    };
  }),
});

export { PropertyEditorType, PropertyKV };
