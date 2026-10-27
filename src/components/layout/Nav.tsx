import logo from '@/assets/brand/logo.svg'
import { navLinks } from '@/config/site'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useNavProgress } from '@/hooks/useNavProgress'
import { cn } from '@/lib/cn'

const sectionIds = navLinks.map((link) => link.id)

/**
 * Nav fixa, sempre com fundo creme sólido: o logo marrom precisa de um fundo claro
 * para aparecer bem, inclusive sobre as fotos do topo. A linha inferior surge
 * aos poucos conforme a rolagem, guiada pela variável CSS --nav-progress
 * (veja useNavProgress).
 */
export function Nav() {
  useNavProgress()
  const activeId = useActiveSection(sectionIds)

  return (
    <header
      className="fixed inset-x-0 top-0 z-40 text-ink"
      style={{
        backgroundColor: 'var(--color-paper)',
        borderBottom: '1px solid color-mix(in oklab, var(--color-ink) calc(var(--nav-progress, 0) * 18%), transparent)',
      }}
    >
      <div className="grid-wrap flex h-16 items-center justify-between">
        <a href="#topo" aria-label="LL Brownie’s: início">
          <img src={logo} alt="" width={850} height={556} className="h-12 w-auto" />
        </a>

        <nav aria-label="Seções da página" className="max-md:hidden">
          <ul className="flex gap-9 text-[13px]">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={activeId === link.id ? 'true' : undefined}
                  className={cn(
                    'underline decoration-1 underline-offset-[7px] transition-colors',
                    activeId === link.id ? 'decoration-accent' : 'decoration-transparent',
                    'fine-hover:decoration-current',
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a href="#cardapio" className="eyebrow md:hidden">
          Cardápio ↓
        </a>
      </div>
    </header>
  )
}
