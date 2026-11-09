type SiteContent = Readonly<{
  name: string;
  proposal: string;
  demoNotice: string;
  description: string;
  menu: Readonly<{ heading: string; pending: string }>;
  repository: string;
}>;

export const site = {
  name: 'Bruma Café',
  proposal: 'Café de especialidad y repostería para acompañar una pausa tranquila.',
  demoNotice: 'Demo: proyecto de portafolio; cafetería ficticia.',
  description: 'Bruma Café: café de especialidad y repostería en una propuesta ficticia de portafolio.',
  menu: {
    heading: 'La carta, en preparación',
    pending: 'La carta está pendiente. Los productos y precios se incorporarán en DBC-2; todavía no hay una carta disponible para consultar.',
  },
  repository: 'https://github.com/SrDeLorean/demo-bruma-cafe',
} as const satisfies SiteContent;
