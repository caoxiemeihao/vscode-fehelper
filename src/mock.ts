
export interface Plugin {
  label: string;
  version: string;
  icon: string;
  desc: string;
  link: string;
}

export const plugins: Plugin[] = [
  {
    label: 'Vite⚡️Vue',
    version: '0.1.1',
    icon: 'resources/vite.svg',
    desc: 'One click integration Vite',
    link: 'http://localhost:3000',
  },
  {
    label: 'Npm',
    version: '0.1.1',
    icon: 'resources/npm.svg',
    desc: 'Dependencies manager',
    link: 'http://localhost:3000',
  },
];
