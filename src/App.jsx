import Button from "./button";

const user = {
  name: "dale", 
  img: "https://staticg.sportskeeda.com/editor/2022/12/36a4b-16699153298338.png", 
  imageSize: 90, 
}

const fruits = [
  {id: 1, name: "apple", isRecommended: true},
  {id: 2, name: "banana", isRecommended: true},
  {id: 3, name: "cantelope", isRecommended: false},
  {id: 4, name: "durian", isRecommended: false}
]

const items = fruits.map(fruit=>{
  return (
    <li 
      key={fruit.id}
      style={{color: fruit.isRecommended? "green" : "red"}}
    >
      {fruit.name}
    </li>
  )
})

function App() {
  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl text-red-500">Hello react world!</h1>
      <img 
      src={user.img} 
      style={{
        width: user.imageSize, 
        height: user.imageSize, 
      }} 
      alt={'Photo of ' + user.name} 
      className="rounded-full"
      />
      
      <ul>
        {items}
      </ul>

      <Button />
      
    </div>
  )
}

export default App
