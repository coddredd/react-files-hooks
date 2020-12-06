import { useRef, useEffect, MutableRefObject } from 'react';

import { defaultDownloadConfig, errorMessages } from '../constants';
import { DownloadService } from '../download-service/download.service';

const { defaultType, defaultEvent, defaultName } = defaultDownloadConfig;

/** @module Downloader */

/**
 * Object for inserting to html element
 * @interface
 * @global
 * @typedef {{ref: MutableRefObject<HTMLElement>}} DownloadRefContainer
 * @property {MutableRefObject<HTMLElement>} ref - Reference to html element.
 */

/**
 * Manual downloading config
 * @interface
 * @global
 * @typedef ManualDownloadConfig
 * @property data {string|Object} - Downloaded data. Required.
 * @property name {string} - Name of downloaded data. Optional. Default - "file"
 * @property type {string} - Type of downloaded data. Optional. Default - "text/plain"
 */

/**
 * Function to download file
 * @interface
 * @global
 * @typedef {function} DownloadFn
 * @param config {ManualDownloadConfig} Manual downloading config
 * @return {Promise<void>} Promises resolves after downloading file.
 */

/**
 * Object to manage downloading files
 * @interface
 * @global
 * @typedef DownloadManager
 * @property {DownloadRefContainer} downloader - Object for inserting to html element.
 * @property {DownloadFn} download - Function to download file.
 */

/**
 * Downloading config
 * @interface
 * @global
 * @typedef DownloadConfig
 * @property data {string|Object} - Downloaded data. Required.
 * @property name {string} - Name of downloaded data. Optional. Default - "file"
 * @property type {string} - Type of downloaded data. Optional. Default - "text/plain"
 * @property event {string} - Event that triggers downloading. Optional. Default - "click"
 * @property onDownloaded {function} - Function is called after successful downloading. Optional
 * @property onError {function} - Function is called after failed downloading. Optional
 */

/**
 * Hook for downloading data
 * @param config {DownloadConfig} - Downloading config.
 * @return {DownloadManager} - Object to manage downloading files.
 * @function
 */
export function useDownloader(
    { data, onDownloaded, onError, name = defaultName, type = defaultType, event = defaultEvent } = {}
) {

    /**
     * Instance of DownloadService
     * @type {DownloadService}
     */
    const downloadService = new DownloadService();

    /**
     * Reference to trigger (HTMLElement)
     */
    const triggerRef = useRef(null);

    /**
     * Dispatch event about error
     * @param error {Error} - Instance of Error object
     */
    const handleError = error => {
        if (onError && typeof onError === 'function') {
            return onError(error);
        }
    };

    /** \
     * Download file
     * @param config {ManualDownloadConfig} - Manual downloading config.
     * @return {Promise<void>} Promise resolves after downloading file
     */
    const download = async ({ data, name = defaultName, type = defaultType }) => {
        if (!data) throw new Error(errorMessages.noData);
        await downloadService.download(data, name, type);
    };

    /**
     * Handle trigger event
     */
    const handleTrigger = async () => {
        try {
            await download({ data, name, type });
            if (onDownloaded && typeof onDownloaded === 'function') {
                onDownloaded();
            }
        } catch (e) {
            handleError(e);
        }
    };

    /**
     * Hook for adding/removing trigger listener
     */
    useEffect(() => {
        const element = triggerRef.current;
        if (element) element.addEventListener(event, handleTrigger);
        return () => {
            if (element) element.removeEventListener(event, handleTrigger);
        };
    }, [triggerRef, event]); // eslint-disable-line

    return {
        downloader: { ref: triggerRef },
        download
    };

}
