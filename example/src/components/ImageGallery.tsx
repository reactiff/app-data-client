import React from 'react';
// import { useTheme } from '@material-ui/core';
import { Button } from '@material-ui/core';
import ReactImagesViewer from 'react-images-viewer';

// components
import { Div } from './Layout';
import Masonry from './Masonry';

// const DEBUG = false;
export type ImageMetadata = { _filename: string, _id: string };
export type ImageGalleryProps = { 
  images: ImageMetadata[], 
  revision: number, 
  minItemWidth?: number 
};

export default (props: any) => {
  const [viewerOpen, setViewerOpen] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const mutable = React.useRef({ 
    reactImagesViewer: {
      imgs: [],
    },
  }).current;

  const handleOpenViewer = (imageIndex: number) => {
    setCurrentIndex(imageIndex);
    setViewerOpen(true);
  };

  React.useEffect(() => {
    mutable.reactImagesViewer.imgs = props.images.map(
      (img: any) => ({ src: `/api/images/${img['_id']}` })
    );
  }, [props.images, props.revision]);

  return (
    <>
      <Masonry
        items={props.images}
        min={props.minItemWidth || '250px'}
        max="1fr"
        revision={props.revision}
        elementForItem={(image: any, index: number) => {
          return (
            <>
              <Div 
                fill 
                backgroundColor="#8080800d"
                dataProps={{ heightratio: image.height / image.width }}
                backgroundImage={`url("/api/images/${image['_id']}")`}
                backgroundRepeat="no-repeat"
                backgroundPosition="center"
                backgroundSize="cover"
              >
                
                {/* <img
                  key={image['_filename']}
                  alt="Event"
                  src={`/api/images/${image['_id']}`}
                  style={{ width: '100%' }}
                /> */}

                <Button 
                  className="fill"
                  style={{ 
                    cursor: 'hand', 
                    position: 'absolute', 
                    width: '100%', 
                    margin: 0, 
                    padding: 0, 
                  }}
                  onClick={() => handleOpenViewer(index)}
                />
              </Div>
            </>
          );
        }}
      />

      <ReactImagesViewer
        backdropCloseable
        imgs={mutable.reactImagesViewer.imgs}
        currImg={currentIndex}
        isOpen={viewerOpen}
        onClose={() => setViewerOpen(false)}
        onClickNext={() => {
          const newIndex = (currentIndex + 1) % mutable.reactImagesViewer.imgs.length;
          setCurrentIndex(newIndex);
        }}
        onClickPrev={() => {
          let newIndex = (currentIndex - 1);
          if (newIndex < 0) {
            newIndex = mutable.reactImagesViewer.imgs.length - 1;
          }
          setCurrentIndex(newIndex);
        }}
      />
    </>
  );
};
