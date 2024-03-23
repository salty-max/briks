import React from "react";
import ReactDOM from "react-dom";

import type * as Jelly from "../primitive";
import { Primitive } from "../primitive";

const PORTAL_NAME = "Portal";

type PortalElement = React.ElementRef<typeof Primitive.div>;
type PrimitiveDivProps = Jelly.ComponentPropsWithoutRef<typeof Primitive.div>;
interface PortalProps extends PrimitiveDivProps {
  /**
   * An optional container where the portaled content should be appended.
   */
  container?: HTMLElement | null;
}

const Portal = React.forwardRef<PortalElement, PortalProps>(
  ({ container = globalThis?.document?.body, ...portalProps }, forwardedRef) =>
    container
      ? ReactDOM.createPortal(
          <Primitive.div {...portalProps} ref={forwardedRef} />,
          container
        )
      : null
);
Portal.displayName = PORTAL_NAME;

const Root = Portal;

export { Portal, Root };

export type { PortalProps };
