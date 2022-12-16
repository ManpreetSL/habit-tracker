import '@emotion/react';
import { SerializedStyles } from '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    color: {
      primary: string;
      positive: string;
      negative: string;
    };
  }
}

// Prevents errors with using 'CSS' prop on React components
declare module 'react' {
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    css?: SerializedStyles;
  }
}
