import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube } from "lucide-react"

const LOGO_URL = "/images/sonho_feliz_logo.png"

const footerLinks = {
  navigation: [
    { label: "Início", href: "/" },
    { label: "Sobre a Escola", href: "#sobre" },
    { label: "Nossa Equipe", href: "#equipe" },
  ],
  social: [
    { label: "Instagram", href: "https://www.instagram.com/fsonho/", icon: Instagram },
    { label: "Facebook", href: "https://www.facebook.com/escolasonhofeliz.com.br", icon: Facebook },
  ]
}

export function Footer() {
  return (
    <footer id="contato" className="bg-[#1a237e] text-white pt-20 pb-10 px-6 lg:px-8 font-fredoka rounded-t-[0px]">
      <div className="mx-auto max-w-[1350px]">
        
        {/* Mudei de lg:grid-cols-4 para lg:grid-cols-3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          
          {/* Coluna 1: Sobre a Escola */}
          <div className="col-span-1">
            <Link href="/" className="inline-block mb-6 bg-white p-3 rounded-2xl">
              {LOGO_URL ? (
                <Image
                  src={LOGO_URL}
                  alt="Escola Sonho Feliz"
                  width={150}
                  height={50}
                  className="h-12 w-auto"
                />
              ) : (
                 <span className="text-xl font-bold text-[#E91E63]">Sonho Feliz</span>
              )}
            </Link>
            <p className="text-sm text-white/80 leading-relaxed mb-6 font-medium">
              Formando cidadãos para o mundo com amor, inovação e excelência acadêmica há mais de 20 anos.
            </p>
            
            <div className="flex gap-3">
              {footerLinks.social.map((social) => (
                <a 
                  key={social.label} 
                  href={social.href}
                  className="w-10 h-10 bg-white/10 hover:bg-[#E91E63] rounded-full flex items-center justify-center transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Coluna 2: Navegação (Centralizada visualmente pela lógica de 3 colunas) */}
          <div className="lg:pl-10"> {/* Adicionei um padding left para afastar um pouco */}
            <h4 className="text-lg font-bold text-[#00E5FF] mb-6">Explorar</h4>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white hover:translate-x-1 transition-all inline-block text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3: Contato */}
          <div>
            <h4 className="text-lg font-bold text-[#E91E63] mb-6">Fale Conosco</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#E91E63] shrink-0 mt-1" />
                <span className="text-sm text-white/80">
                  Rua Antônio Serapião, 298, Teofilândia-BA
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#E91E63] shrink-0" />
                <span className="text-sm text-white/80">(75) 99123-6691</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#E91E63] shrink-0" />
                <span className="text-sm text-white/80">contato@sonhofeliz.edu</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Rodapé Inferior */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} Escola Sonho Feliz. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}