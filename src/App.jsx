import { useMemo, useState } from "react";

const phoneDisplay = "+39 320 608 9928";
const phoneLink = "393206089928";
const businessEmail = "fruttaeverdurainfo@gmail.com";
const businessAddress = "Via Giovane Italia, 38 – 76123 Andria (BT)";
const instagramHandle = "fruttaeverdurashop";

const products = [
  {
    id: 1,
    name: "Melanzane grigliate",
    category: "Verdure cotte",
    price: 1,
    sizes: ["500 g", "1 kg", "2 kg", "3 kg", "4 kg"],
    description:
      "Preparazione pronta all’uso, ideale per ristorazione, pizzerie, gastronomia e vendita al dettaglio.",
    tags: ["Pronte", "Professionali", "Vaschette"],
  },
  {
    id: 2,
    name: "Zucchine grigliate",
    category: "Verdure cotte",
    price: 1,
    sizes: ["500 g", "1 kg", "2 kg", "3 kg", "4 kg"],
    description:
      "Lavorate con cura e confezionate in formati pratici per servizio veloce e gestione ordinata.",
    tags: ["Grigliate", "Pratiche", "B2B"],
  },
  {
    id: 3,
    name: "Peperoni arrostiti",
    category: "Verdure cotte",
    price: 1,
    sizes: ["500 g", "1 kg", "2 kg", "3 kg", "4 kg"],
    description:
      "Prodotto versatile per piatti pronti, panifici, rosticcerie e attività alimentari.",
    tags: ["Arrostiti", "Selezionati", "Confezionati"],
  },
  {
    id: 4,
    name: "Carote condite",
    category: "Verdure cotte",
    price: 1,
    sizes: ["500 g", "1 kg", "2 kg", "3 kg", "4 kg"],
    description:
      "Soluzione pronta e ordinata per attività che cercano continuità, qualità e velocità di servizio.",
    tags: ["Pronte", "Pulite", "Comode"],
  },
  {
    id: 5,
    name: "Cicoria",
    category: "Verdure cotte",
    price: 1,
    sizes: ["500 g", "1 kg", "2 kg", "3 kg", "4 kg"],
    description:
      "Preparazione adatta a privati, gastronomie e attività che necessitano forniture regolari.",
    tags: ["Tradizionale", "Richiesta", "Fornitura"],
  },
  {
    id: 6,
    name: "Bietole",
    category: "Verdure cotte",
    price: 1,
    sizes: ["500 g", "1 kg", "2 kg", "3 kg", "4 kg"],
    description:
      "Confezionamento pratico e presentazione pulita, pensati per semplificare il lavoro quotidiano.",
    tags: ["Vaschette", "Pronte", "Fresh food"],
  },
  {
    id: 7,
    name: "Friarielli",
    category: "Verdure cotte",
    price: 1,
    sizes: ["500 g", "1 kg", "2 kg", "3 kg", "4 kg"],
    description:
      "Ideali per pizzerie, ristoranti e attività che cercano qualità e rapidità nell’ordine.",
    tags: ["Pizzeria", "Ristorazione", "Classico"],
  },
  {
    id: 8,
    name: "Fagiolini",
    category: "Verdure cotte",
    price: 1,
    sizes: ["500 g", "1 kg", "2 kg", "3 kg", "4 kg"],
    description:
      "Pronti per banco, cucina o somministrazione, con formato comodo e immediato.",
    tags: ["Pratici", "Banco", "Servizio"],
  },
  {
    id: 9,
    name: "Broccoli",
    category: "Verdure cotte",
    price: 1,
    sizes: ["500 g", "1 kg", "2 kg", "3 kg", "4 kg"],
    description:
      "Preparati per garantire qualità visiva, resa e semplicità di utilizzo.",
    tags: ["Qualità", "Preparati", "Affidabili"],
  },
  {
    id: 10,
    name: "Verdure miste",
    category: "Vaschette assortite",
    price: 1,
    sizes: ["500 g", "1 kg", "2 kg", "3 kg", "4 kg"],
    description:
      "Mix di stagione e soluzioni assortite per clienti, attività e richieste personalizzate.",
    tags: ["Mix", "Stagionali", "Personalizzabili"],
  },
  {
    id: 11,
    name: "Cavolfiore",
    category: "Verdure cotte",
    price: 1,
    sizes: ["500 g", "1 kg", "2 kg", "3 kg", "4 kg"],
    description:
      "Proposta pratica per attività alimentari che vogliono un prodotto già pronto e ben presentato.",
    tags: ["Pronto", "Professionale", "Comodo"],
  },
  {
    id: 12,
    name: "Spinaci",
    category: "Verdure cotte",
    price: 1,
    sizes: ["500 g", "1 kg", "2 kg", "3 kg", "4 kg"],
    description:
      "Formati pensati per ordini diretti, continuità di servizio e gestione veloce delle preparazioni.",
    tags: ["Formato", "Continuativo", "Ordini rapidi"],
  },
];

