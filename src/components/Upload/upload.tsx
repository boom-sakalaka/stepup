import React, { ChangeEvent, FC, useRef } from 'react'
import axios from 'axios'

import Button,{ButtonType} from '../Button/button'

export interface UploadProps {
  action: string;
  beforeUpload?: (file: File) => boolean | Promise<File>;
  onProgress?: (percentage: number, file: File) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (err:any, file: File) => void;
  onchange?: (file: File) => void;
}

const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onchange
  } = props

  const handleClick = ()=> {
    if(fileInput.current){
      fileInput.current.click()
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if(!files){
      return
    }
    uploadFiles(files)
    if(fileInput.current){
      fileInput.current.value = ''
    }
  }
  const uploadFiles = (files : FileList) => {
    let postFiles = Array.from(files)
    postFiles.forEach(file => {
      if(!beforeUpload){
        post(file)
      }else{
        const result = beforeUpload(file)
        if(result && result instanceof Promise){
          result.then(processedFile => {
            post(processedFile)
          })
        }else if(result !== false){
          post(file)
        }
      }
    })
  }
  const post = (file: File) => {
    const formData = new FormData()
    formData.append(file.name,file)
    axios.post(action,formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (e) => {
        let percentage = Math.round((e.loaded * 100)/ e.total) || 0
        if(percentage < 100){
          if(onProgress){
            onProgress(percentage, file)
          }
        }
      }
    }).then(resp => {
      console.log(resp)
      if(onSuccess){
        onSuccess(resp.data,file)
      }
      if(onchange){
        onchange(file)
      }
    }).catch(err => {
      console.error(err)
      if(onError){
        onError(err, file)
      }
      if(onchange){
        onchange(file)
      }
    })
  }
  const fileInput = useRef<HTMLInputElement>(null)
  return (
    <div className="stepup-upload-component">
      <Button 
        btnType={ButtonType.Primary}
        onClick={handleClick}
      >Upload File</Button>
      <input 
        ref={fileInput}
        type="file" 
        className="stepup-file-input" 
        onChange={handleFileChange}
        style={{display: 'none'}}
        />
    </div>
  )
}

export default Upload