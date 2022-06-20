import React, { createContext, useCallback, useEffect, useState } from 'react';
import LogicFlow, { BaseEdgeModel, BaseNodeModel } from '@logicflow/core';
import { Menu } from '@logicflow/extension';
import { DndPanel, SelectionSelect, NodeResize } from '@logicflow/extension';
import ExampleHeader from '../../../components/example-header';
import {
  generateEdgeNodeObject,
  generateNodeObject,
} from '../../../helpers/graphDataHelper';
import { PropertyViewer } from './components/PropertyViewer';
import { PropertyKV } from './config';
import RectNewNode from './nodes/RectNode';

const config = {
  stopScrollGraph: true,
  stopZoomGraph: true,
};

const staticData = {
  nodes: [
    {
      id: 'da0ff604-7f5c-4a73-a3a8-f46e9ba37bc3',
      type: 'circle',
      x: 160,
      y: 80,
      properties: {},
      text: {
        x: 160,
        y: 80,
        value: '开始',
      },
    },
    {
      id: 'cf8ed8a1-d88e-45e4-905e-c5048749588a',
      type: 'circle',
      x: 140,
      y: 690,
      properties: {},
      text: {
        x: 140,
        y: 690,
        value: '结束',
      },
    },
    {
      id: '12b22935-cf7e-4246-90d7-ea1afca988d3',
      type: 'pro-rect',
      x: 330,
      y: 80,
      properties: {
        stroke: '#0444d7',
        strokeWidth: '5',
        fill: '#60ff0a',
      },
      text: {
        x: 330,
        y: 80,
        value: '第一步',
      },
    },
    {
      id: '94797172-9a0c-4743-8784-3451bb44a6c5',
      type: 'diamond',
      x: 330,
      y: 240,
      properties: {},
      text: {
        x: 330,
        y: 240,
        value: '完成？',
      },
    },
    {
      id: 'cdc7acbe-f514-4031-92a4-cbc1a2ed334f',
      type: 'pro-rect',
      x: 610,
      y: 240,
      properties: {
        strokeWidth: '3',
      },
      text: {
        x: 610,
        y: 240,
        value: '第二步1',
      },
    },
    {
      id: 'b1a47575-cb08-4dd0-84e6-ff153348e364',
      type: 'pro-rect',
      x: 610,
      y: 400,
      properties: {},
      text: {
        x: 610,
        y: 400,
        value: '第三步',
      },
    },
    {
      id: 'f13dfb6d-49a0-4be6-ab11-63d7414ca78f',
      type: 'pro-rect',
      x: 610,
      y: 560,
      properties: {},
      text: {
        x: 610,
        y: 560,
        value: '第四步',
      },
    },
    {
      id: 'a3aeaa23-756a-4217-a95f-c9eb69541a58',
      type: 'pro-rect',
      x: 330,
      y: 400,
      properties: {},
      text: {
        x: 330,
        y: 400,
        value: '第二步2',
      },
    },
  ],
  edges: [
    {
      id: '1d9e6d6c-16bb-4226-b1f9-0385f3d80c93',
      type: 'polyline',
      sourceNodeId: 'da0ff604-7f5c-4a73-a3a8-f46e9ba37bc3',
      targetNodeId: '12b22935-cf7e-4246-90d7-ea1afca988d3',
      startPoint: {
        x: 210,
        y: 80,
      },
      endPoint: {
        x: 280,
        y: 80,
      },
      properties: {},
      pointsList: [
        {
          x: 210,
          y: 80,
        },
        {
          x: 280,
          y: 80,
        },
      ],
    },
    {
      id: 'c16dd01c-9bbc-47cf-b3c7-1c21390eb0b7',
      type: 'polyline',
      sourceNodeId: '12b22935-cf7e-4246-90d7-ea1afca988d3',
      targetNodeId: '94797172-9a0c-4743-8784-3451bb44a6c5',
      startPoint: {
        x: 330,
        y: 120,
      },
      endPoint: {
        x: 330,
        y: 190,
      },
      properties: {},
      pointsList: [
        {
          x: 330,
          y: 120,
        },
        {
          x: 330,
          y: 190,
        },
      ],
    },
    {
      id: '8889e179-1cbd-4301-b26b-4c727a3c7d79',
      type: 'polyline',
      sourceNodeId: '94797172-9a0c-4743-8784-3451bb44a6c5',
      targetNodeId: 'cdc7acbe-f514-4031-92a4-cbc1a2ed334f',
      startPoint: {
        x: 360,
        y: 240,
      },
      endPoint: {
        x: 560,
        y: 240,
      },
      properties: {},
      text: {
        x: 450.0057067871094,
        y: 240,
        value: '是',
      },
      pointsList: [
        {
          x: 360,
          y: 240,
        },
        {
          x: 560,
          y: 240,
        },
      ],
    },
    {
      id: '4cc100c4-35fc-4dd5-a492-6c70a9caaf11',
      type: 'polyline',
      sourceNodeId: '94797172-9a0c-4743-8784-3451bb44a6c5',
      targetNodeId: 'a3aeaa23-756a-4217-a95f-c9eb69541a58',
      startPoint: {
        x: 330,
        y: 290,
      },
      endPoint: {
        x: 330,
        y: 360,
      },
      properties: {},
      text: {
        x: 330,
        y: 327.0767059326172,
        value: '否',
      },
      pointsList: [
        {
          x: 330,
          y: 290,
        },
        {
          x: 330,
          y: 360,
        },
      ],
    },
    {
      id: 'c3b445cd-0210-4513-ac14-21c3de18d1cf',
      type: 'polyline',
      sourceNodeId: 'a3aeaa23-756a-4217-a95f-c9eb69541a58',
      targetNodeId: 'cf8ed8a1-d88e-45e4-905e-c5048749588a',
      startPoint: {
        x: 330,
        y: 440,
      },
      endPoint: {
        x: 140,
        y: 640,
      },
      properties: {},
      pointsList: [
        {
          x: 330,
          y: 440,
        },
        {
          x: 330,
          y: 610,
        },
        {
          x: 140,
          y: 610,
        },
        {
          x: 140,
          y: 640,
        },
      ],
    },
    {
      id: 'f22a08f7-35c1-47b7-b259-46c534617b94',
      type: 'polyline',
      sourceNodeId: 'cdc7acbe-f514-4031-92a4-cbc1a2ed334f',
      targetNodeId: 'b1a47575-cb08-4dd0-84e6-ff153348e364',
      startPoint: {
        x: 610,
        y: 280,
      },
      endPoint: {
        x: 610,
        y: 360,
      },
      properties: {},
      pointsList: [
        {
          x: 610,
          y: 280,
        },
        {
          x: 610,
          y: 360,
        },
      ],
    },
    {
      id: '32db923c-1b6a-41f8-9365-0bd644acad04',
      type: 'polyline',
      sourceNodeId: 'b1a47575-cb08-4dd0-84e6-ff153348e364',
      targetNodeId: 'f13dfb6d-49a0-4be6-ab11-63d7414ca78f',
      startPoint: {
        x: 610,
        y: 440,
      },
      endPoint: {
        x: 610,
        y: 520,
      },
      properties: {},
      pointsList: [
        {
          x: 610,
          y: 440,
        },
        {
          x: 610,
          y: 520,
        },
      ],
    },
    {
      id: '8e64e800-a35b-45a2-8a1b-c9f59678046e',
      type: 'polyline',
      sourceNodeId: 'f13dfb6d-49a0-4be6-ab11-63d7414ca78f',
      targetNodeId: 'cf8ed8a1-d88e-45e4-905e-c5048749588a',
      startPoint: {
        x: 610,
        y: 600,
      },
      endPoint: {
        x: 190,
        y: 690,
      },
      properties: {},
      pointsList: [
        {
          x: 610,
          y: 600,
        },
        {
          x: 610,
          y: 690,
        },
        {
          x: 190,
          y: 690,
        },
      ],
    },
  ],
};

