import './App.css'

function App() {
  return (
    <>
      <h1>Calculadora de validade de produtos</h1>
      <div>
        <form action="">
          <div>
            <label htmlFor="">Data de Fabricação</label>
            <input type="date" name="" />
          </div>
          <div>
            <label htmlFor="">Data de Validade</label>
            <input type="date" name="" />
          </div>
          <div>
            <label htmlFor="">Data de entrega estimada</label>
            <input type="date" name="" />
          </div>
          <button type="submit">calcular</button>
        </form>
        <div>
          <p>
            na data de entrega XX/XX/XXXX o produto estará com XX% de validade
          </p>
        </div>
      </div>
    </>
  )
}

export default App
