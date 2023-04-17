export const initialState={
   countDisplay:1500,
   sessionLength:1500,
   breakLength:300,
   intervalID:null,
   clockStatus:{
      isRunning: false,
      typeSession: 'Session'
   },
   intervalForMouseDown:null
}


export const reducer=(state,action)=>{
   switch(action.type){
      case 'RESET':
         return{
            countDisplay:10,
            sessionLength:10,
            breakLength:20,
            intervalID:null,
            clockStatus:{
               isRunning: false,
               typeSession: 'Session'
            }
         }
      case 'START_COUNT':
         return{
            ...state,
            clockStatus:{
               ...state.clockStatus,
               isRunning:true,
            },
            intervalID:action.interval
         }
      case 'STOP_COUNT':
         return{
            ...state,
            clockStatus:{
               ...state.clockStatus,
               isRunning:false,
            }
         }
      case 'CHANGING_TYPE_SETSTATE':
            return{
               ...state,
               countDisplay: state.clockStatus.typeSession==='Session' ? state.breakLength: state.sessionLength,
               clockStatus:{
                  typeSession: state.clockStatus.typeSession==='Session' ? 'Break': 'Session',
                  isRunning:false,
               }
            }
      case 'CHANGING_TYPE_START_COUNT':
            return {
              ...state,
              clockStatus: {
                ...state.clockStatus,
                isRunning: true
              },
              intervalID: action.interval
            };
      case 'SET_COUNT_DISPLAY':
            return {
               ...state,
               countDisplay: state.countDisplay-action.payload,
            };
      case 'STOP_CLOCK':
         return{
           ...state,
            clockStatus:{
               isRunning:false,
               typeSession:'Break'
            }
         }
      case 'BREAK_INCREMENT':
         return{
            ...state,
            countDisplay: state.clockStatus.typeSession ==='Break'? state.breakLength+30: state.countDisplay,
            breakLength:state.breakLength+30
         }
      case 'BREAK_DECREMENT':
         return{
            ...state,
            countDisplay:state.clockStatus.typeSession ==='Break' && state.breakLength>1 ? state.breakLength-30: state.countDisplay,
            breakLength:state.breakLength>1 ? state.breakLength-30:state.breakLength
         }
      case 'SESSION_INCREMENT':
         return{
            ...state,
            countDisplay:state.clockStatus.typeSession ==='Session'? state.sessionLength+30: state.countDisplay,
            sessionLength:state.sessionLength+30
         }
      case 'SESSION_DECREMENT':
         return{
            ...state,
            countDisplay:state.clockStatus.typeSession === 'Session' && state.sessionLength>1 ? state.sessionLength-30: state.countDisplay,
           sessionLength:state.sessionLength>1 ? state.sessionLength-30 : state.sessionLength
         }
      case 'MOUSEDOWN':
         return{
           ...state,
            intervalForMouseDown:action.payload
         }
      default:
         return state
   }
}