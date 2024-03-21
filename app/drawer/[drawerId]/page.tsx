import React from 'react'
import { Canvas } from './_components/canvas'
import { Room } from '@/components/room';
import { Loading } from './_components/loading';

interface DrawerIdPageProps{
     params:{
        drawerId:string;
     };
};

const DrawerIdPage = ({params}:DrawerIdPageProps) => {



  return (
    <Room roomId={params.drawerId} fallback={<Loading />}>
    <Canvas drawerId={params.drawerId}/>
    </Room>
  )
}

export default DrawerIdPage