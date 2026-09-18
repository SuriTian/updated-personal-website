import useActiveSection from '../hooks/useActiveSection';
import './Navbar.css'

const LINKS = [
    { id: 'hi', label: 'HI' },
    { id: 'about', label: 'ABOUT' },
    { id: 'experience', label: 'CO-OP' },
    { id: 'projects', label: 'PROJECTS' },
];

const SECTION_IDS = LINKS.map((link) => link.id);

const Navbar = () => {
    const active = useActiveSection(SECTION_IDS);

    return (
        <nav className="navbar" aria-label="Section navigation">
            <a className='navbar-left' href="#hi">
                Suri Tian
            </a>
            <div className='navbar-content'>
                <ul>
                    {LINKS.map(({ id, label }) => (
                        <li key={id}>
                            <a
                                href={`#${id}`}
                                className={active === id ? 'is-active' : undefined}
                                aria-current={active === id ? 'true' : undefined}
                            >
                                {label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
