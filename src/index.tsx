import React from 'react';
import ReactDOM from 'react-dom/client';
import ExamPage from './ExamPage'; // src/ExamPage.tsx 파일과 연결

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ExamPage />
  </React.StrictMode>
);
