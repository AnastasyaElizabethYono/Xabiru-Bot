import Navbar from './Navbar';
import Chatbot from './Chatbot';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className="company">
    <Navbar />
    <main style={{ paddingTop: 'calc(0% + 4.5em)' }}>{children}</main>
    <Chatbot />
  </div>
);  

export default Layout;
