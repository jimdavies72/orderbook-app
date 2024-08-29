import {useEffect, useState } from "react";
import { Container } from "@/lib/utils/dataTypes";
import Card from "@/components/card";

import DeleteForm from "@/components/forms/delete-form";
import EditForm from "@/components/forms/containerEdit-form";

import { Button } from "../ui/button";
import IconMenu from "@/components/icon-menu";
import { MoreVertical, SquarePen, Trash2 } from "lucide-react";

import { ResponsiveDialog } from "@/components/responsive-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const ContainerComponent = ({
  activeContainer,
  container,
  containerHandler,
}: {
  activeContainer: string,
  container: Container,
  containerHandler: (containerId: string) => void,
}) => {
  const [activeStyle, setActiveStyle] = useState<string>("");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    if (activeContainer === container._id) {
      setActiveStyle("font-bold")
    } else {
      setActiveStyle("")
    }
  }, [activeContainer])

  return (
    <>
      <ResponsiveDialog
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        title="Edit Container"
        description="Edit this Container"
      >
        <EditForm
          supplierId={container.supplier}
          containerId={container._id}
          setIsOpen={setIsEditOpen}
          containerRow={container}
        />
      </ResponsiveDialog>
      <ResponsiveDialog
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        title="Delete Container"
        description="Are you sure you want to delete this container?"
      >
        <DeleteForm
          cardId={container._id}
          setIsOpen={setIsDeleteOpen}
          identifier={container.containerId}
          route="containers"
        />
      </ResponsiveDialog>
      <Card>
        <div
          onClick={() => containerHandler(container._id)}
          className="relative"
        >
          {/* Card Content */}
          <div>
            <h5 className={activeStyle}>
              Container: {container.containerNumber}
            </h5>
            <p>Value: {container.value}</p>
          </div>
          {/* Dropdown Menu */}
          <div className="absolute right-0 top-0 z-10">
            <span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    onClick={() => {
                      containerHandler(container._id);
                    }}
                    variant="ghost"
                    className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                  >
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[160px] z-50">
                  <DropdownMenuItem className="group flex w-full items-center justify-between  text-left p-0 text-sm font-base text-neutral-500 ">
                    <button
                      onClick={() => {
                        setIsEditOpen(true);
                      }}
                      className="w-full justify-start flex rounded-md p-2 transition-all duration-75 hover:bg-neutral-100"
                    >
                      <IconMenu
                        text="Edit"
                        icon={<SquarePen className="h-4 w-4" />}
                      />
                    </button>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="group flex w-full items-center justify-between  text-left p-0 text-sm font-base text-neutral-500 ">
                    <button
                      onClick={() => {
                        setIsDeleteOpen(true);
                      }}
                      className="w-full justify-start flex text-red-500 rounded-md p-2 transition-all duration-75 hover:bg-neutral-100"
                    >
                      <IconMenu
                        text="Delete"
                        icon={<Trash2 className="h-4 w-4" />}
                      />
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </span>
          </div>
        </div>
      </Card>
    </>
  );
};

export default ContainerComponent;
