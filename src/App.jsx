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

const heroCards = [
  { value: "Express", label: "spedizione 24/36h" },
  { value: "Carta", label: "checkout predisposto" },
  { value: "Box", label: "spesa completa pronta" },
  { value: "Fresh", label: "frutta e verdura in evidenza" },
];

const collections = [
  {
    id: "frutta",
    name: "Frutta fresca",
    text: "Selezione visuale ordinata, formati pronti e acquisto rapido.",
    image: asset("images/frutta/mela-pera-banco.jpeg"),
  },
  {
    id: "verdura",
    name: "Verdura fresca",
    text: "Reparto pensato per ordini chiari, veloci e leggibili anche da mobile.",
    image: asset("images/frutta/zucchine-fiori.jpeg"),
  },
  {
    id: "stagione",
    name: "Offerte di stagione",
    text: "Area promozionale dedicata ai prodotti in evidenza e alle composizioni più forti.",
    image: asset("images/frutta/meloni-ananas.jpeg"),
  },
  {
    id: "box",
    name: "Box miste",
    text: "Soluzione pronta per chi vuole una spesa completa in pochi click.",
    image: asset("images/frutta/banco-frutta-panorama.jpeg"),
  },
];

const products = [
  {
    id: "fragole300",
    name: "Fragole premium 300 g",
    category: "Frutta fresca",
    price: 3.99,
    unit: "vaschetta",
    badge: "Più richiesta",
    image: asset("images/frutta/fragole.jpeg"),
    desc: "Formato pronto da banco, perfetto per ordini rapidi e multipli.",
    highlights: ["Aggiunta veloce", "Ottima per promo", "Visual forte"],
  },
  {
    id: "misto1kg",
    name: "Selezione al kg",
    category: "Frutta e Verdura",
    price: 7.99,
    unit: "kg",
    badge: "Peso libero",
    image: asset("images/frutta/mela-pera-banco.jpeg"),
    desc: "Prodotto impostato per vendere a peso con totale automatico nel carrello.",
    highlights: ["Totale chiaro", "Ideale da mobile", "Ordine semplice"],
  },
  {
    id: "verdurafresh",
    name: "Verdura del giorno",
    category: "Verdura fresca",
    price: 5.99,
    unit: "kg",
    badge: "Banco fresco",
    image: asset("images/frutta/zucchine-fiori.jpeg"),
    desc: "Reparto verdura valorizzato con scheda pulita e aggiunta immediata.",
    highlights: ["Scheda pulita", "Quantità rapida", "Sezione dedicata"],
  },
  {
    id: "box10",
    name: "Box famiglia 10 kg",
    category: "Box miste",
    price: 39.99,
    unit: "box",
    badge: "Convenienza",
    image: asset("images/frutta/arance-gambin.jpeg"),
    desc: "Soluzione pronta per aumentare conversione e valore medio ordine.",
    highlights: ["Ordine completo", "Formato pronto", "Più scontrino"],
  },
  {
    id: "boxmix",
    name: "Box mista frutta e verdura",
    category: "Offerte di stagione",
    price: 29.99,
    unit: "box",
    badge: "Spesa completa",
    image: asset("images/frutta/banco-frutta-panorama.jpeg"),
    desc: "Pensata per chi vuole fare la spesa in un’unica scelta pulita.",
    highlights: ["Mix pronto", "Acquisto diretto", "Homepage forte"],
  },
  {
    id: "meloni",
    name: "Selezione stagione premium",
    category: "Offerte di stagione",
    price: 14.99,
    unit: "cassetta",
    badge: "Stagione",
    image: asset("images/frutta/meloni-ananas.jpeg"),
    desc: "Area premium per spingere offerte visuali e composizioni stagionali.",
    highlights: ["Look premium", "Valorizza il banco", "Promo immediata"],
  },
];

const servicePills = [
  "Carrello con totale live",
  "Checkout predisposto per carta",
  "Spedizione express 24/36h",
  "Ordine rapido da mobile",
  "Contatto diretto WhatsApp",
  "Sezioni vendita già pronte",
];

const sellingBlocks = [
  {
    title: "Vendi subito",
    text: "Hero commerciale, reparti evidenti, offerte in primo piano e CTA chiare per portare il cliente al carrello.",
  },
  {
    title: "Più fiducia",
    text: "Immagini reali, contatti visibili, struttura ordinata e linguaggio da negozio professionale.",
  },
  {
    title: "Più ordine",
    text: "Catalogo filtrabile, schede pulite, quantità modificabili e riepilogo ordine già pronto.",
  },
];

