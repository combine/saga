import path from 'path';
import i18n from 'i18n';

// Configure i18
i18n.configure({
  locales: ['en'],

  // allows us to write, for example: __('models.User.password')
  objectNotation: true,

  // the absolute path to the locales directory
  directory: path.join(__dirname, '..', 'locales'),

  // don't update local files automatically
  updateFiles: false,

  // registers the i18n api to the global var
  register: global
});
