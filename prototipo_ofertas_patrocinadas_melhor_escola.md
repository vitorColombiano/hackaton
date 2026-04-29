# Protótipo React — Ofertas Patrocinadas Melhor Escola

## 1. Objetivo

Criar um protótipo funcional, visual e navegável em React para demonstrar a iniciativa **Ofertas Patrocinadas no Marketplace com Gestão via Área do Gestor**.

O protótipo deve usar **dados mockados**, não deve depender de backend e deve ficar **dentro de um único repositório**, com páginas suficientes para apresentar a ideia no hackathon.

A proposta é mostrar como escolas poderiam comprar visibilidade patrocinada no Melhor Escola, acompanhar resultados na área do gestor e como essas ofertas apareceriam em páginas públicas de tráfego e marketplace.

---

## 2. Contexto da ideia

O Melhor Escola possui tráfego qualificado em páginas públicas, artigos, páginas de listagem e páginas de ofertas. Parte desse tráfego não é monetizado de forma direta.

A iniciativa propõe criar uma nova fonte de receita baseada em **ofertas patrocinadas**, permitindo que escolas elegíveis impulsionem determinadas ofertas com investimento em modelo CPC.

A solução deve preservar a experiência do usuário e a confiança no ranking, deixando claro quando uma oferta é patrocinada.

O protótipo deve demonstrar:

- Criação e acompanhamento de campanhas patrocinadas pela escola.
- Recomendação assistida por IA para sugerir investimento.
- Exibição de ofertas patrocinadas nas páginas públicas.
- Métricas de performance como cliques, CTR, leads, gasto, CPC médio e ROI estimado.
- Impacto controlado no ranking, combinando `relevance_score` com `sponsored_boost`.

---

## 3. Stack sugerida

Criar uma aplicação React simples, preferencialmente com:

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Lucide React para ícones
- Dados mockados em arquivos locais

Não integrar com API real.

Não usar autenticação real.

Não criar banco de dados.

Não depender de serviços externos.

---

## 4. Estrutura sugerida do projeto

```txt
sponsored-offers-prototype/
  package.json
  vite.config.ts
  tsconfig.json
  index.html
  src/
    main.tsx
    App.tsx
    routes/
      PublicHome.tsx
      TrafficArticlePage.tsx
      MarketplaceListingPage.tsx
      ManagerDashboardPage.tsx
      CampaignCreatePage.tsx
      CampaignDetailsPage.tsx
    components/
      layout/
        PublicHeader.tsx
        ManagerSidebar.tsx
        PageContainer.tsx
      public/
        SponsoredOfferCard.tsx
        OrganicOfferCard.tsx
        SponsoredOffersSection.tsx
        ArticleContent.tsx
        RankingExplanation.tsx
      manager/
        MetricCard.tsx
        CampaignCard.tsx
        CampaignTable.tsx
        AiRecommendationCard.tsx
        BudgetSimulator.tsx
        OfferSelectionList.tsx
        PerformanceChartMock.tsx
      shared/
        Badge.tsx
        Button.tsx
        Card.tsx
        Tabs.tsx
    data/
      mockSchools.ts
      mockOffers.ts
      mockCampaigns.ts
      mockMetrics.ts
      mockRecommendations.ts
    utils/
      ranking.ts
      formatters.ts
    styles/
      globals.css
```

---

## 5. Rotas do protótipo

Implementar as seguintes rotas:

```txt
/ 
/artigo/melhores-escolas-em-sao-paulo
/escolas
/gestor
/gestor/campanhas/nova
/gestor/campanhas/:id
```

### 5.1 `/`

Página inicial simples do protótipo.

Objetivo: servir como hub de navegação para a banca.

Deve conter:

- Título: `Protótipo — Ofertas Patrocinadas Melhor Escola`
- Resumo da ideia.
- Cards de navegação para:
  - Página de artigo com ofertas patrocinadas
  - Página de listagem de escolas
  - Área do gestor
  - Criação de campanha
- Uma seção “O que este protótipo demonstra”.

---

### 5.2 `/artigo/melhores-escolas-em-sao-paulo`

Página pública simulando uma página de conteúdo/artigo do Melhor Escola.

Objetivo: demonstrar como o tráfego de artigos pode ser monetizado.

Layout sugerido:

- Header público do Melhor Escola.
- Hero do artigo:
  - Título: `Melhores escolas em São Paulo: veja opções com bolsas`
  - Subtítulo explicando que o usuário está em uma jornada de decisão.
- Conteúdo textual mockado do artigo.
- Bloco contextual no meio do artigo:
  - Título: `Escolas com bolsas recomendadas para você`
  - Lista/carrossel de ofertas.
  - As primeiras ofertas podem ser patrocinadas, com tag `Patrocinado`.
