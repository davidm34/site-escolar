"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { 
  Menu, 
  X, 
  MapPin, 
  Phone, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram 
} from "lucide-react"
import { Button } from "@/components/ui/button"

const LOGO_URL = "/images/sonho_feliz_logo.png" 
const SCHOOL_NAME = "Escola Sonho Feliz"

const navLinks = [
  { href: "#sobre", label: "Ensino" },
  { href: "#ensino", label: "Sobre Nós" },
  { href: "#equipe", label: "Nossa Equipe" },
  { href: "#depoimentos", label: "Depoimentos" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 font-fredoka transition-shadow duration-300 ${scrolled ? 'shadow-md' : ''}`}>
      
      {/* BARRA SUPERIOR (Rosa) */}
      <div className="bg-[#E91E63] text-white py-2 px-6 lg:px-24 text-sm font-medium hidden md:block">
        <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 fill-white text-[#E91E63]" />
              <span>Rua Antônio Serapião, 298, Teofilândia-BA</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 fill-white text-[#E91E63]" />
              <span>(75) 99123-6691</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a href="#" className="hover:opacity-80 transition-opacity"><Facebook className="w-4 h-4 fill-white text-[#E91E63]" /></a>
            <a href="#" className="hover:opacity-80 transition-opacity"><Instagram className="w-4 h-4" /></a>
          </div>
        </div>
      </div>

      {/* BARRA PRINCIPAL (Navbar) */}
      <nav className="bg-white py-4 px-6 lg:px-24">
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
          
          {/* Logo + Nome da Escola */}
          <Link href="/" className="flex items-center gap-3 group">
             {LOGO_URL && (
                <Image
                  src={LOGO_URL}
                  alt={SCHOOL_NAME}
                  width={60} // Ajuste o tamanho da imagem se necessário
                  height={60}
                  className="h-12 w-auto object-contain"
                />
             )}
             {/* Adicionado o texto ao lado do logo */}
             <span className="text-xl md:text-2xl font-bold text-[#1a237e] group-hover:text-[#E91E63] transition-colors">
               {SCHOOL_NAME}
             </span>
          </Link>

          {/* Links Desktop */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#1a237e] text-[18px] font-bold hover:text-[#E91E63] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Botão Desktop */}
          <div className="hidden lg:block">
            <Button 
              className="bg-[#00E5FF] hover:bg-[#00bcd4] text-white rounded-full px-8 py-6 text-lg font-bold shadow-sm"
            >
              Contato
            </Button>
          </div>

          {/* Botão Mobile Toggle */}
          <button
            className="lg:hidden p-2 text-[#1a237e]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </nav>

      {/* MENU MOBILE */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl">
          <div className="px-6 py-6 space-y-4 flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#1a237e] text-lg font-bold hover:text-[#E91E63]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button className="bg-[#00E5FF] hover:bg-[#00bcd4] text-white rounded-full w-full py-6 text-lg font-bold mt-4">
              Contato
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}