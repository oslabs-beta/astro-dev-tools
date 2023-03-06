import React, { useEffect } from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';

// create TS type for panel props

const ElementView = (props) => {
  const { html, handleClick, addIslandData } = props;

  const propsParser = (attribute) => {
    const parsed = JSON.parse(attribute);

    const spreader = (obj) => {
      for (const key in obj) {
        if (Array.isArray(obj[key])) {
          let newVal = obj[key].slice(1);
          obj[key] = newVal[0];
          spreader(obj[key]);
        }
      }
    };

    spreader(parsed);
    return parsed;
  };
  const createTree = (node, id, fontColor = '#F5F5F5') => {
    //Inputs all child elements of current node into array
    const children = Array.from(node.children);

    //Stores ASTRO-ISLAND data in islandData state (from app)
    if (node.nodeName === 'ASTRO-ISLAND') {
      const parsedProps = propsParser(node.attributes.props.value);
      const island = {
        client: node.attributes.client.value,
        props: parsedProps,
      };
      addIslandData(island, id);
      let componentFile = node.attributes['component-url'].value;
      let lastIndex = null;
      for (let i = componentFile.length - 1; i > 0; i--) {
        if (componentFile[i] === '.') lastIndex = i;
        if (componentFile[i] === '/') {
          if (lastIndex) componentFile = componentFile.slice(i + 1, lastIndex);
          else componentFile = componentFile.slice(i + 1);
          break;
        }
      }

      if (children.length === 0) {
        return (
          <TreeItem
            key={id}
            nodeId={id}
            label={`${node.nodeName.toLowerCase()} (${componentFile})`}
            sx={{ color: '#ff7300' }}
          />
        );
      }
      //If node has children, recurse through function with each child node
      return (
        <TreeItem
          key={id}
          nodeId={id}
          label={`${node.nodeName.toLowerCase()}(${componentFile}`}
          sx={{ color: '#ff7300' }}
        >
          {children.map((child, index) =>
            createTree(child, `${id}-${index}`, '#e29353')
          )}
        </TreeItem>
      );
    }
    //If node has no children, return node
    if (children.length === 0) {
      return (
        <TreeItem
          key={id}
          nodeId={id}
          label={`${node.nodeName.toLowerCase()}`}
          sx={{ color: fontColor }}
        />
      );
    }

    //If node has children, recurse through function with each child node
    return (
      <TreeItem
        key={id}
        nodeId={id}
        label={`${node.nodeName.toLowerCase()}`}
        sx={{ color: fontColor }}
      >
        {children.map((child, index) =>
          createTree(child, `${id}-${index}`, fontColor)
        )}
      </TreeItem>
    );
  };

  const treeJSX = createTree(html.body, '0');

  // returns the completed tree
  return (
    <>
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon sx={{ color: '#d5bcef' }} />}
        defaultExpandIcon={<ChevronRightIcon sx={{ color: '#d5bcef' }} />}
        onNodeSelect={handleClick}
        sx={{
          height: '100vh',
          flexGrow: 1,
          width: 'auto',
          overflowY: 'auto',
          fontFamily: 'Roboto mono, monospace',
        }}
      >
        {treeJSX.props.children}
      </TreeView>
    </>
  );
};

export default ElementView;