- Sidebar ou bloco lateral com:
  - `Compare escolas perto de você`
  - CTA para ver bolsas.

Comportamento esperado:

- Ofertas patrocinadas devem aparecer integradas ao conteúdo.
- Deve existir diferenciação visual discreta, sem parecer banner invasivo.
- Cada card patrocinado deve mostrar:
  - Nome da escola
  - Logo
  - Localização
  - Avaliação
  - Mensalidade a partir de
  - Desconto
  - Tag `Patrocinado`
  - CTA `Ver bolsa`

---

### 5.3 `/escolas`

Página pública simulando uma PLP/listagem de escolas.

Objetivo: demonstrar impacto das ofertas patrocinadas no ranking.

Layout sugerido:

- Header público.
- Campo de busca mockado.
- Filtros laterais mockados:
  - Cidade
  - Série
  - Preço
  - Avaliação
- Lista de escolas/ofertas.
- Cards patrocinados misturados com cards orgânicos.
- Box explicativo:
  - `Como o ranking funciona neste protótipo`
  - Explicar que o ranking combina relevância orgânica com boost patrocinado controlado.

Cada oferta deve possuir internamente:

```ts
{
  id: string;
  schoolId: string;
  schoolName: string;
  neighborhood: string;
  city: string;
  state: string;
  rating: number;
  reviewCount: number;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  relevanceScore: number;
  sponsoredBoost: number;
  isSponsored: boolean;
  campaignId?: string;
}
```

A ordenação deve usar a função:

```ts
finalScore = relevanceScore + sponsoredBoost
```

Regras:

- `sponsoredBoost` nunca deve esconder totalmente a relevância.
- Ofertas patrocinadas ruins não devem ir para o topo absoluto se tiverem baixa relevância.
- Cards patrocinados devem ter tag clara `Patrocinado`.

---

### 5.4 `/gestor`

Dashboard da área do gestor.

Objetivo: demonstrar o valor para a escola.

Layout sugerido:

- Sidebar de gestor.
- Header:
  - `Olá, Colégio Aurora`
  - Subtítulo: `Acompanhe suas campanhas patrocinadas no Melhor Escola`
- Métricas principais:
  - Receita estimada gerada
  - Cliques
  - Leads
  - CTR
  - CPC médio
  - ROI estimado
- Card de recomendação IA:
  - `A IA recomenda impulsionar a oferta do 6º ano no bairro Vila Mariana`
  - Motivo: alta procura, boa conversão histórica e concorrência moderada.
  - Sugestão de orçamento: `R$ 900/mês`
  - Retorno estimado: `34 leads`
  - CTA: `Criar campanha com recomendação`
- Tabela de campanhas:
  - Nome
  - Oferta
  - Status
  - Orçamento
  - Gasto
  - Cliques
  - Leads
  - CTR
  - ROI
- Cards de campanhas ativas.

---

### 5.5 `/gestor/campanhas/nova`

Tela de criação de campanha.

Objetivo: demonstrar o fluxo de ativação de uma oferta patrocinada.

Etapas sugeridas:

1. Escolher oferta
2. Definir objetivo
3. Definir orçamento
4. Revisar previsão

Campos mockados:

- Oferta selecionada
- Objetivo:
  - Mais cliques
  - Mais leads
  - Maximizar ROI
- Orçamento mensal
- CPC máximo
- Período
- Superfícies de exibição:
  - Artigos
  - PLP
  - Páginas de escola
- Preview do card patrocinado

Adicionar um simulador:

```txt
Orçamento: R$ 900/mês
CPC estimado: R$ 2,40
Cliques estimados: 375
Taxa de conversão estimada: 8,5%
Leads estimados: 32
Custo por lead estimado: R$ 28,12
```

CTA final:

- `Ativar campanha mockada`

Ao clicar, pode apenas exibir mensagem visual:

```txt
Campanha criada com sucesso no protótipo.
```

Não precisa persistir em backend.

---

### 5.6 `/gestor/campanhas/:id`

Tela de detalhe da campanha.

Objetivo: demonstrar acompanhamento e transparência.

Deve conter:

- Nome da campanha
- Status
- Oferta vinculada
- Investimento
- Gasto
- Cliques
- Leads
- CTR
- CPC médio
- CPL estimado
- ROI estimado
- Gráfico mockado de evolução diária
- Bloco de recomendação IA:
  - `Aumentar orçamento em 20% pode gerar +7 leads`
  - `Reduzir CPC máximo pode diminuir volume, mas melhorar eficiência`
- Seção “Onde sua oferta apareceu”:
  - Artigos
  - PLP
  - Página da escola
- Preview da oferta patrocinada.

