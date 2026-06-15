import { Code2, Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-arcane-900/50 bg-void-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-lg font-heading font-semibold text-arcane-500">
            <Code2 className="h-5 w-5 text-arcane-500" />
            <span>MyPortfolio</span>
          </div>
          <p className="text-sm text-arcane-300/60 text-center">
            Dibangun dengan React, Hono & Turso. &copy; {new Date().getFullYear()}
          </p>
          <div className="flex items-center gap-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer"
              className="text-arcane-700 hover:text-arcane-400 transition-colors duration-200" aria-label="Github">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
              className="text-arcane-700 hover:text-arcane-400 transition-colors duration-200" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="mailto:email@example.com"
              className="text-arcane-700 hover:text-arcane-400 transition-colors duration-200" aria-label="Email">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
