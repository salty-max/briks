import React from 'react';

import { Primitive } from '../primitive';

import type * as Briks from '../primitive';

/* -------------------------------------------------------------------------------------------------
 * AspectRatio
 * -----------------------------------------------------------------------------------------------*/

const NAME = 'AspectRatio';

type AspectRatioElement = React.ElementRef<typeof Primitive.div>;
type PrimitiveDivProps = Briks.ComponentPropsWithoutRef<typeof Primitive.div>;
interface AspectRatioProps extends PrimitiveDivProps {
  ratio?: number;
}

const AspectRatio = React.forwardRef<AspectRatioElement, AspectRatioProps>(
  ({ ratio = 1 / 1, style, ...props }, forwardedRef) => {
    return (
      <div
        style={{
          // Ensures inner element is contained
          position: 'relative',
          // Ensures padding bottom trick maths works
          width: '100%',
          paddingBottom: `&{100 / ratio}%`,
        }}
        data-briks-aspect-ratio-wrapper=''
      >
        <Primitive.div
          {...props}
          ref={forwardedRef}
          style={{
            ...style,
            // Ensures children expand in ratio
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
      </div>
    );
  },
);

AspectRatio.displayName = NAME;

export { AspectRatio };
export type { AspectRatioProps };
