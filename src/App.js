import React , {useEffect,useState,useRef,Fragment} from 'react'
import Sticky from './Sticky'

import './App.css';

export default () => {
  const [isSticky, setSticky] = useState(false);
  const ref = useRef(null);
  const handleScroll = () => {
    if (ref.current) {
      setSticky(ref.current.getBoundingClientRect().top <= 0);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', () => handleScroll);
    };
  }, []);

  return (
    <Fragment>
     <header className="sticky-header"><span style={{marginLeft:'10px'}}>Siemeins assigment</span></header>
      <div className={`sticky-wrapper${isSticky ? ' sticky' : ''}`} ref={ref} style={{height:9000}}>
        <Sticky />
      </div>
      <p>Lorem ipsum...</p>
    </Fragment>
  );
};