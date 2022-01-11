import React from "react";
import ReactDOM from "react-dom";
import Tree from "react-d3-tree";
import Popover from "material-ui/Popover";
import Menu from "material-ui/Menu";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import "./styles.css";

const myTreeData = {
  name: "Top Level",
  children: [
    {
      name: "Level 2: A"
    },
    {
      name: "Level 2: B"
    }
  ]
};

class TreeViewer extends React.Component {
  state = {
    open: false
  };
  onRightClick = (node, element) => {
    this.setState({
      open: true,
      anchorEl: element
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false
    });
  };

  prepareTree = node => ({
    ...node,
    children: node.children ? node.children.map(this.prepareTree) : undefined,
    nodeSvgShape: {
      shape: "rect",
      shapeProps: {
        width: 20,
        height: 20,
        x: -10,
        y: -10,
        fill: "red",
        onContextMenu: evt => {
          this.onRightClick(node, evt.currentTarget);
          evt.preventDefault();
        }
      }
    }
  });

  render() {
    return (
      <div className="wrapper">
        <Tree
          data={[this.prepareTree(this.props.data)]}
          translate={{ x: 20, y: 300 }}
        />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
          targetOrigin={{ horizontal: "left", vertical: "top" }}
          onRequestClose={this.handleRequestClose}
        >
          <Menu>
            <MenuItem primaryText="Refresh" />
            <MenuItem primaryText="Help &amp; feedback" />
            <MenuItem primaryText="Settings" />
            <MenuItem primaryText="Sign out" />
          </Menu>
        </Popover>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <MuiThemeProvider>
    <TreeViewer data={myTreeData} />
  </MuiThemeProvider>,
  rootElement
);
