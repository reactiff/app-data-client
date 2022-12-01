import React, { ReactNode, ReactElement } from 'react';
import Drawer from '@material-ui/core/Drawer';

type Anchor = 'top' | 'left' | 'bottom' | 'right';
type PropsType = {
  anchor: Anchor;
  open?: boolean;
  button?: ReactElement;
  onOpen?: Function;
  onClose?: Function;
  children?: ReactNode;
};

export default (props: PropsType) => {
  const [open, setOpen] = React.useState(false);
  const [closed, setClosed] = React.useState<boolean|undefined>();

  const externallyControlled = typeof props.open !== 'undefined';
  const drawerOpen = !closed && (externallyControlled ? props.open : open);

  const toggleDrawer = (open: boolean) => () => {
    setOpen(open);
    if (!open) {
      setClosed(true);
    }
    if (open && props.onOpen) props.onOpen();
    if (!open && props.onClose) props.onClose();      
  };

  return (
    <>
      {
        props.button && !drawerOpen &&
        React.cloneElement(props.button, {
          onClick: toggleDrawer(true)
        })
      }
      <Drawer 
        anchor={props.anchor} 
        open={drawerOpen} 
        onClose={toggleDrawer(false)}
      >
        {
          !closed &&
          drawerOpen && 
          props.children
        }
      </Drawer>
    </>
  );
};