---

## 6. Identidade visual

Seguir a identidade visual do Melhor Escola.

Referências visuais internas observadas nos componentes de ofertas:

- Cards brancos.
- Bordas arredondadas.
- Borda fina em tom neutro.
- Espaçamento generoso.
- Imagem/logo circular.
- Títulos com peso semibold.
- Texto secundário em cinza.
- Badge de desconto em verde.
- Estrelas de avaliação em amarelo.
- Estrutura de card de oferta com:
  - Escola
  - Avaliação
  - Localização
  - Preço
  - Desconto
  - CTA.

Classes e estilo aproximado encontrados nos componentes atuais:

```txt
bg-white
p-6
ring-1
ring-inset
ring-neutral-200
rounded-xl
w-60
font-semibold
text-neutral-600
text-yellow-500
bg-green-100
text-green-700
rounded
```

Paleta sugerida para o protótipo:

```css
--me-primary: #00a5b5;
--me-primary-dark: #008996;
--me-secondary: #ffb000;
--me-success-bg: #dcfce7;
--me-success-text: #15803d;
--me-warning-bg: #fef3c7;
--me-warning-text: #92400e;
--me-neutral-50: #f9fafb;
--me-neutral-100: #f3f4f6;
--me-neutral-200: #e5e7eb;
--me-neutral-500: #6b7280;
--me-neutral-700: #374151;
--me-neutral-900: #111827;
```

Observação: caso o repositório tenha tokens reais de design, priorizar os tokens existentes. Caso contrário, usar essa paleta aproximada.

---

## 7. Componentes principais

### 7.1 `SponsoredOfferCard`

Card de oferta patrocinada.

Props:

```ts
type SponsoredOfferCardProps = {
  offer: Offer;
  variant?: "compact" | "large";
  showSponsoredBadge?: boolean;
};
```

Deve exibir:

- Badge `Patrocinado`
- Logo da escola
- Nome da escola
- Avaliação
- Cidade/bairro
- Preço com desconto
- Percentual de desconto
- CTA `Ver bolsa`

Visual:

- Card branco
- Borda neutra
- Arredondamento grande
- Tag `Patrocinado` no topo
- Badge de desconto verde
- CTA com cor principal

---

### 7.2 `OrganicOfferCard`

Mesmo layout do card patrocinado, mas sem tag patrocinada.

---

### 7.3 `SponsoredOffersSection`

Seção para artigos e páginas públicas.

Props:

```ts
type SponsoredOffersSectionProps = {
  title: string;
  subtitle?: string;
  offers: Offer[];
};
```

Deve renderizar carrossel horizontal ou grid responsivo.

---

### 7.4 `AiRecommendationCard`

Card de recomendação da IA na área do gestor.

Deve exibir:

- Título da recomendação
- Motivo da recomendação
- Oferta sugerida
- Orçamento recomendado
- Leads estimados
- ROI estimado
- Botão para usar recomendação

Exemplo de texto:

```txt
A IA identificou que a oferta do 6º ano no bairro Vila Mariana tem alta intenção de busca, boa conversão histórica e baixa competição patrocinada.
```

---

### 7.5 `BudgetSimulator`

Componente interativo simples com input/range de orçamento.

Entrada:

- Orçamento mensal

Saídas calculadas:

```ts
estimatedClicks = budget / estimatedCpc
estimatedLeads = estimatedClicks * conversionRate
estimatedCpl = budget / estimatedLeads
```

Usar valores mockados:

```ts
estimatedCpc = 2.4
conversionRate = 0.085
```

---

### 7.6 `RankingExplanation`

Componente explicativo para a PLP.

Texto sugerido:

```txt
Neste protótipo, o ranking combina relevância orgânica da oferta com um boost patrocinado controlado. A oferta patrocinada ganha mais visibilidade, mas continua respeitando critérios mínimos de qualidade e relevância para preservar a confiança do usuário.
```

Mostrar fórmula:

```txt
score_final = relevance_score + sponsored_boost
```

---

## 8. Dados mockados

Criar dados fictícios realistas.

### 8.1 Escolas

```ts
export const mockSchools = [
  {
    id: "school-1",
    name: "Colégio Aurora",
    logoUrl: "https://img.imageboss.me/me/cover:center/48x48/format:auto/20190719204408206.jpg",
    neighborhood: "Vila Mariana",
    city: "São Paulo",
    state: "SP",
    rating: 4.8,
    reviewCount: 124
  },
  {
    id: "school-2",
    name: "Escola Jardim do Saber",
    logoUrl: "https://img.imageboss.me/me/cover:center/48x48/format:auto/files/assinaturas/35431485/logo_passaros.PNG",
    neighborhood: "Pinheiros",
    city: "São Paulo",
    state: "SP",
    rating: 4.6,
    reviewCount: 89
  },
  {
    id: "school-3",
    name: "Centro Educacional Pássaros",
    logoUrl: "https://img.imageboss.me/me/cover:center/48x48/format:auto/20190719204408206.jpg",
    neighborhood: "Mooca",
    city: "São Paulo",
    state: "SP",
    rating: 4.9,
    reviewCount: 211
  }
];
```

