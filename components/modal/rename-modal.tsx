"use client";

import { FormEventHandler, useEffect, useState } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogClose,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRenameModal } from "@/store/user-rename-modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";

export  const RenameModal = () => {

    const { mutate,pending} = useApiMutation(api.board.update)

    
    const {
        isOpen,
        onClose,
        initialValues
    } = useRenameModal()
    
    const [title, setTitle] = useState(initialValues.title)

    useEffect(()=>{
        setTitle(initialValues.title)
    },[initialValues.title])

    const onSubmit:FormEventHandler<HTMLFormElement> = (e) => {
         e.preventDefault()

         mutate({
            id:initialValues.id,
            title,
         })
         .then(()=> {
            toast.success("Drawer rename")
            onClose()
         })
         .catch(() => {
            toast.error("Failed to rename drawer")
         })
    }

    return(
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Edit drawer title
                        </DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        Enter a new title for this drawer 
                    </DialogDescription>
                    <form onSubmit={onSubmit} className="space-y-4">
                        <Input
                        disabled={pending}
                        required
                        maxLength={60}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Drawer title"
                        />
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="outline">
                                Cancel
                                </Button>
                            </DialogClose>
                            <Button disabled={pending} type="submit">
                                Save
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        
  

    )
}