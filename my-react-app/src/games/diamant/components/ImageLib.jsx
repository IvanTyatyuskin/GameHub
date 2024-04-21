import { ImageInfo } from '../data'
import Image from '../../../Components/common/Image'

const ImageLib = ({ index }) => {
    const { alt, src, width, height, imageRendering } = ImageInfo[index];
    return (
        <Image alt={alt} src={src}
            height={height} width={width}
            imageRendering={imageRendering} />
    );
}

export default ImageLib;