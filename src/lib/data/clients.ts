export const clientsData = [
  {
    name: 'MF',
    lightLogo: '/assets/storyblok/mf-light.png',
    darkLogo: '/assets/storyblok/mf-dark.png',
    width: 326,
    height: 84,
    url: 'https://monsterfairings.com'
  },
  {
    name: 'Inspired Evolution',
    lightLogo: '/assets/storyblok/inspired-evolution-light.png',
    darkLogo: '/assets/storyblok/inspired-evolution-dark.png',
    width: 1662,
    height: 520,
    url: 'https://inspiredevolution.co.za/'
  },
  {
    name: 'CodeWiz',
    lightLogo: '/assets/storyblok/codewiz-light.png',
    darkLogo: '/assets/storyblok/codewiz-dark.png',
    width: 1528,
    height: 520,
    url: 'https://codewiz.com'
  },
  {
    name: 'SimpleTalk',
    lightLogo: '/assets/storyblok/simpletalk-light.png',
    darkLogo: '/assets/storyblok/simpletalk-dark.png',
    width: 1980,
    height: 520,
    url: 'https://www.simpletalk.ai/'
  },
  {
    name: 'Woolfi',
    lightLogo: '/assets/storyblok/woolfi-light.png',
    darkLogo: '/assets/storyblok/woolfi-dark.png',
    width: 928,
    height: 520,
    url: 'https://woolf.university/'
  },
  {
    name: 'OONA',
    lightLogo: '/assets/storyblok/oona-light.png',
    darkLogo: '/assets/storyblok/oona-dark.png',
    width: 1055,
    height: 282,
    url: 'https://oona-home.ch/'
  }
];

export const getClientsBlockData = () => ({
  component: 'clients' as const,
  clients_title: "Clients we've worked with",
  clients: clientsData.map(client => ({
    light_mode: {
      filename: client.lightLogo,
      alt: client.name
    },
    dark_mode: {
      filename: client.darkLogo,
      alt: client.name
    }
  }))
});
