import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';

import {WindowEVent} from '../utility/windowFunctions'


function Traybtn() {
  return (
    <>
        <Tooltip title="Minimize">

<RemoveIcon   className="minBtn" onClick={()=>WindowEVent('minimize')}/>
</Tooltip>
<Tooltip title="Close">

<CloseIcon   className="closeBtn" onClick={()=>WindowEVent('closeApp')}/>
</Tooltip>
    </>
  )
}

export default Traybtn