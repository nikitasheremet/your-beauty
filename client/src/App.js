import BarcodeScanner from "./components/BarcodeScanner"
import VerticalList from "./components/VerticalList"

export default function App() {
  return (
    <>
    <BarcodeScanner></BarcodeScanner>
    <VerticalList items={[]}></VerticalList>
    </>
  )
}
