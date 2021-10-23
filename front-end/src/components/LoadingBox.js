import React from "react"
import { useLoading, Bars } from '@agney/react-loading';
export default function LoadingBox(){
    const { containerProps, indicatorEl } = useLoading({
        loading: true,
        indicator: <Bars width="50" />,
        
      });
    return (
        <div  {...containerProps} style={{margin:"auto" ,textAlign:"center", color:"#f0c040" }}>
      {indicatorEl} {/* renders only while loading */}
    </div>
    )
}