/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { ToastProvider } from './contexts/ToastContext';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Learn from './pages/Learn';
import QA from './pages/QA';
import Stories from './pages/Stories';
import Donate from './pages/Donate';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <LanguageProvider>
      <ToastProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="learn" element={<Learn />} />
              <Route path="qa" element={<QA />} />
              <Route path="stories" element={<Stories />} />
              <Route path="donate" element={<Donate />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </LanguageProvider>
  );
}
