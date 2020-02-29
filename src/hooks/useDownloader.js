import { useRef, useCallback, useEffect, MutableRefObject } from 'react';

import { defaultConfig, errorMessages } from '../constants';
import { DownloadService } from '../download-service/download.service';

const { defaultType, defaultEvent } = defaultConfig;

/** @module Downloader */

/**
 * Object for inserting to html element
 * @interface
 * @typedef {Object} Downloader
 * @property {MutableRefObject<HTMLElement>} ref - Reference to html element
 */

/**
 * Hook for downloading data
 * @param data {string|Object} - Downloaded data
 * @param name {string} - Name of downloaded data
 * @param type {string} - Type of downloaded data
 * @param onDownloaded {function} - Function is called after successful downloading
 * @param onError {function} - Function is called after failed downloading
 * @param event {string} - Event that triggers downloading
 * @return {Downloader} - Object for inserting to html element
 * @function
 */
export function useDownloader(
  { data, name, type = defaultType, event = defaultEvent, onDownloaded, onError } = {}
) {

  /**
   * Reference to trigger (HTMLElement)
   */
  const triggerRef = useRef(null);

  /**
   * Handler for started downloading
   */
  const onDownloadingTriggered = useCallback(async () => {
    try {
      if (data) {
        await DownloadService.getInstance().download(data, name, type);
        if (onDownloaded && typeof onDownloaded === 'function') onDownloaded();
      } else onError(new Error(errorMessages.noData));
    } catch (e) {
      onError(e);
    }
  }, [data, name, type, onDownloaded, onError]);

  /**
   * Hook for adding/removing trigger listener
   */
  useEffect(() => {
    const element = triggerRef.current;
    if (element) element.addEventListener(event, onDownloadingTriggered);
    return () => {
      if (element) element.removeEventListener(event, onDownloadingTriggered);
    };
  }, [triggerRef, event, onDownloadingTriggered]);

  return { ref: triggerRef };
}