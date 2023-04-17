import { useEffect, useReducer } from 'react'
import './App.css'
import {reducer, initialState } from './Reducer.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay,faStop,faSquarePlus,faSquareMinus,faRotateLeft } from '@fortawesome/free-solid-svg-icons'
function App() {

   const [state,dispatch]=useReducer(reducer,initialState);
   const soundArray=['http://codeskulptor-demos.commondatastorage.googleapis.com/descent/gotitem.mp3','http://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/music/start.ogg','http://commondatastorage.googleapis.com/codeskulptor-assets/week7-brrring.m4a','http://commondatastorage.googleapis.com/codeskulptor-assets/week7-button.m4a']
   function startCounter(){
      if(!state.clockStatus.isRunning){
         let interval = setInterval(() => {
            dispatch({type:'SET_COUNT_DISPLAY',payload:1})
         }, 1000);
         dispatch({type:'START_COUNT',interval:interval});
      }
   }

   useEffect(()=>{
      if(state.countDisplay==0){
         let audio=new Audio(soundArray[Math.floor(Math.random()*soundArray.length)])
         audio.play();
         clearInterval(state.intervalID);
         dispatch({type:'CHANGING_TYPE_SETSTATE'});
         let interval = setInterval(() => {
            dispatch({type:'SET_COUNT_DISPLAY',payload:1})
         }, 1000);
         dispatch({type:'CHANGING_TYPE_START_COUNT',interval:interval},)
      }
   },[state.countDisplay])

   function stopCounter(){
      if(state.intervalID){
         clearInterval(state.intervalID);
         dispatch({type:'STOP_COUNT'})
      }
   }

//   const [count, setCount] = useState(10);
//   const [sessionLength,setSessionLength] = useState(10);
//   const [breakLength,setBreakLength] = useState(20);
//   const [intervalID, setIntervalID] = useState();
//   const [clockStatus, setClockStatus] = useState({
//     isRunning: false,
//     typeSession: 'Session'
//   });
//    function startCount(){
//       if(!clockStatus.isRunning){
//          let fuck=setInterval(()=>setCount(prev=>prev-1),1000);
//          setIntervalID(fuck);
//          setClockStatus(prev=> ({...prev,isRunning:true}));
//       }
//    }
   // useEffect(()=>{
   //    if (count === 0) {
   //       clearInterval(intervalID);
   //       setClockStatus(prev => ({
   //         typeSession: prev.typeSession === 'Session' ? 'break' : 'Session',
   //         isRunning: false
   //       }));
   //       setCount(prev => {
   //         return prev =
   //           clockStatus.typeSession === 'Session' ? breakLength : sessionLength;
   //       });
   //       let fuck=setInterval(()=>setCount(prev=>prev-1),1000);
   //       setIntervalID(fuck);
   //     }
   // },[state.countDisplay])

//    function stopCount(){
//       clearInterval(intervalID);
//       setClockStatus(prev=> ({...prev,isRunning:false}));
//    }
  return (
    <div className="App">
      <div className='App__title-block'>
         <img src="https://media.istockphoto.com/id/1225546626/it/vettoriale/timer-per-cucina-al-pomodoro.jpg?s=612x612&w=0&k=20&c=ou7FRRj4-9Jy_f7uNAlAMzyWwDXmrKK7bj3I2crrIJo=" alt="Pomodoro__tomato-timer" />
      </div>
      <div className='App__interactive'>
         <div className='App__interactive-block'>
            <p className='interactive-block__subtitle'>Break Length</p>
            <p className='interactive-block__controls'>
               <FontAwesomeIcon icon={faSquareMinus}
                  onClick={()=>{
                     if(!state.clockStatus.isRunning){
                        dispatch({type:'BREAK_DECREMENT'})
                     }
                     }}
                  onMouseDown={()=>{
                     if(!state.clockStatus.isRunning){
                        let interval=setInterval(()=>dispatch({type:'BREAK_DECREMENT'})
                        ,100)
                        dispatch({type:'MOUSEDOWN',payload:interval})
                     }
                     }}
                  onMouseUp={()=>{
                        if(!state.clockStatus.isRunning){
                           clearInterval(state.intervalForMouseDown);
                  }}}
                  onMouseLeave={()=>{
                     if(!state.clockStatus.isRunning){
                        clearInterval(state.intervalForMouseDown);
                     }
                  }}
               ></FontAwesomeIcon>
               <p className='interactive-block__display'>{Math.floor(state.breakLength/60)<10 ? '0'+Math.floor(state.breakLength/60) : Math.floor(state.breakLength/60) }:{(state.breakLength%60)<10 ? '0'+state.breakLength%60 : state.breakLength%60}</p>
               <FontAwesomeIcon icon={faSquarePlus}
                  onClick={()=>{
                     if(!state.clockStatus.isRunning){
                        dispatch({type:'BREAK_INCREMENT'})
                     }}
                  }
                     onMouseDown={()=>{
                        if(!state.clockStatus.isRunning){
                           let interval=setInterval(()=>dispatch({type:'BREAK_INCREMENT'})
                           ,100)
                           dispatch({type:'MOUSEDOWN',payload:interval})
                        }
                        }
                     }
                     onMouseUp={()=>{
                           if(!state.clockStatus.isRunning){
                              clearInterval(state.intervalForMouseDown);
                     }}}
                     onMouseLeave={()=>{
                        if(!state.clockStatus.isRunning){
                           clearInterval(state.intervalForMouseDown);
                        }
                     }}

               ></FontAwesomeIcon>
            </p>
         </div>
         <div className='App__interactive-block'>
            <p className='interactive-block__subtitle'>Session Length</p>
            <p className='interactive-block__controls'>
               <FontAwesomeIcon icon={faSquareMinus}
                  onClick={()=>{
                     if(!state.clockStatus.isRunning){
                        dispatch({type:'SESSION_DECREMENT'})
                     }}
                  }
                  onMouseDown={()=>{
                     if(!state.clockStatus.isRunning){
                        let interval=setInterval(()=>dispatch({type:'SESSION_DECREMENT'})
                        ,100)
                        dispatch({type:'MOUSEDOWN',payload:interval})
                     }
                     }
                  }
                  onMouseUp={()=>{
                        if(!state.clockStatus.isRunning){
                           clearInterval(state.intervalForMouseDown);
                  }}}
                  onMouseLeave={()=>{
                     if(!state.clockStatus.isRunning){
                        clearInterval(state.intervalForMouseDown);
                     }
                  }}

               ></FontAwesomeIcon>
               <p className='interactive-block__display'>{Math.floor(state.sessionLength/60)<10 ? '0'+Math.floor(state.sessionLength/60) : Math.floor(state.sessionLength/60) }:{(state.sessionLength%60)<10 ? '0'+state.sessionLength%60 : state.sessionLength%60}</p>
               <FontAwesomeIcon icon={faSquarePlus}
                  onClick={()=>{
                     if(!state.clockStatus.isRunning){
                        dispatch({type:'SESSION_INCREMENT'})
                     }}
                  }
                  onMouseDown={()=>{
                     if(!state.clockStatus.isRunning){
                        let interval=setInterval(()=>dispatch({type:'SESSION_INCREMENT'})
                        ,100)
                        dispatch({type:'MOUSEDOWN',payload:interval})
                     }
                     }
                  }
                  onMouseUp={()=>{
                        if(!state.clockStatus.isRunning){
                           clearInterval(state.intervalForMouseDown);
                  }}}
                  onMouseLeave={()=>{
                     if(!state.clockStatus.isRunning){
                        clearInterval(state.intervalForMouseDown);
                     }
                  }}
               ></FontAwesomeIcon>
            </p>
         </div>
      </div>
      <div className='App__display'>
         <p>{state.clockStatus.typeSession}</p>
         <p>{Math.floor(state.countDisplay/60)<10 ? '0'+Math.floor(state.countDisplay/60) : Math.floor(state.countDisplay/60)}:{state.countDisplay%60 <10 ? '0'+state.countDisplay%60 : state.countDisplay%60}</p>
      </div>
      <div className='App__controls'>
         <button onClick={state.clockStatus.isRunning ? stopCounter: startCounter}>
            {state.clockStatus.isRunning ? <FontAwesomeIcon icon={faStop}></FontAwesomeIcon>: <FontAwesomeIcon icon={faPlay}></FontAwesomeIcon>}
         </button>
         <button onClick={()=>{
            clearInterval(state.intervalID);
            dispatch({type:'RESET'})}}
            >
            <FontAwesomeIcon icon={faRotateLeft}></FontAwesomeIcon>
         </button>
      </div>

    </div>
  );
}

export default App
