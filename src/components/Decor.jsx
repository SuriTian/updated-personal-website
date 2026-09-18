import './Decor.css';

const Decor = ({ src, alt = '', href, label, size = '100px', tilt = '0deg', position, float = {}, desktopOnly = false, eager = false }) => {
    const Tag = href ? 'a' : 'div';
    const classes = ['decor', href && 'decor--link', desktopOnly && 'decor--desktop-only'].filter(Boolean).join(' ');
    const linkProps = href ? { href, target: '_blank', rel: 'noreferrer', 'aria-label': label } : {};

    return (
        <Tag
            {...linkProps}
            className={classes}
            aria-hidden={href || (src && alt) ? undefined : 'true'}
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
            {src ? <img src={src} alt={href ? '' : alt} loading={eager ? 'eager' : 'lazy'} decoding="async" /> : <span className="decor-placeholder" />}
        </Tag>
    );
};

export default Decor;
