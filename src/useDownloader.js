import { useRef, useCallback, useEffect } from 'react';

import { defaultConfig } from './constants';
import { DownloadService } from './download.service';

const { defaultType, defaultEvent } = defaultConfig;

/**
 * Hook for downloading data
 * @param data Downloaded data
 * @param name Name of downloaded data
 * @param type Type of downloaded data
 * @param event Event that triggers downloading
 * @param onDownloaded Function is called after successful downloading
 * @param onError Function is called after failed downloading
 */
export function useDownloader(
    {data, name, type = defaultType, event = defaultEvent, onDownloaded, onError}
) {

  /**
   * Reference to trigger (HTMLElement)
   */
  const triggerRef = useRef(null);

  /**
   * Handler for started downloading
   */
  const onDownloadingTriggered = useCallback(() => {
    try {
      if (data) DownloadService.getInstance().download(data, name, type);
      if (onDownloaded && typeof onDownloaded === 'function') onDownloaded();
    } catch (e) {
      onError(e);
    }
  }, [data, name, type, onDownloaded]);

  /**
   * Hook for adding/removing trigger listener
   */
  useEffect(() => {
    if (triggerRef && triggerRef.current) triggerRef.current.addEventListener(event, onDownloadingTriggered);
    return () => {
      if (triggerRef && triggerRef.current) triggerRef.current.removeEventListener(event, onDownloadingTriggered);
    }
  }, [triggerRef, event]);

  return { ref: triggerRef };
}