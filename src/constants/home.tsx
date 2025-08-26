export interface Navlinks {
  name: string;
  link: string;
}

export const NAVLINKS: Navlinks[] = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "New",
    link: "/new",
  },
  {
    name: "Collections",
    link: "/collections",
  },
];

// Footer navigation links
export const FOOTER_NAVLINKS = {
  customer_service: [
    { name: "Help Center", link: "/help" },
    { name: "Shipping Info", link: "/shipping" },
    { name: "Returns", link: "/returns" },
    { name: "Size Guide", link: "/size-guide" },
    { name: "Track Order", link: "/track-order" },
  ],
  company: [
    { name: "About Us", link: "/about" },
    { name: "Careers", link: "/careers" },
    { name: "Press", link: "/press" },
    { name: "Sustainability", link: "/sustainability" },
  ],
  legal: [
    { name: "Privacy Policy", link: "/privacy" },
    { name: "Terms of Service", link: "/terms" },
    { name: "Cookie Policy", link: "/cookies" },
  ],
};


export const SVGS = {
    cart: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2"><path d="M3.742 18.555C4.942 20 7.174 20 11.64 20h.72c4.466 0 6.699 0 7.899-1.445m-16.517 0c-1.2-1.446-.788-3.64.035-8.03c.585-3.12.877-4.681 1.988-5.603M3.742 18.555Zm16.517 0c1.2-1.446.788-3.64-.035-8.03c-.585-3.12-.878-4.681-1.989-5.603m2.024 13.633ZM18.235 4.922C17.125 4 15.536 4 12.361 4h-.722c-3.175 0-4.763 0-5.874.922m12.47 0Zm-12.47 0Z"/><path stroke-linecap="round" d="M9.17 8a3.001 3.001 0 0 0 5.66 0"/></g></svg>,
    
    user: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-user-round-icon lucide-user-round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>,
    
    like: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-heart-icon lucide-heart"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/></svg>,
    
    bar: <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="M4 7h3m13 0h-9m9 10h-3M4 17h9m-9-5h16"/></svg>
    
    
}
