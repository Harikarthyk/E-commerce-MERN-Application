import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './Footer.css';
function Footer() {
	return (
		<div className="footer">
			<div className="footer__wrapper">
				<div className="footer__bottomtext">&copy; hari_karthyk</div>
				<Link className="footer__link" to="/instagram">
					<FaInstagram />
				</Link>
				{/* <Link className="footer__link" to="/github">
					<FaGithub />
				</Link> */}
				<Link className="footer__link" to="/linkedin">
					<FaLinkedin />
				</Link>
				<Link className="footer__link" to="/facebook">
					<FaFacebook />
				</Link>
			</div>
		</div>
	);
}

export default Footer;
