import React from 'react';
import clsx from 'clsx';
import { CircularProgress, Typography } from '@material-ui/core';
import { default as ReactDropzoneUploader } from 'react-dropzone-uploader';
import 'react-dropzone-uploader/dist/styles.css';
import context from './contexts';
import { useInlineStyle } from './directives';
import inline from './util/logic';
import MapReduceObject from './util/mapReduceObject';
import { Div, Row, Col } from './Layout';

import api from '../api_dev';

type ProgressSetter = (value: number, text?: string) => void;
type LoadParams = { progressSetter: ProgressSetter };
type CircularProgressWithLabelProps = { 
  size: number, 
  onLoad: (params: LoadParams) => void, 
  value? :number 
};

const CircularProgressWithLabel = (props: CircularProgressWithLabelProps) => {
  const [progress, setProgress] = React.useState(0);
  const mutable = React.useRef<any>({
    value: 0,
    text: undefined,
    ticking: false, 
    progressSetter: (value: number, text?: string) => {
      mutable.value = value;
      mutable.text = text;
      mutable.throttleUpdates();
    },
    throttleUpdates: () => {
      if (mutable.ticking) return;
      setTimeout(() => {
        setProgress(Math.round(Math.max(Math.min(mutable.value * 100), 0)));
        mutable.ticking = false;
      }, 1000 / 15);
      mutable.ticking = true;
    }
  }).current;

  React.useEffect(() => {
    if (!props.value) {
      props.onLoad({ progressSetter: mutable.progressSetter });
    }
  }, []);

  // REMOVE
  React.useEffect(() => {
    if (props.value) {
      mutable.progressSetter(props.value, 'Uploading 5 files');
    }
  }, []);

  return (
    <Col fill justifyCenter alignCenter>
      <Div relative>
        <CircularProgress 
          variant="determinate" 
          size={props.size} 
          value={progress} 
        />
        <Row 
          fill 
          justifyCenter 
          alignCenter 
          fontSize="0.8rem" 
          height={props.size}
          top={1}
        >
          {`${progress}%`}
        </Row>
      </Div>
      {
        mutable.text &&
        <Typography variant="body1">
          {mutable.text}
        </Typography>
      }
    </Col>
  );
};

const Dropzone = (props: any) => {
  const entityContext = React.useContext(context.entity);
  const [uploading, setUploading] = React.useState(false);
  const mutable = React.useRef<any>({
    mro: new MapReduceObject({}), 
    ticking: false,
    setProgress: null,
    throttleSetProgress: () => {
      if (mutable.ticking) return;
      mutable.ticking = true;
      window.requestAnimationFrame(() => {
        const mro: MapReduceObject = mutable.mro;
        const count = mro.count();
        const total = mro.sum(v => v.total);
        const loaded = mro.sum(v => v.loaded);
        const overall = total > 0 ? loaded / total : 0;
        if (mutable.setProgress) {
          mutable.setProgress(
            overall, 
            inline.switch(  
              null, 
              () => `${count} files remaining`, 
              () => overall === 1, 'Done!',
            )
          );
        }
        setUploading(count > 0);
        mutable.ticking = false;
      });
    },
  }).current;

  const getUploadParams = (file: any) => {
    debugger;
    console.log(file);
    const url = `/api/images/upload/${entityContext.entityType.name}/${entityContext.entityId}/${props.folder || ''}`;
    return { url };
  };
  
  const handleChangeStatus = (data: any, status: any) => {
    inline.switch(
      status, 
      api.noOp,
      'uploading', () => {
        data.xhr.upload.onprogress = (p: { total: number, loaded: number }) => {
          if (mutable.value > 0.23) return;
          mutable.mro.object[data.meta.id as string] = { 
            total: p.total,
            loaded: p.loaded,
          };
          if (p.loaded === p.total) {
            setTimeout(() => {
              data.remove();
              delete mutable.mro.object[data.meta.id as string];
              mutable.throttleSetProgress();
            }, 2000);
          }
          mutable.throttleSetProgress();
        };
      },
    );
  };

  const classes = useInlineStyle({
    root: {
      position: 'relative',
      '& .dzu-dropzone': {
        border: 'none',
        overflow: 'unset',
        justifyContent: 'center',
        '& .dzu-inputLabel': {
          color: 'inherit',
        },
        '& .dzu-inputLabelWithFiles': {
          alignSelf: 'unset',
          backgroundColor: 'unset',
          color: 'inherit',
          marginTop: 'unset',
          marginLeft: 'unset',
        },
        '& .dzu-previewContainer': {
          display: 'none',
        },
      },
      '&.uploading .dzu-inputLabel': {
        color: 'inherit',
        display: 'none',
      },
    },
  }, [])();

  return (
    <div className={clsx(classes.root, { uploading })}>
      <ReactDropzoneUploader
        autoUpload
        multiple
        maxSizeBytes={1024 * 5000}
        getUploadParams={getUploadParams}
        onChangeStatus={handleChangeStatus}
        accept="image/*"
        inputContent="Drop Photos Here"
        inputWithFilesContent={null}
      />
      {
        uploading && 
        <CircularProgressWithLabel 
          size={50} 
          onLoad={(params) => {
            mutable.setProgress = params.progressSetter;
          }} 
        />
      }
    </div>
  );
};

export default Dropzone;
