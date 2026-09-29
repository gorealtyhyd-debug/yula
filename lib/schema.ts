import { SITE } from './site';
import { AMENITIES, FAQS, VILLAS, RATES, minPrice } from './data';

const abs = (p: string) => new URL(p, SITE.url).toString();

export function buildJsonLd() {
  const address = {
    '@type': 'PostalAddress',
    streetAddress: SITE.address.streetAddress,
    addressLocality: SITE.address.addressLocality,
    addressRegion: SITE.address.addressRegion,
    postalCode: SITE.address.postalCode,
    addressCountry: SITE.address.addressCountry,
  };
  const geo = { '@type': 'GeoCoordinates', latitude: SITE.geo.latitude, longitude: SITE.geo.longitude };

  const organization = {
    '@type': ['Organization', 'RealEstateAgent'],
    '@id': `${SITE.url}#organization`,
    name: SITE.legalName,
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    address,
    areaServed: { '@type': 'City', name: 'Hyderabad' },
  };

  const website = {
    '@type': 'WebSite',
    '@id': `${SITE.url}#website`,
    url: SITE.url,
    name: SITE.name,
    inLanguage: 'en-IN',
    publisher: { '@id': `${SITE.url}#organization` },
  };

  const community = {
    '@type': ['GatedResidenceCommunity', 'Place'],
    '@id': `${SITE.url}#community`,
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    image: [abs(SITE.ogImage), abs('/assets/images/clubhouse/clubhouse-exterior.jpg'), abs('/assets/images/master-plan.jpg')],
    address,
    geo,
    hasMap: `https://www.google.com/maps/search/?api=1&query=${SITE.geo.latitude},${SITE.geo.longitude}`,
    numberOfAccommodationUnits: 183,
    size: { '@type': 'QuantitativeValue', value: 22.26, unitText: 'acre' },
    amenityFeature: AMENITIES.map((name) => ({ '@type': 'LocationFeatureSpecification', name, value: true })),
    containsPlace: VILLAS.flatMap((v) =>
      (['E', 'W'] as const)
        .filter((f) => v[f])
        .map((f) => ({
          '@type': 'SingleFamilyResidence',
          name: `${v.size} Sq. Yds ${f === 'E' ? 'East' : 'West'} Facing Villa — ${SITE.name}`,
          floorSize: { '@type': 'QuantitativeValue', value: v[f]!.bua, unitCode: 'FTK' },
          numberOfRooms: undefined,
          image: abs(v[f]!.render),
          accommodationFloorPlan: v[f]!.plans.map((p) => ({ '@type': 'FloorPlan', name: p.label, image: abs(p.src) })),
          offers: {
            '@type': 'Offer',
            priceCurrency: 'INR',
            price: Math.round(v[f]!.bua * RATES[f].otp),
            priceSpecification: { '@type': 'UnitPriceSpecification', price: RATES[f].otp, priceCurrency: 'INR', unitText: 'per sq. ft (OTP)' },
            availability: 'https://schema.org/PreOrder',
            seller: { '@id': `${SITE.url}#organization` },
          },
        })),
    ),
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'INR',
      lowPrice: Math.round(minPrice(267) * 1e7),
      offerCount: 183,
    },
  };

  const faq = {
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };

  const breadcrumb = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Villas in Hyderabad', item: `${SITE.url}#residences` },
      { '@type': 'ListItem', position: 3, name: SITE.name, item: SITE.url },
    ],
  };

  return { '@context': 'https://schema.org', '@graph': [organization, website, community, faq, breadcrumb] };
}
