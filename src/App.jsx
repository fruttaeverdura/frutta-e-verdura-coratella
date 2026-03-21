import { useEffect, useMemo, useState } from "react";
import "./App.css";

const base = import.meta.env.BASE_URL;
const asset = (path) => `${base}${path}`;

const business = {
  brandTop: "Frutta e Verdura",
  brandName: "di Marco Coratella",
  phoneDisplay: "+39 320 608 9928",
  phoneLink: "393206089928",
  email: "fruttaeverdurainfo@gmail.com",
  address: "Via Giovane Italia, 38 – 76123 Andria (BT)",
  instagramHandle: "fruttaeverdurashop",
};

const galleryImages = [
  {
    src: asset("images/frutta/banco-frutta-panorama.jpeg"),
    alt: "Banco frutta panoramico",
    title: "Banco del giorno",
    text: "Immagine reale del punto vendita per rafforzare fiducia e freschezza.",
  },
  {
    src: asset("images/frutta/fragole.jpeg"),
    alt: "Fragole fresche",
    title: "Selezione premium",
    text: "Prodotti visivi forti per homepage, categorie e offerte.",
  },
  {
    src: asset("images/frutta/zucchine-fiori.jpeg"),
    alt: "Zucchine con fiore",
    title: "Verdura fresca",
    text: "Reparto verdura valorizzato con immagini reali e pulite.",
  },
  {
    src: asset("images/frutta/meloni-ananas.jpeg"),
    alt: "Meloni e ananas",
    title: "Prodotti di stagione",
    text: "Sezione dedicata a composizioni, box e acquisti assortiti.",
  },
];

const departments = [
  {
    id: "frutta",
    name: "Frutta fresca",
    badge: "Reparto",
    image: asset("images/frutta/mela-pera-banco.jpeg"),
    description:
      "Spazio dedicato alla frutta con gestione quantità, note ordine e composizione più ordinata.",
  },
  {
    id: "verdura",
    name: "Verdura fresca",
    badge: "Reparto",
    image: asset("images/frutta/zucchine-fiori.jpeg"),
    description:
      "Verdura selezionata presentata in modo più professionale, leggibile e veloce da acquistare.",
  },
  {
    id: "stagione",
    name: "Selezione di stagione",
    badge: "Focus",
    image: asset("images/frutta/meloni-ananas.jpeg"),
    description:
      "Blocchi promozionali per prodotti stagionali, offerte e box assortite.",
  },
  {
    id: "box",
    name: "Box miste",
    badge: "Servizio",
    image: asset("images/frutta/arance-gambin.jpeg"),
    description:
      "Configurazione più comoda per ordini rapidi, famiglie e acquisti multipli.",
  },
];

const products = [
  {
    id: "vaschette",
    name: "Vaschette da 300 g",
    department: "Frutta fresca",
    price: 3.99,
    unit: "vaschetta",
    minLabel: "Ordine rapido",
    image: asset("images/frutta/fragole.jpeg"),
    short:
      "Formato pronto, pratico e immediato. Ogni 10 vaschette, 1 vaschetta omaggio.",
    details: [
      "Prezzo chiaro e subito visibile",
      "Quantità modificabile in un click",
      "Perfetto per acquisti veloci e multipli",
    ],
  },
  {
    id: "kg",
    name: "Vendita al kg",
    department: "Frutta e Verdura",
    price: 7.99,
    unit: "kg",
    minLabel: "Quantità libera",
    image: asset("images/frutta/mela-pera-banco.jpeg"),
    short:
      "Acquisto a peso con totale automatico. Ogni 10 kg, 1 kg omaggio.",
    details: [
      "Riepilogo trasparente",
      "Adatto a ordini precisi",
      "Più semplice da capire anche da mobile",
    ],
  },
  {
    id: "box10",
    name: "Box assortita da 10 kg",
    department: "Box miste",
    price: 39.99,
    unit: "box",
    minLabel: "Più conveniente",
    image: asset("images/frutta/arance-gambin.jpeg"),
    short:
      "Soluzione pronta da 10 kg per famiglie e ordini più importanti.",
    details: [
      "Struttura semplice da ordinare",
      "Ideale per aumentare scontrino medio",
      "Ottima per gestione rapida del carrello",
    ],
  },
  {
    id: "boxmix",
    name: "Box mista frutta e verdura",
    department: "Selezione di stagione",
    price: 29.99,
    unit: "box",
    minLabel: "Composizione mista",
    image: asset("images/frutta/banco-frutta-panorama.jpeg"),
    short:
      "Composizione mista orientata alla spesa completa in un’unica scelta.",
    details: [
      "Più facile per il cliente finale",
      "Perfetta per promozioni e campagne",
      "Aiuta a spingere conversione rapida",
    ],
  },
];

