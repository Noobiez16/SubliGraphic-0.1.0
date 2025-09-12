import React from 'react';
import type { Theme } from '../types';

interface FooterProps {
    theme: Theme;
}

const Footer: React.FC<FooterProps> = ({ theme }) => {

    return (
        <footer className="w-full py-10 px-[5%] mt-16 bg-[--color-surface] text-[--color-on-surface-variant] border-t border-[--color-outline]">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-screen-xl mx-auto pb-8">
                {/* Column 1: Brand */}
                <div className="footer-column">
                    <h4 className="font-['Playfair_Display'] text-xl text-[--color-on-surface] mb-4">SubliGraphic</h4>
                    <p className="text-sm">Creativity without limits, sublimation without equal.</p>
                </div>
                
                {/* Column 2: Store Links */}
                <div className="footer-column">
                    <h4 className="font-['Playfair_Display'] text-xl text-[--color-on-surface] mb-4">Store</h4>
                    <ul className="space-y-2.5 text-sm">
                        <li><a href="#" className="no-underline text-[--color-on-surface-variant] hover:text-[--color-primary] transition-colors">Mugs</a></li>
                        <li><a href="#" className="no-underline text-[--color-on-surface-variant] hover:text-[--color-primary] transition-colors">Tumblers</a></li>
                        <li><a href="#" className="no-underline text-[--color-on-surface-variant] hover:text-[--color-primary] transition-colors">News</a></li>
                    </ul>
                </div>

                {/* Column 3: Support Links */}
                <div className="footer-column">
                    <h4 className="font-['Playfair_Display'] text-xl text-[--color-on-surface] mb-4">Support</h4>
                    <ul className="space-y-2.5 text-sm">
                        <li><a href="#" className="no-underline text-[--color-on-surface-variant] hover:text-[--color-primary] transition-colors">Frequently Asked Questions</a></li>
                        <li><a href="#" className="no-underline text-[--color-on-surface-variant] hover:text-[--color-primary] transition-colors">Contact</a></li>
                        <li><a href="#" className="no-underline text-[--color-on-surface-variant] hover:text-[--color-primary] transition-colors">Return Policy</a></li>
                    </ul>
                </div>

                {/* Column 4: Social Media */}
                <div className="footer-column">
                    <h4 className="font-['Playfair_Display'] text-xl text-[--color-on-surface] mb-4">Follow us</h4>
                    <div className="flex space-x-4">
                        <a href="#" aria-label="Facebook" className="text-[--color-on-surface-variant] hover:text-[--color-primary] transition-colors">
                           <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z"/></svg>
                        </a>
                        <a href="#" aria-label="Instagram" className="text-[--color-on-surface-variant] hover:text-[--color-primary] transition-colors">
                           <svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3z"/></svg>
                        </a>
                    </div>
                </div>
            </div>
            <div className="border-t border-[--color-outline] text-center pt-8 mt-8 text-sm">
                <p>&copy; 2024 SubliGraphic. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
