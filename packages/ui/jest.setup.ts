import "@testing-library/jest-dom";
import "jest-axe/extend-expect";

import ResizeObserver from "resize-observer-polyfill";

window.ResizeObserver = ResizeObserver;
