import { useUploader } from '../src/hooks/useUploader';

jest.mock('react', () => {
  return {
    useRef: () => ({
      current: {
        addEventListener: jest.fn().mockImplementation((type, callback) => callback()),
        removeEventListener: jest.fn(),
        setAttribute: jest.fn(),
        files: [{data: 'data', size: 100, type: 'json', name: 'Name'}, {data: 'data1', size: 100, type: 'json', name: 'Name'}],
        value: 'value'
      }
    }),
    useCallback: func => func,
    useEffect: func => {
      const result = func();
      result();
    }
  }
});

describe('Uploader hook', () => {

  let isMultiple, onSelectFile, onError, files;

  beforeEach(() => {
    onSelectFile = jest.fn();
    onError = jest.fn();
    isMultiple = false;
    files = [{data: 'data', size: 100, type: 'json', name: 'Name'}, {data: 'data1', size: 100, type: 'json', name: 'Name'}];
  });

  it('should upload file', () => {
    const { uploader: { ref } } = useUploader({onSelectFile});
    expect(onSelectFile)
      .toHaveBeenCalledWith(files);
    expect(ref.current.setAttribute).toHaveBeenCalledWith('multiple', true);
  });

  it('should upload multiple files', () => {
    const { uploader: { ref } } = useUploader({onSelectFile, isMultiple: false});
    expect(onSelectFile).toHaveBeenCalledWith(files[0]);
    expect(ref.current.setAttribute).toHaveBeenCalledWith('multiple', false);
  });

  it('should not upload file with size more the maximum', () => {
    useUploader({onSelectFile, onError, maxSize: 10});
    expect(onSelectFile).not.toHaveBeenCalled();
    expect(onError).toHaveBeenCalledWith(new Error('Name file has size more then 10'));
  });

  it('should not upload more then 1 file', () => {
    useUploader({onSelectFile, onError, maxFiles: 1});
    expect(onSelectFile).not.toHaveBeenCalled();
    expect(onError).toHaveBeenCalledWith(new Error('Amount of selected files is more then 1'));
  });

  it('should not upload files with invalid type', () => {
    useUploader({onSelectFile, onError, validTypes: ['some type']});
    expect(onSelectFile).not.toHaveBeenCalled();
    expect(onError).toHaveBeenCalledWith(new Error('Name file has invalid type json'));
  });

  it('should not upload file without callback', () => {
    useUploader();
    expect(onSelectFile).not.toHaveBeenCalled();
  });

  it('should reset value of input', () => {
    const { uploader: { ref }, reset } = useUploader();
    expect(ref.current.value).toEqual('value');
    reset();
    expect(ref.current.value).toEqual('');
  });

});
