import './App.css';
import Movies from './components/Movies.json'
import React, { useEffect, useState } from 'react';

function App() {

  const [ seatsSelected, setSeatsSelected ] = useState([])
  const [tax, setTax] = useState(0)
  const [ amount, setAmount ] = useState(0)
  const [ amountToBePaid, setAmountToBePaid ] = useState(0)

  // useEffect(() => {
  //   const manageSeatClick = (row, seatNumber) => {
  //     const seat = {row, seatNumber}
  //     const Booked = Movies.Rows[row-1].AlreadyBooked.includes(seatNumber)
  //     const Selected = seatsSelected.find(s => s.row === row && s.seatNumber === seatNumber)
  
  //     if(Booked || Selected) {
  //       return (
  //         `Disabled`
  //       )
  //     }
  
  //     const countSeatsSelected = [...seatsSelected, seat]
  //     setSeatsSelected(countSeatsSelected)
  //     countAmount(countSeatsSelected)
  //     countAmountToBePaid(countSeatsSelected)
  //     countTax(countSeatsSelected)
  
  //   }
  // },[])

  const manageSeatClick = (row, seatNumber) => {
    const seat = {row, seatNumber}
    const Booked = Movies.Rows[row-1].AlreadyBooked.includes(seatNumber)
    const Selected = seatsSelected.find(s => s.row === row && s.map((i) => (i ===seatNumber)))

    if(Booked || Selected) {
      return (
        `disabled`
      )
    }

    const countSeatsSelected = [...seatsSelected, seat]
    setSeatsSelected(countSeatsSelected)
    countAmount(countSeatsSelected)
    // countAmountToBePaid()
    // countTax()

  }

  // useEffect(() => {
  //   const seatsRow = seatsSelected[0].row
  //   const basicPrice = Movies.BasicPrice
  //   const seatsSelectedCount = seatsSelected.length 
  //   const totalAmount = (seatsRow > 3 ? (basicPrice+(seatsRow-3)*50) : basicPrice) * seatsSelectedCount  
  //   setAmount(totalAmount)
  // }, [seatsSelected])

  const countAmount = (seats) => {
    const seatsRow = seats[0].row
    const basicPrice = Movies.BasicPrice
    const seatsSelectedCount = seats.length 
    const totalAmount = (seatsRow > 3 ? (basicPrice+(seatsRow-3)*50) : basicPrice) * seatsSelectedCount  
    setAmount(totalAmount)
  }

  // const countTax = () => {
    // const totalTax = amount * 0.2 
    // setTax(totalTax)
  // } 

  // const countAmountToBePaid = () => {
    // const totalAmountToBePaid = amount + tax
    // setAmountToBePaid(totalAmountToBePaid)
  // }

  useEffect(() =>{
    const totalTax = amount * 0.2 
    setTax(totalTax)
  },[amount])

  useEffect(() =>{
    const totalAmountToBePaid = amount + tax
    setAmountToBePaid(totalAmountToBePaid)
  },[tax])


  return (
    <div>
      <h1>Bingo Movie Theatre</h1>
      <h2>Seats</h2>
      <table>
        <tbody>
          {Movies.Rows.map((row, rowIndex) => (
            <tr>
              {Array(row.End - row.Start + 1).fill().map((data, dataIndex) => {
                const seatNumber = row.Start + dataIndex;
                const Booked = row.AlreadyBooked.includes(seatNumber)
                const Selected = seatsSelected.find(s => s.row===rowIndex+1 && s.seatNumber===seatNumber)
                const seatsColor = Booked ? {backgroundColor: "lightgrey"} : (Selected ? {backgroundColor: "gray"} : {backgroundColor: "white"})
                return (
                  <td style={seatsColor} onClick={()=>manageSeatClick(rowIndex+1, seatNumber)}>{seatNumber}</td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h3>Seats Summary</h3>
        <h4>Movie Name: {Movies.MovieName}</h4>
        <p>No. of Booked Seats: {seatsSelected.length}</p>
        <p>Total Amount: {amount}</p>
        {/* <p>Tax: {amount*0.2}</p>
        <p>Total payable Amount: {amount + (amount*0.2)}</p> */}
        <p>Tax: {tax}</p>
        <p>Total payable Amount: {amountToBePaid}</p>
      </div>
    </div>
  );
}

export default App;