import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import './App.css';
import Header from './components/Header';
import NotesListPage from './pages/NotesListPage';
import { Route } from 'react-router-dom/cjs/react-router-dom';
import NotePage from './pages/NotePage';

function App() {


  return (
    <BrowserRouter>
      <div className='container dark'>
        <div className='app'>
          <Header />
          <Route exact path="/" component={NotesListPage} />
          <Route path="/note/:id" component={NotePage} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
