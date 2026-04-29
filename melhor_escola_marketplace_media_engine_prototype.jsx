import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Eye,
  FileText,
  Filter,
  Gauge,
  Home,
  LayoutDashboard,
  LineChart,
  MapPin,
  Megaphone,
  MousePointerClick,
  PieChart,
  Plus,
  School,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  Wallet,
  Zap,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const mockSchools = [
  {
    id: "school-1",
    name: "Colégio Aurora",
    logoUrl: "https://img.imageboss.me/me/cover:center/96x96/format:auto/20190719204408206.jpg",
    neighborhood: "Vila Mariana",
    city: "São Paulo",
    state: "SP",
    rating: 4.8,
    reviewCount: 124,
  },
  {
    id: "school-2",
    name: "Escola Jardim do Saber",
    logoUrl: "https://img.imageboss.me/me/cover:center/96x96/format:auto/files/assinaturas/35431485/logo_passaros.PNG",
    neighborhood: "Pinheiros",
    city: "São Paulo",
    state: "SP",
    rating: 4.6,
    reviewCount: 89,
  },
  {
    id: "school-3",
    name: "Centro Educacional Pássaros",
    logoUrl: "https://img.imageboss.me/me/cover:center/96x96/format:auto/20190719204408206.jpg",
    neighborhood: "Mooca",
    city: "São Paulo",
    state: "SP",
    rating: 4.9,
    reviewCount: 211,
  },
  {
    id: "school-4",
    name: "Colégio Vila Serena",
    logoUrl: "https://img.imageboss.me/me/cover:center/96x96/format:auto/files/assinaturas/35431485/logo_passaros.PNG",
    neighborhood: "Santana",
    city: "São Paulo",
    state: "SP",
    rating: 4.5,
    reviewCount: 76,
  },
  {
    id: "school-5",
    name: "Escola Primeiros Passos",
    logoUrl: "https://img.imageboss.me/me/cover:center/96x96/format:auto/20190719204408206.jpg",
    neighborhood: "Ipiranga",
    city: "São Paulo",
    state: "SP",
    rating: 4.4,
    reviewCount: 58,
  },
];

const mockOffers = [
  {
    id: "offer-1",
    schoolId: "school-1",
    schoolName: "Colégio Aurora",
    logoUrl: mockSchools[0].logoUrl,
    neighborhood: "Vila Mariana",
    city: "São Paulo",
    state: "SP",
    rating: 4.8,
    reviewCount: 124,
    grade: "6º ano",
    originalPrice: 1800,
    discountedPrice: 990,
    discountPercentage: 45,
    relevanceScore: 82,
    sponsoredBoost: 12,
    isSponsored: true,
    campaignId: "campaign-1",
    tags: ["alta procura", "boa conversão", "próximo ao metrô"],
  },
  {
    id: "offer-2",
    schoolId: "school-2",
    schoolName: "Escola Jardim do Saber",
    logoUrl: mockSchools[1].logoUrl,
    neighborhood: "Pinheiros",
    city: "São Paulo",
    state: "SP",
    rating: 4.6,
    reviewCount: 89,
    grade: "Educação Infantil",
    originalPrice: 1500,
    discountedPrice: 825,
    discountPercentage: 45,
    relevanceScore: 88,
    sponsoredBoost: 0,
    isSponsored: false,
    tags: ["bolsa garantida", "integral opcional"],
  },
  {
    id: "offer-3",
    schoolId: "school-3",
    schoolName: "Centro Educacional Pássaros",
    logoUrl: mockSchools[2].logoUrl,
    neighborhood: "Mooca",
    city: "São Paulo",
    state: "SP",
    rating: 4.9,
    reviewCount: 211,
    grade: "1º ano",
    originalPrice: 1650,
    discountedPrice: 890,
    discountPercentage: 46,
    relevanceScore: 91,
    sponsoredBoost: 0,
    isSponsored: false,
    tags: ["melhor avaliada", "material incluso"],
  },
  {
    id: "offer-4",
    schoolId: "school-1",
    schoolName: "Colégio Aurora",
    logoUrl: mockSchools[0].logoUrl,
    neighborhood: "Vila Mariana",
    city: "São Paulo",
    state: "SP",
    rating: 4.8,
    reviewCount: 124,
    grade: "Ensino Médio",
    originalPrice: 2100,
    discountedPrice: 1260,
    discountPercentage: 40,
    relevanceScore: 79,
    sponsoredBoost: 10,
    isSponsored: true,
    campaignId: "campaign-2",
    tags: ["preparação vestibular", "campanha ativa"],
  },
  {
    id: "offer-5",
    schoolId: "school-4",
    schoolName: "Colégio Vila Serena",
    logoUrl: mockSchools[3].logoUrl,
    neighborhood: "Santana",
    city: "São Paulo",
    state: "SP",
    rating: 4.5,
    reviewCount: 76,
    grade: "7º ano",
    originalPrice: 1320,
    discountedPrice: 792,
    discountPercentage: 40,
    relevanceScore: 84,
    sponsoredBoost: 6,
    isSponsored: true,
    campaignId: "campaign-4",
    tags: ["turmas abertas", "boa localização"],
  },
  {
    id: "offer-6",
    schoolId: "school-5",
    schoolName: "Escola Primeiros Passos",
    logoUrl: mockSchools[4].logoUrl,
    neighborhood: "Ipiranga",
    city: "São Paulo",
    state: "SP",
    rating: 4.4,
    reviewCount: 58,
    grade: "Maternal",
    originalPrice: 980,
    discountedPrice: 588,
    discountPercentage: 40,
    relevanceScore: 80,
    sponsoredBoost: 0,
    isSponsored: false,
    tags: ["menor preço", "educação infantil"],
  },
];

