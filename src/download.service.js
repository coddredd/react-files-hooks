import { CONTANTS } from './constants';

/**
 * Service for downloading files in browser
 */
export class DownloadService {

  /**
   * Constructor of DownloadService
   */
  constructor() {
    this.mimeType = '';
    this.toString = a => String(a);
    this.fileName = '';
    this.reader = new FileReader();
  }

  /**
   * Static method for getting instance of DownloadService (singleton pattern)
   */
  static getInstance() {
    if (this.instance) return this.instance;
    return new DownloadService();
  }

  /**
   * Download file
   * @param data Downloaded data
   * @param strFileName Name of downloaded file
   * @param strMimeType Mime type of downloaded file
   */
  download = (data, strFileName, strMimeType) => {
    this.fileName = strFileName || CONTANTS.DEFAULT_FILE_NAME;
    this.mimeType = strMimeType;
    this.payload = data;
    let myBlob = (window.Blob || window['MozBlob'] || window['WebKitBlob'] || this.toString);
    myBlob = myBlob.call ? myBlob.bind(window) : Blob ;
    if (this._isPayloadBase64()) {
      if (this._isBigBase64(myBlob)) this._convertBase64ToBlob(myBlob);
      else return this._saveBase64(myBlob);
    }
    return this._saveBlob(myBlob);
  };

  /**
   * Converting big base64 string to blob
   * @param myBlob Copy of Blob class for current browser
   * @private
   */
  _convertBase64ToBlob = (myBlob) => {
    this.payload = this._dataUrlToBlob(this.payload, myBlob);
    this.mimeType = this.payload.type || CONTANTS.DEFAULT_TYPE;
  };

  /**
   * Download data in base64 format
   * @param myBlob Copy of Blob class for current browser
   * @private
   */
  _saveBase64 = (myBlob) => {
    return navigator.msSaveBlob ?
      navigator.msSaveBlob(this._dataUrlToBlob(this.payload, myBlob), this.fileName) :
      this._save(this.payload);
  };

  /**
   * Download data in Blob format
   * @param myBlob Copy of Blob class for current browser
   * @private
   */
  _saveBlob = (myBlob) => {
    const blob = this.payload instanceof myBlob ? this.payload : new myBlob([this.payload], {type:  this.mimeType});
    if (navigator.msSaveBlob) return navigator.msSaveBlob(blob, this.fileName);
    if (window.URL) return this._save(window.URL.createObjectURL(blob), true);
    else {
      if (typeof blob === 'string' || blob.constructor === this.toString ) return this._saveBigBase64(blob);
      this.reader.onload = () => this.reader.result && this._save(this.reader.result);
      this.reader.readAsDataURL(blob);
    }
    return true;
  };

  /**
   * Download file in Blob (String) format
   * @param blob Instance of Blob for current browser
   * @private
   */
  _saveBigBase64 = (blob) => {
    try {
      return this._save('data:' + this.mimeType + ';base64,' + window.btoa(blob));
    } catch(y) {
      return this._save('data:' + this.mimeType + ',' + encodeURIComponent(blob));
    }
  };

  /**
   * Download converted data
   * @param url URL of converted downloaded data
   * @param winMode Indicator showing data has been converted by window.URL
   * @private
   */
  _save = (url, winMode) => {
    const anchor = document.createElement('a');
    if ('download' in anchor) return this._saveByAnchor(anchor, url, winMode);
    if (this._isSafari()) return this._saveByLocationForSafari(url);
    this._saveByIframe(url, winMode);
  };

  /**
   * Finish downloading by anchor
   * @param anchor Created link for downloading
   * @param url URL of converted downloaded data
   * @param winMode Indicator showing data has been converted by window.URL
   * @private
   */
  _saveByAnchor = (anchor, url, winMode) => {
    anchor.href = url;
    anchor.setAttribute('download', this.fileName);
    anchor.style.display = 'none';
    document.body.appendChild(anchor);
    setTimeout(() => {
      anchor.click();
      document.body.removeChild(anchor);
      if (winMode) setTimeout(() => window.URL.revokeObjectURL(anchor.href), 250 );
    }, 66);
    return true;
  };

  /**
   * Finish downloading by window location (for Safari)
   * @param url URL of converted downloaded data
   * @private
   */
  _saveByLocationForSafari = url => {
    url = url.replace(CONTANTS.BASE_64_REGEX, CONTANTS.DEFAULT_TYPE);
    if (!window.open(url)) {
      if (window.confirm(CONTANTS.CONFIRM_TEXT)) window.location.href = url;
    }
    return true;
  };

  /**
   * Finish downloading by iframe
   * @param url  URL of converted downloaded data
   * @param winMode Indicator showing data has been converted by window.URL
   * @private
   */
  _saveByIframe = (url, winMode) => {
    let iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    if (!winMode) url = 'data:' + url.replace(CONTANTS.BASE_64_REGEX, CONTANTS.DEFAULT_TYPE);
    iframe.src = url;
    setTimeout(() => document.body.removeChild(iframe), 333);
  };

  /**
   * Convert URL string to blob
   * @param strUrl URL of downloaded data
   * @param myBlob  Copy of Blob class for current browser
   * @private
   */
  _dataUrlToBlob = (strUrl, myBlob) => {
    let parts = strUrl.split(/[:;,]/),
      type = parts[1],
      decoder = parts[2] === 'base64' ? atob : decodeURIComponent,
      binData = decoder(parts.pop() || ''),
      mx = binData.length,
      index = 0,
      uiArr = new Uint8Array(mx);
    for (index; index < mx; ++index) uiArr[index] = binData.charCodeAt(index);
    return new myBlob([uiArr], {type});
  };

  /**
   * Check that downloaded data has base64 format
   * @return {boolean}
   * @private
   */
  _isPayloadBase64 = () => CONTANTS.FULL_BASE_64_REGEX.test(this.payload);

  /**
   * Check that downloaded base64 is to big
   * @return {boolean}
   * @private
   */
  _isBigBase64 = (myBlob) => this.payload.length > CONTANTS.MAX_PAYLOAD_LENGTH && myBlob !== this.toString;

  /**
   * Check that current browser is Safari
   * @return {boolean}
   * @private
   */
  _isSafari = () => CONTANTS.SAFARI_REGEX.test(navigator.userAgent);

}

DownloadService.instance = new DownloadService();
