import './App.css';
import { useState } from 'react';
function App() {
  const [count,setCount] = useState(0);
  const [history, setHistory] = useState([]);
  const [redoList, setRedoList] = useState([]);
  const [redoDisabled, setRedoDisabled] = useState(true);
  
  const undo = ()=>{
    if(history.length){
      const copyHistory = [...history];
      const firstItem = copyHistory.shift();
      setHistory(copyHistory);
      setCount(firstItem.prevVal)
      const redoCopy = [...redoList];
      redoCopy.push(firstItem);
      setRedoList(redoCopy);
    }

  }
  const redo = ()=>{
    if(redoList.length){
      const copyRedoHistory = [...redoList];
      const lastItem = copyRedoHistory.pop();
      setRedoList(copyRedoHistory);
      setCount(lastItem.updatedVal);
      maintainHistory(lastItem.val, lastItem.prevVal, lastItem.updatedVal);
      
    }
  }
  const maintainHistory = (val,prevVal,updatedVal)=>{
    let obj = {
      val,
      prevVal,
      updatedVal,
    }
    let copyHistory = history;
    // pushing in front of the array like stack
    copyHistory.unshift(obj)
    setHistory(copyHistory);
  }

  const handleOperation = (val)=>{
    maintainHistory(val,count,val+count)
    setCount(count+val);
  }



  const decrementCounters= [-100,-10,-1];
  const incrementCounters= [100,10,1];

  return (
    <div className="App">
      <h1>Undoable Counter</h1>
      <div className='operation-container'>
         <button className='btn' onClick={undo}>Undo</button>
         <button className='btn' onClick={redo}>Redo</button>
      </div>
      <div className='container'>
          <div>
            {decrementCounters.map((counter,index)=>(
              <button key={index} className='btn' onClick={()=>handleOperation(counter)}>{counter}</button>
            ))}
          </div>
          <h1 >
            {count}
          </h1>
          <div>
            {incrementCounters.map((counter,index)=>(
              <button key={index} className='btn' onClick={()=>handleOperation(counter)}>+{counter}</button>
            ))}
          </div>
         
      </div>
      <div className='history-container'>
        <div className='history'>
          <h1>History</h1>
          <div className='history-list'>
          {history.map((obj,index)=>(
            <div key={index} className='history-item'>
              <div>
                  {obj.val}
              </div>
              <div>
                {
                `[${obj.prevVal} --> ${obj.updatedVal}]`
                }
              </div>
            </div>
          ))}
        </div>
        </div>

        </div>
    </div>
  );
}

export default App;
