import { useUploader } from './hooks/useUploader';
import { useDownloader } from './hooks/useDownloader';

import {
    useJSONDownloader,
    useZIPDownloader,
    useTextDownloader,
    useSVGDownloader,
    usePNGDownloader,
    usePDFDownloader,
    useMSWordDownloader,
    useMSExcelDownloader,
    useJPEGDownloader,
    useGIFDownloader,
    useFormDataDownloader,
    useBMPDownloader,
    useBinaryDownloader
} from './downloaders';

import {
    usePDFUploader,
    useImageUploader,
    useVideoUploader,
    useTextUploader,
    useModelUploader,
    useMediaUploader,
    useJSONUploader,
    useFormDataUploader,
    useFontUploader,
    useBinaryUploader,
    useAudioUploader,
    useMSExcelUploader,
    useMSWordUploader,
    useZIPUploader
} from './uploaders';

import { MIME_TYPES } from './constants';

const specific = {
    useJSONDownloader,
    useZIPDownloader,
    useTextDownloader,
    useSVGDownloader,
    usePNGDownloader,
    usePDFDownloader,
    useMSWordDownloader,
    useMSExcelDownloader,
    useJPEGDownloader,
    useGIFDownloader,
    useFormDataDownloader,
    useBMPDownloader,
    useBinaryDownloader,
    usePDFUploader,
    useImageUploader,
    useVideoUploader,
    useTextUploader,
    useModelUploader,
    useMediaUploader,
    useJSONUploader,
    useFormDataUploader,
    useFontUploader,
    useBinaryUploader,
    useAudioUploader,
    useMSExcelUploader,
    useMSWordUploader,
    useZIPUploader
};

export {
    useUploader,
    useDownloader,
    specific,
    MIME_TYPES
};
