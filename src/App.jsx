import { useState , useCallback , useEffect , useRef
} from 'react'

import './App.css'

function App() {
  const [length , setLength ]= useState(8);
  const [number , setNumber] = useState(false);
  const [character , setCharacter] = useState(false);
  const [password , setPassword] = useState("");
  const [copied , setCopied] = useState(false);

  //useRef Hook
const passwordRef = useRef(null)

const copyPasswordToClipboard = useCallback(()=>{
  passwordRef.current?.select() 
  passwordRef.current?.setSelectionRange(0,100)
  
  window.navigator.clipboard.writeText(password)
},[password])


 //useCallback Hook
  const passwordGenerator= useCallback(
    () => {
      let pass =""
      let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
      
      if (number) str+="123456789"
      if (character)str+="!@#$%^&*()_+"

      for (let i = 1; i <= length; i++){
        let char = Math.floor(Math.random()*str.length +1)
        pass += str.charAt(char)
      }

      setPassword(pass)


      },[ length , number , character , setPassword]
  )

 //useEffect Hook
  useEffect(()=>{
    passwordGenerator()
  } 
  ,[length , number , character , passwordGenerator])



  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 bg-gray-800 text-green-600">
      <h1 className="text-center  my-3 text-white">
        Password Generator</h1>

        <div className=" flex shadow rounded-lg overflow-hidden mb-4"
        >
          <input 
          type="text"
          value={password}
          placeholder='password'
          className='outline-none w-full px-3 py-1'
          readOnly
          ref={passwordRef}
           />
           <button
           className="outline-none , bg-blue-400 , text-white , px-3 , py-0.5 shrink-0"
           onClick={copyPasswordToClipboard}
           >copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
          <input type="range" 
          min={8}
          max={100}
          value={length}
          className="cursor-pointer"
          onChange={(e)=>{setLength(e.target.value)}}
           />
           <label>Length : {length}</label>
        </div>
        <div className="flex text-sm gap-x-2">
          <input 
          type="checkbox"
          defaultChecked={number}
          id="numberInput"
          onChange={()=>{
            setNumber(prev=>!prev)
          }}/>
          <label>Numbers</label>
       
        </div>
        <div className="flex text-sm gap-x-2">
          <input 
          type="checkbox"
          defaultChecked={number}
          id="numberInput"
          onChange={()=>{
            setNumber(!number )
          }}/>
          <label>Character</label>
       
        </div>
        </div>
    </div>
  )
}

export default App
