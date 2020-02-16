# **react-file-operations**
## Usage
```
import { useUploader, useDownloader } from 'react-file-operations';
import data from './data';

function SomeComponent() {

  const { uploader, reset } = useUploader({
    onSelectFile: file => {}, 
    isMultiple: true 
  });
  
  const downloader = useDownloader({
    file: data,
    name: 'some-file.json',
    type: 'application/json',
    event: 'click',
    onDownloaded: () => {},
    onError: () => {}
  });
  
  return (
    <div>
      // Uploading
      <input id="input" {...uploader} />
      <label htmlFor="input">Upload</label>
      <button onClick={reset}>Reset</button>
      
      // Downloading
      <button {...downloader}>Download</button>
    </div>
  )
  
}
```

## API
### useUploader
**Parameters**
* `onSelectFile` - function called after selecting file with file in parameters  (required, function).
* `isMultiple` - if _true_ there will be possible to select more then one file (not required, boolean, default value - _false_).

**Returns** 

Object with properties
* `uploader` - object that should be inserted in an input as props.
* `reset` - function that reset input with file.

### useDownloader
**Parameters**
* `data` - data for downloading (required, function).
* `name` - Name of downloaded file (not required, string, default value - _file_).
* `type` - Type of downloaded file (not required, string, default value - _application/json_).
* `event` - Event triggered downloading (not required, 'string', default value - _click_).
* `onDownloaded` - function called after successful downloading (not required, function).
* `onError` - function called in case of error (not required, function).

**Returns**
* `downloader` - object that should be inserted in an html element as props.