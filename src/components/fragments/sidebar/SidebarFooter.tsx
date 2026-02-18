import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@/components/ui/icon";
import {
  SidebarFooter as SidebarFooterComponent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks";
import { capitalizeWords, getFirstLetters } from "@/utils";

const useLogout = () => {
  const handleLogout = () => console.log("Sign Out");
  return { handleLogout };
};

export const SidebarFooter = () => {
  const { handleLogout } = useLogout();
  const { user } = useAuth();
  const imageProfile = user?.image ?? user?.avatar;

  const firstNameLetter = capitalizeWords(
    getFirstLetters(String(user?.username), 1),
  );
  return (
    <SidebarFooterComponent>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton className="text-nowrap">
                {/* <Icon name="User" /> */}
                <Avatar>
                  <AvatarImage src={imageProfile ?? ""} />
                  <AvatarFallback>{firstNameLetter}</AvatarFallback>
                </Avatar>
                <span className="transition-all duration-300 ease-in-out group-data-[state=collapsed]:pointer-events-none group-data-[state=collapsed]:-translate-x-2.5 group-data-[state=collapsed]:opacity-0">
                  {user?.username}
                </span>
                <Icon
                  name={"ChevronUp"}
                  className="ml-auto transition-all duration-300 ease-in-out group-data-[state=collapsed]:pointer-events-none group-data-[state=collapsed]:-translate-x-2.5 group-data-[state=collapsed]:opacity-0"
                />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              className="min-w-(--radix-dropdown-menu-trigger-width)"
            >
              <DropdownMenuItem onClick={handleLogout}>
                <Icon name={"LogOut"} className="mr-2" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooterComponent>
  );
};
