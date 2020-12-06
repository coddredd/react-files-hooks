/**
 * Default config for downloading
 * @type {{defaultEvent: string, defaultType: string, defaultName: string}}
 */
export const defaultDownloadConfig = {
    defaultType: 'text/plain',
    defaultEvent: 'click',
    defaultName: 'file'
};

/**
 * Default config for uploading
 * @type {{defaultIsMultiple: boolean, defaultMaxSize: number}}
 */
export const defaultUploadConfig = {
    defaultIsMultiple: true,
    defaultMaxSize: 5242880
};

/**
 * Constants for module
 * @type {{FULL_BASE_64_REGEX: RegExp, DEFAULT_TYPE: string, CONFIRM_TEXT: string, BASE_64_REGEX: RegExp, MAX_PAYLOAD_LENGTH: number, DEFAULT_FILE_NAME: string, SAFARI_REGEX: RegExp}}
 */
export const CONSTANTS = {
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

/**
 * MIME types
 * @type {{ZIP: string, BMP: string, SVG: string, GIF: string, VIDEO: string, MS_WORD: string, PNG: string, BINARY: string, JPEG: string, JSON: string, TEXT: string, MODEL: string, AUDIO: string, FONT: string, MS_EXCEL: string, PLAIN_TEXT: string, IMAGE: string, PDF: string, FORM_DATA: string}}
 */
export const MIME_TYPES = {
    BMP: 'image/bmp',
    JPEG: 'image/jpeg',
    PNG: 'image/png',
    SVG: 'image/svg+xml',
    GIF: 'image/gif',
    IMAGE: 'image',
    VIDEO: 'video',
    AUDIO: 'audio',
    JSON: 'application/json',
    PDF: 'application/pdf',
    BINARY: 'application/octet-stream',
    MS_WORD: 'application/msword',
    MS_EXCEL: 'application/vnd.ms-excel',
    ZIP: 'application/zip',
    FORM_DATA: 'multipart/form-data',
    MODEL: 'model',
    FONT: 'font',
    TEXT: 'text',
    PLAIN_TEXT: 'text/plain'
};