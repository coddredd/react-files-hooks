import { useDownloader } from '../hooks/useDownloader';
import { MIME_TYPES } from '../constants';

/** @module Specific Downloaders */

/**
 * Specific manual downloading config
 * @interface
 * @global
 * @typedef SpecificManualDownloadConfig
 * @property data {string|Object} - Downloaded data. Required.
 * @property name {string} - Name of downloaded data. Optional. Default - "file"
 */

/**
 * Specific function to download file
 * @interface
 * @global
 * @typedef {function} SpecificDownloadFn
 * @param config {SpecificManualDownloadConfig} Specific manual downloading config
 * @return {Promise<void>} Promises resolves after downloading file.
 */

/**
 * Specific object to manage downloading files
 * @interface
 * @global
 * @typedef SpecificDownloadManager
 * @property {DownloadRefContainer} downloader - Object for inserting to html element.
 * @property {SpecificDownloadFn} download - Specific function to download file.
 */

/**
 * Specific downloading config
 * @interface
 * @global
 * @typedef SpecificDownloadConfig
 * @property data {string|Object} - Downloaded data. Required.
 * @property name {string} - Name of downloaded data. Optional. Default - "file"
 * @property event {string} - Event that triggers downloading. Optional. Default - "click"
 */

/**
 * Hook for downloading bmp images
 * @param options {SpecificDownloadConfig} - Specific downloading config
 * @return {SpecificDownloadManager} - Object to manage downloading bmp images
 * @function
 */
export const useBMPDownloader = (options = {}) => {

    const result = useDownloader({
        ...options,
        type: MIME_TYPES.BMP
    });

    return {
        ...result,
        download: (config) => result.download({ ...config, type: MIME_TYPES.BMP })
    };

};

/**
 * Hook for downloading gif images
 * @param options {SpecificDownloadConfig} - Specific downloading config
 * @return {SpecificDownloadManager} - Object to manage downloading gif images
 * @function
 */
export const useGIFDownloader = (options = {}) => {

    const result = useDownloader({
        ...options,
        type: MIME_TYPES.GIF
    });

    return {
        ...result,
        download: (config) => result.download({ ...config, type: MIME_TYPES.GIF })
    };

};

/**
 * Hook for downloading jpeg images
 * @param options {SpecificDownloadConfig} - Specific downloading config
 * @return {SpecificDownloadManager} - Object to manage downloading jpeg images
 * @function
 */
export const useJPEGDownloader = (options = {}) => {

    const result = useDownloader({
        ...options,
        type: MIME_TYPES.JPEG
    });

    return {
        ...result,
        download: (config) => result.download({ ...config, type: MIME_TYPES.JPEG })
    };

};

/**
 * Hook for downloading png images
 * @param options {SpecificDownloadConfig} - Specific downloading config
 * @return {SpecificDownloadManager} - Object to manage downloading png images
 * @function
 */
export const usePNGDownloader = (options = {}) => {

    const result = useDownloader({
        ...options,
        type: MIME_TYPES.PNG
    });

    return {
        ...result,
        download: (config) => result.download({ ...config, type: MIME_TYPES.PNG })
    };

};

/**
 * Hook for downloading svg images
 * @param options {SpecificDownloadConfig} - Specific downloading config
 * @return {SpecificDownloadManager} - Object to manage downloading svg images
 * @function
 */
export const useSVGDownloader = (options = {}) => {

    const result = useDownloader({
        ...options,
        type: MIME_TYPES.SVG
    });

    return {
        ...result,
        download: (config) => result.download({ ...config, type: MIME_TYPES.SVG })
    };

};

/**
 * Hook for downloading Microsoft Word files
 * @param options {SpecificDownloadConfig} - Specific downloading config
 * @return {SpecificDownloadManager} - Object to manage downloading Microsoft Word files
 * @function
 */
export const useMSWordDownloader = (options = {}) => {

    const result = useDownloader({
        ...options,
        type: MIME_TYPES.MS_WORD
    });

    return {
        ...result,
        download: (config) => result.download({ ...config, type: MIME_TYPES.MS_WORD })
    };

};

/**
 * Hook for downloading Microsoft Excel files
 * @param options {SpecificDownloadConfig} - Specific downloading config
 * @return {SpecificDownloadManager} - Object to manage downloading Microsoft Word files
 * @function
 */
export const useMSExcelDownloader = (options = {}) => {

    const result = useDownloader({
        ...options,
        type: MIME_TYPES.MS_EXCEL
    });

    return {
        ...result,
        download: (config) => result.download({ ...config, type: MIME_TYPES.MS_EXCEL })
    };

};

/**
 * Hook for downloading ZIP archive
 * @param options {SpecificDownloadConfig} - Specific downloading config
 * @return {SpecificDownloadManager} - Object to manage downloading ZIP archive
 * @function
 */
export const useZIPDownloader = (options = {}) => {

    const result = useDownloader({
        ...options,
        type: MIME_TYPES.ZIP
    });

    return {
        ...result,
        download: (config) => result.download({ ...config, type: MIME_TYPES.ZIP })
    };

};

/**
 * Hook for downloading PDF files
 * @param options {SpecificDownloadConfig} - Specific downloading config
 * @return {SpecificDownloadManager} - Object to manage downloading PDF files
 * @function
 */
export const usePDFDownloader = (options = {}) => {

    const result = useDownloader({
        ...options,
        type: MIME_TYPES.PDF
    });

    return {
        ...result,
        download: (config) => result.download({ ...config, type: MIME_TYPES.PDF })
    };

};

/**
 * Hook for downloading JSON files
 * @param options {SpecificDownloadConfig} - Specific downloading config
 * @return {SpecificDownloadManager} - Object to manage downloading JSON files
 * @function
 */
export const useJSONDownloader = (options = {}) => {

    const result = useDownloader({
        ...options,
        type: MIME_TYPES.JSON
    });

    return {
        ...result,
        download: (config) => result.download({ ...config, type: MIME_TYPES.JSON })
    };

};

/**
 * Hook for downloading binary files
 * @param options {SpecificDownloadConfig} - Specific downloading config
 * @return {SpecificDownloadManager} - Object to manage downloading binary files
 * @function
 */
export const useBinaryDownloader = (options = {}) => {

    const result = useDownloader({
        ...options,
        type: MIME_TYPES.BINARY
    });

    return {
        ...result,
        download: (config) => result.download({ ...config, type: MIME_TYPES.BINARY })
    };

};

/**
 * Hook for downloading text files
 * @param options {SpecificDownloadConfig} - Specific downloading config
 * @return {SpecificDownloadManager} - Object to manage downloading text files
 * @function
 */
export const useTextDownloader = (options = {}) => {

    const result = useDownloader({
        ...options,
        type: MIME_TYPES.PLAIN_TEXT
    });

    return {
        ...result,
        download: (config) => result.download({ ...config, type: MIME_TYPES.PLAIN_TEXT })
    };

};

/**
 * Hook for downloading form-data
 * @param options {SpecificDownloadConfig} - Specific downloading config
 * @return {SpecificDownloadManager} - Object to manage downloading form-data
 * @function
 */
export const useFormDataDownloader = (options = {}) => {

    const result = useDownloader({
        ...options,
        type: MIME_TYPES.FORM_DATA
    });

    return {
        ...result,
        download: (config) => result.download({ ...config, type: MIME_TYPES.FORM_DATA })
    };

};
