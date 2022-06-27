import { useEffect } from 'react'

export function useOutsideClick(refs, handler) {
  useEffect(() => {

    function handleClick(e) {
      if (!eventInRefArray(e, refs)) handler(e)
    }

    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    }
  }, [ refs, handler ])
}

function eventInRefArray(event, arr) {
  if (!(arr && Array.isArray(arr))) return false
  return arr.some(ref => {
    return (ref.current && ref.current.contains(event.target))
  })
}