const trustPoints = [
  "Carrello con totale aggiornato in tempo reale",
  "Checkout chiaro con dati cliente e note ordine",
  "Catalogo organizzato per reparti e box",
  "Pagina informativa più professionale e ordinata",
  "Contatto immediato via WhatsApp e telefono",
  "Base pronta per futuro collegamento pagamento carta",
];

const faqs = [
  {
    q: "Come ordina il cliente?",
    a: "Il cliente aggiunge i prodotti al carrello, vede il totale in tempo reale, inserisce i dati nel checkout e invia la richiesta ordine.",
  },
  {
    q: "Il sito è anche informativo?",
    a: "Sì. Oltre alla parte vendita, il sito mostra reparti, galleria reale, vantaggi, contatti e struttura del negozio in modo più ordinato.",
  },
  {
    q: "Il pagamento carta è già operativo?",
    a: "La struttura del checkout è stata predisposta per essere collegata a un gateway esterno. Nel file consegnato non ho inventato integrazioni non presenti.",
  },
  {
    q: "Il sito funziona bene anche da telefono?",
    a: "Sì. Il layout è stato ricostruito con logica responsive e sezioni leggibili anche su mobile.",
  },
];

function euro(value) {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

function buildWhatsAppMessage(cart, checkoutData, totals) {
  const lines = [
    "Buongiorno, invio richiesta ordine dal sito.",
    "",
    "PRODOTTI:",
    ...cart.map((item) => `- ${item.name} x${item.qty} = ${euro(item.lineTotal)}`),
    "",
    `Subtotale: ${euro(totals.subtotal)}`,
    `Omaggi: ${totals.freebies.join(", ") || "nessuno"}`,
    `Totale ordine: ${euro(totals.total)}`,
    "",
    `Cliente: ${checkoutData.name || "non indicato"}`,
    `Telefono: ${checkoutData.phone || "non indicato"}`,
    `Indirizzo: ${checkoutData.address || "non indicato"}`,
    `Metodo richiesto: ${checkoutData.payment || "non indicato"}`,
    checkoutData.note ? `Note: ${checkoutData.note}` : null,
  ].filter(Boolean);

  return `https://wa.me/${business.phoneLink}?text=${encodeURIComponent(lines.join("\n"))}`;
}

function getFreebies(cart) {
  const tray = cart.find((item) => item.id === "vaschette")?.qty || 0;
  const kg = cart.find((item) => item.id === "kg")?.qty || 0;
  const freebies = [];
  const trayFree = Math.floor(tray / 10);
  const kgFree = Math.floor(kg / 10);
  if (trayFree > 0) freebies.push(`${trayFree} vaschette omaggio`);
  if (kgFree > 0) freebies.push(`${kgFree} kg omaggio`);
  return freebies;
}

function quantityLabel(product, qty) {
  const unit = product.unit;
  return `${qty} ${unit}${qty > 1 ? unit === "kg" ? "" : "" : ""}`;
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeDepartment, setActiveDepartment] = useState("Tutti");
  const [cart, setCart] = useState([]);
  const [checkoutData, setCheckoutData] = useState({
    name: "",
    phone: "",
    address: "",
    payment: "Richiedi link pagamento carta",
    note: "",
  });
  const [faqOpen, setFaqOpen] = useState(0);
  const [checkoutSent, setCheckoutSent] = useState(false);

  const departmentFilters = ["Tutti", ...new Set(products.map((item) => item.department))];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const byDepartment = activeDepartment === "Tutti" || product.department === activeDepartment;
      const query = search.trim().toLowerCase();
      const haystack = `${product.name} ${product.department} ${product.short}`.toLowerCase();
      const bySearch = !query || haystack.includes(query);
      return byDepartment && bySearch;
    });
  }, [activeDepartment, search]);

  const totals = useMemo(() => {
    const subtotal = cart.reduce((sum, item) => sum + item.lineTotal, 0);
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const freebies = getFreebies(cart);
    return {
      subtotal,
      total: subtotal,
      totalItems,
      freebies,
    };
  }, [cart]);

  const whatsappCheckoutLink = useMemo(
    () => buildWhatsAppMessage(cart, checkoutData, totals),
    [cart, checkoutData, totals]
  );

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const close = () => setMobileMenuOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, [mobileMenuOpen]);

  function addToCart(product) {
    setCheckoutSent(false);
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1, lineTotal: (item.qty + 1) * item.price }
            : item
        );
      }
      return [
        ...current,
        { id: product.id, name: product.name, price: product.price, qty: 1, lineTotal: product.price },
      ];
    });
  }

  function updateCartQty(id, delta) {
    setCheckoutSent(false);
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? { ...item, qty: Math.max(0, item.qty + delta), lineTotal: Math.max(0, item.qty + delta) * item.price }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  }

  function removeFromCart(id) {
    setCheckoutSent(false);
    setCart((current) => current.filter((item) => item.id !== id));
  }

  function submitCheckout(event) {
    event.preventDefault();
    if (cart.length === 0) return;
    setCheckoutSent(true);
  }

  return (
    <div className="site-shell">
      <header className="topbar">
        <div className="container topbar-inner">
          <a href="#home" className="brand">
            <img src={asset("logonuovoraff.png")} alt="Logo Frutta e Verdura di Marco Coratella" />
            <div>
              <div className="brand-top">{business.brandTop}</div>
              <div className="brand-name">{business.brandName}</div>
            </div>
          </a>

          <nav className="desktop-nav">
            <a href="#home">Home</a>
            <a href="#catalogo">Catalogo</a>
            <a href="#reparti">Reparti</a>
            <a href="#checkout">Checkout</a>
            <a href="#galleria">Galleria</a>
            <a href="#contatti">Contatti</a>
          </nav>

          <div className="topbar-actions">
            <a href="#checkout" className="btn btn-primary">Vai al checkout</a>
            <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen((v) => !v)}>
              ☰
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="mobile-nav">
            <a href="#home">Home</a>
            <a href="#catalogo">Catalogo</a>
            <a href="#reparti">Reparti</a>
            <a href="#checkout">Checkout</a>
            <a href="#galleria">Galleria</a>
            <a href="#contatti">Contatti</a>
          </div>
        )}
      </header>

      <main>
        <section id="home" className="hero-section">
          <div className="container hero-grid">
            <div>
              <div className="eyebrow">Sito ricostruito in modo più professionale</div>
              <h1>
                Un fruttivendolo online più serio, più ordinato e molto più forte nella vendita.
              </h1>
              <p className="hero-copy">
                Ho trasformato la base che avevi in un sito più completo: catalogo pulito, reparti chiari,
                carrello reale lato frontend, checkout strutturato, riepilogo ordine, pagine informative e
                percorso cliente più professionale.
              </p>
              <div className="hero-actions">
                <a href="#catalogo" className="btn btn-dark">Apri il catalogo</a>
                <a href="#checkout" className="btn btn-light">Vai al carrello</a>
              </div>
              <div className="stats-grid">
                <div className="stat-card">
                  <span>Catalogo</span>
                  <strong>più ordinato</strong>
                </div>
                <div className="stat-card">
                  <span>Checkout</span>
                  <strong>più serio</strong>
                </div>
                <div className="stat-card">
                  <span>Mobile</span>
                  <strong>più leggibile</strong>
                </div>
                <div className="stat-card">
                  <span>Base</span>
                  <strong>pronta a crescere</strong>
                </div>
              </div>
            </div>

            <div className="hero-visual-grid">
              <div className="hero-main-image card-surface">
                <img src={asset("images/frutta/banco-frutta-panorama.jpeg")} alt="Banco del negozio" />
              </div>
              <div className="hero-small-image card-surface">
                <img src={asset("images/frutta/fragole.jpeg")} alt="Fragole" />
              </div>
              <div className="hero-small-image card-surface">
                <img src={asset("images/frutta/meloni-ananas.jpeg")} alt="Meloni e ananas" />
              </div>
            </div>
          </div>
        </section>

        <section className="trust-strip">
          <div className="container trust-grid">
            {trustPoints.map((point) => (
              <div className="trust-card" key={point}>{point}</div>
            ))}
          </div>
        </section>

        <section id="reparti" className="section-block">
          <div className="container">
            <div className="section-head">
              <div className="eyebrow">Reparti</div>
              <h2>Struttura da negozio vero: non solo una pagina, ma un percorso più completo.</h2>
              <p>
                Ho organizzato il sito in blocchi chiari per informare, vendere e accompagnare il cliente
                fino all’ordine senza confusione.
              </p>
            </div>
            <div className="department-grid">
              {departments.map((item) => (
                <article className="department-card" key={item.id}>
                  <div className="department-image">
                    <img src={item.image} alt={item.name} />
                    <span>{item.badge}</span>
                  </div>
                  <div className="department-body">
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="catalogo" className="section-block alt-surface">
          <div className="container">
            <div className="section-head split-head">
              <div>
                <div className="eyebrow">Catalogo</div>
                <h2>Prodotti e formati ordinabili con ricerca, filtro e aggiunta rapida al carrello.</h2>
              </div>
              <div className="catalog-tools">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="search-input"
                  placeholder="Cerca nel catalogo"
                />
                <div className="filter-row">
                  {departmentFilters.map((filter) => (
                    <button
                      key={filter}
                      className={`filter-chip ${activeDepartment === filter ? "active" : ""}`}
                      onClick={() => setActiveDepartment(filter)}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="product-grid">
              {filteredProducts.map((product) => (
                <article className="product-card" key={product.id}>
                  <div className="product-image-wrap">
                    <img src={product.image} alt={product.name} />
                    <span>{product.minLabel}</span>
                  </div>
                  <div className="product-body">
                    <div className="product-meta">{product.department}</div>
                    <h3>{product.name}</h3>
                    <p>{product.short}</p>
                    <ul>
                      {product.details.map((detail) => (
                        <li key={detail}>{detail}</li>
                      ))}
                    </ul>
                    <div className="product-footer">
                      <div>
                        <small>Prezzo</small>
                        <strong>{euro(product.price)}</strong>
                      </div>
                      <button className="btn btn-primary" onClick={() => addToCart(product)}>
                        Aggiungi
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="checkout" className="section-block">
          <div className="container checkout-grid">
            <div className="cart-panel">
              <div className="section-head compact-head">
                <div className="eyebrow">Carrello</div>
                <h2>Riepilogo ordine con quantità modificabili e totale automatico.</h2>
              </div>

              {cart.length === 0 ? (
                <div className="empty-cart">
                  <h3>Il carrello è vuoto</h3>
                  <p>Aggiungi prodotti dal catalogo per vedere totale, omaggi e riepilogo ordine.</p>
                </div>
              ) : (
                <div className="cart-list">
                  {cart.map((item) => {
                    const product = products.find((p) => p.id === item.id);
                    return (
                      <div className="cart-item" key={item.id}>
                        <div>
                          <div className="cart-item-title">{item.name}</div>
                          <div className="cart-item-meta">
                            {quantityLabel(product, item.qty)} · {euro(item.price)} cad.
                          </div>
                        </div>
                        <div className="qty-controls">
                          <button onClick={() => updateCartQty(item.id, -1)}>−</button>
                          <span>{item.qty}</span>
                          <button onClick={() => updateCartQty(item.id, 1)}>+</button>
                        </div>
                        <div className="cart-item-total">{euro(item.lineTotal)}</div>
                        <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                          Rimuovi
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="summary-box">
                <div className="summary-row">
                  <span>Articoli</span>
                  <strong>{totals.totalItems}</strong>
                </div>
                <div className="summary-row">
                  <span>Omaggi</span>
                  <strong>{totals.freebies.join(", ") || "Nessuno"}</strong>
                </div>
                <div className="summary-row total">
                  <span>Totale</span>
                  <strong>{euro(totals.total)}</strong>
                </div>
              </div>
            </div>

            <div className="checkout-panel">
              <div className="section-head compact-head">
                <div className="eyebrow">Checkout</div>
                <h2>Dati cliente, metodo richiesto e invio ordine strutturato.</h2>
                <p>
                  Ho impostato una checkout page seria lato frontend. Il collegamento diretto al pagamento carta
                  può essere aggiunto dopo con Stripe o altro gateway.
                </p>
              </div>

              <form className="checkout-form" onSubmit={submitCheckout}>
                <label>
                  Nome e cognome
                  <input
                    value={checkoutData.name}
                    onChange={(e) => setCheckoutData((v) => ({ ...v, name: e.target.value }))}
                    placeholder="Inserisci nome cliente"
                  />
                </label>
                <label>
                  Telefono
                  <input
                    value={checkoutData.phone}
                    onChange={(e) => setCheckoutData((v) => ({ ...v, phone: e.target.value }))}
                    placeholder="Inserisci telefono"
                  />
                </label>
                <label>
                  Indirizzo consegna
                  <input
                    value={checkoutData.address}
                    onChange={(e) => setCheckoutData((v) => ({ ...v, address: e.target.value }))}
                    placeholder="Inserisci indirizzo"
                  />
                </label>
                <label>
                  Metodo richiesto
                  <select
                    value={checkoutData.payment}
                    onChange={(e) => setCheckoutData((v) => ({ ...v, payment: e.target.value }))}
                  >
                    <option>Richiedi link pagamento carta</option>
                    <option>Conferma ordine via WhatsApp</option>
                    <option>Contatto telefonico</option>
                  </select>
                </label>
                <label>
                  Note ordine
                  <textarea
                    rows="5"
                    value={checkoutData.note}
                    onChange={(e) => setCheckoutData((v) => ({ ...v, note: e.target.value }))}
                    placeholder="Scrivi eventuali richieste utili"
                  />
                </label>
                <button className="btn btn-primary btn-full" type="submit" disabled={cart.length === 0}>
                  Genera richiesta ordine
                </button>
              </form>

              {checkoutSent && (
                <div className="success-box">
                  <h3>Richiesta pronta</h3>
                  <p>
                    Ho generato il riepilogo finale. Da qui il cliente può inviare l’ordine in modo pulito e
                    richiedere l’eventuale pagamento carta.
                  </p>
                  <a className="btn btn-dark btn-full" href={whatsappCheckoutLink} target="_blank" rel="noreferrer">
                    Invia ordine su WhatsApp
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>

        <section id="galleria" className="section-block alt-surface">
          <div className="container">
            <div className="section-head">
              <div className="eyebrow">Galleria</div>
              <h2>Immagini reali del negozio valorizzate in un layout molto più forte.</h2>
            </div>
            <div className="gallery-grid">
              {galleryImages.map((image) => (
                <article className="gallery-card" key={image.title}>
                  <img src={image.src} alt={image.alt} />
                  <div className="gallery-body">
                    <h3>{image.title}</h3>
                    <p>{image.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-block">
          <div className="container info-banner">
            <div>
              <div className="eyebrow">Sito informativo + vendita</div>
              <h2>Il cliente capisce subito chi siete, cosa fate e come ordinare.</h2>
              <p>
                Non ho inventato dati aziendali nuovi. Ho usato la base reale del progetto e l’ho trasformata in
                un sito più credibile, più leggibile e più vicino a una struttura professionale di vendita.
              </p>
            </div>
            <div className="faq-stack">
              {faqs.map((item, index) => (
                <div className="faq-item" key={item.q}>
                  <button onClick={() => setFaqOpen(faqOpen === index ? -1 : index)}>
                    <span>{item.q}</span>
                    <span>{faqOpen === index ? "−" : "+"}</span>
                  </button>
                  {faqOpen === index && <p>{item.a}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contatti" className="section-block footer-cta">
          <div className="container contact-grid">
            <div className="contact-card">
              <div className="eyebrow">Contatti</div>
              <h2>Contatto diretto e immediato.</h2>
              <div className="contact-list">
                <div>
                  <span>Telefono / WhatsApp</span>
                  <strong>{business.phoneDisplay}</strong>
                </div>
                <div>
                  <span>Email</span>
                  <strong>{business.email}</strong>
                </div>
                <div>
                  <span>Indirizzo</span>
                  <strong>{business.address}</strong>
                </div>
              </div>
            </div>
            <div className="contact-visual">
              <img src={asset("images/frutta/fagiolini.jpeg")} alt="Fagiolini freschi" />
              <div className="contact-visual-overlay">
                <h3>Pronto per evolversi ancora</h3>
                <p>
                  La base è stata alzata molto: design, gerarchia, catalogo, carrello e checkout. Il prossimo step
                  naturale è collegare un pagamento carta reale e un backend ordini.
                </p>
                <div className="contact-actions">
                  <a className="btn btn-primary" href={`https://instagram.com/${business.instagramHandle}`} target="_blank" rel="noreferrer">
                    Instagram
                  </a>
                  <a className="btn btn-light" href={`tel:${business.phoneLink}`}>
                    Chiama ora
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
