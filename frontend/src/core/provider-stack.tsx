import { FC } from 'react';
import { GeistProvider, CssBaseline } from '@geist-ui/react';

const ProviderStack: FC = ({ children }) => {
  return (
    <GeistProvider>
      <CssBaseline />
      {children}
    </GeistProvider>
  );
};

export { ProviderStack as default };
