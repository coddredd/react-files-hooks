import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useDownloader, useUploader, specific, MIME_TYPES } from 'react-files-hooks';

export function App() {

  const { uploader } = useUploader({
    onSelectFile: file => console.log(file),
    onError: error => console.log(error),
    validTypes: [MIME_TYPES.IMAGE, MIME_TYPES.VIDEO]
  });

  const { downloader } = useDownloader({
    data: JSON.stringify({ value: 2 }, undefined, 2),
    onDownloaded: () => console.log('download'),
    onError: error => console.log(error)
  });

  const pdfResult = specific.usePDFUploader({
    onSelectFile: file => console.log(file),
    onError: error => console.log(error)
  });

  const { download } = specific.useJSONDownloader();

  useEffect(() => {
    download({ data: JSON.stringify({ value: 4 }, undefined, 2) });
  }, []);

  return (
    <div>
      <input {...pdfResult.uploader} id="pdf-file" />
      <input {...uploader} id="file" />
      <button {...downloader}>Download</button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
