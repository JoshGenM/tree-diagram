import React from 'react';
import Tree from 'react-d3-tree';

const debugData = [
  {
    name: 'Parent',
    children: [
      {
        name: 'child 1',
      },
      {
        name: 'child 2',
      },
    ],
  },
];

const containerStyles = {
  width: '100%',
  height: '100vh',
};

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
      <div style={containerStyles} ref={(tc) => (this.treeContainer = tc)}>
        <Tree
          data={debugData}
          translate={this.state.translate}
          orientation= {'horizontal'}
          pathFunc= {'step'}
          depthFactor={'80'}
          zoom={'1'}
          transitionDuration = '1000'
          // scaleExtent={'max?:1000; min?:20'}
        />
      </div>
    );
  }
}
