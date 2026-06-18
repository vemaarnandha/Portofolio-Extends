import { Github, Mail, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const footerLinks = [
  { label: "Beranda", path: "/" },
  { label: "Proyek", path: "/projects" },
  { label: "Tentang", path: "/about" },
  { label: "Kontak", path: "/contact" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-arcane-900/50 bg-void-950 py-12 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <Link to="/admin/login" className="inline-flex items-center gap-2 text-2xl font-heading font-bold mb-6 group">
              <Sparkles className="h-6 w-6 text-arcane-500 group-hover:rotate-12 transition-transform duration-500" />
              <span className="text-gradient">ExFolio</span>
            </Link>
            <p className="text-arcane-300/70 font-body text-sm max-w-xs leading-relaxed">
              Membangun pengalaman digital yang modern dan performant. Dari Blitar untuk dunia.
            </p>
          </div>

          <div>
            <h4 className="font-body text-xs tracking-wider text-arcane-500 uppercase mb-6">Navigasi</h4>
            <ul className="space-y-4">
              {footerLinks.map(item => (
                <li key={item.path}>
                  <Link to={item.path} className="text-sm text-arcane-300/60 hover:text-enchant-400 transition-colors font-body">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-body text-xs tracking-wider text-arcane-500 uppercase mb-6">Hubungi</h4>
            <div className="flex gap-4">
              <a href="https://github.com/vemaarnandha" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-xl bg-arcane-900/50 flex items-center justify-center text-arcane-400 hover:bg-arcane-500 hover:text-void-950 transition-all duration-300 border border-arcane-800/50">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://wa.me/6281916635780" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-xl bg-arcane-900/50 flex items-center justify-center text-arcane-400 hover:bg-arcane-500 hover:text-void-950 transition-all duration-300 border border-arcane-800/50">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
              <a href="mailto:kologes4@gmail.com" className="h-10 w-10 rounded-xl bg-arcane-900/50 flex items-center justify-center text-arcane-400 hover:bg-arcane-500 hover:text-void-950 transition-all duration-300 border border-arcane-800/50">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-arcane-900/30 flex items-center justify-center gap-4">
          <p className="text-xs font-body text-arcane-300/50">
            &copy; {new Date().getFullYear()} Vema Arnandha. Hak cipta dilindungi.
          </p>
        </div>
      </div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-arcane-500/20 to-transparent" />
    </footer>
  );
}
