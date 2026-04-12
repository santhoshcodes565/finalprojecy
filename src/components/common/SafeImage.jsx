import { useState } from 'react';
import { FALLBACK_IMAGE } from '../../constants/images';

export default function SafeImage({ src, alt, className = '', fallback = FALLBACK_IMAGE, ...props }) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallback);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={handleError}
      {...props}
    />
  );
}
