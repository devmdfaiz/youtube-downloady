import Link from "next/link";

const links = [
  {
    title: "Home",
    href: "/admin",
  },
  {
    title: "Contact",
    href: "/admin/contact",
  },
  {
    title: "Policy",
    href: "/admin/policy",
  },
  {
    title: "Script",
    href: "/admin/script",
  },
  {
    title: "Footer",
    href: "/admin/footer",
  },
];

export default function Header() {
  return (
    <header className="pl-6 border-b border-primary/30 pb-5">
      <ul className="flex items-center justify-start h-fit w-fit gap-5">
        {links.map((link, i) => (
          <li key={i}>
            <Link href={link.href}>{link.title}</Link>
          </li>
        ))}
      </ul>
    </header>
  );
}
