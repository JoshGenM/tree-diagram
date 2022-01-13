import React from 'react';
import Tree from 'react-d3-tree';
import './styles.css';
import rawdata from './data/flatjson.json'

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
      },
    ],
  },
];

var data = rawdata


var newData = { name :"Billing", children : [] },
  levels = ["L1","L2"];

// For each data row, loop through the expected levels traversing the output tree
data.forEach(function(d){
  // Keep this as a reference to the current level
  var depthCursor = newData.children;
  // Go down one level at a time
  levels.forEach(function( property, depth ){

      // Look to see if a branch has already been created
      var index;
      depthCursor.forEach(function(child,i){
          if ( d[property] == child.name ) index = i;
      });
      // Add a branch if it isn't there
      if ( isNaN(index) ) {
          depthCursor.push({ name : d[property], children : []});
          index = depthCursor.length - 1;
      }
      // Now reference the new child array as we go deeper into the tree
      depthCursor = depthCursor[index].children;
      // This is a leaf, so add the last element to the specified branch
      if ( depth === levels.length - 1 ) depthCursor.push({ name : d.model, size : d.size });
  });
});

const containerStyles = {
  width: '100%',
  height: '100vh',
};

const svgNode = {
  shape: 'rect',
  shapeProps: {
    width: '140',
    height: '20',
    y: '-10',
    x: '-10',
    fill: '',
  },
};

const nodeTxt = {
  textAnchor: 'enum',
  x: '10',
  y: '0',
  transform: 'string',
};

class NodeLabel extends React.PureComponent {
  render() {
    const { className, nodeData } = this.props;
    return (
      <div className={className}>
        <h2>{nodeData.name}</h2>
        {nodeData._children && (
          <button>{nodeData._collapsed ? 'Expand' : 'Collapse'}</button>
        )}
      </div>
    );
  }
}

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
      <div style={containerStyles} ref={(tc) => (this.treeContainer = tc)}>
        <Tree
          className="TreeLayout"
          data={newData}
          nodeSvgShape={svgNode}
          translate={{ x: '304', y: '304' }}
          pathFunc="elbow"
          /* this element allows for a node label to be added which can indicate whether the tab is open or closed. */
          // allowForeignObjects
          // nodeLabelComponent={{
          //   render: <NodeLabel className="labelsforNodes" />,
          //   foreignObjectWrapper: { y: -35},
          // }}
          onMouseOver = {}
          textLayout={nodeTxt}
          scaleExtent={{ min: 0.5, max: 1.5 }}
          //   rootNodeClassName="node__root"
          // branchNodeClassName="node__branch"
          // leafNodeClassName="node__leaf"
        />
      </div>
    );
  }
}
