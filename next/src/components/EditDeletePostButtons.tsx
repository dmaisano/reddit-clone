import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, IconButton, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";

interface EditDeletePostButtonsProps {
  id: number;
  creatorId: number;
}

const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({
  id,
  creatorId,
}) => {
  const { data: meData } = useMeQuery();
  const [deletePost] = useDeletePostMutation();

  if (meData?.me?.id !== creatorId) {
    return null;
  }

  return (
    <Box ml="auto">
      <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
        <IconButton
          as={Link}
          aria-label="Edit Post"
          color="cyan.500"
          mr={3}
          icon={<EditIcon />}
        />
      </NextLink>
      <IconButton
        aria-label="Delete Post"
        color="red.400"
        onClick={() => {
          deletePost({
            variables: { id },
            update: (cache) => {
              cache.evict({
                id: `Post:${id}`,
              });
            },
          });
        }}
        icon={<DeleteIcon />}
      />
    </Box>
  );
};

export default EditDeletePostButtons;
