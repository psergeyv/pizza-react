import Button from "./components/Button/Button";
import Input from "./components/Input/Input";
 
function App() {
  return (
    <>
      <Button onClick={() => console.log("Нажал")}>Кнопка</Button>
      <Button appearence="btn-big" onClick={() => console.log("Нажал")}>Кнопка</Button>
      <Input placeholder="Email"/>      
    </>
  );
}

export default App;
