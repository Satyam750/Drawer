"use client"

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { Poppins } from "next/font/google";
import { Hint } from "@/components/hint";
import { useRenameModal } from "@/store/user-rename-modal";
import { Actions } from "@/components/action";
import { Menu } from "lucide-react";

interface InfoProps {
  drawerId: string;
};

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});


const TabSeparator = () => {
  return (
    <div className="text-neutral-300 px-1.5">
      |
    </div>
  );
};



export const Info = ({drawerId}:InfoProps) => {

  const {onOpen} = useRenameModal();
   
  const data  = useQuery(api.board.get, {
    id:drawerId as Id<"boards">
  })
  
  if(!data) return <InfoSkeleton/>

  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
      <Hint label="Got to drawers" side="bottom" sideOffset={10}>
    <Button asChild className="px-2" variant="drawer">
        <Link href='/'>   
        <Image src="/LogoS.svg" 
        alt="Drawer Logo"
        height={30}
        width={30}
        />
        <span className={cn(
          "font-semibold text-xl ml-2 text-black",
          font.className,
          )}>
          Drawer
        </span>
          </Link>
      </Button>
            </Hint>
        <TabSeparator/>
        <Hint label="Edit title" side="bottom" sideOffset={10}>
        <Button variant="drawer" className="text-base font-normal px-2"
        onClick={() => onOpen(data._id, data.title)}
        >
          {data.title}
        </Button>
          </Hint>
          <TabSeparator/>
          <Actions
          id={data._id}
          title={data.title}
          side="bottom"
          sideOffset={10}
          >
            <div>
              <Hint label="Main menu" side="bottom" sideOffset={10}>
                 <Button size="icon" variant="drawer">
                  <Menu/>
                 </Button>
              </Hint>
            </div>

 
          </Actions>
       </div>
  )
}


export const InfoSkeleton = () => {
  return(
    <div 
      className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]"
    /> 
    
  )
}