interface MenuLogicFlow extends LogicFlow {
  addMenuConfig(config: any): void;
}

const TeachEditContextStatic = {
  config: PropertyKV,
};
export const TeachEditContext = createContext(TeachEditContextStatic);

type TDataWithStyle = {
  data: BaseNodeModel | BaseEdgeModel;
  style: {
    [k: string]: any;
  };
  nodeIns: BaseNodeModel;
};

export default function TeachEdit() {
  const [lf, setLf] = useState<MenuLogicFlow>();
  const [showPropertyViewerFlag, setShowPropertyViewerFlag] = useState(false);
  const [targetNodeOrEdge, setTargetNodeOrEdge] =
    useState<TDataWithStyle | null>(null);
  const handleNodeOrEdgeClick = useCallback(
    (data: TDataWithStyle) => {
      setTargetNodeOrEdge(data);
      setShowPropertyViewerFlag(true);
    },
    [setTargetNodeOrEdge, setShowPropertyViewerFlag],
  );
  useEffect(() => {
    LogicFlow.use(DndPanel);
    LogicFlow.use(SelectionSelect);
    LogicFlow.use(Menu);
    LogicFlow.use(NodeResize);
    const lf = new LogicFlow({
      ...config,
      grid: {
        size: 10,
        type: 'dot',
      },

      container: document.querySelector('#graph') as HTMLElement,
    }) as MenuLogicFlow;
    lf.register(RectNewNode);
    lf.extension.menu.addMenuConfig({
      nodeMenu: [
        {
          text: '节点属性',
          callback(node: any) {
            alert(`
              节点id：${node.id}
              节点类型：${node.type}
              节点坐标：(x: ${node.x}, y: ${node.y})`);
          },
        },
      ],
      edgeMenu: [
        {
          text: '边属性',
          callback(edge: any) {
            alert(`
              边id：${edge.id}
              边类型：${edge.type}
              源节点id：${edge.sourceNodeId}
              目标节点id：${edge.targetNodeId}`);
          },
        },
      ],
      graphMenu: [
        {
          text: '全图菜单',
          callback() {},
        },
      ],
    });
    lf.extension.dndPanel.setPatternItems([
      {
        label: '选区',
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAABGdBTUEAALGPC/xhBQAAAOVJREFUOBGtVMENwzAIjKP++2026ETdpv10iy7WFbqFyyW6GBywLCv5gI+Dw2Bluj1znuSjhb99Gkn6QILDY2imo60p8nsnc9bEo3+QJ+AKHfMdZHnl78wyTnyHZD53Zzx73MRSgYvnqgCUHj6gwdck7Zsp1VOrz0Uz8NbKunzAW+Gu4fYW28bUYutYlzSa7B84Fh7d1kjLwhcSdYAYrdkMQVpsBr5XgDGuXwQfQr0y9zwLda+DUYXLaGKdd2ZTtvbolaO87pdo24hP7ov16N0zArH1ur3iwJpXxm+v7oAJNR4JEP8DoAuSFEkYH7cAAAAASUVORK5CYII=',
        callback: () => {
          lf.openSelectionSelect();
          lf.once('selection:selected', () => {
            lf.closeSelectionSelect();
          });
        },
      },
      {
        type: 'circle',
        text: '开始',
        label: '开始节点',
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAABGdBTUEAALGPC/xhBQAAAnBJREFUOBGdVL1rU1EcPfdGBddmaZLiEhdx1MHZQXApraCzQ7GKLgoRBxMfcRELuihWKcXFRcEWF8HBf0DdDCKYRZpnl7p0svLe9Zzbd29eQhTbC8nv+9zf130AT63jvooOGS8Vf9Nt5zxba7sXQwODfkWpkbjTQfCGUd9gIp3uuPP8bZ946g56dYQvnBg+b1HB8VIQmMFrazKcKSvFW2dQTxJnJdQ77urmXWOMBCmXM2Rke4S7UAW+/8ywwFoewmBps2tu7mbTdp8VMOkIRAkKfrVawalJTtIliclFbaOBqa0M2xImHeVIfd/nKAfVq/LGnPss5Kh00VEdSzfwnBXPUpmykNss4lUI9C1ga+8PNrBD5YeqRY2Zz8PhjooIbfJXjowvQJBqkmEkVnktWhwu2SM7SMx7Cj0N9IC0oQXRo8xwAGzQms+xrB/nNSUWVveI48ayrFGyC2+E2C+aWrZHXvOuz+CiV6iycWe1Rd1Q6+QUG07nb5SbPrL4426d+9E1axKjY3AoRrlEeSQo2Eu0T6BWAAr6COhTcWjRaYfKG5csnvytvUr/WY4rrPMB53Uo7jZRjXaG6/CFfNMaXEu75nG47X+oepU7PKJvvzGDY1YLSKHJrK7vFUwXKkaxwhCW3u+sDFMVrIju54RYYbFKpALZAo7sB6wcKyyrd+aBMryMT2gPyD6GsQoRFkGHr14TthZni9ck0z+Pnmee460mHXbRAypKNy3nuMdrWgVKj8YVV8E7PSzp1BZ9SJnJAsXdryw/h5ctboUVi4AFiCd+lQaYMw5z3LGTBKjLQOeUF35k89f58Vv/tGh+l+PE/wG0rgfIUbZK5AAAAABJRU5ErkJggg==',
      },
      {
        type: 'pro-rect',
        label: '用户任务',
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAEFVwZaAAAABGdBTUEAALGPC/xhBQAAAqlJREFUOBF9VM9rE0EUfrMJNUKLihGbpLGtaCOIR8VjQMGDePCgCCIiCNqzCAp2MyYUCXhUtF5E0D+g1t48qAd7CCLqQUQKEWkStcEfVGlLdp/fm3aW2QQdyLzf33zz5m2IsAZ9XhDpyaaIZkTS4ASzK41TFao88GuJ3hsr2pAbipHxuSYyKRugagICGANkfFnNh3HeE2N0b3nN2cgnpcictw5veJIzxmDamSlxxQZicq/mflxhbaH8BLRbuRwNtZp0JAhoplVRUdzmCe/vO27wFuuA3S5qXruGdboy5/PRGFsbFGKo/haRtQHIrM83bVeTrOgNhZReWaYGnE4aUQgTJNvijJFF4jQ8BxJE5xfKatZWmZcTQ+BVgh7s8SgPlCkcec4mGTmieTP4xd7PcpIEg1TX6gdeLW8rTVMVLVvb7ctXoH0Cydl2QOPJBG21STE5OsnbweVYzAnD3A7PVILuY0yiiyDwSm2g441r6rMSgp6iK42yqroI2QoXeJVeA+YeZSa47gZdXaZWQKTrG93rukk/l2Al6Kzh5AZEl7dDQy+JjgFahQjRopSxPbrbvK7GRe9ePWBo1wcU7sYrFZtavXALwGw/7Dnc50urrHJuTPSoO2IMV3gUQGNg87IbSOIY9BpiT9HV7FCZ94nPXb3MSnwHn/FFFE1vG6DTby+r31KAkUktB3Qf6ikUPWxW1BkXSPQeMHHiW0+HAd2GelJsZz1OJegCxqzl+CLVHa/IibuHeJ1HAKzhuDR+ymNaRFM+4jU6UWKXorRmbyqkq/D76FffevwdCp+jN3UAN/C9JRVTDuOxC/oh+EdMnqIOrlYteKSfadVRGLJFJPSB/ti/6K8f0CNymg/iH2gO/f0DwE0yjAFO6l8JaR5j0VPwPwfaYHqOqrCI319WzwhwzNW/aQAAAABJRU5ErkJggg==',
        className: 'important-node',
      },
      {
        type: 'pro-rect',
        label: '系统任务',
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAEFVwZaAAAABGdBTUEAALGPC/xhBQAAAqlJREFUOBF9VM9rE0EUfrMJNUKLihGbpLGtaCOIR8VjQMGDePCgCCIiCNqzCAp2MyYUCXhUtF5E0D+g1t48qAd7CCLqQUQKEWkStcEfVGlLdp/fm3aW2QQdyLzf33zz5m2IsAZ9XhDpyaaIZkTS4ASzK41TFao88GuJ3hsr2pAbipHxuSYyKRugagICGANkfFnNh3HeE2N0b3nN2cgnpcictw5veJIzxmDamSlxxQZicq/mflxhbaH8BLRbuRwNtZp0JAhoplVRUdzmCe/vO27wFuuA3S5qXruGdboy5/PRGFsbFGKo/haRtQHIrM83bVeTrOgNhZReWaYGnE4aUQgTJNvijJFF4jQ8BxJE5xfKatZWmZcTQ+BVgh7s8SgPlCkcec4mGTmieTP4xd7PcpIEg1TX6gdeLW8rTVMVLVvb7ctXoH0Cydl2QOPJBG21STE5OsnbweVYzAnD3A7PVILuY0yiiyDwSm2g441r6rMSgp6iK42yqroI2QoXeJVeA+YeZSa47gZdXaZWQKTrG93rukk/l2Al6Kzh5AZEl7dDQy+JjgFahQjRopSxPbrbvK7GRe9ePWBo1wcU7sYrFZtavXALwGw/7Dnc50urrHJuTPSoO2IMV3gUQGNg87IbSOIY9BpiT9HV7FCZ94nPXb3MSnwHn/FFFE1vG6DTby+r31KAkUktB3Qf6ikUPWxW1BkXSPQeMHHiW0+HAd2GelJsZz1OJegCxqzl+CLVHa/IibuHeJ1HAKzhuDR+ymNaRFM+4jU6UWKXorRmbyqkq/D76FffevwdCp+jN3UAN/C9JRVTDuOxC/oh+EdMnqIOrlYteKSfadVRGLJFJPSB/ti/6K8f0CNymg/iH2gO/f0DwE0yjAFO6l8JaR5j0VPwPwfaYHqOqrCI319WzwhwzNW/aQAAAABJRU5ErkJggg==',
        cls: 'import_icon',
      },
      {
        type: 'diamond',
        label: '条件判断',
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAAHeEJUAAAAABGdBTUEAALGPC/xhBQAAAvVJREFUOBGNVEFrE0EU/mY3bQoiFlOkaUJrQUQoWMGePLX24EH0IIoHKQiCV0G8iE1covgLiqA/QTzVm1JPogc9tIJYFaQtlhQxqYjSpunu+L7JvmUTU3AgmTfvffPNN++9WSA1DO182f6xwILzD5btfAoQmwL5KJEwiQyVbSVZ0IgRyV6PTpIJ81E5ZvqfHQR0HUOBHW4L5Et2kQ6Zf7iAOhTFAA8s0pEP7AXO1uAA52SbqGk6h/6J45LaLhO64ByfcUzM39V7ZiAdS2yCePPEIQYvTUHqM/n7dgQNfBKWPjpF4ISk8q3J4nB11qw6X8l+FsF3EhlkEMfrjIer3wJTLwS2aCNcj4DbGxXTw00JmAuO+Ni6bBxVUCvS5d9aa04+so4pHW5jLTywuXAL7jJ+D06sl82Sgl2JuVBQn498zkc2bGKxULHjCnSMadBKYDYYHAtsby1EQ5lNGrQd4Y3v4Zo0XdGEmDno46yCM9Tk+RiJmUYHS/aXHPNTcjxcbTFna000PFJHIVZ5lFRqRpJWk9/+QtlOUYJj9HG5pVFEU7zqIYDVsw2s+AJaD8wTd2umgSCCyUxgGsS1Y6TBwXQQTFuZaHcd8gAGioE90hlsY+wMcs30RduYtxanjMGal8H5dMW67dmT1JFtYUEe8LiQLRsPZ6IIc7A4J5tqco3T0pnv/4u0kyzrYUq7gASuEyI8VXKvB9Odytv6jS/PNaZBln0nioJG/AVQRZvApOdhjj3Jt8QC8Im09SafwdBdvIpztpxWxpeKCC+EsFdS8DCyuCn2munFpL7ctHKp+Xc5cMybeIyMAN33SPL3ZR9QV1XVwLyzHm6Iv0/yeUuUb7PPlZC4D4HZkeu6dpF4v9j9MreGtMbxMMRLIcjJic9yHi7WQ3yVKzZVWUr5UrViJvn1FfUlwe/KYVfYyWRLSGNu16hR01U9IacajXPei0wx/5BqgInvJN+MMNtNme7ReU9SBbgntovn0kKHpFg7UogZvaZiOue/q1SBo9ktHzQAAAAASUVORK5CYII=',
      },
      {
        type: 'circle',
        text: '结束',
        label: '结束节点',
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAABGdBTUEAALGPC/xhBQAAA1BJREFUOBFtVE1IVUEYPXOf+tq40Y3vPcmFIdSjIorWoRG0ERWUgnb5FwVhYQSl72oUoZAboxKNFtWiwKRN0M+jpfSzqJAQclHo001tKkjl3emc8V69igP3znzfnO/M9zcDcKT67azmjYWTwl9Vn7Vumeqzj1DVb6cleQY4oAVnIOPb+mKAGxQmKI5CWNJ2aLPatxWa3aB9K7/fB+/Z0jUF6TmMlFLQqrkECWQzOZxYGjTlOl8eeKaIY5yHnFn486xBustDjWT6dG7pmjHOJd+33t0iitTPkK6tEvjxq4h2MozQ6WFSX/LkDUGfFwfhEZj1Auz/U4pyAi5Sznd7uKzznXeVHlI/Aywmk6j7fsUsEuCGADrWARXXwjxWQsUbIupDHJI7kF5dRktg0eN81IbiZXiTESic50iwS+t1oJgL83jAiBupLDCQqwziaWSoAFSeIR3P5Xv5az00wyIn35QRYTwdSYbz8pH8fxUUAtxnFvYmEmgI0wYXUXcCCSpeEVpXlsRhBnCEATxWylL9+EKCAYhe1NGstUa6356kS9NVvt3DU2fd+Wtbm/+lSbylJqsqkSm9CRhvoJVlvKPvF1RKY/FcPn5j4UfIMLn8D4UYb54BNsilTDXKnF4CfTobA0FpoW/LSp306wkXM+XaOJhZaFkcNM82ASNAWMrhrUbRfmyeI1FvRBTpN06WKxa9BK0o2E4Pd3zfBBEwPsv9sQBnmLVbLEIZ/Xe9LYwJu/Er17W6HYVBc7vmuk0xUQ+pqxdom5Fnp55SiytXLPYoMXNM4u4SNSCFWnrVIzKG3EGyMXo6n/BQOe+bX3FClY4PwydVhthOZ9NnS+ntiLh0fxtlUJHAuGaFoVmttpVMeum0p3WEXbcll94l1wM/gZ0Ccczop77VvN2I7TlsZCsuXf1WHvWEhjO8DPtyOVg2/mvK9QqboEth+7pD6NUQC1HN/TwvydGBARi9MZSzLE4b8Ru3XhX2PBxf8E1er2A6516o0w4sIA+lwURhAON82Kwe2iDAC1Watq4XHaGQ7skLcFOtI5lDxuM2gZe6WFIotPAhbaeYlU4to5cuarF1QrcZ/lwrLaCJl66JBocYZnrNlvm2+MBCTmUymPrYZVbjdlr/BxlMjmNmNI3SAAAAAElFTkSuQmCC',
      },
    ]);

    lf.on('node:click', (data) => {
      console.log('data', data);
      console.log(
        'node style ',
        lf.getNodeModelById(data.data.id).getNodeStyle(),
      );
      const targetNode = lf.getNodeModelById(data.data.id);
      handleNodeOrEdgeClick({
        data,
        style: targetNode.getNodeStyle(),
        nodeIns: targetNode,
      });
    });

    lf.on('edge:click', (data) => {
      console.log('data', data);
      handleNodeOrEdgeClick(data);
    });

    lf.on('blank:click', (data) => {
      console.log('graph clicked!', data);
      setShowPropertyViewerFlag(false);
      setTargetNodeOrEdge(null);
    });

    lf.render(staticData);
    setLf(lf);
  }, [setTargetNodeOrEdge, setShowPropertyViewerFlag, handleNodeOrEdgeClick]);
  const exportData = useCallback(() => {
    const logicflow = lf as LogicFlow;
    const graphData = logicflow.getGraphData();
    const graphDataNodeObject = generateNodeObject(graphData);
    const graphDataEdgeSourceNodeObject = generateEdgeNodeObject(
      graphData,
      'sourceNodeId',
    );
    const graphDataEdgeTargetNodeObject = generateEdgeNodeObject(
      graphData,
      'targetNodeId',
    );
    console.log(graphData);
    console.log('graphDataNodeObject', graphDataNodeObject);
    console.log('graphDataEdgeSourceNodeObject', graphDataEdgeSourceNodeObject);
    console.log('graphDataEdgeTargetNodeObject', graphDataEdgeTargetNodeObject);
  }, [lf]);

  return (
    <TeachEditContext.Provider value={TeachEditContextStatic}>
      <ExampleHeader githubPath="/extension/components/dnd-panel/index.tsx" />
      <div>
        <button onClick={exportData}>check</button>
      </div>
      <div id="graph" className="viewport" />
      {targetNodeOrEdge && (
        <PropertyViewer
          nodeIns={targetNodeOrEdge.nodeIns}
          isActive={showPropertyViewerFlag}
          style={targetNodeOrEdge!.style}
          source={targetNodeOrEdge!.data!.data!}
          type={targetNodeOrEdge!.data.BaseType}
        />
      )}
    </TeachEditContext.Provider>
  );
}