const catalogItems = [
  "Melanzane",
  "Zucchine",
  "Peperoni",
  "Carote",
  "Cicoria",
  "Bietole",
  "Friarielli",
  "Fagiolini",
  "Broccoli",
  "Cavolfiore",
  "Spinaci",
  "Cime di rapa",
  "Patate",
  "Finocchi",
  "Piselli",
  "Zucca",
  "Carciofi",
  "Verdure grigliate miste",
  "Melanzane a funghetto",
  "Peperoni conditi",
  "Zucchine trifolate",
  "Verdure miste di stagione",
  "Preparazioni per gastronomie",
  "Forniture per ristoranti",
  "Forniture per pizzerie",
  "Forniture per caseifici",
];

const services = [
  {
    title: "Forniture per attività",
    description:
      "Servizio orientato a ristoranti, pizzerie, caseifici, gastronomie, negozi e operatori del settore alimentare.",
  },
  {
    title: "Vaschette pronte all’uso",
    description:
      "Formati da 500 g, 1 kg, 2 kg, 3 kg e 4 kg pensati per velocizzare il servizio, migliorare l’organizzazione e semplificare gli ordini.",
  },
  {
    title: "Consegne e spedizioni",
    description:
      "Consegna gratuita entro 30 km e spedizione veloce in 24/48 ore, con contatto diretto e gestione rapida delle richieste.",
  },
];

const faqs = [
  {
    question: "A chi è dedicato il servizio?",
    answer:
      "A privati e soprattutto ad attività come ristoranti, pizzerie, caseifici, gastronomie, negozi e operatori del food che cercano forniture pratiche e veloci.",
  },
  {
    question: "Quali formati sono disponibili?",
    answer:
      "Il sito è predisposto per vaschette da 500 g, 1 kg, 2 kg, 3 kg e 4 kg. In seguito si possono aggiungere formati extra e listini personalizzati.",
  },
  {
    question: "Come funziona la consegna?",
    answer:
      "La consegna è gratuita entro 30 km. Fuori zona è indicata la spedizione veloce in 24/48 ore, con gestione diretta tramite WhatsApp o telefono.",
  },
  {
    question: "I prezzi dove si inseriscono?",
    answer:
      "In questa fase ogni prodotto mostra un prezzo demo di €1,00. In seguito basta sostituirlo con il listino reale.",
  },
];

function whatsappLink(message) {
  return `https://wa.me/${phoneLink}?text=${encodeURIComponent(message)}`;
}

