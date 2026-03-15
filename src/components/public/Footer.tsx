import { Icon } from '@iconify/react'
import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: 'carbon:logo-instagram', href: '#', label: 'Instagram' },
    { icon: 'carbon:logo-facebook', href: '#', label: 'Facebook' },
    { icon: 'carbon:logo-youtube', href: '#', label: 'YouTube' },
    { icon: 'carbon:logo-discord', href: '#', label: 'Discord' },
  ]

  const quickLinks = [
    { href: '#home', label: 'Home' },
    { href: '#turnamen', label: 'Turnamen' },
    { href: '#about', label: 'About' },
    { href: '#hadiah', label: 'Hadiah' },
    { href: '#cara-daftar', label: 'Cara Daftar' },
    { href: '#faq', label: 'FAQ' },
  ]

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Icon icon="game-icons:trophy" className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold">MLBB Tournament</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Turnamen Mobile Legends terbesar dan paling bergengsi. 
              Buktikan skill kamu dan raih hadiah jutaan rupiah!
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-btn bg-gray-800 hover:bg-primary flex items-center justify-center transition-colors duration-200"
                >
                  <Icon icon={social.icon} className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Kontak</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Icon icon="carbon:email" className="w-5 h-5 text-primary mt-0.5" />
                <span className="text-gray-400">info@mlbbtournament.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <Icon icon="carbon:phone" className="w-5 h-5 text-primary mt-0.5" />
                <span className="text-gray-400">+62 812 3456 7890</span>
              </li>
              <li className="flex items-start space-x-3">
                <Icon icon="carbon:location" className="w-5 h-5 text-primary mt-0.5" />
                <span className="text-gray-400">Jakarta, Indonesia</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} MLBB Tournament. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link href="#" className="text-gray-400 hover:text-primary transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-primary transition-colors duration-200">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
