import React, { useState, ReactNode } from 'react';
import { Button } from '@material-ui/core'

import api from '../api_dev';

type UploaderProps = {
    entity?: any,
    onUpload?: Function,
    button?: ReactNode,
    multiple?: boolean,
    imageName?: string,
};

export default (props: UploaderProps) => {
        
    const [error, setError] = useState<string>();
    const [files, setFiles] = useState([]);
    
    const handleUpload = async () => {

        const formData = new FormData()

        if (props.imageName) {
            formData.append('name', props.imageName);
        }
        

        for (let file of files) {
            formData.append('file', file);
            if (!props.multiple) break;
        }

        try {
            await api.images.upload(formData, props.entity);
            if (props.onUpload){
                //handle the first time a logged on user uploads a picture
                // TODO make this work
                // if(props.entity.id === identity.profile.id && !identity.profile.hasImages) {
                //     sessionStorage.setItem('hasImages-' + identity.profile.id, 'true')
                // }
                props.onUpload()
            }
        }
        catch(ex) {
            setError(ex.message);
        }
    }
    
    const inputProps = {
        type: "file",
        name: "file", 
        // formEncType: "multipart/form-data",
        multiple: props.multiple ? true : undefined,
        title: error ? error : undefined,
        style: error ? { borderColor: 'red' } : undefined,
    };

    return <>
        <input 
            {...inputProps}
            onChange={(e: any) => setFiles(Array.from(e.target.files))} 
        /> 
    
        <Button variant="contained" color="primary" onClick={handleUpload}>
            {props.multiple ? 'Upload images' : 'Upload an image'}
        </Button>
    </>
  
}

