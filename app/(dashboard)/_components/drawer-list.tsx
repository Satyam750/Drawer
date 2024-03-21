"use client";

import { useQuery } from "convex/react";

import { api } from "@/convex/_generated/api";
import { EmptySearch } from "./empty-search";
import { EmptyFavorites } from "./empty-favorites";
import { EmptyDrawer } from "./empty-drawer";
import { DrawerCard } from "./drawer-card";
import { NewDrawerButton } from "./new-drawer-button";


interface DrawerListProps {
  orgId: string;
  query: {
    search?: string;
    favorites?: string;
  };
};


export const DrawerList = ({orgId,query}:DrawerListProps) => {
    const data = useQuery(api.boards.get,{
      orgId, 
       ...query,
    })

    if(data === undefined){
        return (
            <div>
               <h2 className="text-3xl">
                {query.favorites ? "Favorite drawer" : "Team drawer"}
               </h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
                  <NewDrawerButton orgId={orgId} disabled/>
                  <DrawerCard.Skeleton/>
                  <DrawerCard.Skeleton/>
                  <DrawerCard.Skeleton/>
                  <DrawerCard.Skeleton/>
               </div>
            </div>
        )
    }

    if(!data?.length && query.search){
        return(
          <div>
         <EmptySearch/>
          </div>
        )
    }

    if(!data.length && query.favorites){
        return(
            <div>
              <EmptyFavorites/>
            </div>
        )
    }

    if(!data.length){
    return  (
        <div>
    <EmptyDrawer/>
        </div>
    )
    }

    return(
         <div>
           <h2 className="text-3xl">
            {query.favorites ? "Favorite drawers" : "Team drawers"}
           </h2>
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
        <NewDrawerButton orgId={orgId} />
        {data?.map((board) => (
          <DrawerCard
            key={board._id}
            id={board._id}
            title={board.title}
            imageUrl={board.imageUrl}
            authorId={board.authorId}
            authorName={board.authorName}
            createdAt={board._creationTime}
            orgId={board.orgId}
            isFavorite={board.isFavorite}
          />
        ))}
      </div>
          </div>
    )
}




// "use client";



// import { useQuery } from "convex/react";

// import { api } from "@/convex/_generated/api";
// import { EmptySearch } from "./empty-search";
// import { EmptyFavorites } from "./empty-favorites";
// import { EmptyDrawer } from "./empty-drawer";
// import { DrawerCard } from "./drawer-card";
// import { NewDrawerButton } from "./new-drawer-button";  


// interface DrawerListProps {
//   orgId: string;
//   query: {
//     search?: string;
//     favorites?: string;
//   };
// };

// export const DrawerList = ({
//   orgId,
//   query,
// }: DrawerListProps) => {
//   const data = useQuery(api.boards.get, { 
//     orgId,
//     ...query,
//   });

//   if (data === undefined) {
//     return (
//       <div>
//         <h2 className="text-3xl">
//           {query.favorites ? "Favorite boards" : "Team boards"}
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
//           <NewDrawerButton orgId={orgId} disabled />
//           <DrawerCard.Skeleton />
//           <DrawerCard.Skeleton />
//           <DrawerCard.Skeleton />
//           <DrawerCard.Skeleton />
//         </div>
//       </div>
//     )
//   }

//   if (!data?.length && query.search) {
//     return <EmptySearch />;
//   }

//   if (!data?.length && query.favorites) {
//     return <EmptyFavorites />
//   }

//   if (!data?.length) {
//     return <EmptyDrawer />
//   }

//   return (
//     <div>
//       <h2 className="text-3xl">
//         {query.favorites ? "Favorite boards" : "Team boards"}
//       </h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
//         <NewDrawerButton orgId={orgId} />
//         {data?.map((board) => (
//           <DrawerCard
//             key={board._id}
//             id={board._id}
//             title={board.title}
//             imageUrl={board.imageUrl}
//             authorId={board.authorId}
//             authorName={board.authorName}
//             createdAt={board._creationTime}
//             orgId={board.orgId}
//             isFavorite={board.isFavorite}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };