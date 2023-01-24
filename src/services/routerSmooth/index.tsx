import {motion} from 'framer-motion'
import React from 'react'
    type RouterSmoothProps={
        children:React.ReactNode
    }//============================
        const anime={
            // TransitionEvent:{delay:1},
            animate:{opacity:3,x:0},
             exit:{left:0,x:0}
        }
    //=========================
function RouterSmooth({children}:RouterSmoothProps) {
  return (
    <motion.div variants={anime} transition={{ ease: [1.17, 2.67, 0.83, 0.67]}} animate='animate' exit={'exit'}>
        {children}
    </motion.div>
  )
}

export { RouterSmooth}