const mockCampaigns = [
  {
    id: "campaign-1",
    name: "Captação 6º ano - Vila Mariana",
    offerId: "offer-1",
    status: "active",
    monthlyBudget: 900,
    spent: 612,
    impressions: 18200,
    clicks: 286,
    leads: 27,
    ctr: 1.57,
    averageCpc: 2.14,
    estimatedRoi: 3.8,
    surfaces: ["Artigos", "PLP", "Página da escola"],
  },
  {
    id: "campaign-2",
    name: "Ensino Médio - Alta temporada",
    offerId: "offer-4",
    status: "active",
    monthlyBudget: 1200,
    spent: 840,
    impressions: 22400,
    clicks: 351,
    leads: 31,
    ctr: 1.56,
    averageCpc: 2.39,
    estimatedRoi: 3.2,
    surfaces: ["PLP", "Artigos"],
  },
  {
    id: "campaign-3",
    name: "Educação Infantil - Teste CPC",
    offerId: "offer-2",
    status: "paused",
    monthlyBudget: 600,
    spent: 248,
    impressions: 8200,
    clicks: 94,
    leads: 8,
    ctr: 1.14,
    averageCpc: 2.64,
    estimatedRoi: 2.1,
    surfaces: ["Artigos"],
  },
];

const mockRecommendation = {
  id: "rec-1",
  title: "A IA recomenda impulsionar a oferta do 6º ano no bairro Vila Mariana",
  description:
    "A busca por bolsas para o 6º ano cresceu nos últimos dias e esta oferta possui boa conversão histórica, alta intenção de busca e concorrência patrocinada moderada.",
  offer: "Colégio Aurora - 6º ano",
  suggestedBudget: 900,
  estimatedClicks: 375,
  estimatedLeads: 34,
  estimatedCpc: 2.4,
  estimatedConversionRate: 8.5,
  estimatedRoi: 3.6,
  confidence: "Alta",
};

const dailyPerformance = [
  { day: "01", clicks: 28, leads: 2 },
  { day: "02", clicks: 34, leads: 3 },
  { day: "03", clicks: 41, leads: 4 },
  { day: "04", clicks: 38, leads: 3 },
  { day: "05", clicks: 47, leads: 5 },
  { day: "06", clicks: 52, leads: 5 },
  { day: "07", clicks: 46, leads: 5 },
];

