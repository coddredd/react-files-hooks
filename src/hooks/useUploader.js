import { useRef, useCallback, useEffect, MutableRefObject } from 'react';

import { errorMessages } from '../constants';

/** @module Uploader */

/**
 * Object for inserting to html element
 * @interface
 * @typedef {{ref: MutableRefObject<HTMLInputElement>}} RefContainer
 * @property {MutableRefObject<HTMLInputElement>} ref - Reference to html element.
 */

/**
 * Object to manage uploading files
 * @interface
 * @typedef {{uploader: RefContainer, reset: function}} UploadManager
 * @property {RefContainer} uploader - Object for inserting to html element.
 * @property {function} reset - Function to reset value of input.
 */

/**
 * Hook for uploading files
 * @param onSelectFile {function} - Function is called after uploading with uploaded file
 * @param onError {function} - Function is called after failed downloading
 * @param isMultiple {boolean} - Indicator for count of uploaded files
 * @param maxFiles {number} - Limit for maximum selected files
 * @param maxSize {number} - Limit for maximum size of file
 * @param validTypes {Array<string>} - Set of valid types for files
 * @return {UploadManager} - Object to manage uploading files
 * @function
 */
export function useUploader({ onSelectFile, onError, isMultiple = true, maxFiles, maxSize, validTypes } = {}) {

  /**
   * Reference to input
   */
  const inputRef = useRef(null);

  /**
   * Reset input value
   */
  const reset = useCallback(() => {
    if (inputRef.current) inputRef.current.value = '';
  }, [inputRef]);

  /**
   * Handle error
   */
  const handleError = useCallback((message) => {
    reset();
    if (onError && typeof onError === 'function') return onError(new Error(message));
  }, [onError, reset]);

  /**
   * Check validity of files
   */
  const isInvalidType = useCallback(files => {
    if (validTypes) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!validTypes.find(type => file.type === type)) return file;
      }
    }
  }, [validTypes]);

  /**
   * Check max size of files
   */
  const isMaxSize = useCallback(files => {
    if (maxSize) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.size > maxSize) return file;
      }
    }
  }, [maxSize]);

  /**
   * Handler for input changes
   */
  const onChange = useCallback(() => {
    const { files } = inputRef.current;
    if (files && files.length) {
      if (files.length > maxFiles) return handleError(errorMessages.amount + maxFiles);
      const fileWithMaxSize = isMaxSize(files);
      if (fileWithMaxSize) return handleError(fileWithMaxSize.name + errorMessages.size + maxSize);
      const fileWithInvalidType = isInvalidType(files);
      if (fileWithInvalidType) return handleError(fileWithInvalidType.name + errorMessages.type + fileWithInvalidType.type);
      const file = files[0];
      if (onSelectFile && typeof onSelectFile === 'function') return onSelectFile(isMultiple ? files : file);
    } else return handleError(errorMessages.existingFile);
  }, [inputRef, onSelectFile, isMultiple, handleError, isInvalidType, isMaxSize, maxFiles, maxSize]);

  /**
   * Hook for adding/removing input listener
   */
  useEffect(() => {
    const element = inputRef.current;
    if (element) {
      element.setAttribute('multiple', isMultiple);
      element.setAttribute('type', 'file');
      element.addEventListener('change', onChange);
    }
    return () => {
      if (element) element.removeEventListener('change', onChange);
    };
  }, [inputRef, onChange, isMultiple]);

  return {
    uploader: { ref: inputRef },
    reset
  };
}