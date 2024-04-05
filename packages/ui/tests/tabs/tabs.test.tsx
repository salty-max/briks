// TabsComponents.test.jsx
import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import {
  render,
  fireEvent,
  screen,
  cleanup,
  RenderResult,
  act,
  waitFor,
} from '@testing-library/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../lib/components/tabs/';
import axe from '../axe-helper';

describe('Tabs', () => {
  const tabTitles = ['Tab 1', 'Tab 2'];
  const tabContents = ['Content 1', 'Content 2'];
  let rendered: RenderResult;
  let trigger1: HTMLButtonElement;
  let trigger2: HTMLButtonElement;
  let tabContent1: HTMLElement;
  let tabContent2: HTMLElement;

  beforeEach(() => {
    rendered = render(
      <Tabs defaultValue='tab1'>
        <TabsList>
          <TabsTrigger value='tab1'>{tabTitles[0]}</TabsTrigger>
          <TabsTrigger value='tab2'>{tabTitles[1]}</TabsTrigger>
        </TabsList>
        <TabsContent value='tab1'>{tabContents[0]}</TabsContent>
        <TabsContent value='tab2'>{tabContents[1]}</TabsContent>
      </Tabs>,
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('renders all components correctly', () => {
    tabTitles.forEach(title => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it('should have no accessibility violations', async () => {
    expect(await axe(rendered.container)).toHaveNoViolations();
  });

  it('displays content of the first tab by default', () => {
    expect(screen.getByText(tabContents[0])).toBeVisible();
    expect(screen.queryByText(tabContents[1])).not.toBeInTheDocument();
  });

  describe('when clicking on the second tab', () => {
    beforeEach(() => {
      trigger1 = screen.getByText(tabTitles[0]);
      trigger2 = screen.getByText(tabTitles[1]);
      tabContent1 = screen.getByText(tabContents[0]);
      fireEvent.click(trigger2);
    });

    it('displays content of the second tab', () => {
      waitFor(() => {
        tabContent2 = screen.getByText(tabContents[1]);

        expect(trigger1).toHaveAttribute('data-state', 'inactive');
        expect(trigger2).toHaveAttribute('data-state', 'active');
        expect(trigger1).toHaveAttribute('data-state', 'inactive');
        expect(screen.queryByText(tabContents[0])).not.toBeInTheDocument();
        expect(trigger2).toHaveAttribute('data-state', 'active');
        expect(rendered.getByText(tabContents[1])).toBeInTheDocument();
      });
    });
  });
});
