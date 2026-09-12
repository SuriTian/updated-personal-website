import './Footer.css'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-links">
                <a href="mailto:suri.tian@uwaterloo.ca">suri.tian@uwaterloo.ca</a>
                <a href="tel:+12898855726">289-885-5726</a>
                <a href="https://linkedin.com/in/suri-tian/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://github.com/SuriTian" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
            <p className="footer-copyright">© {new Date().getFullYear()} Suri Tian</p>
        </footer>
    );
};

export default Footer;
