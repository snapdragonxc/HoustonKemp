import React from 'react';
import { Link } from 'react-router-dom';
//
const Header = () => {
    return (
        <section className="section">
            <div className="container">
                <nav className="nav">
                    <div className="nav-left">
                        <Link to="/" className="nav-item"><h1 className="title is-4">Houston Kemp Diary</h1></Link>
                    </div>
                    <div className="nav-right">
                        <nav className="nav-item level is-mobile">
                            <a className="level-item" href="mailto:snapdragonxce@gmail.com" target="_blank" rel="noopener">
                                <span className="icon">
                                    <i className=""><svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" aria-hidden="true">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                    <polyline points="22,6 12,13 2,6"></polyline>
                                    </svg></i>
                                </span>
                            </a>
                            <a className="level-item" href="https://github.com/snapdragonxc" target="_blank" rel="noopener">
                                <span className="icon">
                                    <i className=""><svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" aria-hidden="true">
                                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                    </svg></i>
                                </span>
                            </a>
                        </nav>
                    </div>
                </nav>
            </div>
        </section>
    );
}
export default Header;
