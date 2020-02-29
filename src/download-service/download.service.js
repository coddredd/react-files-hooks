import { CONTANTS } from '../constants';

/**
 * Service for downloading files in browser
 * @export
 * @class
 */
export class DownloadService {

  /**
   * Constructor of DownloadService
   * @constructor
   */
  constructor() {
    this.mimeType = '';
    this.toString = a => String(a);
    this.fileName = '';
    this.reader = new FileReader();
  }

  /**
   * Static method for getting instance of DownloadService (singleton pattern)
   * @static
   */
  static getInstance() {
    if (this.instance) return this.instance;
    return new DownloadService();
  }

  /**
   * Download file
   * @param data {string|Object} - Downloaded data
   * @param strFileName {string} - Name of downloaded file
   * @param strMimeType {string} - Mime type of downloaded file
   * @return {Promise<void>} - Promise resolved after downloading file
   * @async
   */
  download(data, strFileName, strMimeType) {
    this.fileName = strFileName || CONTANTS.DEFAULT_FILE_NAME;
    this.mimeType = strMimeType;
    this.payload = data;
    let MyBlob = (window.Blob || window['MozBlob'] || window['WebKitBlob'] || this.toString);
    MyBlob = MyBlob.call ? MyBlob.bind(window) : Blob ;
    if (this._isPayloadBase64()) {
      if (this._isBigBase64(MyBlob)) this._convertBase64ToBlob(MyBlob);
      else return this._saveBase64(MyBlob);
    }
    return this._saveBlob(MyBlob);
  }

  /**
   * Converting big base64 string to blob
   * @param MyBlob - Copy of Blob class for current browser
   * @private
   */
  _convertBase64ToBlob(MyBlob) {
    this.payload = this._dataUrlToBlob(this.payload, MyBlob);
    this.mimeType = this.payload.type || CONTANTS.DEFAULT_TYPE;
  }

  /**
   * Download data in base64 format
   * @param MyBlob - Copy of Blob class for current browser
   * @private
   */
  _saveBase64(MyBlob) {
    return new Promise((resolve) => {
      if (navigator.msSaveBlob) navigator.msSaveBlob(this._dataUrlToBlob(this.payload, MyBlob), this.fileName);
      else this._save(this.payload);
      resolve();
    });
  }

  /**
   * Download data in Blob format
   * @param MyBlob - Copy of Blob class for current browser
   * @private
   */
  _saveBlob(MyBlob) {
    const blob = this.payload instanceof MyBlob ? this.payload : new MyBlob([this.payload], {type:  this.mimeType});
    if (navigator.msSaveBlob) return navigator.msSaveBlob(blob, this.fileName);
    if (window.URL) return this._save(window.URL.createObjectURL(blob), true);
    else {
      if (typeof blob === 'string' || blob.constructor === this.toString ) return this._saveBigBase64(blob);
      return this._convertByFileReader(blob)
        .then(base64 => this._save(base64));
    }
  }

  /**
   * Download file in Blob (String) format
   * @param blob - Instance of Blob for current browser
   * @private
   */
  _saveBigBase64(blob) {
    try {
      return this._save('data:' + this.mimeType + ';base64,' + window.btoa(blob));
    } catch(y) {
      return this._save('data:' + this.mimeType + ',' + encodeURIComponent(blob));
    }
  }

  /**
   * Download converted data
   * @param url - URL of converted downloaded data
   * @param winMode - Indicator showing data has been converted by window.URL
   * @private
   */
  _save(url, winMode) {
    const anchor = document.createElement('a');
    if ('download' in anchor) return this._saveByAnchor(anchor, url, winMode);
    if (this._isSafari()) return this._saveByLocationForSafari(url);
    this._saveByIframe(url, winMode);
  }

  /**
   * Finish downloading by anchor
   * @param anchor - Created link for downloading
   * @param url URL - of converted downloaded data
   * @param winMode - Indicator showing data has been converted by window.URL
   * @private
   */
  _saveByAnchor(anchor, url, winMode) {
    return new Promise((resolve) => {
      anchor.href = url;
      anchor.setAttribute('download', this.fileName);
      anchor.style.display = 'none';
      document.body.appendChild(anchor);
      setTimeout(() => {
        anchor.click();
        document.body.removeChild(anchor);
        if (winMode) setTimeout(() => window.URL.revokeObjectURL(anchor.href), 250);
        resolve();
      }, 66);
    });
  }

  /**
   * Finish downloading by window location (for Safari)
   * @param url - URL of converted downloaded data
   * @private
   */
  _saveByLocationForSafari(url) {
    const urlWithoutBase64 = url.replace(CONTANTS.BASE_64_REGEX, CONTANTS.DEFAULT_TYPE);
    if (!window.open(urlWithoutBase64)) {
      if (window.confirm(CONTANTS.CONFIRM_TEXT)) window.location.href = urlWithoutBase64;
    }
    return true;
  }

  /**
   * Finish downloading by iframe
   * @param url -  URL of converted downloaded data
   * @param winMode - Indicator showing data has been converted by window.URL
   * @private
   */
  _saveByIframe(url, winMode) {
    let iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    iframe.src = winMode ? url : 'data:' + url.replace(CONTANTS.BASE_64_REGEX, CONTANTS.DEFAULT_TYPE);
    setTimeout(() => document.body.removeChild(iframe), 333);
  }

  /**
   * Convert blob to base64 using FileReader
   * @param blob - Instance of Blob for current browser
   * @private
   */
  _convertByFileReader(blob) {
    return new Promise((resolve) => {
      this.reader.onload = () => this.reader.result && resolve(this.reader.result);
      this.reader.readAsDataURL(blob);
    });
  }

  /**
   * Convert URL string to blob
   * @param strUrl - URL of downloaded data
   * @param MyBlob -  Copy of Blob class for current browser
   * @private
   */
  _dataUrlToBlob(strUrl, MyBlob) {
    const parts = strUrl.split(/[:;,]/);
    const type = parts[1];
    const decoder = parts[2] === 'base64' ? atob : decodeURIComponent;
    const binData = decoder(parts.pop() || '');
    const mx = binData.length;
    const uiArr = new Uint8Array(mx);
    let index = 0;
    for (index; index < mx; ++index) uiArr[index] = binData.charCodeAt(index);
    return new MyBlob([uiArr], {type});
  }

  /**
   * Check that downloaded data has base64 format
   * @return {boolean}
   * @private
   */
  _isPayloadBase64() {
    return CONTANTS.FULL_BASE_64_REGEX.test(this.payload);
  }

  /**
   * Check that downloaded base64 is to big
   * @return {boolean}
   * @private
   */
  _isBigBase64(MyBlob) {
    return this.payload.length > CONTANTS.MAX_PAYLOAD_LENGTH && MyBlob !== this.toString;
  }

  /**
   * Check that current browser is Safari
   * @return {boolean}
   * @private
   */
  _isSafari() {
    return CONTANTS.SAFARI_REGEX.test(navigator.userAgent);
  }

}

DownloadService.instance = new DownloadService();
