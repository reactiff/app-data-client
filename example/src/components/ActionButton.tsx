import React, { useState } from 'react';
import clsx from 'clsx';
import { Button, CircularProgress } from '@material-ui/core';
import { Done } from '@material-ui/icons';
import Popover from '@material-ui/core/Popover';
import MuiAlert from '@material-ui/lab/Alert';
import { Div, Col } from './Layout';

import util from './util';
import { useInlineStyle } from './directives';

import api from '../api_dev';

interface IMetaAction {
  polarity: string,
  style: any,
  payload: any,
  onExecute: Function,
  name: string,
};

export default function ActionButton(props: {
  action: IMetaAction;
  entity: any;
}) {
  const {
    action,
    entity,
  } = props;

  const [buttonElement, setButtonElement] = useState<HTMLButtonElement | null>(null);

  const [executing, setExecuting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<any>();
  
  const inline = useInlineStyle(() => {
    const root: any = {
        position: 'relative',
    };
    if (action.style) {
      Object.assign(root, {
        '& .MuiButton-containedPrimary': action.style,
      });
    }
    Object.assign(root['& .MuiButton-containedPrimary'], { border: '2px solid transparent' });
    Object.assign(root, {
      '&.executing .MuiButton-containedPrimary': { opacity: 0.1, filter: 'grayscale(0.8)' },
      '&.success .MuiButton-containedPrimary': { opacity: 0 },
      '&.error .MuiButton-containedPrimary': {
        filter: 'grayscale(0.5)',
      },
      '&.success .success-icon': {
        color: (action.polarity === 'positive' ? 'green' : 'red')
      }
    });
    const snackbarContainer = {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
    };
    return { root, snackbarContainer };
  }, [executing])();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    
    event.stopPropagation();
    event.preventDefault();

    setButtonElement(event.currentTarget);
    setExecuting(true);

    const payload = api.hydrate(action);

    api.perform(action, entity, payload)
    .then(() => {
      setExecuting(false);
      setSuccess(true);
      setError(undefined);
      if (action.onExecute) action.onExecute();
    })
    .catch((reason: any) => {
      setExecuting(false);
      setSuccess(false);
      setError(reason);
    });
  };

  return (
    <Div
      className={clsx(inline.root, { executing, error, success })}
    >
      <Button
        disabled={executing}
        variant="contained"
        color="primary"
        size="small"
        style={{ margin: 0 }}
        onClick={handleClick}
      >
        {util.string.camelToSentenceCase(action.name)}
      </Button>

      {
        executing && 
        <Col 
          fill
          justifyCenter
          alignCenter
        >
          <CircularProgress size={20} />    
        </Col>
      }

      {
        success && 
        <Col 
          fill
          justifyCenter
          alignCenter
        >
          <Done className="success-icon" />
        </Col>
      }
      
      <Popover 
        open={!!error}
        anchorEl={buttonElement}
        onClose={() => {}}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
        }}
      >
        <MuiAlert severity="error" variant="filled">
          {error}
        </MuiAlert>
      </Popover>
    </Div>
  );
}
