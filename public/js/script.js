import menu from './modules/menu.js';
import carousel from './modules/carousel.js';
import partners from './modules/partners.js';
import FAQ from './modules/FAQ.js';
import scroll from './modules/scroll.js';

window.addEventListener('DOMContentLoaded', () => {
  history.scrollRestoration = 'manual';
  menu();
  carousel();
  partners();
  FAQ();
  scroll();
});

