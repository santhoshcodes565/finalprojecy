import { useState, useEffect } from 'react';
import { FALLBACK_IMAGE } from '../../constants/images';

export default function SafeImage({ src, alt, className = '', fallback = FALLBACK_IMAGE, ...props }) {
  const [imgSrc, setImgSrc] = useState(src || fallback);
  const [hasError, setHasError] = useState(false);

  // Update src when the prop changes (e.g. navigating between tours)
  useEffect(() => {
    if (src) {
      setImgSrc(src);
      setHasError(false);
    }
  }, [src]);

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
