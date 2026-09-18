import BlobPhoto from './BlobPhoto';
import './BlobCluster.css';

const BlobCluster = ({ items, eager = false }) => (
    <div className="blob-cluster">
        {items.map((item) => (
            <BlobPhoto
                key={item.src}
                src={item.src}
                alt={item.alt}
                eager={eager}
                className="blob-cluster-item"
                style={{
                    '--ar': item.ar,
                    '--x-d': item.box[0],
                    '--y-d': item.box[1],
                    '--w-d': item.box[2],
                    '--h-d': item.box[3],
                    '--x-m': item.mobile[0],
                    '--y-m': item.mobile[1],
                    '--w-m': item.mobile[2],
                    '--h-m': item.mobile[3],
                    '--float-dur': item.dur,
                    '--float-delay': item.delay,
                    '--float-dx': item.dx,
                    '--float-dy': item.dy,
                    '--float-rot': item.rot,
                }}
            />
        ))}
    </div>
);

export default BlobCluster;
