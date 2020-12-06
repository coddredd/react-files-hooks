import { useDownloader } from '../src/hooks/useDownloader';
import { DownloadService } from '../src/download-service/download.service';

jest.mock('react', () => {
  return {
    useRef: () => ({
      current: {
        addEventListener: jest.fn().mockImplementation((type, callback) => callback()),
        removeEventListener: jest.fn()
      }
    }),
    useEffect: func => {
      const result = func();
      result();
    }
  }
});

jest.mock('../src/download-service/download.service');

describe('Downloader hook', () => {

  let downloadMock, failedDownloadMock, data, name, onDownloaded, onError, error, downloadService;

  beforeEach(() => {
    error = new Error('error');
    downloadMock = jest.fn().mockResolvedValue();
    failedDownloadMock = jest.fn().mockRejectedValue(error);
    onDownloaded = jest.fn();
    onError = jest.fn();
    data = { data: 'data' };
    name = 'test';

    DownloadService.mockImplementation(() => {
      return {
        download: downloadMock
      };
    });
  });

  it('should download file', (done) => {
    useDownloader({data, name, onDownloaded, onError});
    setTimeout(() => {
      expect(downloadMock).toHaveBeenCalledWith(data, name, 'text/plain');
      expect(onDownloaded).toHaveBeenCalledWith();
      done();
    }, 100)
  });

  it('should not download file if downloading failed', (done) => {
    DownloadService.mockImplementation(() => {
      return {
        download: failedDownloadMock
      };
    });

    useDownloader({data, name, onDownloaded, onError});
    setTimeout(() => {
      expect(failedDownloadMock).toHaveBeenCalledWith(data, name, 'text/plain');
      expect(onDownloaded).not.toHaveBeenCalled();
      expect(onError).toHaveBeenCalledWith(error);
      done();
    }, 100)
  });

  it('should not download file without data', (done) => {
    useDownloader({name, onDownloaded, onError});
    setTimeout(() => {
      expect(downloadMock).not.toHaveBeenCalled();
      expect(onDownloaded).not.toHaveBeenCalled();
      expect(onError).toHaveBeenCalledWith(new Error('There is no data to download'));
      done();
    }, 100)
  });

  it('should not download file without callback', (done) => {
    useDownloader({data, name, onError});
    setTimeout(() => {
      expect(downloadMock).toHaveBeenCalledWith(data, name, 'text/plain');
      expect(onDownloaded).not.toHaveBeenCalled();
      done();
    }, 100)
  });

});
