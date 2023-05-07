import BarcodeScanner from "./components/BarcodeScanner"
import VerticalList from "./components/VerticalList"
import {useState} from 'react'

export default function App() {
  const [savedItems, setSavedItems] = useState([])
  function onBarcodeSave(newResult) {
    setSavedItems(prevSavedItems => [...prevSavedItems, newResult])
  }
  return (
    <>
      <BarcodeScanner onBarcodeSave={onBarcodeSave}></BarcodeScanner>
      <VerticalList items={savedItems}></VerticalList>
    </>
  )
}
