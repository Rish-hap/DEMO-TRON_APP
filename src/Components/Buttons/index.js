import React, { useRef, useEffect } from 'react'
import { debounce, throttle } from 'throttle-debounce';

const Button = (props) =>{
    const searchRef  = useRef()
    const  searchCall = (e) =>{
        if(!!e){
            e.preventDefault()
            e.stopPropagation()
        }
        if(!!props.onClick){
            if(!!!props.loading){
                props.onClick(e)
            }
         }
        }
        
    useEffect(()=>{
            if(props.loading===true){
                const element = document.getElementById(`${props.id}`)
                element.classList.add('loadingSpinner')
            }
            if(props.loading===false){
                const element = document.getElementById(`${props.id}`)
                element.classList.remove('loadingSpinner')
            }
    },[props.loading])
    return (
          <React.Fragment>
              <button
               className={props.className}
               disabled = {props.loading}
               onClick={debounce(500, searchCall)} 
              >
                   <span id={props.id } className=''></span><text className={!props.loading?'':'hide'}>{props.children}</text>
              </button>
          </React.Fragment>
      )
}
export default Button