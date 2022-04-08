import React from 'react'

function Square({className,state,onClick}) {

    const classes = className ? `${className} square`:`square`

  return (
    <span className={classes}  onClick={onClick}  style={{color:state=== 'O'? '#fff': ''}}>{state}</span>
  )
}

export default Square