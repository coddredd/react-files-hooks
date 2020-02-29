# **react-files-hooks**
## Usage

```ecmascript 6
import { useUploader, useDownloader } from 'react-files-hooks';
import data from './data';

function SomeComponent() {

  const { uploader, reset } = useUploader({
    onSelectFile: file => {}, 
    onError: error => {},
    isMultiple: true,
    maxSize: 1000000,
    maxFiles: 5,
    validTypes: ['image/jpeg']
  });
  
  const downloader = useDownloader({
    file: data,
    name: 'some-file.json',
    type: 'application/json',
    event: 'click',
    onDownloaded: () => {},
    onError: error => {}
  });
  
  return (
    <div>
      // Uploading
      <input id="input" {...uploader} />
      <button onClick={reset}>Reset</button>
      
      // Downloading
      <button {...downloader}>Download</button>
    </div>
  )
  
}
```

## API
### useUploader


### useDownloader

