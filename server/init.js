import path from 'path';
import i18n from 'i18n';

i18n.configure({
  locales: ['en'],
  objectNotation: true,
  directory: path.join(__dirname, '/locales'),

  // registers the i18n api to the global var
  register: global
});