### 8.2 Ofertas

```ts
export const mockOffers = [
  {
    id: "offer-1",
    schoolId: "school-1",
    schoolName: "Colégio Aurora",
    logoUrl: "https://img.imageboss.me/me/cover:center/48x48/format:auto/20190719204408206.jpg",
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
    campaignId: "campaign-1"
  },
  {
    id: "offer-2",
    schoolId: "school-2",
    schoolName: "Escola Jardim do Saber",
    logoUrl: "https://img.imageboss.me/me/cover:center/48x48/format:auto/files/assinaturas/35431485/logo_passaros.PNG",
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
    isSponsored: false
  },
  {
    id: "offer-3",
    schoolId: "school-3",
    schoolName: "Centro Educacional Pássaros",
    logoUrl: "https://img.imageboss.me/me/cover:center/48x48/format:auto/20190719204408206.jpg",
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
    isSponsored: false
  },
  {
    id: "offer-4",
    schoolId: "school-1",
    schoolName: "Colégio Aurora",
    logoUrl: "https://img.imageboss.me/me/cover:center/48x48/format:auto/20190719204408206.jpg",
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
    campaignId: "campaign-2"
  }
];
```

### 8.3 Campanhas

```ts
export const mockCampaigns = [
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
    surfaces: ["Artigos", "PLP", "Página da escola"]
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
    surfaces: ["PLP", "Artigos"]
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
    surfaces: ["Artigos"]
  }
];
```

### 8.4 Recomendação IA

```ts
export const mockRecommendations = [
  {
    id: "rec-1",
    title: "Impulsionar oferta do 6º ano na Vila Mariana",
    description:
      "A busca por bolsas para o 6º ano cresceu nos últimos dias e esta oferta possui boa conversão histórica.",
    suggestedBudget: 900,
    estimatedClicks: 375,
    estimatedLeads: 32,
    estimatedCpc: 2.4,
    estimatedConversionRate: 8.5,
    estimatedRoi: 3.6,
    confidence: "Alta"
  }
];
```

---

## 9. Função de ranking

Criar arquivo `src/utils/ranking.ts`.

```ts
import type { Offer } from "../data/mockOffers";

export function calculateFinalScore(offer: Offer) {
  return offer.relevanceScore + offer.sponsoredBoost;
}

export function sortOffersByFinalScore(offers: Offer[]) {
  return [...offers].sort((a, b) => calculateFinalScore(b) - calculateFinalScore(a));
}
```

Também exibir em algum ponto da PLP:

```txt
Score orgânico: 82
Boost patrocinado: +12
Score final: 94
```

Isso ajuda a banca a entender o “como” da solução.

---

## 10. Critérios de aceite

O protótipo será considerado completo quando:

- Todas as rotas estiverem navegáveis.
- A página de artigo exibir ofertas patrocinadas integradas ao conteúdo.
- A PLP exibir ranking misto com ofertas orgânicas e patrocinadas.
- A área do gestor exibir métricas, campanhas e recomendação IA.
- A criação de campanha tiver fluxo visual completo.
- A tela de detalhe mostrar performance da campanha.
- Todos os dados forem mockados localmente.
- Não houver dependência de backend.
- A identidade visual estiver próxima do Melhor Escola.
- As ofertas patrocinadas estiverem sinalizadas de forma clara.
- O projeto rodar com `npm install` e `npm run dev`.

---

## 11. Comandos esperados

```bash
npm install
npm run dev
```

---

## 12. Observações para o Codex

Este projeto é apenas um protótipo de demonstração para hackathon.

Não implementar integrações reais.

Não alterar projetos de produção.

Não criar chamadas HTTP.

Não criar autenticação.

Não criar banco.

Priorizar clareza visual, navegação fluida e storytelling do produto.

A implementação deve parecer um produto real o suficiente para demonstrar:

1. Nova fonte de receita para a Qeevo/Melhor Escola.
2. Valor para escolas parceiras.
3. Experiência clara para o usuário final.
4. Controle de impacto no ranking.
5. Apoio de IA para decisão de investimento.

---

## 13. Nome sugerido

Nome curto para pasta ou branch:

```txt
me-sponsored-offers-prototype
```

Nome curto para fila/hackathon:

```txt
ME Sponsored Boost
```
