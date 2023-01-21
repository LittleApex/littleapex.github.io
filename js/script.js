import menu from './modules/menu.js';
import carousel from './modules/carousel.js';
import partners from './modules/partners.js';
import FAQ from './modules/FAQ.js';
import formService from './modules/formService.js';

window.addEventListener('DOMContentLoaded', () => {
  menu();
  carousel();
  partners();
  FAQ();
  formService();
});

