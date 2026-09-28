import React from 'react';
import { Route, Routes } from 'react-router-dom';
import  {Home}  from '../Pages/Home';
import {Destination} from '../Pages/Destination';
import {Tours} from '../Pages/Tours';
import {Contact} from '../Pages/Contact';
import {BookNow} from '../Pages/BookNow';
import {Errorpage} from '../Pages/Errorpage';
import {DestinationDetails} from '../Common/DestinationDetails';

export const AppRoute = () => {
  return (
    <>
    
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/destination" element={<Destination/>}/>
      <Route path="/destination/:slug" element={<DestinationDetails/>}/>
      <Route path="/tours" element={<Tours/>}/>
      <Route path="/destination" element={<Destination/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/booknow' element={<BookNow/>}/>
      <Route
        path="*"
        element={<Errorpage/>}
      />
    </Routes>
    </>
  )
}
