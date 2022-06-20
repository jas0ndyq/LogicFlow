import { RectResize } from '@logicflow/extension'
import { getShapeStyleFuction, getTextStyleFunction } from '../../../../helpers/getShapeStyleUtil'

// 矩形
class RectNewModel extends RectResize.model {

  setToBottom () {
    this.zIndex = 0
  }

  getNodeStyle () {
    const style = super.getNodeStyle()
    const properties = this.getProperties()
    console.log("properties", properties);
    // return getShapeStyleFuction(style, properties)
    return {
      ...style,
      ...properties
    }
  }

  getTextStyle () {
    const style = super.getTextStyle()
    const properties = this.getProperties()
    return getTextStyleFunction(style, properties)
  }
}

const exportObj = {
  type: 'pro-rect',
  view: RectResize.view,
  model: RectNewModel
}

export default exportObj;
