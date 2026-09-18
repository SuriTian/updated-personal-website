import './Hi.css'
import BlobCluster from './BlobCluster';
import useReveal from '../hooks/useReveal';

import blob1 from '../assets/blobs/blob-1.webp';
import blob2 from '../assets/blobs/blob-2.webp';
import blob3 from '../assets/blobs/blob-3.webp';
import blob4 from '../assets/blobs/blob-4.webp';
import blob5 from '../assets/blobs/blob-5.webp';
import Decor from './Decor';
import uwSeal from '../assets/school.webp';
import webring from '../assets/se_webring_white.png';

const HERO_BLOBS = [
    { src: blob1, alt: 'Suri at orientation week, covered in purple paint', ar: 0.614, box: [0, 4, 15, 92], mobile: [0, 0, 46, 56], dur: '9s', delay: '0s', dx: '6px', dy: '14px', rot: '1.5deg' },
    { src: blob4, alt: 'Suri in a suit in front of office windows', ar: 1.445, box: [17, 0, 19, 46], mobile: [32, 62, 34, 36], dur: '12s', delay: '-2s', dx: '-6px', dy: '16px', rot: '-1deg' },
    { src: blob3, alt: 'Suri smiling, looking back over one shoulder', ar: 1.042, box: [21, 56, 11, 40], mobile: [0, 62, 30, 36], dur: '10s', delay: '-5s', dx: '7px', dy: '10px', rot: '2deg' },
    { src: blob2, alt: 'Suri with classmates at orientation week', ar: 0.729, box: [38, 10, 17, 82], mobile: [52, 4, 46, 56], dur: '11s', delay: '-3s', dx: '-8px', dy: '12px', rot: '-1.2deg' },
    { src: blob5, alt: 'Suri in a hard hat', ar: 1.818, box: [58, 12, 42, 76], mobile: [68, 62, 32, 36], dur: '8.5s', delay: '-6s', dx: '5px', dy: '11px', rot: '1.8deg' },
];

const Hi = () => {
    const titleRef = useReveal();

    return (
        <section className='hi' id="hi">
            <Decor eager src={webring} href="https://se-webring.xyz/" label="SE Webring" size="clamp(64px, 6.5vw, 110px)" position={{ left: '4%', top: '4%' }} float={{ dur: '10s', delay: '-1s', dx: '6px', dy: '12px', rot: '4deg' }} />
            <Decor eager src={uwSeal} alt="University of Waterloo seal" size="clamp(90px, 9vw, 150px)" tilt="8deg" desktopOnly position={{ right: '0%', top: '14%' }} float={{ dur: '8s', delay: '-4s', dx: '-5px', dy: '10px', rot: '-5deg' }} />
            <h1 className="hero-title reveal" ref={titleRef}>
                I'm Suri,{' '}
                <span className="hero-sub">
                    2A Software Engineering<br />{' '}@ the University of Waterloo
                </span>
            </h1>

            <BlobCluster items={HERO_BLOBS} eager />
        </section>
    );
};

export default Hi;