function ProductCard({ product }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const orderText = `Buongiorno, vorrei ordinare ${product.name} nel formato ${selectedSize}.`;

  return (
    <div className="group overflow-hidden rounded-[32px] border border-neutral-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="relative h-48 overflow-hidden bg-[linear-gradient(135deg,#ecfccb_0%,#ffffff_45%,#fff7ed_100%)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.18),transparent_26%)]" />
        <div className="relative flex h-full flex-col justify-between p-6">
          <div className="flex items-start justify-between gap-4">
            <span className="rounded-full border border-green-200 bg-white/90 px-3 py-1 text-xs font-bold text-green-800 shadow-sm">
              {product.category}
            </span>
            <div className="rounded-2xl bg-neutral-950 px-4 py-2 text-right text-white shadow-lg">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
                Prezzo base
              </div>
              <div className="text-2xl font-black leading-none">
                € {product.price.toFixed(2)}
              </div>
            </div>
          </div>
          <div>
            <h4 className="max-w-[16rem] text-3xl font-black tracking-tight text-neutral-950">
              {product.name}
            </h4>
            <p className="mt-2 max-w-[18rem] text-sm leading-6 text-neutral-700">
              {product.description}
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-semibold text-neutral-700"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6">
          <div className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-neutral-500">
            Scegli il formato
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`rounded-2xl px-3 py-3 text-sm font-semibold transition ${
                  selectedSize === size
                    ? "bg-green-700 text-white shadow-lg"
                    : "border border-neutral-300 bg-white text-neutral-800 hover:border-neutral-400"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-[24px] border border-neutral-200 bg-neutral-50 p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-bold text-neutral-500">
                Formato selezionato
              </div>
              <div className="mt-1 text-xl font-black text-neutral-950">
                {selectedSize}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-neutral-500">
                Prezzo visibile
              </div>
              <div className="mt-1 text-2xl font-black text-green-700">
                € {product.price.toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <a
            href={whatsappLink(orderText)}
            target="_blank"
            rel="noreferrer"
            className="flex-1 rounded-2xl bg-green-700 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-green-800"
          >
            Ordina su WhatsApp
          </a>
          <a
            href={`tel:${phoneLink}`}
            className="rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-sm font-semibold text-neutral-900 transition hover:border-neutral-400"
          >
            Chiama
          </a>
        </div>
      </div>
    </div>
  );
}

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className="rounded-[24px] border border-neutral-200 bg-white p-5 shadow-sm">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <span className="text-lg font-bold text-neutral-950">{item.question}</span>
        <span className="text-2xl font-light text-green-700">
          {isOpen ? "−" : "+"}
        </span>
      </button>
      {isOpen && <p className="mt-4 leading-7 text-neutral-600">{item.answer}</p>}
    </div>
  );
}

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("Tutti");
  const [openFaq, setOpenFaq] = useState(0);

  const categories = useMemo(
    () => ["Tutti", ...new Set(products.map((p) => p.category))],
    []
  );

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "Tutti") return products;
    return products.filter((product) => product.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
          <div className="flex items-center gap-3">
            <div className="h-14 w-14 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
              <img
                src="/logo.png"
                alt="Frutta e Verdura di Marco Coratella"
                className="h-full w-full object-contain p-1"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.parentElement.innerHTML =
                    '<div class="flex h-full items-center justify-center px-1 text-center text-[10px] font-bold text-neutral-700">LOGO</div>';
                }}
              />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-green-700">
                Frutta e Verdura
              </p>
              <h1 className="text-lg font-black md:text-xl">di Marco Coratella</h1>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm font-semibold md:flex">
            <a href="#home" className="transition hover:text-green-700">Home</a>
            <a href="#prodotti" className="transition hover:text-green-700">Prodotti</a>
            <a href="#servizi" className="transition hover:text-green-700">Servizi</a>
            <a href="#catalogo" className="transition hover:text-green-700">Catalogo</a>
            <a href="#contatti" className="transition hover:text-green-700">Contatti</a>
          </nav>

          <a
            href={whatsappLink("Buongiorno, vorrei richiedere informazioni sui prodotti disponibili.")}
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl bg-green-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800"
          >
            Richiedi ordine
          </a>
        </div>
      </header>

      <section id="home" className="relative overflow-hidden bg-neutral-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.24),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.2),transparent_22%),linear-gradient(180deg,rgba(10,10,10,0.94),rgba(17,24,39,0.98))]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 md:grid-cols-[1.05fr_0.95fr] md:px-6 md:py-24">
          <div className="flex flex-col justify-center">
            <div className="mb-5 inline-flex w-fit rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-green-300 shadow-sm backdrop-blur">
              Fruttivendolo premium • Verdure cotte • Forniture professionali
            </div>
            <h2 className="max-w-3xl text-4xl font-black tracking-tight text-white md:text-6xl md:leading-[1.02]">
              Un sito che valorizza il prodotto e porta subito all’ordine.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/75 md:text-lg">
              Frutta e Verdura di Marco Coratella prepara e distribuisce verdure cotte, vaschette miste e soluzioni pronte all’uso per ristoranti, pizzerie, caseifici, gastronomie, negozi e privati. Design premium, contatto immediato e impostazione già pronta per crescere.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#prodotti"
                className="rounded-2xl bg-white px-6 py-3 text-center text-sm font-semibold text-neutral-950 shadow-sm transition hover:opacity-90"
              >
                Scopri i prodotti
              </a>
              <a
                href={whatsappLink("Buongiorno, vorrei ricevere il catalogo prodotti e maggiori informazioni.")}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-white/15 bg-white/10 px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/15"
              >
                Contatta su WhatsApp
              </a>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 md:max-w-2xl md:grid-cols-4">
              {[
                ["€ 1,00", "Prezzo demo attivo"],
                ["500 g → 4 kg", "Formati multipli"],
                ["30 km", "Consegna gratuita"],
                ["24/48h", "Spedizione rapida"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-[24px] border border-white/10 bg-white/10 p-4 shadow-sm backdrop-blur">
                  <div className="text-2xl font-black text-white">{value}</div>
                  <div className="mt-1 text-sm text-white/70">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-full max-w-2xl rounded-[36px] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur md:p-8">
              <div className="aspect-[4/3] overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,#f5f5f4_0%,#ffffff_40%,#fafaf9_100%)] shadow-inner">
                <img
                  src="/logo.png"
                  alt="Logo Frutta e Verdura di Marco Coratella"
                  className="h-full w-full object-contain p-4"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.parentElement.innerHTML =
                      '<div class="flex h-full items-center justify-center px-6 text-center text-lg font-semibold text-neutral-500">Inserisci il logo in public/logo.png</div>';
                  }}
                />
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[24px] bg-white/10 p-5 backdrop-blur">
                  <div className="text-sm font-bold text-green-300">Consegna gratuita</div>
                  <div className="mt-2 text-sm leading-7 text-white/75">
                    Disponibile per ordini nel raggio di 30 km dall’attività.
                  </div>
                </div>
                <div className="rounded-[24px] bg-white/10 p-5 backdrop-blur">
                  <div className="text-sm font-bold text-orange-300">Spedizione 24/48h</div>
                  <div className="mt-2 text-sm leading-7 text-white/75">
                    Soluzione rapida per richieste fuori zona e ordini diretti.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="servizi" className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-green-700">Servizi</p>
          <h3 className="mt-3 text-3xl font-black tracking-tight text-neutral-950 md:text-4xl">
            Struttura professionale pensata per vendere e far ordinare bene.
          </h3>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <div key={service.title} className="rounded-[28px] border border-neutral-200 bg-white p-6 shadow-sm">
              <h4 className="text-xl font-black text-neutral-950">{service.title}</h4>
              <p className="mt-4 leading-7 text-neutral-600">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="prodotti" className="bg-[linear-gradient(180deg,#ffffff_0%,#fafaf9_100%)] py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-green-700">Prodotti</p>
              <h3 className="mt-3 text-3xl font-black tracking-tight text-neutral-950 md:text-4xl">
                Vaschette e preparazioni già predisposte per ordine rapido.
              </h3>
              <p className="mt-4 leading-7 text-neutral-600">
                Il sito è costruito per mostrare i prodotti in modo chiaro. I prezzi possono essere inseriti successivamente senza rifare la struttura.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    selectedCategory === category
                      ? "bg-neutral-950 text-white"
                      : "border border-neutral-300 bg-white text-neutral-700 hover:border-neutral-400"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section id="catalogo" className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="rounded-[36px] border border-neutral-200 bg-gradient-to-br from-neutral-950 to-neutral-800 p-8 text-white shadow-xl md:p-10">
          <div className="grid gap-8 md:grid-cols-[1fr_1fr] md:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-green-300">Catalogo estendibile</p>
              <h3 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
                Elenco iniziale completo, pronto da ampliare con i prodotti reali.
              </h3>
              <p className="mt-4 leading-7 text-neutral-300">
                Ho impostato una base commerciale solida: catalogo ampio, prodotti centrali per il business e struttura professionale per far crescere il sito passo dopo passo.
              </p>
              <div className="mt-6 rounded-[24px] border border-white/10 bg-white/5 p-5 text-sm leading-7 text-neutral-200">
                In questa fase l’elenco è pensato per coprire il nucleo dell’attività. Quando mi darai il catalogo reale, lo trasformiamo in versione definitiva con prezzi, foto e disponibilità.
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {catalogItems.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/95"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#f5f5f4_0%,#ffffff_100%)] py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                value: "01",
                title: "Immagine professionale",
                text: "Grafica pulita, struttura premium e presentazione più seria rispetto a una semplice pagina improvvisata.",
              },
              {
                value: "02",
                title: "Ordine rapido",
                text: "Ogni prodotto è già pensato per portare il cliente verso WhatsApp e telefono senza passaggi inutili.",
              },
              {
                value: "03",
                title: "Base evolutiva",
                text: "Questa versione è una base master: si può trasformare in mini e-commerce, dashboard ordini o sito completo con catalogo avanzato.",
              },
            ].map((item) => (
              <div key={item.value} className="rounded-[28px] border border-neutral-200 bg-white p-6 shadow-sm">
                <div className="text-sm font-black tracking-[0.24em] text-green-700">{item.value}</div>
                <h4 className="mt-3 text-2xl font-black text-neutral-950">{item.title}</h4>
                <p className="mt-4 leading-7 text-neutral-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="rounded-[36px] border border-neutral-200 bg-white p-8 shadow-sm md:p-10">
          <div className="grid gap-10 md:grid-cols-[1fr_1fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-green-700">Come ordinare</p>
              <h3 className="mt-3 text-3xl font-black tracking-tight text-neutral-950 md:text-4xl">
                Semplice per il cliente, ordinato per l’attività.
              </h3>
              <div className="mt-8 space-y-5">
                {[
                  "Il cliente sceglie il prodotto o la preparazione che gli interessa.",
                  "Seleziona il formato da 500 g, 1 kg, 2 kg, 3 kg o 4 kg e contatta l’attività.",
                  "L’ordine viene gestito rapidamente via telefono o WhatsApp.",
                  "Consegna gratuita entro 30 km oppure spedizione veloce in 24/48 ore.",
                ].map((step, index) => (
                  <div key={step} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-700 text-sm font-black text-white">
                      {index + 1}
                    </div>
                    <p className="pt-1 leading-7 text-neutral-600">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[28px] bg-neutral-950 p-6 text-white">
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-green-300">Punti forti</p>
              <div className="mt-6 grid gap-4">
                {[
                  "Verdure cotte pronte ogni giorno",
                  "Forniture per ristoranti, pizzerie, caseifici e negozi",
                  "Contatto diretto senza passaggi complessi",
                  "Impostazione già pronta per listino e prodotti reali",
                  "Sito elegante, chiaro e facilmente migliorabile",
                ].map((point) => (
                  <div key={point} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm font-medium text-white/95">
                    {point}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-green-700">Domande frequenti</p>
            <h3 className="mt-3 text-3xl font-black tracking-tight text-neutral-950 md:text-4xl">
              Risposte chiare per clienti privati e attività.
            </h3>
          </div>
          <div className="mt-10 grid gap-4">
            {faqs.map((item, index) => (
              <FaqItem
                key={item.question}
                item={item}
                isOpen={openFaq === index}
                onToggle={() => setOpenFaq(openFaq === index ? -1 : index)}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="contatti" className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[36px] border border-neutral-200 bg-white p-8 shadow-sm md:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-green-700">Contatti</p>
            <h3 className="mt-3 text-3xl font-black tracking-tight text-neutral-950 md:text-4xl">
              Contatto diretto per ordini, disponibilità e forniture.
            </h3>
            <p className="mt-4 max-w-2xl leading-7 text-neutral-600">
              Richiedi informazioni su prodotti, formati, vaschette miste, forniture ricorrenti o disponibilità giornaliera. Il contatto è pensato per essere rapido e immediato.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-[24px] bg-neutral-50 p-5">
                <div className="text-sm font-bold text-neutral-500">Telefono / WhatsApp</div>
                <div className="mt-2 text-xl font-black text-neutral-950">{phoneDisplay}</div>
              </div>
              <div className="rounded-[24px] bg-neutral-50 p-5">
                <div className="text-sm font-bold text-neutral-500">Email</div>
                <div className="mt-2 break-all text-xl font-black text-neutral-950">{businessEmail}</div>
              </div>
              <div className="rounded-[24px] bg-neutral-50 p-5 md:col-span-2">
                <div className="text-sm font-bold text-neutral-500">Indirizzo</div>
                <div className="mt-2 text-xl font-black text-neutral-950">{businessAddress}</div>
              </div>
            </div>
          </div>

          <div className="rounded-[36px] border border-green-200 bg-[linear-gradient(180deg,#f0fdf4_0%,#dcfce7_100%)] p-8 shadow-sm md:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-green-800">Contatta subito</p>
            <h3 className="mt-3 text-3xl font-black tracking-tight text-neutral-950">
              Pronto per essere collegato a WhatsApp, Instagram e campagne social.
            </h3>

            <div className="mt-8 space-y-4">
              <a
                href={whatsappLink("Buongiorno, vorrei ricevere informazioni sui vostri prodotti.")}
                target="_blank"
                rel="noreferrer"
                className="block rounded-2xl bg-green-700 px-5 py-4 text-center text-sm font-semibold text-white transition hover:bg-green-800"
              >
                Contatta su WhatsApp
              </a>
              <a
                href={`tel:${phoneLink}`}
                className="block rounded-2xl border border-neutral-300 bg-white px-5 py-4 text-center text-sm font-semibold text-neutral-900 transition hover:border-neutral-400"
              >
                Chiama ora
              </a>
              <a
                href={`https://instagram.com/${instagramHandle}`}
                target="_blank"
                rel="noreferrer"
                className="block rounded-2xl border border-neutral-300 bg-white px-5 py-4 text-center text-sm font-semibold text-neutral-900 transition hover:border-neutral-400"
              >
                Vai su Instagram
              </a>
            </div>

            <div className="mt-8 rounded-[24px] border border-green-200 bg-white p-5 text-sm leading-7 text-neutral-700">
              Consegna gratuita entro 30 km. Per zone esterne è già previsto il messaggio commerciale “spedizione veloce 24/48h”.
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-neutral-500 md:flex-row md:items-center md:justify-between md:px-6">
          <div>© {new Date().getFullYear()} Frutta e Verdura di Marco Coratella</div>
          <div className="flex flex-wrap gap-4">
            <a href="#home" className="hover:text-neutral-900">Home</a>
            <a href="#prodotti" className="hover:text-neutral-900">Prodotti</a>
            <a href="#catalogo" className="hover:text-neutral-900">Catalogo</a>
            <a href="#contatti" className="hover:text-neutral-900">Contatti</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
