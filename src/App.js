import logo from './logo.svg';
import './App.css';
import web3 from './web3'
import lottery from './lottery'
import { useEffect, useState } from 'react';


function App() {

  const [manager, setManager] = useState('')
  const [players, setPlayers] = useState([])
  const [balance, setBalance] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    (async () => {
      // const man = await lottery.methods.manager().call()
      setManager(await lottery.methods.manager().call())
      setPlayers(await lottery.methods.getPlayers().call())
      setBalance(await web3.eth.getBalance(lottery.options.address))


    })()
  },[])

  const enterToLottery = async () => {
    setMessage('Waiting on transation success...')
    const accounts = await web3.eth.getAccounts()
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(inputValue, 'ether')
    })
    setMessage('You have been entered, good luck!')
  }

  const pickWinner = async () => {
    setMessage('Waiting on transaction success...')
    const accounts = await web3.eth.getAccounts()

    await lottery.methods.pickWinner().send({
      from: accounts[0]
    })
    setMessage('The Winner has been pick!')
  }

  return (
    <div style={{backgroundColor: 'silver', padding: 20}} className="App">
      <h2>Lotter Contract</h2>
      <p>This contract is managed by {manager} </p>
      <p>There are currently {players.length} people entered, competing to win {web3.utils.fromWei(balance, "ether")} ether!</p>
      <hr/>
      <div>
        <h2>Want to try your luck?</h2>
        <span>Amount of ether to enter</span>
        <input placeholder='0.00' value={inputValue} onChange={event => setInputValue(event.target.value)}/>
        <button onClick={enterToLottery} >Enter</button>
      </div>
      <div>
      <hr/>

        <h2>Time to pick a winner?</h2>
        <button onClick={pickWinner}>Pick Winner</button>
        {message && <hr/>}
      <h2>{message}</h2>
      </div>
      <hr/>

      <h1>{} has won! Congrats!</h1>

    </div>
  );
}

export default App;

