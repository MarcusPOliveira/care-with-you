'use client'
import React, { useCallback } from 'react'

import Image from 'next/image'
import { useDropzone } from 'react-dropzone'

import { convertFileToUrl } from '@/lib/utils'

interface FileUploaderProps {
  files: File[] | undefined
  onChange: (files: File[]) => void
}

export const FileUploader = ({ files, onChange }: FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div {...getRootProps()} className="file-upload">
      <input {...getInputProps()} />
      {files && files.length > 0 ? (
        <Image
          src={convertFileToUrl(files[0])}
          alt="file"
          width={100}
          height={100}
          className="max-h-[400px] overflow-hidden object-cover"
        />
      ) : (
        <>
          <Image
            src="/assets/icons/upload.svg"
            alt="file"
            width={40}
            height={40}
          />
          <div className="file-upload_label">
            <p className="text-14-regular">
              <span className="text-green-500">
                Clique para selecionar um arquivo
              </span>{' '}
              ou arraste e solte um arquivo aqui
            </p>
            <p>SVG, PNG, JPG ou GIF (max 800x400)</p>
          </div>
        </>
      )}
    </div>
  )
}
