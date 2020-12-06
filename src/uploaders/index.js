import { useUploader } from '../hooks/useUploader';
import { MIME_TYPES } from '../constants';

/** @module Specific Uploaders */

/**
 * Specific uploading config
 * @interface
 * @global
 * @typedef SpecificUploadConfig
 * @property isMultiple {boolean} - Indicator for count of uploaded files. Optional. Default - true
 * @property maxFiles {number} - Limit for maximum selected files. Optional.
 * @property maxSize {number} - Limit for maximum size of file. Optional. Default - 5242880 bytes (5MB)
 */

/**
 * Hook for uploading images
 * @param options {SpecificUploadConfig} - Specific uploading config
 * @return {UploadManager} - Object to manage uploading images
 * @function
 */
export const useImageUploader = (options = {}) => {

    return useUploader({
        ...options,
        validTypes: [MIME_TYPES.IMAGE]
    });

};

/**
 * Hook for uploading videos
 * @param options {SpecificUploadConfig} - Specific uploading config
 * @return {UploadManager} - Object to manage uploading videos
 * @function
 */
export const useVideoUploader = (options = {}) => {

    return useUploader({
        ...options,
        validTypes: [MIME_TYPES.VIDEO]
    });

};

/**
 * Hook for uploading media files (videos and images)
 * @param options {SpecificUploadConfig} - Specific uploading config
 * @return {UploadManager} - Object to manage uploading media files
 * @function
 */
export const useMediaUploader = (options = {}) => {

    return useUploader({
        ...options,
        validTypes: [MIME_TYPES.VIDEO, MIME_TYPES.IMAGE]
    });

};

/**
 * Hook for uploading audio files
 * @param options {SpecificUploadConfig} - Specific uploading config
 * @return {UploadManager} - Object to manage uploading audio files
 * @function
 */
export const useAudioUploader = (options = {}) => {

    return useUploader({
        ...options,
        validTypes: [MIME_TYPES.AUDIO]
    });

};

/**
 * Hook for uploading PDF files
 * @param options {SpecificUploadConfig} - Specific uploading config
 * @return {UploadManager} - Object to manage uploading PDF files
 * @function
 */
export const usePDFUploader = (options = {}) => {

    return useUploader({
        ...options,
        validTypes: [MIME_TYPES.PDF]
    });

};

/**
 * Hook for uploading JSON files
 * @param options {SpecificUploadConfig} - Specific uploading config
 * @return {UploadManager} - Object to manage uploading JSON files
 * @function
 */
export const useJSONUploader = (options = {}) => {

    return useUploader({
        ...options,
        validTypes: [MIME_TYPES.JSON]
    });

};

/**
 * Hook for uploading binary files
 * @param options {SpecificUploadConfig} - Specific uploading config
 * @return {UploadManager} - Object to manage uploading binary files
 * @function
 */
export const useBinaryUploader = (options = {}) => {

    return useUploader({
        ...options,
        validTypes: [MIME_TYPES.BINARY]
    });

};

/**
 * Hook for uploading text files
 * @param options {SpecificUploadConfig} - Specific uploading config
 * @return {UploadManager} - Object to manage uploading text files
 * @function
 */
export const useTextUploader = (options = {}) => {

    return useUploader({
        ...options,
        validTypes: [MIME_TYPES.TEXT]
    });

};

/**
 * Hook for uploading fonts
 * @param options {SpecificUploadConfig} - Specific uploading config
 * @return {UploadManager} - Object to manage uploading fonts
 * @function
 */
export const useFontUploader = (options = {}) => {

    return useUploader({
        ...options,
        validTypes: [MIME_TYPES.FONT]
    });

};

/**
 * Hook for uploading models
 * @param options {SpecificUploadConfig} - Specific uploading config
 * @return {UploadManager} - Object to manage uploading models
 * @function
 */
export const useModelUploader = (options = {}) => {

    return useUploader({
        ...options,
        validTypes: [MIME_TYPES.MODEL]
    });

};

/**
 * Hook for uploading form-data
 * @param options {SpecificUploadConfig} - Specific uploading config
 * @return {UploadManager} - Object to manage uploading form-data
 * @function
 */
export const useFormDataUploader = (options = {}) => {

    return useUploader({
        ...options,
        validTypes: [MIME_TYPES.FORM_DATA]
    });

};

/**
 * Hook for uploading Microsoft Word files
 * @param options {SpecificUploadConfig} - Downloading config
 * @return {UploadManager} - Object to manage uploading Microsoft Word files
 * @function
 */
export const useMSWordUploader = (options = {}) => {

    return useUploader({
        ...options,
        validTypes: [MIME_TYPES.MS_WORD]
    });

};

/**
 * Hook for uploading Microsoft Excel files
 * @param options {SpecificUploadConfig} - Downloading config
 * @return {UploadManager} - Object to manage uploading Microsoft Word files
 * @function
 */
export const useMSExcelUploader = (options = {}) => {

    return useUploader({
        ...options,
        validTypes: [MIME_TYPES.MS_EXCEL]
    });

};

/**
 * Hook for uploading ZIP archive
 * @param options {SpecificUploadConfig} - Downloading config
 * @return {UploadManager} - Object to manage uploading ZIP archive
 * @function
 */
export const useZIPUploader = (options = {}) => {

    return useUploader({
        ...options,
        validTypes: [MIME_TYPES.ZIP]
    });

};
