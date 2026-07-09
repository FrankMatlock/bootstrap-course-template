import { Modal, Toast, Tooltip, Popover, Collapse, Carousel, Tab, Offcanvas } from 'bootstrap';
import { initThemeToggle }      from './modules/themeToggle.js';
import { initFormValidation }   from './modules/formValidation.js';
import { initTooltipsPopovers, initToastDemo } from './modules/components.js';
import { setFooterYear }        from './modules/utils.js';

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initFormValidation();
  initTooltipsPopovers();
  initToastDemo();
  setFooterYear();
});

export { Modal, Toast, Tooltip, Popover, Collapse, Carousel, Tab, Offcanvas };
