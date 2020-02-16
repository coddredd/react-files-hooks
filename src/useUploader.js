import { useRef, useCallback, useEffect } from 'react';

/**
 * Hook for uploading files
 * @param onSelectFile Function is called after uploading with uploaded file
 * @param isMultiple Indicator for count of uploaded files
 */
export function useUploader({ onSelectFile, isMultiple } = {}) {

  /**
   * Reference to input
   */
  const inputRef = useRef(null);

  /**
   * Handler for input changes
   */
  const onChange = useCallback(() => {
    if (inputRef && inputRef.current) {
      const { files } = inputRef.current;
      if (files && files.length) {
        const file = files[0];
        if (onSelectFile && typeof onSelectFile === 'function') onSelectFile(isMultiple ? files : file);
      }
    }
  }, [inputRef, onSelectFile]);

  /**
   * Reset input value
   */
  const reset = useCallback(() => {
    if (inputRef && inputRef.current) inputRef.current.value = '';
  }, [inputRef]);

  /**
   * Hook for adding/removing input listener
   */
  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.setAttribute('multiple', isMultiple);
      inputRef.current.addEventListener('change', onChange);
    }
    return () => {
      if (inputRef && inputRef.current) inputRef.current.removeEventListener('change', onChange);
    }
  }, [inputRef, onChange]);

  return {
    uploader: { ref: inputRef },
    reset
  };
}