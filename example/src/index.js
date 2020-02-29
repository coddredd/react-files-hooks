import React from 'react';
import ReactDOM from 'react-dom';
import { useUploader, useDownloader } from 'react-files-hooks';

export function App() {

  const { uploader } = useUploader({
    onSelectFile: file => console.log(file),
    onError: error => console.log(error),
    validTypes: ['image/jpeg']
  });

  const downloader = useDownloader({
    data: JSON.stringify({value: 2}, undefined, 2),
    name: 'some-file',
    type: 'application/json',
    event: 'click',
    onDownloaded: () => console.log('download'),
    onError: error => console.log(error)
  });

  return (
    <div>
      <input {...uploader} id="file" />
      <button {...downloader}>Download</button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
