import React from 'react';
import { Div, Row } from './Layout';
import str from './util/string';

type PropertyPageProps = {
  data: any,
};

const PropertyPage = (props: PropertyPageProps) => {
  const { data } = props;
  const keys = Object.keys(data)
    .filter(key => !!data[key] || data[key] === 0);
  
  return (
    <>
      {
        keys.map(key => {

          const label = str.camelToSentenceCase(key);

          return (
            <Row key={key} spaced fontSize="0.8rem">
              <Div width="50%" opacity={0.5}>
                { label }
              </Div>
              <Div width="50%">
                {
                  typeof data[key] === 'boolean' ? data[key].toString() : data[key]
                }
              </Div>
            </Row>
          );
        })
      }
    </>
  );
};
export default PropertyPage;
