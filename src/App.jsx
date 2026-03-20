import { useMemo, useState } from "react";

const base = import.meta.env.BASE_URL;
const asset = (path) => `${base}${path}`;

const phoneDisplay = "+39 320 608 9928";
const phoneLink = "393206089928";
const businessEmail = "fruttaeverdurainfo@gmail.com";
const businessAddress = "Via Giovane Italia, 38 – 76123 Andria (BT)";
const instagramHandle = "fruttaeverdurashop";
const minimumOrderValue = 19.99;
const freeShippingThreshold = 29.99;
const trayPrice = 3.99;
const kgPrice = 7.99;
const boxPrice = 39.99;
const boxKg = 10;

const galleryImages = [
  {
    src: asset("images/frutta/banco-frutta-panorama.jpeg"),
    alt: "Banco frutta panoramico",
    title: "Banco del giorno",
    text: "Colori veri, frutta selezionata e presentazione ordinata.",
  },
  {
    src: asset("images/frutta/fragole.jpeg"),
    alt: "Fragole fresche",
    title: "Fragole premium",
    text: "Prodotto d’impatto, ideale per spingere ordini rapidi e contenuti social.",
  },
  {
    src: asset("images/frutta/zucchine-fiori.jpeg"),
    alt: "Zucchine con fiore",
    title: "Verdura fresca",
    text: "Qualità visiva forte e percezione di freschezza immediata.",
  },
  {
    src: asset("images/frutta/meloni-ananas.jpeg"),
    alt: "Meloni e ananas",
    title: "Selezione di stagione",
    text: "Prodotti assortiti da mostrare nelle box e nelle offerte.",
  },
];

const sections = [
  {
    id: "vaschette",
    name: "Vaschette da 300 g",
    price: trayPrice,
    unit: "vaschetta",
    unitPlural: "vaschette",
    image: asset("images/frutta/fragole.jpeg"),
    imageAlt: "Vaschette di fragole",
    description:
      "Formato pratico e veloce. Ogni 10 vaschette, 1 vaschetta in omaggio automatica.",
    promo: "3,99 € l'una",
    helper: "Ideali per ordini rapidi e prodotti già porzionati.",
  },
  {
    id: "kg",
    name: "Vendita al kg",
    price: kgPrice,
    unit: "kg",
    unitPlural: "kg",
    image: asset("images/frutta/mela-pera-banco.jpeg"),
    imageAlt: "Frutta mista a peso",
    description:
      "Prezzo chiaro al kg, con quantità modificabile in un click. Ogni 10 kg, 1 kg in omaggio.",
    promo: "7,99 € al kg",
    helper: "Perfetto per chi vuole scegliere quantità precise.",
  },
  {
    id: "scatole",
    name: "Scatole assortite",
    price: boxPrice,
    unit: "scatola",
    unitPlural: "scatole",
    image: asset("images/frutta/arance-gambin.jpeg"),
    imageAlt: "Scatole di arance",
    description:
      "Le scatole partono da 10 kg. Prezzo fisso per box già pronta e ordinata.",
    promo: "39,99 € da 10 kg",
    helper: "Soluzione comoda per famiglie, attività e ordini più importanti.",
  },
];

const offerCards = [
  {
    label: "Spesa minima",
    value: "19,99 €",
    text: "L’ordine si conclude da 19,99 € in su.",
  },
  {
    label: "Spedizione gratuita",
    value: "da 29,99 €",
    text: "Soglia chiara e immediata per spingere la conversione.",
  },
  {
    label: "Omaggio vaschette",
    value: "+1 ogni 10",
    text: "Il cliente vede subito il vantaggio dell’ordine multiplo.",
  },
  {
    label: "Omaggio al kg",
    value: "+1 kg ogni 10",
    text: "Incentivo semplice e forte per aumentare il carrello.",
  },
];

const advantages = [
  "Design più vivace, pulito e ordinato",
  "Quantità modificabili con + e − in modo fluido",
  "Prezzo totale aggiornato in automatico",
  "Offerte e omaggi evidenziati subito",
  "Foto reali del negozio inserite nel sito",
  "WhatsApp pronto con riepilogo ordine",
];