function currency(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function calculateFinalScore(offer) {
  return offer.relevanceScore + offer.sponsoredBoost;
}

function sortOffersByFinalScore(offers) {
  return [...offers].sort((a, b) => calculateFinalScore(b) - calculateFinalScore(a));
}

function getOffer(offerId) {
  return mockOffers.find((offer) => offer.id === offerId) || mockOffers[0];
}

function navigate(path) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function LinkButton({ to, children, className = "", variant = "primary", icon: Icon = ArrowRight }) {
  const styles =
    variant === "primary"
      ? "bg-[#00a5b5] text-white hover:bg-[#008996]"
      : "border border-neutral-200 bg-white text-neutral-700 hover:border-[#00a5b5] hover:text-[#008996]";

  return (
    <button
      type="button"
      onClick={() => navigate(to)}
      className={`inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold transition ${styles} ${className}`}
    >
      {children}
      <Icon className="h-4 w-4" />
    </button>
  );
}

function Badge({ children, variant = "neutral" }) {
  const styles = {
    neutral: "bg-neutral-100 text-neutral-700 ring-neutral-200",
    sponsored: "bg-amber-50 text-amber-800 ring-amber-200",
    success: "bg-green-100 text-green-700 ring-green-200",
    teal: "bg-cyan-50 text-[#008996] ring-cyan-100",
    dark: "bg-neutral-900 text-white ring-neutral-900",
  };

  return (
    <span className={`inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-semibold ring-1 ring-inset ${styles[variant]}`}>
      {children}
    </span>
  );
}

function MelhorEscolaLogo() {
  return (
    <button type="button" onClick={() => navigate("/")} className="flex items-center gap-3 text-left">
      <div className="grid h-10 w-10 place-items-center rounded-full bg-[#00a5b5] text-sm font-black text-white">ME</div>
      <div>
        <p className="text-base font-bold text-neutral-900">Melhor Escola</p>
        <p className="text-xs font-medium text-neutral-500">Sponsored Boost</p>
      </div>
    </button>
  );
}

function PublicHeader() {
  const links = [
    { label: "Início", to: "/" },
    { label: "Artigo", to: "/artigo/melhores-escolas-em-sao-paulo" },
    { label: "Escolas", to: "/escolas" },
    { label: "Gestor", to: "/gestor" },
  ];

  return (
    <header className="sticky top-0 z-20 border-b border-neutral-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-6">
        <MelhorEscolaLogo />
        <nav className="flex flex-wrap items-center gap-2">
          {links.map((link) => (
            <button
              type="button"
              key={link.to}
              onClick={() => navigate(link.to)}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-neutral-600 transition hover:bg-neutral-100 hover:text-[#008996]"
            >
              {link.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

function PageContainer({ children, className = "" }) {
  return <main className={`mx-auto w-full max-w-7xl px-4 py-8 lg:px-6 ${className}`}>{children}</main>;
}

function ManagerLayout({ children }) {
  const items = [
    { label: "Dashboard", to: "/gestor", icon: LayoutDashboard },
    { label: "Nova campanha", to: "/gestor/campanhas/nova", icon: Plus },
    { label: "Listagem pública", to: "/escolas", icon: Search },
    { label: "Artigo", to: "/artigo/melhores-escolas-em-sao-paulo", icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      <PublicHeader />
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[240px_1fr] lg:px-6">
        <aside className="h-fit rounded-xl border border-neutral-200 bg-white p-3 shadow-sm">
          <div className="mb-3 rounded-lg bg-cyan-50 p-3">
            <p className="text-xs font-semibold uppercase text-[#008996]">Área do gestor</p>
            <p className="mt-1 text-sm font-semibold text-neutral-900">Colégio Aurora</p>
          </div>
          <nav className="space-y-1">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.to}
                  type="button"
                  onClick={() => navigate(item.to)}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold text-neutral-600 transition hover:bg-neutral-100 hover:text-[#008996]"
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </aside>
        <section>{children}</section>
      </div>
    </div>
  );
}

function Rating({ value, count }) {
  return (
    <div className="flex items-center gap-1 text-sm">
      <Star className="h-4 w-4 fill-[#ffb000] text-[#ffb000]" />
      <span className="font-semibold text-neutral-800">{value.toFixed(1)}</span>
      <span className="text-neutral-500">({count})</span>
    </div>
  );
}

function OfferLogo({ offer }) {
  return (
    <img
      src={offer.logoUrl}
      alt={`Logo ${offer.schoolName}`}
      className="h-14 w-14 shrink-0 rounded-full border border-neutral-200 bg-white object-cover"
    />
  );
}

function SponsoredOfferCard({ offer, variant = "large", showSponsoredBadge = true }) {
  const compact = variant === "compact";
  const annualSavings = (offer.originalPrice - offer.discountedPrice) * 12;

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
      className={`rounded-xl border bg-white shadow-sm ring-1 ring-inset ${
        offer.isSponsored ? "border-amber-100 ring-amber-100" : "border-neutral-200 ring-neutral-200"
      }`}
    >
      <div className={compact ? "p-4" : "p-5"}>
        <div className="flex gap-3">
          <OfferLogo offer={offer} />
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex flex-wrap gap-2">
              {offer.isSponsored && showSponsoredBadge && (
                <Badge variant="sponsored">
                  <Megaphone className="h-3 w-3" />
                  Patrocinado
                </Badge>
              )}
              <Badge variant="success">{offer.discountPercentage}% de desconto</Badge>
            </div>
            <h3 className="text-base font-semibold text-neutral-900">{offer.schoolName}</h3>
            <p className="mt-1 flex items-center gap-1 text-sm text-neutral-600">
              <MapPin className="h-4 w-4 text-neutral-400" />
              {offer.neighborhood}, {offer.city} - {offer.state}
            </p>
            <div className="mt-2">
              <Rating value={offer.rating} count={offer.reviewCount} />
            </div>
          </div>
        </div>

        {!compact && (
          <div className="mt-4 flex flex-wrap gap-2">
            {offer.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        )}

        <div className={`mt-4 ${compact ? "" : "grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end"}`}>
          <div>
            <p className="text-xs font-semibold uppercase text-neutral-500">{offer.grade}</p>
            <div className="mt-1 flex flex-wrap items-baseline gap-2">
              <span className="text-xl font-bold text-neutral-900">{currency(offer.discountedPrice)}</span>
              <span className="text-sm text-neutral-400 line-through">{currency(offer.originalPrice)}</span>
            </div>
            {!compact && <p className="mt-1 text-sm font-medium text-green-700">Economia anual de {currency(annualSavings)}</p>}
          </div>
          <Button className="mt-3 h-10 rounded-lg bg-[#00a5b5] px-4 hover:bg-[#008996] sm:mt-0">
            Ver bolsa
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.article>
  );
}

function OrganicOfferCard({ offer, variant = "large" }) {
  return <SponsoredOfferCard offer={{ ...offer, isSponsored: false }} variant={variant} showSponsoredBadge={false} />;
}

function SponsoredOffersSection({ title, subtitle, offers }) {
  return (
    <section className="rounded-xl border border-cyan-100 bg-cyan-50/60 p-4 sm:p-5">
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase text-[#008996]">Recomendação contextual</p>
        <h2 className="mt-1 text-xl font-bold text-neutral-900">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-neutral-600">{subtitle}</p>}
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {offers.map((offer) =>
          offer.isSponsored ? (
            <SponsoredOfferCard key={offer.id} offer={offer} variant="compact" />
          ) : (
            <OrganicOfferCard key={offer.id} offer={offer} variant="compact" />
          ),
        )}
      </div>
    </section>
  );
}

function RankingExplanation() {
  return (
    <section className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="rounded-lg bg-cyan-50 p-2 text-[#008996]">
          <Gauge className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-neutral-900">Como o ranking funciona neste protótipo</h2>
          <p className="mt-2 text-sm leading-6 text-neutral-600">
            Neste protótipo, o ranking combina relevância orgânica da oferta com um boost patrocinado controlado. A oferta patrocinada ganha
            mais visibilidade, mas continua respeitando critérios mínimos de qualidade e relevância para preservar a confiança do usuário.
          </p>
          <div className="mt-4 rounded-lg bg-neutral-900 px-4 py-3 font-mono text-sm text-white">score_final = relevance_score + sponsored_boost</div>
        </div>
      </div>
    </section>
  );
}

function MetricCard({ icon: Icon, label, value, caption }) {
  return (
    <Card className="rounded-xl border-neutral-200 shadow-sm">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-neutral-500">{label}</p>
            <p className="mt-1 text-2xl font-bold text-neutral-900">{value}</p>
            {caption && <p className="mt-1 text-xs text-neutral-500">{caption}</p>}
          </div>
          <div className="rounded-lg bg-cyan-50 p-2 text-[#008996]">
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function AiRecommendationCard({ compact = false }) {
  return (
    <Card className="rounded-xl border-cyan-100 bg-white shadow-sm">
      <CardContent className="p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Badge variant="teal">
              <Sparkles className="h-3 w-3" />
              Confiança {mockRecommendation.confidence}
            </Badge>
            <h2 className="mt-3 text-xl font-bold text-neutral-900">{mockRecommendation.title}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-600">{mockRecommendation.description}</p>
          </div>
          <LinkButton to="/gestor/campanhas/nova" className="shrink-0" icon={Zap}>
            Criar campanha com recomendação
          </LinkButton>
        </div>
        {!compact && (
          <div className="mt-5 grid gap-3 sm:grid-cols-4">
            <div className="rounded-lg bg-neutral-50 p-3">
              <p className="text-xs text-neutral-500">Oferta sugerida</p>
              <p className="mt-1 text-sm font-semibold text-neutral-900">{mockRecommendation.offer}</p>
            </div>
            <div className="rounded-lg bg-neutral-50 p-3">
              <p className="text-xs text-neutral-500">Orçamento</p>
              <p className="mt-1 text-sm font-semibold text-neutral-900">{currency(mockRecommendation.suggestedBudget)}/mês</p>
            </div>
            <div className="rounded-lg bg-neutral-50 p-3">
              <p className="text-xs text-neutral-500">Retorno estimado</p>
              <p className="mt-1 text-sm font-semibold text-neutral-900">{mockRecommendation.estimatedLeads} leads</p>
            </div>
            <div className="rounded-lg bg-neutral-50 p-3">
              <p className="text-xs text-neutral-500">ROI estimado</p>
              <p className="mt-1 text-sm font-semibold text-neutral-900">{mockRecommendation.estimatedRoi.toFixed(1)}x</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function BudgetSimulator({ budget, setBudget, cpc = 2.4, conversionRate = 0.085 }) {
  const estimatedClicks = Math.round(Number(budget) / cpc);
  const estimatedLeads = Math.round(estimatedClicks * conversionRate);
  const estimatedCpl = estimatedLeads ? Number(budget) / estimatedLeads : 0;

  return (
    <Card className="rounded-xl border-neutral-200 shadow-sm">
      <CardContent className="p-5">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5 text-[#008996]" />
          <h2 className="text-lg font-bold text-neutral-900">Simulador de orçamento</h2>
        </div>
        <label className="mt-5 block text-sm font-semibold text-neutral-700" htmlFor="budget">
          Orçamento mensal
        </label>
        <input
          id="budget"
          type="range"
          min="300"
          max="2500"
          step="50"
          value={budget}
          onChange={(event) => setBudget(Number(event.target.value))}
          className="mt-3 w-full accent-[#00a5b5]"
        />
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm text-neutral-500">R$ 300</span>
          <span className="text-lg font-bold text-neutral-900">{currency(Number(budget))}/mês</span>
          <span className="text-sm text-neutral-500">R$ 2.500</span>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg bg-neutral-50 p-3">
            <p className="text-xs text-neutral-500">CPC estimado</p>
            <p className="mt-1 font-semibold text-neutral-900">{currency(cpc)}</p>
          </div>
          <div className="rounded-lg bg-neutral-50 p-3">
            <p className="text-xs text-neutral-500">Cliques estimados</p>
            <p className="mt-1 font-semibold text-neutral-900">{estimatedClicks}</p>
          </div>
          <div className="rounded-lg bg-neutral-50 p-3">
            <p className="text-xs text-neutral-500">Leads estimados</p>
            <p className="mt-1 font-semibold text-neutral-900">{estimatedLeads}</p>
          </div>
          <div className="rounded-lg bg-neutral-50 p-3">
            <p className="text-xs text-neutral-500">CPL estimado</p>
            <p className="mt-1 font-semibold text-neutral-900">{currency(estimatedCpl)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function HomePage() {
  const cards = [
    {
      title: "Página de artigo com ofertas patrocinadas",
      text: "Mostra como o tráfego editorial pode virar vitrine contextual sem parecer banner invasivo.",
      to: "/artigo/melhores-escolas-em-sao-paulo",
      icon: BookOpen,
    },
    {
      title: "Página de listagem de escolas",
      text: "Demonstra o ranking misto com relevância orgânica e boost patrocinado controlado.",
      to: "/escolas",
      icon: Search,
    },
    {
      title: "Área do gestor",
      text: "Acompanha métricas, campanhas ativas, ROI e recomendação assistida por IA.",
      to: "/gestor",
      icon: LayoutDashboard,
    },
    {
      title: "Criação de campanha",
      text: "Fluxo visual para escolher oferta, objetivo, orçamento e revisar previsão.",
      to: "/gestor/campanhas/nova",
      icon: Plus,
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      <PublicHeader />
      <PageContainer>
        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <Badge variant="teal">
              <Sparkles className="h-3 w-3" />
              Protótipo hackathon
            </Badge>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight text-neutral-900 md:text-6xl">
              Protótipo — Ofertas Patrocinadas Melhor Escola
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-600">
              Uma demonstração navegável de como escolas elegíveis podem comprar visibilidade patrocinada, acompanhar resultados na área do
              gestor e aparecer em páginas públicas do Melhor Escola com sinalização clara.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <LinkButton to="/gestor/campanhas/nova" icon={Megaphone}>
                Criar campanha
              </LinkButton>
              <LinkButton to="/escolas" variant="secondary" icon={Search}>
                Ver ranking
              </LinkButton>
            </div>
          </div>
          <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2">
              <MetricCard icon={Wallet} label="Receita estimada" value="R$ 18,4 mil" caption="incremental mensal simulado" />
              <MetricCard icon={MousePointerClick} label="Cliques" value="731" caption="campanhas ativas" />
              <MetricCard icon={Users} label="Leads" value="66" caption="bolsas com intenção" />
              <MetricCard icon={TrendingUp} label="ROI" value="3,6x" caption="retorno estimado" />
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <button
                key={card.to}
                type="button"
                onClick={() => navigate(card.to)}
                className="rounded-xl border border-neutral-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-[#00a5b5] hover:shadow-md"
              >
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-lg bg-cyan-50 text-[#008996]">
                  <Icon className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-bold text-neutral-900">{card.title}</h2>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{card.text}</p>
                <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-[#008996]">
                  Abrir rota
                  <ChevronRight className="h-4 w-4" />
                </div>
              </button>
            );
          })}
        </section>

        <section className="mt-10 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-neutral-900">O que este protótipo demonstra</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-5">
            {[
              "Nova fonte de receita para Melhor Escola",
              "Valor claro para escolas parceiras",
              "Experiência transparente para famílias",
              "Controle de impacto no ranking",
              "IA apoiando decisão de investimento",
            ].map((item) => (
              <div key={item} className="rounded-lg bg-neutral-50 p-4">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <p className="mt-3 text-sm font-semibold leading-6 text-neutral-800">{item}</p>
              </div>
            ))}
          </div>
        </section>
      </PageContainer>
    </div>
  );
}

function ArticleContent() {
  return (
    <div className="prose prose-neutral max-w-none">
      <p className="text-lg leading-8 text-neutral-700">
        Escolher uma escola em São Paulo costuma envolver comparação de localização, proposta pedagógica, preço e disponibilidade de bolsas.
        Para muitas famílias, a jornada começa em conteúdos educativos antes de chegar à página de oferta.
      </p>
      <p className="mt-5 leading-7 text-neutral-600">
        Neste cenário, uma recomendação contextual pode aproximar a família de escolas relevantes no momento em que ela está pesquisando. A
        exibição patrocinada aparece sinalizada, mantendo a confiança no conteúdo e abrindo um novo canal de aquisição para escolas.
      </p>
    </div>
  );
}

function TrafficArticlePage() {
  const offers = sortOffersByFinalScore(mockOffers).slice(0, 3);

  return (
    <div className="min-h-screen bg-neutral-50">
      <PublicHeader />
      <PageContainer>
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <article className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm md:p-8">
            <Badge variant="teal">
              <BookOpen className="h-3 w-3" />
              Guia de bolsas
            </Badge>
            <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight text-neutral-900">
              Melhores escolas em São Paulo: veja opções com bolsas
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-neutral-600">
              Uma página pública simulando tráfego de conteúdo, onde famílias já estão em uma jornada de decisão e podem encontrar ofertas
              relevantes com desconto.
            </p>
            <div className="mt-8">
              <ArticleContent />
            </div>
            <div className="my-8">
              <SponsoredOffersSection
                title="Escolas com bolsas recomendadas para você"
                subtitle="Ofertas integradas ao conteúdo, com diferenciação discreta e tag Patrocinado quando houver mídia ativa."
                offers={offers}
              />
            </div>
            <p className="leading-7 text-neutral-600">
              Ao combinar intenção de busca, localização e disponibilidade de bolsa, o Melhor Escola pode transformar páginas editoriais em
              pontos de descoberta de escolas, sem perder a clareza para o usuário final.
            </p>
          </article>

          <aside className="space-y-4">
            <div className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
              <Badge variant="success">
                <ShieldCheck className="h-3 w-3" />
                Bolsa garantida
              </Badge>
              <h2 className="mt-3 text-xl font-bold text-neutral-900">Compare escolas perto de você</h2>
              <p className="mt-2 text-sm leading-6 text-neutral-600">Veja bolsas disponíveis por bairro, série e faixa de preço.</p>
              <LinkButton to="/escolas" className="mt-4 w-full" icon={Search}>
                Ver bolsas
              </LinkButton>
            </div>
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
              <Badge variant="sponsored">
                <Megaphone className="h-3 w-3" />
                Patrocinado
              </Badge>
              <p className="mt-3 text-sm leading-6 text-amber-900">
                Sinalização explícita preserva a confiança: a oferta pode receber destaque, mas não se mistura ao conteúdo editorial sem
                identificação.
              </p>
            </div>
          </aside>
        </div>
      </PageContainer>
    </div>
  );
}

function MarketplaceListingPage() {
  const rankedOffers = useMemo(() => sortOffersByFinalScore(mockOffers), []);

  return (
    <div className="min-h-screen bg-neutral-50">
      <PublicHeader />
      <PageContainer>
        <section className="mb-6 rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <Badge variant="teal">
                <Search className="h-3 w-3" />
                Marketplace
              </Badge>
              <h1 className="mt-3 text-3xl font-black text-neutral-900">Bolsas em São Paulo</h1>
              <p className="mt-2 text-sm text-neutral-600">Listagem com ofertas orgânicas e patrocinadas misturadas por score final.</p>
            </div>
            <div className="flex min-h-12 w-full items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-4 text-neutral-500 lg:w-96">
              <Search className="h-5 w-5" />
              <span className="text-sm">Buscar por escola, bairro ou série</span>
            </div>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="h-fit rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-[#008996]" />
              <h2 className="font-bold text-neutral-900">Filtros</h2>
            </div>
            {[
              ["Cidade", "São Paulo"],
              ["Série", "6º ano"],
              ["Preço", "Até R$ 1.300"],
              ["Avaliação", "4 estrelas ou mais"],
            ].map(([label, value]) => (
              <div key={label} className="mt-4">
                <p className="text-xs font-semibold uppercase text-neutral-500">{label}</p>
                <div className="mt-2 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm font-medium text-neutral-700">
                  {value}
                </div>
              </div>
            ))}
          </aside>

          <section className="space-y-4">
            <RankingExplanation />
            {rankedOffers.map((offer) => (
              <div key={offer.id} className="grid gap-3 lg:grid-cols-[1fr_220px]">
                {offer.isSponsored ? <SponsoredOfferCard offer={offer} /> : <OrganicOfferCard offer={offer} />}
                <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm">
                  <p className="text-xs font-semibold uppercase text-neutral-500">Transparência do score</p>
                  <div className="mt-3 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Score orgânico</span>
                      <span className="font-semibold text-neutral-900">{offer.relevanceScore}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Boost patrocinado</span>
                      <span className="font-semibold text-neutral-900">+{offer.sponsoredBoost}</span>
                    </div>
                    <div className="border-t border-neutral-200 pt-2 flex justify-between">
                      <span className="font-semibold text-neutral-900">Score final</span>
                      <span className="font-bold text-[#008996]">{calculateFinalScore(offer)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>
      </PageContainer>
    </div>
  );
}

function CampaignTable() {
  return (
    <Card className="rounded-xl border-neutral-200 shadow-sm">
      <CardContent className="p-0">
        <div className="border-b border-neutral-200 p-5">
          <h2 className="text-lg font-bold text-neutral-900">Tabela de campanhas</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="bg-neutral-50 text-xs uppercase text-neutral-500">
              <tr>
                {["Nome", "Oferta", "Status", "Orçamento", "Gasto", "Cliques", "Leads", "CTR", "ROI", ""].map((header) => (
                  <th key={header} className="px-5 py-3 font-semibold">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {mockCampaigns.map((campaign) => {
                const offer = getOffer(campaign.offerId);
                return (
                  <tr key={campaign.id} className="bg-white">
                    <td className="px-5 py-4 font-semibold text-neutral-900">{campaign.name}</td>
                    <td className="px-5 py-4 text-neutral-600">{offer.grade}</td>
                    <td className="px-5 py-4">
                      <Badge variant={campaign.status === "active" ? "success" : "neutral"}>
                        {campaign.status === "active" ? "Ativa" : "Pausada"}
                      </Badge>
                    </td>
                    <td className="px-5 py-4 text-neutral-700">{currency(campaign.monthlyBudget)}</td>
                    <td className="px-5 py-4 text-neutral-700">{currency(campaign.spent)}</td>
                    <td className="px-5 py-4 text-neutral-700">{campaign.clicks}</td>
                    <td className="px-5 py-4 text-neutral-700">{campaign.leads}</td>
                    <td className="px-5 py-4 text-neutral-700">{campaign.ctr.toFixed(2)}%</td>
                    <td className="px-5 py-4 font-semibold text-neutral-900">{campaign.estimatedRoi.toFixed(1)}x</td>
                    <td className="px-5 py-4">
                      <button
                        type="button"
                        onClick={() => navigate(`/gestor/campanhas/${campaign.id}`)}
                        className="font-semibold text-[#008996] hover:underline"
                      >
                        Ver detalhe
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

function CampaignCard({ campaign }) {
  const offer = getOffer(campaign.offerId);
  const progress = Math.round((campaign.spent / campaign.monthlyBudget) * 100);

  return (
    <button
      type="button"
      onClick={() => navigate(`/gestor/campanhas/${campaign.id}`)}
      className="rounded-xl border border-neutral-200 bg-white p-5 text-left shadow-sm transition hover:border-[#00a5b5] hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <Badge variant={campaign.status === "active" ? "success" : "neutral"}>{campaign.status === "active" ? "Ativa" : "Pausada"}</Badge>
          <h3 className="mt-3 text-lg font-bold text-neutral-900">{campaign.name}</h3>
          <p className="mt-1 text-sm text-neutral-600">
            {offer.schoolName} - {offer.grade}
          </p>
        </div>
        <ChevronRight className="h-5 w-5 text-neutral-400" />
      </div>
      <div className="mt-5 h-2 rounded-full bg-neutral-100">
        <div className="h-2 rounded-full bg-[#00a5b5]" style={{ width: `${Math.min(progress, 100)}%` }} />
      </div>
      <div className="mt-3 flex justify-between text-sm">
        <span className="text-neutral-500">Gasto {currency(campaign.spent)}</span>
        <span className="font-semibold text-neutral-900">{progress}%</span>
      </div>
    </button>
  );
}

function ManagerDashboardPage() {
  const activeCampaigns = mockCampaigns.filter((campaign) => campaign.status === "active");
  const totals = mockCampaigns.reduce(
    (acc, campaign) => ({
      spent: acc.spent + campaign.spent,
      clicks: acc.clicks + campaign.clicks,
      leads: acc.leads + campaign.leads,
      impressions: acc.impressions + campaign.impressions,
    }),
    { spent: 0, clicks: 0, leads: 0, impressions: 0 },
  );
  const ctr = (totals.clicks / totals.impressions) * 100;
  const averageCpc = totals.spent / totals.clicks;
  const revenue = totals.leads * 420;
  const roi = revenue / totals.spent;

  return (
    <ManagerLayout>
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-black text-neutral-900">Olá, Colégio Aurora</h1>
          <p className="mt-2 text-neutral-600">Acompanhe suas campanhas patrocinadas no Melhor Escola</p>
        </div>
        <LinkButton to="/gestor/campanhas/nova" icon={Plus}>
          Nova campanha
        </LinkButton>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        <MetricCard icon={Wallet} label="Receita estimada gerada" value={currency(revenue)} caption="leads x ticket mockado" />
        <MetricCard icon={MousePointerClick} label="Cliques" value={totals.clicks} caption="mês atual" />
        <MetricCard icon={Users} label="Leads" value={totals.leads} caption="cadastros interessados" />
        <MetricCard icon={BarChart3} label="CTR" value={`${ctr.toFixed(2)}%`} caption="cliques/impressões" />
        <MetricCard icon={Target} label="CPC médio" value={currency(averageCpc)} caption="gasto/cliques" />
        <MetricCard icon={TrendingUp} label="ROI estimado" value={`${roi.toFixed(1)}x`} caption="retorno simulado" />
      </section>

      <section className="mt-6">
        <AiRecommendationCard />
      </section>

      <section className="mt-6">
        <h2 className="mb-4 text-xl font-bold text-neutral-900">Campanhas ativas</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {activeCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      </section>

      <section className="mt-6">
        <CampaignTable />
      </section>
    </ManagerLayout>
  );
}

function OfferSelectionList({ selectedOffer, setSelectedOffer }) {
  return (
    <div className="space-y-3">
      {mockOffers.slice(0, 4).map((offer) => (
        <button
          type="button"
          key={offer.id}
          onClick={() => setSelectedOffer(offer.id)}
          className={`flex w-full gap-3 rounded-xl border bg-white p-4 text-left transition ${
            selectedOffer === offer.id ? "border-[#00a5b5] ring-2 ring-cyan-100" : "border-neutral-200 hover:border-[#00a5b5]"
          }`}
        >
          <OfferLogo offer={offer} />
          <div className="min-w-0">
            <h3 className="font-bold text-neutral-900">{offer.schoolName}</h3>
            <p className="mt-1 text-sm text-neutral-600">
              {offer.grade} - {offer.neighborhood}
            </p>
            <p className="mt-1 text-sm font-semibold text-green-700">{offer.discountPercentage}% de desconto</p>
          </div>
        </button>
      ))}
    </div>
  );
}

function CampaignCreatePage() {
  const [selectedOffer, setSelectedOffer] = useState("offer-1");
  const [objective, setObjective] = useState("Mais leads");
  const [budget, setBudget] = useState(900);
  const [cpc, setCpc] = useState(2.4);
  const [period, setPeriod] = useState("30 dias");
  const [surfaces, setSurfaces] = useState(["Artigos", "PLP", "Páginas de escola"]);
  const [success, setSuccess] = useState(false);
  const offer = getOffer(selectedOffer);
  const estimatedClicks = Math.round(budget / cpc);
  const estimatedLeads = Math.round(estimatedClicks * 0.085);
  const estimatedCpl = estimatedLeads ? budget / estimatedLeads : 0;

  function toggleSurface(surface) {
    setSurfaces((current) => (current.includes(surface) ? current.filter((item) => item !== surface) : [...current, surface]));
  }

  return (
    <ManagerLayout>
      <div className="mb-6">
        <button type="button" onClick={() => navigate("/gestor")} className="text-sm font-semibold text-[#008996]">
          Voltar para o gestor
        </button>
        <h1 className="mt-3 text-3xl font-black text-neutral-900">Criar campanha patrocinada</h1>
        <p className="mt-2 text-neutral-600">Escolha uma oferta, defina objetivo e veja a previsão antes de ativar.</p>
      </div>

      {success && (
        <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-800">
          Campanha criada com sucesso no protótipo.
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <section className="space-y-6">
          <Card className="rounded-xl border-neutral-200 shadow-sm">
            <CardContent className="p-5">
              <div className="mb-4 flex items-center gap-2">
                <Badge variant="dark">1</Badge>
                <h2 className="text-lg font-bold text-neutral-900">Escolher oferta</h2>
              </div>
              <OfferSelectionList selectedOffer={selectedOffer} setSelectedOffer={setSelectedOffer} />
            </CardContent>
          </Card>

          <Card className="rounded-xl border-neutral-200 shadow-sm">
            <CardContent className="p-5">
              <div className="mb-4 flex items-center gap-2">
                <Badge variant="dark">2</Badge>
                <h2 className="text-lg font-bold text-neutral-900">Definir objetivo</h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {["Mais cliques", "Mais leads", "Maximizar ROI"].map((item) => (
                  <button
                    type="button"
                    key={item}
                    onClick={() => setObjective(item)}
                    className={`rounded-lg border px-4 py-3 text-sm font-semibold transition ${
                      objective === item ? "border-[#00a5b5] bg-cyan-50 text-[#008996]" : "border-neutral-200 bg-white text-neutral-700"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl border-neutral-200 shadow-sm">
            <CardContent className="p-5">
              <div className="mb-4 flex items-center gap-2">
                <Badge variant="dark">3</Badge>
                <h2 className="text-lg font-bold text-neutral-900">Definir orçamento</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <label className="text-sm font-semibold text-neutral-700">
                  Orçamento mensal
                  <input
                    type="number"
                    value={budget}
                    min="300"
                    onChange={(event) => setBudget(Number(event.target.value))}
                    className="mt-2 h-11 w-full rounded-lg border border-neutral-200 px-3 text-sm"
                  />
                </label>
                <label className="text-sm font-semibold text-neutral-700">
                  CPC máximo
                  <input
                    type="number"
                    value={cpc}
                    min="1"
                    step="0.1"
                    onChange={(event) => setCpc(Number(event.target.value))}
                    className="mt-2 h-11 w-full rounded-lg border border-neutral-200 px-3 text-sm"
                  />
                </label>
                <label className="text-sm font-semibold text-neutral-700">
                  Período
                  <select
                    value={period}
                    onChange={(event) => setPeriod(event.target.value)}
                    className="mt-2 h-11 w-full rounded-lg border border-neutral-200 bg-white px-3 text-sm"
                  >
                    <option>15 dias</option>
                    <option>30 dias</option>
                    <option>60 dias</option>
                  </select>
                </label>
              </div>
              <div className="mt-5">
                <p className="text-sm font-semibold text-neutral-700">Superfícies de exibição</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["Artigos", "PLP", "Páginas de escola"].map((surface) => (
                    <button
                      key={surface}
                      type="button"
                      onClick={() => toggleSurface(surface)}
                      className={`rounded-lg border px-3 py-2 text-sm font-semibold ${
                        surfaces.includes(surface) ? "border-[#00a5b5] bg-cyan-50 text-[#008996]" : "border-neutral-200 bg-white text-neutral-600"
                      }`}
                    >
                      {surface}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <aside className="space-y-6">
          <BudgetSimulator budget={budget} setBudget={setBudget} cpc={cpc} />
          <Card className="rounded-xl border-neutral-200 shadow-sm">
            <CardContent className="p-5">
              <div className="mb-4 flex items-center gap-2">
                <Badge variant="dark">4</Badge>
                <h2 className="text-lg font-bold text-neutral-900">Revisar previsão</h2>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Orçamento</span>
                  <span className="font-semibold">{currency(budget)}/mês</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">CPC estimado</span>
                  <span className="font-semibold">{currency(cpc)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Cliques estimados</span>
                  <span className="font-semibold">{estimatedClicks}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Taxa de conversão</span>
                  <span className="font-semibold">8,5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Leads estimados</span>
                  <span className="font-semibold">{estimatedLeads}</span>
                </div>
                <div className="border-t border-neutral-200 pt-3 flex justify-between">
                  <span className="font-semibold text-neutral-900">Custo por lead</span>
                  <span className="font-bold text-[#008996]">{currency(estimatedCpl)}</span>
                </div>
              </div>
              <div className="mt-5">
                <SponsoredOfferCard offer={{ ...offer, isSponsored: true, sponsoredBoost: 12 }} variant="compact" />
              </div>
              <Button onClick={() => setSuccess(true)} className="mt-5 h-11 w-full rounded-lg bg-[#00a5b5] hover:bg-[#008996]">
                Ativar campanha mockada
              </Button>
            </CardContent>
          </Card>
        </aside>
      </div>
    </ManagerLayout>
  );
}

function PerformanceChartMock() {
  const maxClicks = Math.max(...dailyPerformance.map((item) => item.clicks));

  return (
    <Card className="rounded-xl border-neutral-200 shadow-sm">
      <CardContent className="p-5">
        <div className="mb-5 flex items-center gap-2">
          <LineChart className="h-5 w-5 text-[#008996]" />
          <h2 className="text-lg font-bold text-neutral-900">Evolução diária</h2>
        </div>
        <div className="flex h-56 items-end gap-3">
          {dailyPerformance.map((item) => (
            <div key={item.day} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex h-44 w-full items-end rounded-lg bg-neutral-50 px-2">
                <div
                  className="w-full rounded-t bg-[#00a5b5]"
                  style={{ height: `${Math.max(12, (item.clicks / maxClicks) * 100)}%` }}
                  title={`${item.clicks} cliques, ${item.leads} leads`}
                />
              </div>
              <span className="text-xs font-semibold text-neutral-500">{item.day}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function CampaignDetailsPage({ id }) {
  const campaign = mockCampaigns.find((item) => item.id === id) || mockCampaigns[0];
  const offer = getOffer(campaign.offerId);
  const cpl = campaign.spent / campaign.leads;

  return (
    <ManagerLayout>
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <button type="button" onClick={() => navigate("/gestor")} className="text-sm font-semibold text-[#008996]">
            Voltar para campanhas
          </button>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-black text-neutral-900">{campaign.name}</h1>
            <Badge variant={campaign.status === "active" ? "success" : "neutral"}>{campaign.status === "active" ? "Ativa" : "Pausada"}</Badge>
          </div>
          <p className="mt-2 text-neutral-600">
            Oferta vinculada: {offer.schoolName} - {offer.grade}
          </p>
        </div>
        <LinkButton to="/gestor/campanhas/nova" icon={Plus}>
          Duplicar campanha
        </LinkButton>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        <MetricCard icon={Wallet} label="Investimento" value={currency(campaign.monthlyBudget)} caption="orçamento mensal" />
        <MetricCard icon={PieChart} label="Gasto" value={currency(campaign.spent)} caption="consumido no mês" />
        <MetricCard icon={MousePointerClick} label="Cliques" value={campaign.clicks} caption="total" />
        <MetricCard icon={Users} label="Leads" value={campaign.leads} caption="contatos gerados" />
        <MetricCard icon={BarChart3} label="CTR" value={`${campaign.ctr.toFixed(2)}%`} caption="taxa de clique" />
        <MetricCard icon={Target} label="CPC médio" value={currency(campaign.averageCpc)} caption={`CPL ${currency(cpl)}`} />
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <PerformanceChartMock />
          <Card className="rounded-xl border-cyan-100 shadow-sm">
            <CardContent className="p-5">
              <Badge variant="teal">
                <Sparkles className="h-3 w-3" />
                Recomendação IA
              </Badge>
              <h2 className="mt-3 text-xl font-bold text-neutral-900">Aumentar orçamento em 20% pode gerar +7 leads</h2>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                Reduzir CPC máximo pode diminuir volume, mas melhorar eficiência. Para esta campanha, a IA sugere testar aumento de verba
                mantendo CPC médio abaixo de {currency(2.5)}.
              </p>
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-6">
          <Card className="rounded-xl border-neutral-200 shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-[#008996]" />
                <h2 className="text-lg font-bold text-neutral-900">Onde sua oferta apareceu</h2>
              </div>
              <div className="mt-4 space-y-3">
                {campaign.surfaces.map((surface) => (
                  <div key={surface} className="flex items-center justify-between rounded-lg bg-neutral-50 p-3">
                    <span className="text-sm font-semibold text-neutral-700">{surface}</span>
                    <Badge variant="teal">Ativo</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <SponsoredOfferCard offer={{ ...offer, isSponsored: true }} />
          <Card className="rounded-xl border-neutral-200 shadow-sm">
            <CardContent className="p-5">
              <h2 className="text-lg font-bold text-neutral-900">ROI estimado</h2>
              <p className="mt-2 text-4xl font-black text-[#008996]">{campaign.estimatedRoi.toFixed(1)}x</p>
              <p className="mt-2 text-sm leading-6 text-neutral-600">Cálculo mockado para demonstrar transparência de performance no gestor.</p>
            </CardContent>
          </Card>
        </aside>
      </section>
    </ManagerLayout>
  );
}

function NotFoundPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <PublicHeader />
      <PageContainer>
        <div className="rounded-xl border border-neutral-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-3xl font-black text-neutral-900">Rota não encontrada</h1>
          <p className="mt-2 text-neutral-600">Volte para o hub do protótipo e escolha uma das jornadas.</p>
          <LinkButton to="/" className="mt-6" icon={Home}>
            Ir para início
          </LinkButton>
        </div>
      </PageContainer>
    </div>
  );
}

function usePathname() {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const update = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", update);
    return () => window.removeEventListener("popstate", update);
  }, []);

  return pathname;
}

export default function MelhorEscolaAdsPrototype() {
  const pathname = usePathname();

  if (pathname === "/") return <HomePage />;
  if (pathname === "/artigo/melhores-escolas-em-sao-paulo") return <TrafficArticlePage />;
  if (pathname === "/escolas") return <MarketplaceListingPage />;
  if (pathname === "/gestor") return <ManagerDashboardPage />;
  if (pathname === "/gestor/campanhas/nova") return <CampaignCreatePage />;

  const campaignMatch = pathname.match(/^\/gestor\/campanhas\/([^/]+)$/);
  if (campaignMatch) return <CampaignDetailsPage id={campaignMatch[1]} />;

  return <NotFoundPage />;
}
