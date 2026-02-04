import { Container } from "@/components/ui/container";
import { Github, Twitter, Linkedin } from "lucide-react";

const footerLinks = {
  Product: ["Features", "Pricing", "Documentation", "Changelog"],
  Company: ["About", "Blog", "Careers", "Contact"],
  Resources: ["Guides", "API Reference", "Status", "Support"],
  Legal: ["Privacy", "Terms", "Security"],
};

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="py-16 border-t border-border">
      <Container>
        <div className="grid md:grid-cols-6 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-highlight flex items-center justify-center">
                <span className="text-white font-bold text-sm">L</span>
              </div>
              <span className="font-semibold text-lg">LorientAI</span>
            </div>
            <p className="text-foreground-muted text-sm mb-4 max-w-xs">
              The Vercel for model training. ML infrastructure for the
              post-training era.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-foreground-muted hover:text-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-medium mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-foreground-muted hover:text-foreground transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-foreground-subtle">
            &copy; {new Date().getFullYear()} LorientAI. All rights reserved.
          </p>
          <p className="text-sm text-foreground-subtle">
            Built with care in San Francisco
          </p>
        </div>
      </Container>
    </footer>
  );
}
