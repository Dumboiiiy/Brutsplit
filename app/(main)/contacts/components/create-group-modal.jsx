"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "../../../../convex/_generated/api";
import { useConvexMutation, useConvexQuery } from "../../../../hooks/use-convex-query";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../../components/ui/dialog";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { Textarea } from "../../../../components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "../../../../components/ui/avatar";
import { X, UserPlus } from "lucide-react";
import { Badge } from "../../../../components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../../../components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../components/ui/popover";

const groupSchema = z.object({
  name: z.string().min(1, "Group name is required"),
  description: z.string().optional(),
});

export function CreateGroupModal({ isOpen, onClose, onSuccess }) {
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [commandOpen, setCommandOpen] = useState(false);

  const { data: currentUser } = useConvexQuery(api.users.getCurrentUser);
  const createGroup = useConvexMutation(api.contacts.createGroup);
  const { data: searchResults, isLoading: isSearching } = useConvexQuery(
    api.users.searchUsers,
    { query: searchQuery }
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(groupSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const addMember = (user) => {
    if (!selectedMembers.some((m) => m.id === user.id)) {
      setSelectedMembers([...selectedMembers, user]);
    }
    setCommandOpen(false);
  };

  const removeMember = (userId) => {
    setSelectedMembers(selectedMembers.filter((m) => m.id !== userId));
  };

  const onSubmit = async (data) => {
    try {
      // Extract member IDs
      const memberIds = selectedMembers.map((member) => member.id);

      // Create the group
      const groupId = await createGroup.mutate({
        name: data.name,
        description: data.description,
        members: memberIds,
      });

      // Success
      toast.success("Group created successfully!");
      reset();
      setSelectedMembers([]);
      onClose();

      // Redirect to the new group page
      if (onSuccess) {
        onSuccess(groupId);
      }
    } catch (error) {
      toast.error("Failed to create group: " + error.message);
    }
  };

  const handleClose = () => {
    reset();
    setSelectedMembers([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-[#FFF1E8] p-0">
        <div className="p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-black">Create New Group</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-bold text-black">Group Name</Label>
              <Input
                id="name"
                placeholder="Enter group name"
                {...register("name")}
                className="border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[1px] focus:translate-y-[1px] transition-all"
              />
              {errors.name && (
                <p className="text-sm font-bold text-[#FF5052]">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="font-bold text-black">Description (Optional)</Label>
              <Textarea
                id="description"
                placeholder="Enter group description"
                {...register("description")}
                className="border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[1px] focus:translate-y-[1px] transition-all"
              />
            </div>

            <div className="space-y-2">
              <Label className="font-bold text-black">Members</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {/* Current user (always included) */}
                {currentUser && (
                  <div className="px-3 py-1 border-2 border-black bg-[#6CBD45] text-white font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <Avatar className="h-5 w-5 mr-2 inline-block rounded-none border-2 border-black">
                      <AvatarImage src={currentUser.imageUrl} />
                      <AvatarFallback className="bg-[#FFDC02] text-black font-bold">
                        {currentUser.name?.charAt(0) || "?"}
                      </AvatarFallback>
                    </Avatar>
                    <span>{currentUser.name} (You)</span>
                  </div>
                )}

                {/* Selected members */}
                {selectedMembers.map((member) => (
                  <div
                    key={member.id}
                    className="px-3 py-1 border-2 border-black bg-[#70CDDE] text-black font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center"
                  >
                    <Avatar className="h-5 w-5 mr-2 inline-block rounded-none border-2 border-black">
                      <AvatarImage src={member.imageUrl} />
                      <AvatarFallback className="bg-[#FFDC02] text-black font-bold">
                        {member.name?.charAt(0) || "?"}
                      </AvatarFallback>
                    </Avatar>
                    <span>{member.name}</span>
                    <button
                      type="button"
                      onClick={() => removeMember(member.id)}
                      className="ml-2 text-black hover:text-[#FF5052] font-bold"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}

                {/* Add member button with dropdown */}
                <Popover open={commandOpen} onOpenChange={setCommandOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-8 gap-1 text-xs border-4 border-black bg-white text-black font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
                    >
                      <UserPlus className="h-3.5 w-3.5" />
                      Add member
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-[#FFF1E8]" align="start" side="bottom">
                    <Command>
                      <CommandInput
                        placeholder="Search by name or email..."
                        value={searchQuery}
                        onValueChange={setSearchQuery}
                        className="border-b-4 border-black font-medium"
                      />
                      <CommandList>
                        <CommandEmpty>
                          {searchQuery.length < 2 ? (
                            <p className="py-3 px-4 text-sm text-center font-medium text-black/70">
                              Type at least 2 characters to search
                            </p>
                          ) : isSearching ? (
                            <p className="py-3 px-4 text-sm text-center font-medium text-black/70">
                              Searching...
                            </p>
                          ) : (
                            <p className="py-3 px-4 text-sm text-center font-medium text-black/70">
                              No users found
                            </p>
                          )}
                        </CommandEmpty>
                        <CommandGroup heading="Users">
                          {searchResults?.map((user) => (
                            <CommandItem
                              key={user.id}
                              value={user.name + user.email}
                              onSelect={() => addMember(user)}
                              className="hover:bg-[#FFDC02] cursor-pointer border-b-2 border-black last:border-0"
                            >
                              <div className="flex items-center gap-2">
                                <div className="border-2 border-black rounded-full overflow-hidden">
                                  <Avatar className="h-6 w-6 rounded-none">
                                    <AvatarImage src={user.imageUrl} />
                                    <AvatarFallback className="bg-[#FFDC02] text-black font-bold text-xs">
                                      {user.name?.charAt(0) || "?"}
                                    </AvatarFallback>
                                  </Avatar>
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-sm font-bold text-black">{user.name}</span>
                                  <span className="text-xs font-medium text-black/70">
                                    {user.email}
                                  </span>
                                </div>
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              {selectedMembers.length === 0 && (
                <p className="text-sm font-bold text-[#FF5052]">
                  Add at least one other person to the group
                </p>
              )}
            </div>

            <DialogFooter className="gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleClose}
                className="px-4 py-2 text-sm font-bold border-4 border-black bg-white text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || selectedMembers.length === 0}
                className="px-4 py-2 text-sm font-bold border-4 border-black bg-[#6CBD45] text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                {isSubmitting ? "Creating..." : "Create Group"}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
