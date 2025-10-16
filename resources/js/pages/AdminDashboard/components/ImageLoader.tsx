import React, { useEffect, useState } from 'react';

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
    fallback = '/images/no-image.png',
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
                <div className="absolute inset-0 flex items-center justify-center rounded bg-gray-100 dark:bg-gray-800">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-loader-circle-icon lucide-loader-circle animate-spin text-gray-300"
                    >
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                </div>
            )}
            <img
                src={imgSrc}
                alt={alt}
                className={`h-full w-full rounded object-cover ${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
                onLoad={handleLoad}
                onError={handleError}
            />
        </div>
    );
};

export default ImageLoader;
