import { useRouter } from 'next/router';

import { 
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect
} from 'react';

const ThemeContext  = createContext();

const defaultStyles = {
  bgColor1: '#f6D242',
  bgColor2: '#FF52E5',
  fgColor1: '#808080',
  fgColor2: '#4F4F4F',
  fontColor1: '#FFFFFF',
  fontColor2: '#FFFFFF'
}

export function ThemeWrapper({ children }) {
  const { slug } = useRouter().query
  const [ theme, setTheme ] = useState(defaultStyles);

  useEffect(() => {
    if (!slug) setStyles(defaultStyles, setTheme)
  }, [ slug ])

  const contextValue = useMemo(() => {
    // Cache and serve custom account object.
    return { 
      theme,
      defaultStyles,
      setTheme,
      setStyles,
    }
  }, [ theme, setTheme ]);

  return (
    <ThemeContext.Provider value={contextValue}>
        {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
   return useContext(ThemeContext);
}

function setStyles(styles, callback) {
  const getProp = prop => document.documentElement.style.getPropertyValue(prop)
  const setProp = (k,v) => document.documentElement.style.setProperty(k,v)
  
  Object.keys(styles).forEach(k => {
    const key = `--${k}`,
          val = styles[k],
          cur = getProp(key);
    if (val && val !== cur) setProp(key, val);
  })

  callback(prevTheme => { return { ...defaultStyles, ...prevTheme, ...styles } })
}