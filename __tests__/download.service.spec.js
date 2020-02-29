import { DownloadService } from '../src/download-service/download.service';

describe('DownloadService methods', () => {

    describe('download method', () => {

        let base64, strFileName, strMimeType, file, downloadMock, setAttributeMock, clickMock;

        beforeEach(() => {
            base64 = 'data:image/png;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD';
            file = new Blob(['data:image/png;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD'], {type: 'image/png'});
            strFileName = 'photo.png';
            strMimeType = 'image/png';
            downloadMock = jest.fn();
            setAttributeMock = jest.fn();
            clickMock = jest.fn();

            document.createElement = jest.fn().mockImplementation(() => {
                return { download: downloadMock, setAttribute: setAttributeMock, style: {}, click: clickMock }
            });
            document.body.appendChild = jest.fn();
            document.body.removeChild = jest.fn();
        });

        it('should download photo (File) with URL and DOM element', (done) => {
            const revokeObjectURLMock = jest.fn();
            Object.defineProperty(window, 'URL', {
                value: { createObjectURL: () => 'url', revokeObjectURL: revokeObjectURLMock }
            });

            DownloadService.getInstance().download(file, strFileName, strMimeType);
            expect(setAttributeMock).toHaveBeenCalledWith('download', strFileName);
            setTimeout(() => {
                expect(clickMock).toHaveBeenCalledWith();
                expect(revokeObjectURLMock).toHaveBeenCalledWith('url');
                done();
            }, 400);
        });

        it('should download photo (File) with FileReader and DOM element', (done) => {
            Object.defineProperty(window, 'URL', { value: undefined });

            DownloadService.getInstance().download(file, strFileName, strMimeType)
                .then(() => {
                    expect(setAttributeMock).toHaveBeenCalledWith('download', strFileName);
                    expect(document.body.appendChild).toHaveBeenCalledWith({
                        download: downloadMock,
                        setAttribute: setAttributeMock,
                        style: {display: 'none'},
                        click: clickMock,
                        href: 'data:image/png;base64,ZGF0YTppbWFnZS9wbmc7YmFzZTY0LC85ai80QUFRU2taSlJnQUJBUUVCTEFFc0FBRA=='
                    });
                    expect(clickMock).toHaveBeenCalledWith();
                })
                .then(() => done(), done);
        });

        it('should download photo (File) with navigator', (done) => {
            const msSaveBlobMock = jest.fn();
            navigator.msSaveBlob = msSaveBlobMock;

            DownloadService.getInstance().download(file, strFileName, strMimeType);
            expect(msSaveBlobMock).toHaveBeenCalledWith(file, strFileName);
            expect(setAttributeMock).not.toHaveBeenCalled();
            setTimeout(() => {
                expect(clickMock).not.toHaveBeenCalled();
                done();
            }, 400);
        });

        it('should download photo (base64) with DOM element', (done) => {
            navigator.msSaveBlob = undefined;
            
            DownloadService.getInstance().download(base64, strFileName, strMimeType);
            expect(setAttributeMock).toHaveBeenCalledWith('download', strFileName);
            setTimeout(() => {
                expect(clickMock).toHaveBeenCalledWith();
                done();
            }, 100);
        });

        it('should download photo (base64) with navigator', (done) => {
            const msSaveBlobMockBase64 = jest.fn();
            navigator.msSaveBlob = msSaveBlobMockBase64;

            DownloadService.getInstance().download(base64, strFileName, strMimeType);
            expect(msSaveBlobMockBase64).toHaveBeenCalledWith(expect.any(Object), strFileName);
            expect(setAttributeMock).not.toHaveBeenCalled();
            setTimeout(() => {
                expect(clickMock).not.toHaveBeenCalled();
                done();
            }, 400);
        });

        it('should download photo with iframe', (done) => {
            Object.defineProperty(window, 'navigator', {value: {userAgent: 'localhost://'}});
            const createElementMock = { setAttribute: setAttributeMock, style: {}, click: clickMock };
            document.createElement = jest.fn().mockImplementation(() => createElementMock);

            DownloadService.getInstance().download(base64, strFileName, strMimeType);
            expect(document.createElement).toHaveBeenCalledWith('iframe');
            expect(document.body.appendChild).toHaveBeenCalledWith(createElementMock);
            expect(setAttributeMock).not.toHaveBeenCalled();
            setTimeout(() => {
                expect(clickMock).not.toHaveBeenCalled();
                done();
            }, 400);
        });

        it('should download photo (base64) with window location', () => {
            navigator.msSaveBlob = undefined;
            Object.defineProperty(window, 'open', {value: jest.fn().mockImplementation(() => false)});
            Object.defineProperty(window, 'confirm', {value: jest.fn().mockImplementation(() => true)});
            Object.defineProperty(window, 'location', {value: {}});
            document.createElement = jest.fn().mockImplementation(() => {
                return { setAttribute: setAttributeMock, style: {}, click: clickMock }
            });
            DownloadService.getInstance()._isSafari = jest.fn().mockImplementationOnce(() => true);

            DownloadService.getInstance().download(base64, strFileName, strMimeType);
            expect(window.open).toHaveBeenCalledWith('application/json/png;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD');
            expect(window.confirm).toHaveBeenCalledWith('Displaying New Document\n\nUse "Save As..." to download, then click back to return to this page.');
            expect(window.location.href).toEqual('application/json/png;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD');
        });

        it('should download photo (big base64) with DOM element as big base64', (done) => {
            Object.defineProperty(window, 'Blob', { value: undefined });
            Object.defineProperty(window, 'MozBlob', { value: undefined });
            Object.defineProperty(window, 'WebKitBlob', { value: undefined });
            Object.defineProperty(window, 'btoa', { value: () => 'code' });
            DownloadService.getInstance()._isBigBase64 = jest.fn().mockImplementationOnce(() => true);
            DownloadService.getInstance()._dataUrlToBlob = jest.fn().mockImplementationOnce(() => 'blob');

            DownloadService.getInstance().download(base64, strFileName, strMimeType);
            expect(DownloadService.getInstance()._dataUrlToBlob).toHaveBeenCalledWith(base64, expect.any(Function));
            expect(setAttributeMock).toHaveBeenCalledWith('download', strFileName);
            expect(document.body.appendChild).toHaveBeenCalledWith({
                download: downloadMock,
                setAttribute: setAttributeMock,
                style: {display: 'none'},
                click: clickMock,
                href: 'data:application/json;base64,code'
            });
            setTimeout(() => {
                expect(clickMock).toHaveBeenCalledWith();
                done();
            }, 100);
        });

    });

});


