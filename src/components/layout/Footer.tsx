import logo from '@/assets/brand/logo.svg'
import { navLinks, site } from '@/config/site'
import { ArrowLink } from '../ui/ArrowLink'

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="border-t border-ink bg-paper pt-14 pb-32 md:pb-20">
      <div className="grid-wrap grid gap-12 md:grid-cols-[5fr_3fr_3fr]">
        <div>
          <img
            src={logo}
            alt={site.name}
            width={850}
            height={556}
            className="mb-5 w-48"
          />
          <p className="max-w-[30ch] text-muted">
            {site.tagline}, feitos em casa em {site.city}.
          </p>
        </div>

        <nav aria-label="Rodapé">
          <p className="eyebrow mb-4 text-muted">Páginas</p>
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`} className="underline decoration-1 underline-offset-[6px] fine-hover:decoration-accent">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="eyebrow mb-4 text-muted">Perfil</p>
          <ArrowLink href={site.instagramUrl}>{site.instagramHandle}</ArrowLink>
        </div>
      </div>

      <div className="grid-wrap mt-14 flex flex-wrap justify-between gap-2 border-t border-ink/15 pt-6 text-sm text-muted">
        <span>© {year} {site.name}</span>
        <span>Feito com carinho =)</span>
      </div>
    </footer>
  )
}
