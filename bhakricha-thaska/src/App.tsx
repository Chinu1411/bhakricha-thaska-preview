import { useRef, useState, type FormEvent, type ReactNode } from 'react';
import { brand, products, gallery, navigation, type Category } from './config';
import { FoodMedia, Heritage } from './Visuals';

function SectionTitle({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return <div className="section-title"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{children}</div>;
}
function SocialLinks() {
  return <>{brand.socials.map(s => <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer">{s.label} ↗</a>)}</>;
}
function ContactForm() {
  const [status, setStatus] = useState('');
  const enabled = Boolean(brand.contact.email);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!enabled) return;
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Website enquiry from ${String(data.get('name'))}`);
    const body = encodeURIComponent(`Name: ${String(data.get('name'))}
Reply to: ${String(data.get('email'))}

${String(data.get('message'))}`);
    window.location.href = `mailto:${brand.contact.email}?subject=${subject}&body=${body}`;
    setStatus('An email draft was requested in your email app. Review it and press Send there. Nothing has been submitted by this website.');
  }
  return <form onSubmit={submit} className="contact-form">
    <h3>Start a conversation</h3>
    <p id="form-note">{enabled ? 'This form opens your email app; it does not send or store your message.' : 'Enquiries are not open yet. The owner needs to configure a contact email.'}</p>
    <label htmlFor="name">Your name</label><input id="name" name="name" autoComplete="name" maxLength={100} required disabled={!enabled}/>
    <label htmlFor="email">Your email</label><input id="email" name="email" type="email" autoComplete="email" maxLength={200} required disabled={!enabled}/>
    <label htmlFor="message">Your message</label><textarea id="message" name="message" rows={4} maxLength={1500} required disabled={!enabled}/>
    <button className="button" type="submit" disabled={!enabled} aria-describedby="form-note">Open email draft ↗</button>
    <p className="form-status" role="status">{status}</p>
  </form>;
}

export default function App() {
  const [category, setCategory] = useState<Category | 'All'>('All');
  const [selected, setSelected] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);
  const mobileNav = useRef<HTMLDetailsElement>(null);
  const categories: (Category | 'All')[] = ['All', 'Signature', 'Extra punch', 'Sharing'];
  const visible = products.filter(p => category === 'All' || p.category === category);
  const selectedPhoto = gallery[selected];
  const contact = brand.contact;
  function openPhoto(index: number, trigger: HTMLButtonElement) {
    setSelected(index); lastTrigger.current = trigger; dialog.current?.showModal();
  }
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header">
      <div className="container header-inner">
        <a href="#home" className="brand-link" aria-label="Bhakricha Thaska home">
          <img src={brand.logo} alt="" width="62" height="62"/>
          <span><span lang="mr">{brand.marathi}</span><small>{brand.name}</small></span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">{navigation.map(n => <a key={n.href} href={n.href}>{n.label}</a>)}</nav>
        <details ref={mobileNav} className="mobile-nav"><summary>Menu <span aria-hidden="true">☰</span></summary>
          <nav aria-label="Mobile navigation">{navigation.map(n => <a key={n.href} href={n.href} onClick={() => { if (mobileNav.current) mobileNav.current.open = false; }}>{n.label}</a>)}</nav>
        </details>
      </div>
    </header>
    <main id="main">
      <section id="home" className="hero section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Solapur inspired. Unmistakably bold.</p>
            <h1 lang="mr">भाकरीचा<br/><span>ठसका</span></h1>
            <p className="english-name">{brand.name}</p>
            <p className="tagline">{brand.tagline}</p>
            <p className="hero-description">A familiar bhakri. A fearless new crunch. Tomato, onion, sev and spicy masala come together in a bold, Maharashtrian-inspired bite.</p>
            <div className="actions"><a className="button" href="#menu">Explore our menu <span aria-hidden="true">↗</span></a><a className="text-link" href="#story">Our story <span aria-hidden="true">→</span></a></div>
          </div>
          <div className="hero-visual"><Heritage/><div className="hero-food"><FoodMedia image={brand.heroImage} priority/></div><div className="roundel">भाकरी<br/><span>with a twist</span></div></div>
        </div>
        <div className="flavour-strip" aria-label="Brand flavours"><span>भाकरी</span><i>✦</i><span>CRUNCH</span><i>✦</i><span>झणझणीत</span><i>✦</i><span>SOLAPUR INSPIRED</span></div>
      </section>
      <section id="menu" className="section container">
        <SectionTitle eyebrow="The signature menu" title="Big crunch. Bold character."><p>A bhakri-first take on a loaded, flavour-packed bite.</p></SectionTitle>
        {products.some(p => p.sample) && <p className="notice">Preview menu: items marked “Sample concept” are proposals, not a confirmed menu. Prices have not been supplied.</p>}
        <div className="filters" role="group" aria-label="Filter menu by category">{categories.map(c => <button key={c} type="button" aria-pressed={category === c} onClick={() => setCategory(c)}>{c}</button>)}</div>
        <p className="sr-only" role="status">{visible.length} menu items shown</p>
        <div className="product-grid">{visible.map(p => <article key={p.id} className="product-card">
          <div className="product-image"><FoodMedia image={p.image} variant={p.variant}/></div>
          <div className="product-body"><p className="eyebrow">{p.category}{p.sample ? ' · Sample concept' : ''}</p><h3>{p.name}</h3><p lang="mr" className="marathi-label">{p.marathi}</p><p>{p.description}</p><div className="price">{p.price === null ? 'Price to be confirmed' : new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 }).format(p.price)}</div></div>
        </article>)}</div>
      </section>
      <section id="story" className="story section">
        <div className="container story-grid">
          <div className="story-art"><img src={brand.logo} alt="Original भाकरीचा ठसका brand artwork with fort, sun, red flag and chilli" width="1080" height="1080" loading="lazy"/></div>
          <div><p className="eyebrow">Our inspiration</p><h2>Rooted in bhakri.<br/>Reimagined for today.</h2><p>भाकरीचा ठसका is a modern Maharashtrian food concept inspired by Solapur’s bold flavours and the familiar place of bhakri in a meal.</p><p>Our idea brings crunchy Solapuri bhakri together with tomato, onion, sev and spicy masala: traditional inspiration, with a fresh way to enjoy the crunch.</p><p>This is the brand’s inspiration—not a claim about its founding date, family history or years in business.</p><a className="text-link" href="#contact">Let’s talk flavour →</a></div>
        </div>
      </section>
      <section className="section container" aria-labelledby="highlights-title">
        <div className="section-title"><p className="eyebrow">The Thaska character</p><h2 id="highlights-title">Tradition, with a little attitude.</h2></div>
        <div className="highlights">{[
          ['01', 'Bold flavours', 'Tomato, onion, sev and spicy masala—the flavour vocabulary behind the concept.'],
          ['02', 'Crunch comes first', 'Crunchy bhakri is the centre of the idea, not an afterthought.'],
          ['03', 'Traditional inspiration', 'A Maharashtrian point of view, with Solapur at the heart of the brand.'],
          ['04', 'A modern expression', 'Familiar ingredients meet a playful, loaded presentation.'],
        ].map(([n, title, text]) => <article key={n}><span>{n}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>
      <section id="gallery" className="gallery-section section">
        <div className="container"><SectionTitle eyebrow="A taste of the visual world" title="Made to catch your eye."><p>Original concept illustrations for now. Real product photographs can replace them in one configuration file.</p></SectionTitle>
          <div className="gallery-grid">{gallery.map((item, index) => <button type="button" className="gallery-item" key={item.title} aria-label={`Enlarge ${item.title}`} onClick={e => openPhoto(index, e.currentTarget)}><FoodMedia image={item.image} variant={item.variant}/><span className="gallery-label">{item.title}<span aria-hidden="true">↗</span></span></button>)}</div>
        </div>
      </section>
      <section id="contact" className="section container contact-grid">
        <div><p className="eyebrow">Come for the crunch</p><h2>Let’s make<br/>some ठसका.</h2><p>For menu enquiries, collaborations or a conversation about the brand.</p><dl className="contact-details">
          <div><dt>Email</dt><dd>{contact.email ? <a href={`mailto:${contact.email}`}>{contact.email}</a> : 'To be announced'}</dd></div>
          <div><dt>Phone</dt><dd>{contact.phoneE164 ? <a href={`tel:${contact.phoneE164}`}>{contact.phoneDisplay || contact.phoneE164}</a> : 'To be announced'}</dd></div>
          <div><dt>Location</dt><dd>{contact.address || 'Location to be announced'}{contact.mapUrl && <a className="map-link" href={contact.mapUrl} target="_blank" rel="noopener noreferrer">View map ↗</a>}</dd></div>
          <div><dt>Hours</dt><dd>{contact.hours.length ? contact.hours.map(h => <div key={h}>{h}</div>) : 'Hours to be announced'}</dd></div>
        </dl><div className="social-links"><SocialLinks/></div></div><ContactForm/>
      </section>
    </main>
    <footer><div className="container footer-grid"><div><img src={brand.logo} width="110" height="110" alt="Bhakricha Thaska original logo" loading="lazy"/><p lang="mr">{brand.marathi}</p><p>{brand.name}</p><p>{brand.tagline}</p></div><nav aria-label="Footer navigation">{navigation.map(n => <a key={n.href} href={n.href}>{n.label}</a>)}<SocialLinks/></nav><p className="footer-note">Inspired by Solapur.<br/>Designed around the crunch.<br/><br/>© {new Date().getFullYear()} {brand.name}</p></div></footer>
    <dialog ref={dialog} className="lightbox" aria-labelledby="lightbox-title" onClose={() => lastTrigger.current?.focus()} onClick={e => { if (e.target === e.currentTarget) dialog.current?.close(); }}>
      <div className="lightbox-inner"><button type="button" className="close-button" onClick={() => dialog.current?.close()} autoFocus>Close ×</button><FoodMedia key={selected} image={selectedPhoto.image} variant={selectedPhoto.variant}/><h2 id="lightbox-title">{selectedPhoto.title}</h2><p>{selectedPhoto.caption}</p></div>
    </dialog>
  </>;
}
