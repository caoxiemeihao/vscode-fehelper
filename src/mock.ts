
export interface Plugin {
  label: string;
  version: string;
  icon: string;
  desc: string;
  skeleton: string;
  html: string;
  link: string;
}

export const plugins: Plugin[] = [
  {
    label: 'Vite⚡️Vue',
    version: '0.1.1',
    icon: 'resources/vite.svg',
    desc: 'One click integration Vite',
    skeleton: '<h2>One click integration Vite ⚡️</h2>',
    html: '',
    link: 'http://127.0.0.1:5500/plugins/vite-vue/index.html',
  },
  {
    label: 'Npm',
    version: '0.1.1',
    icon: 'resources/npm.svg',
    desc: 'Dependencies manager',
    skeleton: '<h2>Dependencies manager 🛠</h2>',
    html: '',
    link: 'http://127.0.0.1:5500/plugins/npm/index.html',
  },
];
