import '@testing-library/jest-dom';

declare module '@testing-library/react' {
  export * from '@testing-library/dom';
  export { render } from '@testing-library/react';
}

declare module '@testing-library/dom' {
  export const screen: {
    getByText: (text: string) => HTMLElement;
    getByRole: (role: string) => HTMLElement;
  };
} 