const faqs = [
  {
    question: "Qual è la spesa minima?",
    answer:
      "La spesa minima per concludere l’ordine è di 19,99 €.",
  },
  {
    question: "Quando scatta la spedizione gratuita?",
    answer:
      "La spedizione è gratuita per ordini superiori a 29,99 €.",
  },
  {
    question: "Come funzionano gli omaggi?",
    answer:
      "Ogni 10 vaschette il cliente riceve 1 vaschetta omaggio. Ogni 10 kg acquistati riceve 1 kg omaggio.",
  },
  {
    question: "Come funzionano le scatole?",
    answer:
      "Le scatole partono da 10 kg e hanno prezzo da 39,99 €. Sono pensate per ordini più consistenti e più comodi da gestire.",
  },
];

function euro(value) {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

function whatsappLink(message) {
  return `https://wa.me/${phoneLink}?text=${encodeURIComponent(message)}`;
}

function Counter({ label, image, imageAlt, description, promo, helper, quantity, onDecrease, onIncrease, freeText, total }) {
  return (
    <div className="overflow-hidden rounded-[30px] border border-emerald-200 bg-white shadow-[0_18px_60px_rgba(16,24,40,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_70px_rgba(16,24,40,0.12)]">
      <div className="relative h-56 overflow-hidden">
        <img src={image} alt={imageAlt} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
        <div className="absolute left-5 top-5 rounded-full bg-white/92 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-emerald-700 shadow-lg">
          {promo}
        </div>
        <div className="absolute bottom-5 left-5 right-5">
          <h3 className="text-2xl font-black text-white md:text-3xl">{label}</h3>
          <p className="mt-2 max-w-xl text-sm leading-6 text-white/85">{description}</p>
        </div>
      </div>

      <div className="p-6">
        <div className="rounded-[24px] border border-orange-100 bg-gradient-to-r from-orange-50 to-amber-50 px-4 py-3 text-sm font-semibold text-orange-900">
          {helper}
        </div>

        <div className="mt-5 flex items-center justify-between gap-4 rounded-[26px] border border-neutral-200 bg-neutral-50 p-4">
          <button
            onClick={onDecrease}
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl font-black text-neutral-900 shadow-sm transition hover:bg-neutral-100"
          >
            −
          </button>

          <div className="text-center">
            <div className="text-sm font-bold uppercase tracking-[0.18em] text-neutral-500">Quantità</div>
            <div className="mt-1 text-4xl font-black text-neutral-950">{quantity}</div>
          </div>

          <button
            onClick={onIncrease}
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-2xl font-black text-white shadow-lg transition hover:bg-emerald-700"
          >
            +
          </button>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-[24px] border border-emerald-200 bg-emerald-50 p-4">
            <div className="text-sm font-bold text-emerald-800">Omaggio attivo</div>
            <div className="mt-1 text-lg font-black text-emerald-950">{freeText}</div>
          </div>
          <div className="rounded-[24px] border border-neutral-200 bg-white p-4">
            <div className="text-sm font-bold text-neutral-500">Totale sezione</div>
            <div className="mt-1 text-2xl font-black text-neutral-950">{euro(total)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FaqItem({ item, open, onToggle }) {
  return (
    <div className="rounded-[24px] border border-neutral-200 bg-white p-5 shadow-sm">
      <button onClick={onToggle} className="flex w-full items-center justify-between gap-4 text-left">
        <span className="text-lg font-black text-neutral-950">{item.question}</span>
        <span className="text-3xl font-light text-emerald-700">{open ? "−" : "+"}</span>
      </button>
      {open && <p className="mt-4 leading-7 text-neutral-600">{item.answer}</p>}
    </div>
  );
}

export default function App() {
  const [trayQty, setTrayQty] = useState(0);
  const [kgQty, setKgQty] = useState(0);
  const [boxQty, setBoxQty] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);

  const freeTrays = Math.floor(trayQty / 10);
  const freeKg = Math.floor(kgQty / 10);
  const trayTotal = trayQty * trayPrice;
  const kgTotal = kgQty * kgPrice;
  const boxTotal = boxQty * boxPrice;
  const total = trayTotal + kgTotal + boxTotal;
  const shippingFree = total > freeShippingThreshold;
  const orderReady = total >= minimumOrderValue;
  const missingForMinimum = Math.max(0, minimumOrderValue - total);
  const missingForFreeShipping = Math.max(0, freeShippingThreshold - total);
  const totalKgWithBoxes = kgQty + boxQty * boxKg;

  const summaryItems = useMemo(() => {
    const items = [];
    if (trayQty > 0) items.push(`${trayQty} vaschette da 300 g`);
    if (kgQty > 0) items.push(`${kgQty} kg sfusi`);
    if (boxQty > 0) items.push(`${boxQty} scatole da ${boxKg} kg`);
    return items;
  }, [trayQty, kgQty, boxQty]);

  const whatsappMessage = useMemo(() => {
    const lines = [
      "Buongiorno, vorrei ordinare:",
      summaryItems.length ? `- ${summaryItems.join("\n- ")}` : "- Nessun prodotto selezionato",
      freeTrays > 0 ? `- Omaggio vaschette: ${freeTrays}` : null,
      freeKg > 0 ? `- Omaggio kg: ${freeKg}` : null,
      `- Totale: ${euro(total)}`,
      shippingFree ? "- Spedizione gratuita attiva" : `- Mancano ${euro(missingForFreeShipping)} per spedizione gratuita`,
    ].filter(Boolean);
    return lines.join("\n");
  }, [summaryItems, freeTrays, freeKg, total, shippingFree, missingForFreeShipping]);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f9fafb_0%,#f0fdf4_42%,#fff7ed_100%)] text-neutral-900">
      <header className="sticky top-0 z-50 border-b border-white/70 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
          <a href="#home" className="flex items-center gap-3">
            <div className="h-14 w-14 overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">
              <img src={asset("logonuovoraff.png")} alt="Logo Frutta e Verdura di Marco Coratella" className="h-full w-full object-contain p-1" />
            </div>
            <div>
              <div className="text-[11px] font-black uppercase tracking-[0.24em] text-emerald-700">Frutta e Verdura</div>
              <div className="text-lg font-black text-neutral-950 md:text-xl">di Marco Coratella</div>
            </div>
          </a>

          <nav className="hidden items-center gap-6 text-sm font-bold md:flex">
            <a href="#home" className="transition hover:text-emerald-700">Home</a>
            <a href="#offerte" className="transition hover:text-emerald-700">Offerte</a>
            <a href="#ordina" className="transition hover:text-emerald-700">Ordina</a>
            <a href="#galleria" className="transition hover:text-emerald-700">Galleria</a>
            <a href="#contatti" className="transition hover:text-emerald-700">Contatti</a>
          </nav>

          <a
            href={whatsappLink(whatsappMessage)}
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white shadow-lg transition hover:bg-emerald-700"
          >
            Ordina ora
          </a>
        </div>
      </header>

      <section id="home" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.18),transparent_28%),radial-gradient(circle_at_top_right,rgba(249,115,22,0.18),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.92),rgba(240,253,244,0.95))]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-[1.02fr_0.98fr] md:px-6 md:py-20">
          <div className="flex flex-col justify-center">
            <div className="inline-flex w-fit rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-black text-emerald-800 shadow-sm">
              Più ordine • Più offerte • Più conversione
            </div>
            <h1 className="mt-6 max-w-3xl text-4xl font-black tracking-tight text-neutral-950 md:text-6xl md:leading-[1.02]">
              Frutta e verdura fresca con un sito più chiaro, più vivo e più facile da ordinare.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-neutral-700 md:text-lg">
              Prezzi chiari, omaggi automatici, spedizione gratuita sopra soglia e foto reali del negozio: tutto impostato per far capire subito qualità, convenienza e semplicità.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#ordina" className="rounded-2xl bg-neutral-950 px-6 py-4 text-center text-sm font-bold text-white shadow-lg transition hover:opacity-90">
                Configura l’ordine
              </a>
              <a
                href={whatsappLink(whatsappMessage)}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-emerald-200 bg-white px-6 py-4 text-center text-sm font-bold text-neutral-950 transition hover:border-emerald-300"
              >
                Scrivici su WhatsApp
              </a>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 md:max-w-2xl md:grid-cols-4">
              {offerCards.map((item) => (
                <div key={item.label} className="rounded-[26px] border border-white/80 bg-white/90 p-4 shadow-[0_18px_40px_rgba(16,24,40,0.06)]">
                  <div className="text-sm font-black uppercase tracking-[0.16em] text-neutral-500">{item.label}</div>
                  <div className="mt-2 text-2xl font-black text-neutral-950">{item.value}</div>
                  <div className="mt-2 text-sm leading-6 text-neutral-600">{item.text}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="overflow-hidden rounded-[34px] border border-white/70 bg-white p-3 shadow-[0_24px_70px_rgba(16,24,40,0.10)] sm:col-span-2">
              <img src={asset("images/frutta/banco-frutta-panorama.jpeg")} alt="Banco principale del negozio" className="h-[320px] w-full rounded-[26px] object-cover md:h-[360px]" />
            </div>
            <div className="overflow-hidden rounded-[30px] border border-white/70 bg-white p-3 shadow-[0_18px_50px_rgba(16,24,40,0.08)]">
              <img src={asset("images/frutta/fragole.jpeg")} alt="Fragole fresche" className="h-52 w-full rounded-[22px] object-cover" />
            </div>
            <div className="overflow-hidden rounded-[30px] border border-white/70 bg-white p-3 shadow-[0_18px_50px_rgba(16,24,40,0.08)]">
              <img src={asset("images/frutta/meloni-ananas.jpeg")} alt="Meloni e ananas" className="h-52 w-full rounded-[22px] object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section id="offerte" className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[34px] border border-orange-200 bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-300 p-7 text-neutral-950 shadow-[0_20px_60px_rgba(249,115,22,0.20)]">
            <div className="inline-flex rounded-full bg-white/85 px-4 py-2 text-xs font-black uppercase tracking-[0.20em] text-orange-700">Offerta in evidenza</div>
            <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">Più ordini, più vantaggi, più motivi per comprare subito.</h2>
            <div className="mt-4 grid gap-3 text-sm font-bold md:grid-cols-2">
              <div className="rounded-2xl bg-white/70 px-4 py-3">Ogni 10 vaschette = 1 vaschetta omaggio</div>
              <div className="rounded-2xl bg-white/70 px-4 py-3">Ogni 10 kg = 1 kg omaggio</div>
              <div className="rounded-2xl bg-white/70 px-4 py-3">Spedizione gratuita sopra 29,99 €</div>
              <div className="rounded-2xl bg-white/70 px-4 py-3">Scatole da 10 kg a partire da 39,99 €</div>
            </div>
          </div>

          <div className="rounded-[34px] border border-emerald-200 bg-white p-7 shadow-[0_18px_60px_rgba(16,24,40,0.08)]">
            <div className="text-sm font-black uppercase tracking-[0.20em] text-emerald-700">Perché funziona meglio</div>
            <div className="mt-5 grid gap-3">
              {advantages.map((item) => (
                <div key={item} className="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm font-semibold text-neutral-700">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="ordina" className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="mb-8 max-w-3xl">
          <div className="text-sm font-black uppercase tracking-[0.24em] text-emerald-700">Ordina facile</div>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-neutral-950 md:text-5xl">Configura vaschette, kg e scatole con totale automatico.</h2>
          <p className="mt-4 text-base leading-8 text-neutral-600">
            Il cliente vede i prezzi subito, aumenta o diminuisce le quantità con fluidità e capisce al volo quanto manca per la spedizione gratuita o per chiudere l’ordine minimo.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          <Counter
            label={sections[0].name}
            image={sections[0].image}
            imageAlt={sections[0].imageAlt}
            description={sections[0].description}
            promo={sections[0].promo}
            helper={sections[0].helper}
            quantity={trayQty}
            onDecrease={() => setTrayQty((value) => Math.max(0, value - 1))}
            onIncrease={() => setTrayQty((value) => value + 1)}
            freeText={freeTrays > 0 ? `${freeTrays} vaschetta omaggio` : "Nessun omaggio ancora"}
            total={trayTotal}
          />

          <Counter
            label={sections[1].name}
            image={sections[1].image}
            imageAlt={sections[1].imageAlt}
            description={sections[1].description}
            promo={sections[1].promo}
            helper={sections[1].helper}
            quantity={kgQty}
            onDecrease={() => setKgQty((value) => Math.max(0, value - 1))}
            onIncrease={() => setKgQty((value) => value + 1)}
            freeText={freeKg > 0 ? `${freeKg} kg omaggio` : "Nessun omaggio ancora"}
            total={kgTotal}
          />

          <Counter
            label={sections[2].name}
            image={sections[2].image}
            imageAlt={sections[2].imageAlt}
            description={sections[2].description}
            promo={sections[2].promo}
            helper={sections[2].helper}
            quantity={boxQty}
            onDecrease={() => setBoxQty((value) => Math.max(0, value - 1))}
            onIncrease={() => setBoxQty((value) => value + 1)}
            freeText={boxQty > 0 ? `${boxQty * boxKg} kg totali selezionati` : "Ogni scatola contiene 10 kg"}
            total={boxTotal}
          />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[34px] border border-neutral-200 bg-white p-8 shadow-[0_18px_60px_rgba(16,24,40,0.08)]">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="text-sm font-black uppercase tracking-[0.20em] text-neutral-500">Riepilogo ordine</div>
                <h3 className="mt-2 text-3xl font-black text-neutral-950">{euro(total)}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">
                  {summaryItems.length > 0
                    ? `${summaryItems.join(" • ")}`
                    : "Nessun prodotto selezionato al momento."}
                </p>
              </div>
              <div className={`rounded-[24px] px-5 py-4 text-sm font-bold ${shippingFree ? "bg-emerald-50 text-emerald-800" : "bg-orange-50 text-orange-800"}`}>
                {shippingFree
                  ? "Spedizione gratuita attiva"
                  : `Mancano ${euro(missingForFreeShipping)} per spedizione gratuita`}
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-[24px] border border-neutral-200 bg-neutral-50 p-4">
                <div className="text-sm font-bold text-neutral-500">Vaschette omaggio</div>
                <div className="mt-1 text-2xl font-black text-neutral-950">{freeTrays}</div>
              </div>
              <div className="rounded-[24px] border border-neutral-200 bg-neutral-50 p-4">
                <div className="text-sm font-bold text-neutral-500">Kg omaggio</div>
                <div className="mt-1 text-2xl font-black text-neutral-950">{freeKg}</div>
              </div>
              <div className="rounded-[24px] border border-neutral-200 bg-neutral-50 p-4">
                <div className="text-sm font-bold text-neutral-500">Kg totali selezionati</div>
                <div className="mt-1 text-2xl font-black text-neutral-950">{totalKgWithBoxes}</div>
              </div>
              <div className={`rounded-[24px] border p-4 ${orderReady ? "border-emerald-200 bg-emerald-50" : "border-orange-200 bg-orange-50"}`}>
                <div className="text-sm font-bold text-neutral-500">Ordine minimo</div>
                <div className="mt-1 text-xl font-black text-neutral-950">
                  {orderReady ? "Raggiunto" : `Mancano ${euro(missingForMinimum)}`}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[34px] border border-emerald-200 bg-gradient-to-br from-emerald-600 via-emerald-500 to-lime-500 p-8 text-white shadow-[0_22px_70px_rgba(16,185,129,0.22)]">
            <div className="text-sm font-black uppercase tracking-[0.24em] text-white/80">Concludi ordine</div>
            <h3 className="mt-3 text-3xl font-black tracking-tight">Invia il riepilogo direttamente su WhatsApp.</h3>
            <p className="mt-4 leading-7 text-white/85">
              Il messaggio parte già pronto con quantità, omaggi, totale e stato spedizione. Così il cliente trova tutto chiaro e converte più facilmente.
            </p>
            <a
              href={whatsappLink(whatsappMessage)}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex rounded-2xl bg-white px-6 py-4 text-sm font-black text-emerald-700 shadow-lg transition hover:opacity-90"
            >
              Invia ordine su WhatsApp
            </a>
            <div className="mt-6 rounded-[24px] border border-white/20 bg-white/10 p-5 text-sm leading-7 text-white/85">
              Spesa minima {euro(minimumOrderValue)}. Spedizione gratuita sopra {euro(freeShippingThreshold)}. Scatole da {boxKg} kg a partire da {euro(boxPrice)}.
            </div>
          </div>
        </div>
      </section>

      <section id="galleria" className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="mb-8 max-w-3xl">
          <div className="text-sm font-black uppercase tracking-[0.24em] text-emerald-700">Galleria reale</div>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-neutral-950 md:text-5xl">Foto vere del negozio inserite nel sito in modo ordinato.</h2>
          <p className="mt-4 text-base leading-8 text-neutral-600">
            Le immagini ora non sono più sparse: rafforzano identità, freschezza e credibilità visiva in ogni sezione.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {galleryImages.map((item) => (
            <div key={item.title} className="overflow-hidden rounded-[30px] border border-neutral-200 bg-white shadow-[0_16px_50px_rgba(16,24,40,0.08)]">
              <img src={item.src} alt={item.alt} className="h-72 w-full object-cover" />
              <div className="p-5">
                <div className="text-xl font-black text-neutral-950">{item.title}</div>
                <p className="mt-2 text-sm leading-7 text-neutral-600">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="overflow-hidden rounded-[34px] border border-neutral-200 bg-white shadow-[0_18px_60px_rgba(16,24,40,0.08)]">
            <img src={asset("images/frutta/fagiolini.jpeg")} alt="Fagiolini freschi" className="h-full min-h-[350px] w-full object-cover" />
          </div>
          <div className="rounded-[34px] border border-neutral-200 bg-white p-8 shadow-[0_18px_60px_rgba(16,24,40,0.08)]">
            <div className="text-sm font-black uppercase tracking-[0.24em] text-emerald-700">Struttura migliore</div>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-neutral-950 md:text-4xl">Più ordine nelle sezioni, più chiarezza nei prezzi, più spinta all’acquisto.</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                "Vaschette con immagine correlata e prezzo ben visibile",
                "Sezione kg chiara e quantità sempre modificabile",
                "Scatole evidenziate come soluzione da 10 kg",
                "Colori più fruttivendolo: verde, arancio, giallo, bianco",
                "Blocchi ordinati e leggibili anche da telefono",
                "CTA dirette per WhatsApp e contatti",
              ].map((point) => (
                <div key={point} className="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-4 text-sm font-semibold text-neutral-700">
                  {point}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="max-w-3xl">
            <div className="text-sm font-black uppercase tracking-[0.24em] text-emerald-700">Domande frequenti</div>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-neutral-950 md:text-5xl">Risposte chiare per togliere dubbi e far ordinare prima.</h2>
          </div>
          <div className="mt-10 grid gap-4">
            {faqs.map((item, index) => (
              <FaqItem key={item.question} item={item} open={openFaq === index} onToggle={() => setOpenFaq(openFaq === index ? -1 : index)} />
            ))}
          </div>
        </div>
      </section>

      <section id="contatti" className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="rounded-[34px] border border-neutral-200 bg-white p-8 shadow-[0_18px_60px_rgba(16,24,40,0.08)]">
            <div className="text-sm font-black uppercase tracking-[0.24em] text-emerald-700">Contatti</div>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-neutral-950 md:text-4xl">Contatto diretto, rapido e ordinato.</h2>
            <p className="mt-4 max-w-2xl leading-7 text-neutral-600">
              Il sito adesso accompagna il cliente fino all’azione: prezzi chiari, offerte visibili, riepilogo automatico e accesso immediato a WhatsApp.
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

          <div className="overflow-hidden rounded-[34px] border border-orange-200 bg-gradient-to-br from-neutral-950 via-neutral-900 to-emerald-900 text-white shadow-[0_20px_70px_rgba(16,24,40,0.18)]">
            <img src={asset("images/frutta/zucchine-fiori.jpeg")} alt="Zucchine fresche" className="h-64 w-full object-cover opacity-80" />
            <div className="p-8">
              <div className="text-sm font-black uppercase tracking-[0.24em] text-emerald-300">Chiamata all’azione</div>
              <h2 className="mt-3 text-3xl font-black tracking-tight">Ordina adesso e sfrutta subito offerte e omaggi.</h2>
              <div className="mt-8 grid gap-4">
                <a href={whatsappLink(whatsappMessage)} target="_blank" rel="noreferrer" className="rounded-2xl bg-emerald-500 px-5 py-4 text-center text-sm font-black text-white transition hover:bg-emerald-400">
                  Scrivi su WhatsApp
                </a>
                <a href={`tel:${phoneLink}`} className="rounded-2xl border border-white/15 bg-white/10 px-5 py-4 text-center text-sm font-black text-white transition hover:bg-white/15">
                  Chiama ora
                </a>
                <a href={`https://instagram.com/${instagramHandle}`} target="_blank" rel="noreferrer" className="rounded-2xl border border-white/15 bg-white/10 px-5 py-4 text-center text-sm font-black text-white transition hover:bg-white/15">
                  Vai su Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/70 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-neutral-500 md:flex-row md:items-center md:justify-between md:px-6">
          <div>© {new Date().getFullYear()} Frutta e Verdura di Marco Coratella</div>
          <div className="flex flex-wrap gap-4">
            <a href="#home" className="hover:text-neutral-900">Home</a>
            <a href="#offerte" className="hover:text-neutral-900">Offerte</a>
            <a href="#ordina" className="hover:text-neutral-900">Ordina</a>
            <a href="#galleria" className="hover:text-neutral-900">Galleria</a>
            <a href="#contatti" className="hover:text-neutral-900">Contatti</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
