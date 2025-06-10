import React, { useEffect, useRef, useState } from 'react';

//Views
import ContextMainComponent from '../ContextMainComponent/ContextMainComponent';

export default function MainComponent({navigationIsReady}) {

  return (
    <ContextMainComponent navigationIsReady={navigationIsReady}/>
  );
}
