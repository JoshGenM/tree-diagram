import React from 'react';
import Tree from 'react-hierarchy-tree-graph';
import './styles.css';

/* data for the tress diagram */
const debugData = [
  {
    name: 'Parent',
    children: [
      {
        name: 'child 1',
      },
      {
        name: 'child 2',
        children: [{ name: 'leaf' }],
      },
    ],
  },
];

/* this is the styling for the tree nodes*/
const svgSquare = {
  shape: 'rect',
  shapeProps: {
    width: '140',
    height: '20',
    y: '-20',
    x: '-10',
  },
};

/* the created class for the tree diagram */
export default class CenteredTree extends React.PureComponent {
  state = {};

  componentDidMount() {
    const dimensions = this.treeContainer.getBoundingClientRect();
    this.setState({
      translate: {
        x: dimensions.width / 2,
        y: dimensions.height / 2,
      },
    });
  }

  render() {
    return (
      <div className="containerStyles" ref={(tc) => (this.treeContainer = tc)}>
        <Tree
          className="TreeLayout"
          data={debugData}
          nodeSvgShape={svgSquare}
        />
      </div>
    );
  }
}
