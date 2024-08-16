"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { ModeToggle } from "@/components/lightDark/theme-toggle";
import IconMenu from "@/components/icon-menu";
import { LockKeyholeOpen, LockKeyhole, Building, Ship, House } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { user } = useUser();
  
  return (
    <div className="flex items-center justify-between p-4 mt-4 mb-4 w-[90%] border-solid border rounded shadow-md shadow-gray-500">
      <div className="flex flex-row items-center justify-center">
        <div className="mr-4 cursor-pointer">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <HamburgerMenuIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="bottom"
              align="start"
              className="w-[160px] z-50"
            >
              {user ? (
                <div>
                  <DropdownMenuItem
                    asChild
                    className="group flex w-full items-center justify-between  text-left p-0 text-sm font-base text-neutral-500 "
                  >
                    <Button variant="ghost" asChild>
                      <Link href="/">
                        <IconMenu
                          text="Home"
                          icon={<House className="h-4 w-4" />}
                        />
                      </Link>
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    asChild
                    className="group flex w-full items-center justify-between  text-left p-0 text-sm font-base text-neutral-500 "
                  >
                    <Button variant="ghost" asChild>
                      <Link href="/suppliers">
                        <IconMenu
                          text="Suppliers"
                          icon={<Building className="h-4 w-4" />}
                        />
                      </Link>
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    asChild
                    className="group flex w-full items-center justify-between  text-left p-0 text-sm font-base text-neutral-500 "
                  >
                    <Button variant="ghost" asChild>
                      <Link href="/orderbook">
                        <IconMenu
                          text="Orderbook"
                          icon={<Ship className="h-4 w-4" />}
                        />
                      </Link>
                    </Button>
                  </DropdownMenuItem>
                </div>
              ) : (
                <></>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                asChild
                className="group flex w-full items-center justify-between  text-left p-0 text-sm font-base text-neutral-500 "
              >
                {user ? (
                  <Button variant="ghost" asChild>
                    <Link
                      href="/api/auth/logout"
                    >
                      <IconMenu
                        text="Sign Out"
                        icon={<LockKeyhole className="h-4 w-4" />}
                      />
                    </Link>
                  </Button>
                ) : (
                  <Button variant="ghost" asChild>
                    <Link href="/api/auth/login">
                      <IconMenu
                        text="Sign In"
                        icon={<LockKeyholeOpen className="h-4 w-4" />}
                      />
                    </Link>
                  </Button>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <p className="font-bold">Weir & Carmichael Orderbook</p>
      </div>
      <div className="flex flex-row items-center justify-center">
        <div className="mr-4">
          {user ? (
            <Button
              className="shadow-md shadow-gray-500"
              asChild
              variant="outline"
            >
              <Link href="/api/auth/logout">
                <IconMenu
                  text="Sign Out"
                  icon={<LockKeyhole className="h-4 w-4" />}
                />
              </Link>
            </Button>
          ) : (
            <Button
              className="shadow-md shadow-gray-500"
              asChild
              variant="outline"
            >
              <Link href="/api/auth/login">
                <IconMenu
                  text="Sign In"
                  icon={<LockKeyholeOpen className="h-4 w-4" />}
                />
              </Link>
            </Button>
          )}
        </div>
        <div className="rounded shadow-md shadow-gray-500">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
