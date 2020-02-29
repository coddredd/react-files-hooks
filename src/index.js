import React from 'react';
import ReactDOM from 'react-dom';

import { useUploader } from './hooks/useUploader';
import { useDownloader } from './hooks/useDownloader';

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
    onDownloaded: () => console.log('downloade'),
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
