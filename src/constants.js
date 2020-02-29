/**
 * Default config for downloading
 * @type {{defaultEvent: string, defaultType: string}}
 */
export const defaultConfig = {
  defaultType: 'application/json',
  defaultEvent: 'click'
};

/**
 * Constants for module
 * @type {{FULL_BASE_64_REGEX: RegExp, DEFAULT_TYPE: string, CONFIRM_TEXT: string, BASE_64_REGEX: RegExp, MAX_PAYLOAD_LENGTH: number, DEFAULT_FILE_NAME: string, SAFARI_REGEX: RegExp}}
 */
export const CONTANTS = {
  DEFAULT_TYPE: 'application/json',
  DEFAULT_FILE_NAME: 'file',
  CONFIRM_TEXT: 'Displaying New Document\n\nUse "Save As..." to download, then click back to return to this page.',
  SAFARI_REGEX: /(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//,
  BASE_64_REGEX: /^data:([\w]+)/,
  FULL_BASE_64_REGEX: /^data:[\w+]+\/[\w+]+[,;]/,
  MAX_PAYLOAD_LENGTH: 1024 * 1024 * 1.999
};

/**
 * Set of messages for errors
 * @type {{amount: string, type: string, size: string, existingFile: string, existingElement: string}}
 */
export const errorMessages = {
  existingFile: 'There are no selected files',
  amount: 'Amount of selected files is more then ',
  size: ' file has size more then ',
  type: ' file has invalid type ',
  noData: 'There is no data to download'
};