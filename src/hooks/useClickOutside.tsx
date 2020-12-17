import { RefObject, useEffect } from 'react'

function useClickOutside (ref: RefObject<HTMLElement>,handler:Function){
  useEffect(()=> {
    const lister = (event : MouseEvent) => {
      if(!ref.current || ref.current.contains(event.target as HTMLElement)){
        return
      }
      handler(event)
    }
    document.addEventListener('click',lister)
    return () => {
      document.removeEventListener('click', lister)
    }
  }, [ref,handler])
}

export default useClickOutside