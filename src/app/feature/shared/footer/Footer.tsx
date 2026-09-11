import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  BadgeCheck,
  Send,
  Sparkles,
} from "lucide-react";

function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.89h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94Z" />
    </svg>
  );
}
function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function TwitterIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.9 3H21.6L15.6 9.9 22.7 21H17.2L12.9 14.9 8 21H5.3L11.7 13.6 4.9 3H10.5L14.4 8.6 18.9 3Zm-1 16.2H19.4L7.1 4.7H5.5L17.9 19.2Z" />
    </svg>
  );
}
function YoutubeIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.5 7.2s-.22-1.56-.9-2.24c-.86-.9-1.82-.9-2.26-.96C16.2 3.75 12 3.75 12 3.75h-.01s-4.2 0-7.34.25c-.44.06-1.4.06-2.26.96-.68.68-.9 2.24-.9 2.24S1.25 9 1.25 10.8v1.4c0 1.8.24 3.6.24 3.6s.22 1.56.9 2.24c.86.9 1.98.87 2.48.97 1.8.17 7.13.25 7.13.25s4.2 0 7.34-.26c.44-.06 1.4-.06 2.26-.96.68-.68.9-2.24.9-2.24s.25-1.8.25-3.6v-1.4c0-1.8-.25-3.6-.25-3.6ZM9.75 14.6V8.9l5.75 2.86-5.75 2.85Z" />
    </svg>
  );
}

const FOOTER_COLUMNS = [
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
      { label: "Journal", href: "/blog" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "All hotels", href: "/hotels" },
      { label: "Popular destinations", href: "/hotels" },
      { label: "Deals & offers", href: "/deals" },
      { label: "Gift cards", href: "/gift-cards" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help center", href: "/support" },
      { label: "Cancellation options", href: "/cancellation" },
      { label: "Safety resource center", href: "/safety" },
      { label: "Contact us", href: "/contact" },
    ],
  },
  {
    title: "Partners",
    links: [
      { label: "List your property", href: "/partner" },
      { label: "Affiliate program", href: "/affiliate" },
      { label: "Travel agents", href: "/agents" },
      { label: "Corporate booking", href: "/corporate" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-forest-deep text-cream/70">
      {/* Newsletter band */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-gold-soft mb-2 flex items-center gap-2">
              <Sparkles size={14} />
              The Nestletter
            </p>
            <h3 className="font-serif text-2xl md:text-3xl text-cream">
              Get exclusive deals in your inbox
            </h3>
            <p className="text-sm mt-1.5 text-cream/60 max-w-md">
              Sign up and be the first to hear about member-only prices, secret
              stays, and travel notes from our editors.
            </p>
          </div>
          <form className="flex w-full md:w-auto max-w-md gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 md:w-72 px-4 py-3 rounded-full bg-white/5 border border-white/15 text-sm text-cream placeholder:text-cream/40 focus:outline-none focus:ring-2 focus:ring-gold"
            />
            <button
              type="submit"
              className="flex items-center gap-1.5 px-6 py-3 rounded-full bg-gold text-forest-deep text-sm font-semibold hover:bg-gold-soft transition-colors shrink-0"
            >
              Subscribe
              <Send size={15} />
            </button>
          </form>
        </div>
      </div>

      {/* Main columns */}
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-7 grid grid-cols-2 md:grid-cols-6 gap-8">
        {/* Brand column */}
        <div className="col-span-2 md:col-span-2">
          <span className="font-serif text-2xl font-bold tracking-tight text-cream">
            Nest<span className="italic text-gold">Stay</span>
          </span>
          <p className="text-sm mt-3 leading-relaxed max-w-xs text-cream/60">
            Book hotels, resorts, and homestays worldwide with verified reviews,
            secure payments, and instant confirmation.
          </p>
          <div className="flex flex-col gap-2 mt-5 text-sm text-cream/70">
            <div className="flex items-center gap-2">
              <Phone size={15} className="text-gold-soft" />
              <span>+880 1234-567890</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={15} className="text-gold-soft" />
              <span>support@Hotel NextStay.com</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={15} className="text-gold-soft" />
              <span>Dhaka, Bangladesh</span>
            </div>
          </div>
        </div>

        {/* Link columns */}
        {FOOTER_COLUMNS.map((col) => (
          <div key={col.title} className="col-span-1">
            <h4 className="text-cream font-semibold text-sm mb-4">
              {col.title}
            </h4>
            <ul className="flex flex-col gap-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/60 hover:text-gold-soft transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Trust badges */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-5 flex flex-wrap items-center justify-center md:justify-start gap-6 text-xs text-cream/50">
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={15} className="text-gold-soft" />
            Secure payments
          </div>
          <div className="flex items-center gap-1.5">
            <BadgeCheck size={15} className="text-gold-soft" />
            Verified properties
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={15} className="text-gold-soft" />
            Best price guarantee
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-cream/40 text-center md:text-left">
            © {new Date().getFullYear()} Hotel NextStay. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="text-xs text-cream/40 hover:text-gold-soft transition-colors"
            >
              Privacy policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-cream/40 hover:text-gold-soft transition-colors"
            >
              Terms of service
            </Link>
            <span className="text-white/10">|</span>
            <div className="flex items-center gap-3">
              <Link
                href="#"
                aria-label="Facebook"
                className="text-cream/50 hover:text-gold-soft transition-colors"
              >
                <FacebookIcon size={16} />
              </Link>
              <Link
                href="#"
                aria-label="Instagram"
                className="text-cream/50 hover:text-gold-soft transition-colors"
              >
                <InstagramIcon size={16} />
              </Link>
              <Link
                href="#"
                aria-label="Twitter"
                className="text-cream/50 hover:text-gold-soft transition-colors"
              >
                <TwitterIcon size={16} />
              </Link>
              <Link
                href="#"
                aria-label="Youtube"
                className="text-cream/50 hover:text-gold-soft transition-colors"
              >
                <YoutubeIcon size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
