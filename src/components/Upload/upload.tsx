import React, { ChangeEvent, FC, useRef, useState } from 'react'
import axios from 'axios'
import UploadList from './uploadList'
import Drag from './dragger'
export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'

export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status?: UploadFileStatus;
  percent?: number;
  raw?: File;
  response?: any;
  error?: any;
}

export interface UploadProps {
  action: string;
  defaultFileList?: UploadFile[];
  beforeUpload?: (file: File) => boolean | Promise<File>;
  onProgress?: (percentage: number, file: File) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (err:any, file: File) => void;
  onchange?: (file: File) => void;
  onRemove?: (file: UploadFile) => void;
  header?: {[key:string]: any};
  name?: string;
  data?: {[key: string]: any};
  withCredentials?: boolean;
  accept?: string,
  multiple?: boolean,
  drag?: boolean;
}

const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    defaultFileList,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onchange,
    onRemove,
    name,
    data,
    header,
    withCredentials,
    accept,
    children,
    multiple,
    drag,
  } = props
  const fileInput = useRef<HTMLInputElement>(null)
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList ||[])
  console.log(fileList)
  const updateFileList = (uploadFiles: UploadFile, uploadObj : Partial<UploadFile>) => {
      setFileList((prevList) => {
        return prevList.map((file) => {
          if(file.uid === uploadFiles.uid){
            return {...file,...uploadObj}
          }else{
            return file
          }
        })
      })
  }
  const handleClick = ()=> {
    if(fileInput.current){
      fileInput.current.click()
    }
  }
  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) => {
      return prevList.filter(item => item.uid !== file.uid)
    })
    if(onRemove){
      onRemove(file)
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
    let _file: UploadFile = {
      uid: Date.now() + 'upload-file',
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file
    }

    // setFileList([_file,...fileList])
    setFileList(prevList => {
      return [_file, ...prevList]
    })
    const formData = new FormData()
    formData.append(name || 'file',file)
    if(data){
      Object.keys(data).forEach(key => {
        formData.append(key,data[key])
      })
    }
    axios.post(action,formData, {
      headers: {
        ...header,
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: withCredentials,
      onUploadProgress: (e) => {
        let percentage = Math.round((e.loaded * 100)/ e.total) || 0
        if(percentage < 100){
          updateFileList(_file, {percent: percentage, status: 'uploading'})
          if(onProgress){
            onProgress(percentage, file)
          }
        }
      }
    }).then(resp => {
      // console.log(resp)
      updateFileList(_file, {status: 'success',response: resp.data})
      if(onSuccess){
        onSuccess(resp.data,file)
      }
      if(onchange){
        onchange(file)
      }
    }).catch(err => {
      // console.error(err)
      updateFileList(_file,{status: 'error', error: err})
      if(onError){
        onError(err, file)
      }
      if(onchange){
        onchange(file)
      }
    })
  }
  return (
    <div className="stepup-upload-component">
     <div className="stepup-upload-input"
          style={{display: 'inline-block'}}
          onClick={handleClick}>
           {
             drag ? <Drag onFile={(files) => {uploadFiles(files)}}>
               {children}
             </Drag>
             : {children}
           }
        <input 
          ref={fileInput}
          type="file" 
          className="stepup-file-input" 
          onChange={handleFileChange}
          style={{display: 'none'}}
          accept={accept}
          multiple={multiple}
          />
          </div>
      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  )
}

Upload.defaultProps = {
  name: 'file'
}

export default Upload