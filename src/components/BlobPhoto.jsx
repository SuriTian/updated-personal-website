import useReveal from '../hooks/useReveal';
import './BlobPhoto.css';

const BlobPhoto = ({ src, alt, className = '', style, eager = false }) => {
    const ref = useReveal();

    return (
        <figure className={`blob-photo reveal ${className}`} ref={ref} style={style}>
            <img
                src={src}
                alt={alt}
                loading={eager ? 'eager' : 'lazy'}
                decoding="async"
            />
        </figure>
    );
};

export default BlobPhoto;