function euro(value) {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

function cartStorageKey() {
  return "coratella_cart_v2";
}

function buildWhatsAppMessage(cart, form, totals) {
  const lines = [
    "Buongiorno, invio ordine dal sito.",
    "",
    "PRODOTTI:",
    ...cart.map((item) => `- ${item.name} x${item.qty} = ${euro(item.lineTotal)}`),
    "",
    `Subtotale prodotti: ${euro(totals.subtotal)}`,
    `Spedizione: ${totals.shippingLabel}`,
    `Totale ordine: ${euro(totals.total)}`,
    "",
    `Cliente: ${form.name || "non indicato"}`,
    `Telefono: ${form.phone || "non indicato"}`,
    `Indirizzo: ${form.address || "non indicato"}`,
    `Pagamento richiesto: ${form.payment || "non indicato"}`,
    `Consegna: ${form.delivery || "non indicato"}`,
    form.note ? `Note: ${form.note}` : null,
  ].filter(Boolean);

  return `https://wa.me/${business.phoneLink}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Tutti");
  const [cart, setCart] = useState([]);
  const [checkoutSent, setCheckoutSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    payment: "Carta - richiesta link pagamento",
    delivery: "Spedizione express 24/36h",
    note: "",
  });

  useEffect(() => {
    const raw = window.localStorage.getItem(cartStorageKey());
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) setCart(parsed);
    } catch {}
  }, []);

  useEffect(() => {
    window.localStorage.setItem(cartStorageKey(), JSON.stringify(cart));
  }, [cart]);

  const categories = ["Tutti", ...new Set(products.map((item) => item.category))];

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter((product) => {
      const categoryMatch = filter === "Tutti" || product.category === filter;
      const haystack = `${product.name} ${product.category} ${product.desc}`.toLowerCase();
      return categoryMatch && (!query || haystack.includes(query));
    });
  }, [search, filter]);

  const totals = useMemo(() => {
    const subtotal = cart.reduce((sum, item) => sum + item.lineTotal, 0);
    const shipping = subtotal > 0 ? 0 : 0;
    return {
      subtotal,
      shipping,
      shippingLabel: subtotal > 0 ? "Express 24/36h inclusa" : "Calcolata in conferma ordine",
      total: subtotal + shipping,
      items: cart.reduce((sum, item) => sum + item.qty, 0),
    };
  }, [cart]);

  const whatsappLink = useMemo(() => buildWhatsAppMessage(cart, form, totals), [cart, form, totals]);

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

  function updateQty(id, delta) {
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

  function removeItem(id) {
    setCheckoutSent(false);
    setCart((current) => current.filter((item) => item.id !== id));
  }

  function clearCart() {
    setCheckoutSent(false);
    setCart([]);
  }

  function submitCheckout(e) {
    e.preventDefault();
    if (!cart.length) return;
    setCheckoutSent(true);
  }

  return (
    <div className="site-shell">
      <div className="promo-bar">Spedizione express 24/36h · pagamento con carta predisposto · ordini rapidi online</div>

      <header className="header">
        <div className="container header-inner">
          <a href="#top" className="brand">
            <img src={asset("logonuovoraff.png")} alt="Logo Frutta e Verdura di Marco Coratella" />
            <div>
              <div className="brand-top">{business.brandTop}</div>
              <div className="brand-name">{business.brandName}</div>
            </div>
          </a>

          <nav className="nav desktop-only">
            <a href="#catalogo">Catalogo</a>
            <a href="#offerte">Offerte</a>
            <a href="#collezioni">Reparti</a>
            <a href="#ordine">Ordina</a>
            <a href="#contatti">Contatti</a>
          </nav>

          <div className="header-actions">
            <a href="#ordine" className="btn btn-primary">Vai all’ordine</a>
            <button className="menu-btn" onClick={() => setMenuOpen((v) => !v)}>☰</button>
          </div>
        </div>
        {menuOpen && (
          <div className="mobile-nav container">
            <a href="#catalogo">Catalogo</a>
            <a href="#offerte">Offerte</a>
            <a href="#collezioni">Reparti</a>
            <a href="#ordine">Ordina</a>
            <a href="#contatti">Contatti</a>
          </div>
        )}
      </header>

      <main id="top">
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow">Negozio online premium</div>
              <h1>Frutta e verdura online con carrello, ordine rapido e struttura da vendita vera.</h1>
              <p>
                Layout più forte, focus commerciale, offerte visibili, box pronti, checkout ordinato e percorso cliente più pulito.
                Il sito è stato riscritto per sembrare un negozio vero, non una semplice pagina informativa.
              </p>
              <div className="hero-actions-row">
                <a href="#catalogo" className="btn btn-dark">Scopri il catalogo</a>
                <a href="#offerte" className="btn btn-light">Apri le offerte</a>
              </div>
              <div className="hero-cards">
                {heroCards.map((item) => (
                  <div className="metric-card" key={item.label}>
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-visuals">
              <div className="visual-big panel-card"><img src={asset("images/frutta/banco-frutta-panorama.jpeg")} alt="Banco frutta" /></div>
              <div className="visual-small panel-card"><img src={asset("images/frutta/fragole.jpeg")} alt="Fragole fresche" /></div>
              <div className="visual-small panel-card"><img src={asset("images/frutta/meloni-ananas.jpeg")} alt="Frutta di stagione" /></div>
            </div>
          </div>
        </section>

        <section className="service-strip">
          <div className="container pill-wrap">
            {servicePills.map((item) => (
              <div className="service-pill" key={item}>{item}</div>
            ))}
          </div>
        </section>

        <section id="offerte" className="section section-soft">
          <div className="container">
            <div className="section-head split">
              <div>
                <div className="eyebrow">Offerte in evidenza</div>
                <h2>Blocchi vendita già pronti per spingere prodotti, box e reparti forti.</h2>
              </div>
              <p>
                Home più aggressiva nella conversione: prodotti in risalto, composizioni miste, messaggio premium e CTA dirette.
              </p>
            </div>

            <div className="offer-grid">
              <article className="offer-card offer-main">
                <div className="offer-content">
                  <span className="mini-badge">Express 24/36h</span>
                  <h3>Spesa online più rapida, più pulita, più credibile.</h3>
                  <p>Catalogo ordinato, box già pronti e checkout pensato per accompagnare il cliente fino alla richiesta ordine.</p>
                  <a href="#ordine" className="btn btn-primary">Ordina adesso</a>
                </div>
                <img src={asset("images/frutta/arance-gambin.jpeg")} alt="Box frutta" />
              </article>

              {sellingBlocks.map((block) => (
                <article className="offer-card" key={block.title}>
                  <span className="mini-badge">Premium</span>
                  <h3>{block.title}</h3>
                  <p>{block.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="collezioni" className="section">
          <div className="container">
            <div className="section-head">
              <div className="eyebrow">Reparti</div>
              <h2>Sezioni organizzate per far navigare e acquistare meglio.</h2>
              <p>Ogni blocco è impostato per mostrare bene il prodotto e portare l’utente verso il carrello senza dispersione.</p>
            </div>
            <div className="collection-grid">
              {collections.map((item) => (
                <article className="collection-card" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div className="collection-body">
                    <h3>{item.name}</h3>
                    <p>{item.text}</p>
                    <a href="#catalogo">Vai al catalogo</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="catalogo" className="section section-soft">
          <div className="container">
            <div className="section-head split catalog-head">
              <div>
                <div className="eyebrow">Catalogo</div>
                <h2>Catalogo filtrabile con aggiunta rapida al carrello.</h2>
              </div>
              <div className="catalog-tools">
                <input
                  className="field"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cerca prodotto o reparto"
                />
                <div className="chip-row">
                  {categories.map((item) => (
                    <button
                      key={item}
                      className={`chip ${filter === item ? "active" : ""}`}
                      onClick={() => setFilter(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="product-grid">
              {filteredProducts.map((product) => (
                <article className="product-card" key={product.id}>
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                    <span>{product.badge}</span>
                  </div>
                  <div className="product-body">
                    <div className="product-category">{product.category}</div>
                    <h3>{product.name}</h3>
                    <p>{product.desc}</p>
                    <ul>
                      {product.highlights.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <div className="product-footer">
                      <div>
                        <small>Prezzo</small>
                        <strong>{euro(product.price)}</strong>
                      </div>
                      <button className="btn btn-primary" onClick={() => addToCart(product)}>Aggiungi</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container feature-banner">
            <div>
              <div className="eyebrow">Checkout vendita</div>
              <h2>Pagamento con carta predisposto, consegna express 24/36h e ordine pronto da inviare.</h2>
            </div>
            <p>
              Il flusso è impostato per far compilare i dati essenziali, selezionare consegna e pagamento richiesto,
              vedere il riepilogo e chiudere l’ordine in modo chiaro.
            </p>
          </div>
        </section>

        <section id="ordine" className="section section-soft">
          <div className="container order-grid">
            <div className="panel-card cart-panel">
              <div className="section-head compact">
                <div className="eyebrow">Carrello</div>
                <h2>Riepilogo ordine live</h2>
              </div>

              {cart.length === 0 ? (
                <div className="empty-box">
                  <h3>Carrello vuoto</h3>
                  <p>Aggiungi prodotti dal catalogo per vedere quantità, totale e checkout.</p>
                </div>
              ) : (
                <>
                  <div className="cart-list">
                    {cart.map((item) => (
                      <div className="cart-item" key={item.id}>
                        <div>
                          <div className="cart-title">{item.name}</div>
                          <div className="cart-meta">{euro(item.price)} cad.</div>
                        </div>
                        <div className="qty-box">
                          <button onClick={() => updateQty(item.id, -1)}>-</button>
                          <span>{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)}>+</button>
                        </div>
                        <strong>{euro(item.lineTotal)}</strong>
                        <button className="link-danger" onClick={() => removeItem(item.id)}>Rimuovi</button>
                      </div>
                    ))}
                  </div>

                  <div className="summary-box panel-soft">
                    <div className="summary-row"><span>Articoli</span><strong>{totals.items}</strong></div>
                    <div className="summary-row"><span>Subtotale</span><strong>{euro(totals.subtotal)}</strong></div>
                    <div className="summary-row"><span>Spedizione</span><strong>{totals.shippingLabel}</strong></div>
                    <div className="summary-row total"><span>Totale</span><strong>{euro(totals.total)}</strong></div>
                    <button className="btn btn-light btn-full" onClick={clearCart}>Svuota carrello</button>
                  </div>
                </>
              )}
            </div>

            <div className="panel-card checkout-panel">
              <div className="section-head compact">
                <div className="eyebrow">Checkout</div>
                <h2>Dati cliente e invio ordine</h2>
              </div>

              <form className="checkout-form" onSubmit={submitCheckout}>
                <label>
                  Nome e cognome
                  <input className="field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </label>
                <label>
                  Telefono
                  <input className="field" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </label>
                <label>
                  Indirizzo consegna
                  <textarea className="field field-area" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
                </label>
                <label>
                  Modalità pagamento
                  <select className="field" value={form.payment} onChange={(e) => setForm({ ...form, payment: e.target.value })}>
                    <option>Carta - richiesta link pagamento</option>
                    <option>Contanti alla consegna</option>
                    <option>Ritiro in negozio</option>
                  </select>
                </label>
                <label>
                  Modalità consegna
                  <select className="field" value={form.delivery} onChange={(e) => setForm({ ...form, delivery: e.target.value })}>
                    <option>Spedizione express 24/36h</option>
                    <option>Consegna locale</option>
                    <option>Ritiro in negozio</option>
                  </select>
                </label>
                <label>
                  Note ordine
                  <textarea className="field field-area" value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder="Aggiungi preferenze o indicazioni" />
                </label>
                <button className="btn btn-primary btn-full" type="submit">Prepara ordine</button>
              </form>

              {checkoutSent && cart.length > 0 && (
                <div className="success-box panel-soft">
                  <h3>Ordine pronto</h3>
                  <p>Il riepilogo è stato preparato. Puoi inviarlo subito su WhatsApp con tutti i dati compilati.</p>
                  <a className="btn btn-dark btn-full" href={whatsappLink} target="_blank" rel="noreferrer">
                    Invia ordine su WhatsApp
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>

        <section id="contatti" className="section footer-zone">
          <div className="container contact-grid">
            <div className="panel-card contact-panel">
              <div className="eyebrow">Contatti</div>
              <h2>Frutta e Verdura di Marco Coratella</h2>
              <div className="contact-list">
                <div>
                  <span>Telefono</span>
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
                <div>
                  <span>Instagram</span>
                  <strong>@{business.instagramHandle}</strong>
                </div>
              </div>
            </div>
            <div className="contact-visual panel-card">
              <img src={asset("images/frutta/banco-frutta-panorama.jpeg")} alt="Negozio frutta e verdura" />
              <div className="contact-overlay">
                <span className="mini-badge">Online shop</span>
                <h3>Sito premium impostato per vendere meglio.</h3>
                <p>Catalogo, reparti, offerte, carrello e checkout in un’unica struttura più credibile e molto più pulita.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
