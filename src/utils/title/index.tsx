import React from 'react'
import {Helmet} from "react-helmet";

type Ttitle={
    children:React.ReactNode,
    title:string
}
function Title({children,title}:Ttitle) {
  return (
    <>
        <Helmet>
            <title>todo list | {title}</title>
        </Helmet>
        {children}
    </>
  )
}

export  {Title}