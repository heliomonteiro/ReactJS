import React from 'react';
import Header from "./components/Header";
import './styles.css';

/* 
function App() {
  return (
    <div className="App">
      <h1>Hello Hélio!</h1>
    </div>
  );
}
*/

//Redução da função acima para uma variável
const App = () => (
  <div className="App">
    <Header />
  </div>
)


export default App;
