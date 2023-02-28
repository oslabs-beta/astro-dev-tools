import React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';

// create TS type for panel props

const Panel = (props) => {
  const { body, handleClick } = props;
  const treeArray = [
    <TreeItem nodeId='99' label={'test-parent'}>
      <TreeItem nodeId='98' label={'test-child'} />
    </TreeItem>,
  ];
  // creates treewalker for window DOM (not correct document)
  console.log('this is the body in panel', body);
  const walker = body.createTreeWalker(body, NodeFilter.SHOW_ELEMENT);

  // array of parent level tree components

  // fills treeArray with HTML elements from document
  const treeMaker = (node = walker.nextNode(), counter = 10) => {
    // once branch (or whole tree) is complete, return
    if (!node) return;
    const elem = <TreeItem nodeId={counter.toString()} label={node.tagName} />;

    // // if elem has child, make new array, within array
    // if (node.hasChildNodes()) {
    //   // return
    //   const parent = (
    //     <TreeItem nodeId={counter} label={node.tagName}>
    //       // do something recursive
    //     </TreeItem>
    //   );
    // } else {
    //   const elem = <TreeItem nodeId={counter} label={node.tagName} />;
    // }

    // else if elem does not contain child, move

    treeArray.push(elem);
    //
    treeMaker(walker.nextNode(), ++counter);
  };

  treeMaker(walker.nextNode());
  // returns the completed tree
  return (
    <TreeView
      aria-label='file system navigator'
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      onNodeSelect={handleClick}
      sx={{
        height: 240,
        flexGrow: 1,
        maxWidth: 400,
        overflowY: 'auto',
        fontFamily: 'Roboto mono, monospace',
      }}
    >
      <TreeItem nodeId='1' label='A'>
        <TreeItem nodeId='2' label='A1' />
      </TreeItem>
      <TreeItem nodeId='5' label='B'>
        <TreeItem nodeId='10' label='B1' />
        <TreeItem nodeId='6' label='B2'>
          <TreeItem nodeId='A1' label='B2A' sx={{ color: '#ff7300' }} />
        </TreeItem>
      </TreeItem>
    </TreeView>
  );
};

// displays tree
// must import MUI tree components

export default Panel;
