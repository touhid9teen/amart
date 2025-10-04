"use client";

import { useIsMobile } from "@/hook/use-mobile";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "./ui/separator";
type ModalComponentProps = {
  children: React.ReactNode;
  trigger?: React.ReactNode;
  data?: {
    title?: string;
    description?: string;
  };
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function ModalComponent({
  children,
  trigger,
  data,
  open,
  onOpenChange,
}: ModalComponentProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}
        <DrawerContent>
          {data && (
            <>
              <DrawerHeader className="text-left">
                <DrawerTitle>{data?.title}</DrawerTitle>
                {data?.description && (
                  <DrawerDescription>{data?.description}</DrawerDescription>
                )}
              </DrawerHeader>
              <Separator />
            </>
          )}

          <div className="p-4">{children}</div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="max-h-screen p-0">
        {data && (
          <>
            <DialogHeader className="p-6 pb-0">
              <DialogTitle>{data?.title}</DialogTitle>
              {data?.description && (
                <DialogDescription>{data?.description}</DialogDescription>
              )}
            </DialogHeader>
            <Separator />
          </>
        )}

        <div className="p-6 pt-0">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
