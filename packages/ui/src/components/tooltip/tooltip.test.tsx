import { act, cleanup, fireEvent, render, RenderResult, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';

import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip';

const TRIGGER_TEXT = 'Trigger';
const TOOLTIP_TEXT = 'Tooltip';

const TooltipTest = () => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>{TRIGGER_TEXT}</TooltipTrigger>
      <TooltipPortal>
        <TooltipContent>
          {TOOLTIP_TEXT}
          <TooltipArrow />
        </TooltipContent>
      </TooltipPortal>
    </Tooltip>
  </TooltipProvider>
);

describe('Tooltip', () => {
  describe('given a default Tooltip', () => {
    let rendered: RenderResult;
    let trigger: HTMLElement;
    let tooltip: HTMLElement;

    beforeEach(() => {
      rendered = render(<TooltipTest />);
      trigger = rendered.getByText(TRIGGER_TEXT);
    });

    afterEach(() => {
      cleanup();
    });

    it('should have no accessibility violations in default state', async () => {
      expect(await axe(rendered.container)).toHaveNoViolations();
    });

    describe('on hover of the trigger', () => {
      beforeEach(async () => {
        await act(() => {
          fireEvent.focus(trigger);
        });
      });

      it('should display the tooltip content', async () => {
        await waitFor(
          () => {
            tooltip = rendered.getByRole('tooltip');
            expect(tooltip).toBeInTheDocument();
          },
          { timeout: 1000 },
        );
      });

      it('should have no accessibility violations when open', async () => {
        expect(await axe(rendered.container)).toHaveNoViolations();
      });

      describe('when moving away from the trigger', () => {
        beforeEach(() => {
          fireEvent.mouseOut(trigger);
        });

        it('should hide the tooltip content', async () => {
          // This may require a slight delay depending on implementation,
          // as tooltips often have a delay before hiding after mouse out.
          await new Promise(r => setTimeout(r, 100)); // Adjust delay as necessary
          expect(tooltip).not.toBeInTheDocument();
        });
      });
    });
  });
});
