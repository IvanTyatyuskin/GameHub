import React from 'react';
import testImg from '../../assets/react.svg'

const Image = ({ alt='1', src = testImg, width='24px', height='24px', imageRendering = auto }) => {
    return (
        <img alt={alt} src={src} width={width} height={height} style={{ imageRendering }} />
    )
}

export default Image;