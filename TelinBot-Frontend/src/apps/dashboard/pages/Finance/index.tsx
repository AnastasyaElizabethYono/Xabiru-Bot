import React from 'react';
import Main from './components';
import { Layout } from '../../components';
import { ActionProvider } from './hooks/ActionContext';
function Finance() {
  return (
    <Layout>
      <ActionProvider>
        <Main />
      </ActionProvider>
    </Layout>
  );
}

export default Finance;
