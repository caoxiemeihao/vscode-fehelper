
export interface Plugin {
  label: string;
  version: string;
  icon: string;
  desc: string;
  html: string;
  link: string;
}

export const plugins: Plugin[] = [
  {
    label: 'Vite⚡️Vue',
    version: '0.1.1',
    icon: 'resources/vite.svg',
    desc: 'One click integration Vite',
    html: '<h2>One click integration Vite ⚡️</h2>',
    link: 'http://localhost:3000',
  },
  {
    label: 'Npm',
    version: '0.1.1',
    icon: 'resources/npm.svg',
    desc: 'Dependencies manager',
    html: '<h2>Dependencies manager 🛠</h2>',
    link: 'http://localhost:3000',
  },
];
