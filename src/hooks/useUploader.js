import { useRef, useEffect, MutableRefObject } from 'react';

import { errorMessages, defaultUploadConfig } from '../constants';

const { defaultIsMultiple, defaultMaxSize } = defaultUploadConfig;

/** @module Uploader */

/**
 * Object for inserting to html element
 * @interface
 * @global
 * @typedef UploadRefContainer
 * @property {MutableRefObject<HTMLInputElement>} ref - Reference to html element.
 */

/**
 * Object to manage uploading files
 * @interface
 * @global
 * @typedef UploadManager
 * @property {UploadRefContainer} uploader - Object for inserting to html element.
 * @property {function} reset - Function to reset value of input.
 */

/**
 * Uploading config
 * @interface
 * @global
 * @typedef UploadConfig
 * @property onSelectFile {function} - Function is called after uploading with uploaded file. Required
 * @property onError {function} - Function is called after failed downloading. Optional
 * @property isMultiple {boolean} - Indicator for count of uploaded files. Optional. Default - true
 * @property maxFiles {number} - Limit for maximum selected files. Optional.
 * @property maxSize {number} - Limit for maximum size of file. Optional. Default - 5242880 bytes (5MB)
 * @property validTypes {Array<string>} - Set of valid types for files. Optional.
 */

/**
 * Hook for uploading files
 * @param config {UploadConfig} - Uploading config.
 * @return {UploadManager} - Object to manage uploading files.
 * @function
 */
export function useUploader(
    { onSelectFile, onError, isMultiple = defaultIsMultiple, maxFiles, maxSize = defaultMaxSize, validTypes } = {}
) {

    /**
     * Reference to input
     */
    const inputRef = useRef(null);

    /**
     * Reset input value
     */
    const reset = () => {
        if (inputRef.current) inputRef.current.value = '';
    };

    /**
     * Handle error
     */
    const handleError = (message) => {
        reset();
        const error = new Error(message);
        if (onError && typeof onError === 'function') {
            return onError(new Error(message));
        }
    };

    /**
     * Check validity of files
     */
    const isInvalidType = files => {
        if (validTypes) {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (!validTypes.find(type => file.type.includes(type))) return file;
            }
        }
    };

    /**
     * Check max size of files
     */
    const isMaxSize = files => {
        if (maxSize) {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (file.size > maxSize) return file;
            }
        }
    };

    /**
     * Handler for input changes
     */
    const onChange = () => {
        const { files } = inputRef.current;
        if (files && files.length) {
            if (maxFiles && files.length > maxFiles) {
                return handleError(errorMessages.amount + maxFiles);
            }
            const fileWithMaxSize = isMaxSize(files);
            if (fileWithMaxSize) {
                return handleError(fileWithMaxSize.name + errorMessages.size + maxSize);
            }
            const fileWithInvalidType = isInvalidType(files);
            if (fileWithInvalidType) {
                return handleError(fileWithInvalidType.name + errorMessages.type + fileWithInvalidType.type);
            }
            const file = files[0];
            if (onSelectFile && typeof onSelectFile === 'function') {
                return onSelectFile(isMultiple ? files : file);
            }
        } else {
            return handleError(errorMessages.existingFile);
        }
    };

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
    }, [inputRef, isMultiple]); // eslint-disable-line

    return {
        uploader: { ref: inputRef },
        reset
    };

}
