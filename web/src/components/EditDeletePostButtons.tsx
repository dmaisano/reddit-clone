import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, IconButton } from "@chakra-ui/react";
// import NextLink from "next/link";
import React from "react";
import { useHistory, useLocation } from "react-router";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";
import { RouterChakraLink } from "./RouterChakraLink";

interface EditDeletePostButtonsProps {
  id?: number;
  creatorId: number;
}

const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({
  id,
  creatorId,
}) => {
  const { data: meData } = useMeQuery();
  const location = useLocation();
  const history = useHistory();
  const [deletePost] = useDeletePostMutation();

  if (meData?.me?.id !== creatorId) {
    return null;
  }

  return (
    <Box ml="auto">
      <IconButton
        as={RouterChakraLink}
        to={`/post/edit/${id}`}
        aria-label="Edit Post"
        color="cyan.500"
        mr={3}
        icon={<EditIcon />}
      />
      <IconButton
        aria-label="Delete Post"
        color="red.400"
        disabled={!id}
        onClick={() => {
          if (id) {
            deletePost({
              variables: { id },
              update: (cache) => {
                cache.evict({
                  id: `Post:${id}`,
                });
              },
            });

            if (location.pathname.match(/^\/post\/[0-9]+$/g)) {
              history.push(`/`);
            }
          }
        }}
        icon={<DeleteIcon />}
      />
    </Box>
  );
};

export default EditDeletePostButtons;
