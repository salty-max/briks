import ResizeObserver from 'resize-observer-polyfill';
import '@testing-library/jest-dom';
import 'jest-axe/extend-expect';

window.ResizeObserver = ResizeObserver;
