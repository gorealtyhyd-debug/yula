// Central SEO / GEO config. Replace the TODO values before going live.
export const SITE = {
  name: 'Hallmark Yula',
  legalName: 'Hallmark', // TODO: registered developer entity name
  url: 'https://www.hallmarkyula.com', // TODO: production domain
  title: 'Hallmark Yula — Luxury Villas in Patighanpur, Hyderabad',
  description:
    'Hallmark Yula: 183 G+2 luxury villas with private lifts on 22.26 acres at Patighanpur, Hyderabad. Plots 267–597 sq. yds, 4,052–7,855 sft, with a five-level clubhouse. OTP from ₹8,499/sft.',
  keywords: [
    'Hallmark Yula',
    'villas in Patighanpur',
    'luxury villas Hyderabad',
    'gated community villas Hyderabad',
    'villas near Patancheru',
    'G+2 villas with lift Hyderabad',
    'east facing villas Hyderabad',
    'west facing villas Hyderabad',
    'triplex villas Hyderabad',
    'new villa projects Hyderabad 2026',
  ],
  phone: '+91-00000-00000', // TODO: sales number
  email: 'sales@hallmarkyula.com', // TODO
  rera: '', // TODO: TS RERA registration number
  address: {
    streetAddress: 'Patighanpur', // TODO: full site address / survey no.
    addressLocality: 'Patighanpur',
    addressRegion: 'Telangana',
    subregion: 'Hyderabad',
    postalCode: '502319', // TODO: verify PIN
    addressCountry: 'IN',
  },
  // TODO: replace with exact site coordinates (drop a pin on the plot in Google Maps)
  geo: { latitude: 17.5286, longitude: 78.2766 },
  mapQuery: 'Patighanpur, Hyderabad, Telangana',
  ogImage: '/assets/images/villas/villa-267-east.jpg',
  // Static form handling (no server). Get a free access key at https://web3forms.com
  // and leads are emailed to you. If left empty, the form falls back to WhatsApp.
  form: {
    endpoint: 'https://api.web3forms.com/submit',
    accessKey: '', // TODO
  },
  whatsapp: '910000000000', // TODO: country code + number, digits only
  locale: 'en_IN',
} as const;

export const mapEmbedUrl = () =>
  `https://maps.google.com/maps?q=${SITE.geo.latitude},${SITE.geo.longitude}&z=14&output=embed`;
export const mapLinkUrl = () =>
  `https://www.google.com/maps/search/?api=1&query=${SITE.geo.latitude}%2C${SITE.geo.longitude}`;
