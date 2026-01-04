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
  const [isClient, setIsClient] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!open && isClosing) {
      const timer = setTimeout(() => {
        setIsClosing(false);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [open, isClosing]);

  const handleOpenChange = (newOpen: boolean) => {
    if (!isClient) return;

    if (!newOpen) {
      setIsClosing(true);
    }

    // Prevent event bubbling
    const handler = (e: Event) => {
      e.stopPropagation();
      if (onOpenChange) {
        onOpenChange(newOpen);
      }
    };

    if (newOpen) {
      handler(new Event("open"));
    } else {
      setTimeout(() => {
        handler(new Event("close"));
      }, 50);
    }
  };

  if (!isClient) {
    return null;
  }

  if (isMobile) {
    return (
      <Drawer
        open={open}
        onOpenChange={handleOpenChange}
      >
        {trigger && (
          <DrawerTrigger asChild onClick={(e) => e.stopPropagation()}>
            {trigger}
          </DrawerTrigger>
        )}
        <DrawerContent
          className={`will-change-transform transition-all duration-200 ease-out ${
            isClosing ? "animate-out" : "animate-in"
          }`}

        >
          <VisuallyHidden.Root>
            <DrawerTitle>Modal</DrawerTitle>
          </VisuallyHidden.Root>
          <div className="p-4" onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog
      open={open}
      onOpenChange={handleOpenChange}
    >
      {trigger && (
        <DialogTrigger asChild onClick={(e) => e.stopPropagation()}>
          {trigger}
        </DialogTrigger>
      )}
      <DialogContent
        className={`max-h-screen p-0 will-change-transform transition-all duration-200 ease-out ${
          isClosing ? "animate-out" : "animate-in"
        }`}

      >
        <VisuallyHidden.Root>
          <DialogTitle>Modal</DialogTitle>
        </VisuallyHidden.Root>
        <div className="p-6 pt-0" onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}
