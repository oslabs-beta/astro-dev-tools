import React, { useEffect } from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const ComponentView = (props) => {
  const { componentData, handleToggle, expanded, handleClick } = props;
  return (
    <>
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon sx={{ color: '#d5bcef' }} />}
        defaultExpandIcon={<ChevronRightIcon sx={{ color: '#d5bcef' }} />}
        onNodeSelect={handleClick}
        onNodeToggle={handleToggle}
        expanded={expanded}
        sx={{
          height: '100vh',
          flexGrow: 1,
          width: 'auto',
          overflowY: 'auto',
          fontFamily: 'Roboto mono, monospace',
        }}
      >
        {componentData}
      </TreeView>
    </>
  );
};

export default ComponentView;
