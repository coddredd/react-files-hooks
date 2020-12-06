# **react-files-hooks**
## Installation
`npm i --save react-files-hooks`

## Usage
There are 2 different ways to use this module:
1. Common hooks (`useDownloader` and `useUploader`) - you should specify the type of file yourself. 
It is the most flexible variant.
<br>[useUploader API](https://coddredd.github.io/react-files-hooks/module-Uploader.html)
<br>[useDownloader API](https://coddredd.github.io/react-files-hooks/module-Downloader.html)
<br><br>
2. Specific hooks (like `usePDFUploader`, `useJSONDownloader` and so on) - these hooks created for specific types. 
Available through imported object `specific`. More variants of such hooks:
<br>[Specific "Downloaders"](https://coddredd.github.io/react-files-hooks/module-Specific%2520Downloaders.html)
<br>[Specific "Uploaders"](https://coddredd.github.io/react-files-hooks/module-Specific%2520Uploaders.html)

```ecmascript 6
import React, { useEffect } from 'react';
import { useDownloader, useUploader, specific, MIME_TYPES } from 'react-files-hooks';
import data from './data';

function SomeComponent() {

  const { uploader, reset } = useUploader({
    onSelectFile: file => {}, 
    onError: error => {},
    validTypes: [MIME_TYPES.IMAGE, MIME_TYPES.VIDEO]
  });

  const pdfResult = specific.usePDFUploader({
    onSelectFile: file => {},
    onError: error => {}
  });
 
  const { downloader } = useDownloader({
    file: data,
    type: MIME_TYPES.GIF,
    onError: error => {}
  });

  const { download } = specific.useJSONDownloader();

  useEffect(() => {
    download({ 
      data: JSON.stringify({ value: 4 }, undefined, 2),
      name: 'json-file'  
    });
  }, []);
  
  return (
    <div>
      // Uploading
      <input {...pdfResult.uploader} id="pdf-file" />
      <input {...uploader} id="input" />
      <button onClick={reset}>Reset</button>
      
      // Downloading
      <button {...downloader}>Download</button>
    </div>
  )
  
}
```
