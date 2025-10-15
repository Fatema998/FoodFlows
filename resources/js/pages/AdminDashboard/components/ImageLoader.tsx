import React, { useState, useEffect } from "react";

interface ImageLoaderProps {
  src?: string;
  alt: string;
  className?: string;
  fallback?: string;
}

const ImageLoader: React.FC<ImageLoaderProps> = ({
  src,
  alt,
  className,
  fallback = "/images/no-image.png",
}) => {
  const [imgSrc, setImgSrc] = useState(src || fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setImgSrc(src || fallback);
    setLoading(true);
  }, [src, fallback]);

  const handleLoad = () => setLoading(false);
  const handleError = () => {
    setImgSrc(fallback);
    setLoading(false);
  };

  return (
    <div className={`relative ${className}`}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded">
          <svg
            className="h-5 w-5 animate-spin text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
        </div>
      )}
      <img
        src={imgSrc}
        alt={alt}
        className={`rounded object-cover w-full h-full ${loading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
};

export default ImageLoader;
