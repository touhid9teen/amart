"use client";

import { useIsMobile } from "@/hook/use-mobile";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

type ModalComponentProps = {
  children: React.ReactNode;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function ModalComponent({
  children,
  trigger,
  open,
  onOpenChange,
}: ModalComponentProps) {
  const isMobile = useIsMobile();
  const [isReady, setIsReady] = useState(false);

  // Preload transitions
  useEffect(() => {
    setIsReady(true);
  }, []);

  const handleOpenChange = (newOpen: boolean) => {
    if (!isReady) return;
    onOpenChange?.(newOpen);
  };

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={handleOpenChange}>
        {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}
        <DrawerContent className="will-change-transform transition-transform duration-200">
          <VisuallyHidden.Root>
            <DrawerTitle>Modal</DrawerTitle>
          </VisuallyHidden.Root>
          <div className="p-4">{children}</div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="max-h-screen p-0 will-change-transform transition-transform duration-200">
        <VisuallyHidden.Root>
          <DialogTitle>Modal</DialogTitle>
        </VisuallyHidden.Root>
        <div className="p-6 pt-0">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
