import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import "./style.css";
import api from "./services/api";

function App() {
  const [input, setInput] = useState("");
  const [address, setAddress] = useState("");
  async function handleSearch() {
    if (input === "") {
      alert("Preencha o campo de cep");
      return;
    }
    try {
      const response = await api.get(`${input}/json`);
      console.log(response.data);
      setAddress(response.data);
      setInput("");
    } catch {
      alert("Error");
      setInput("");
    }
  }
  return (
    <div className="container">
      <h1 className="title">Buscador Cep</h1>
      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu cep.."
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#FFF" />
        </button>
      </div>
      {Object.keys(address).length > 0 && (
        <main className="main">
          <h2>CEP:{address.cep}</h2>
          <span>{address.logradouro}</span>
          <span>Complemento: {address.complemento}</span>
          <span>{address.bairro}</span>
          <span>{address.localidade}</span>
        </main>
      )}
    </div>
  );
}

export default App;
