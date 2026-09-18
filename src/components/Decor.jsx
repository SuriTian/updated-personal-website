import './Decor.css';

const Decor = ({ src, alt = '', size = '100px', tilt = '0deg', position, float = {} }) => (
    <div
        className="decor"
        aria-hidden={src && alt ? undefined : 'true'}
        style={{
            ...position,
            '--size': size,
            '--tilt': tilt,
            '--float-dur': float.dur,
            '--float-delay': float.delay,
            '--float-dx': float.dx,
            '--float-dy': float.dy,
            '--float-rot': float.rot,
        }}
    >
        {src ? <img src={src} alt={alt} loading="lazy" decoding="async" /> : <span className="decor-placeholder" />}
    </div>
);

export default Decor;
