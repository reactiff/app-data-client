import React from 'react';

// import NPMHeaderDetails from './NPMHeaderDetails';
// import NPMFooter from './NPMFooter';

// import Dropzone from './components/DropZone';
// import Uploader from './components/Uploader';

import EntityImage from './components/EntityImage';

import api from './api_dev';
import appConfig  from './appConfig';

debugger
api.init(appConfig);

const App = () => {

  // const styles = useMemo(() => ({
  //   // add styles 
  // }), []);

  return (
    <div> 
      <div className="flex column align-center" >
        <h1>@reactiff/app-data-client example</h1>

        <div className="flex column align-center">


          <EntityImage image="main" context={{}} width={600} height={400}/>
              
            
        </div>
        

      </div>
    </div>
  )
}

export default App
