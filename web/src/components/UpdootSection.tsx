import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Box, Flex, IconButton } from "@chakra-ui/react";
import React, { useState } from "react";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";

interface UpdootsectionProps {
  post: PostSnippetFragment;
}

const Updootsection: React.FC<UpdootsectionProps> = ({ post }) => {
  const [loadingState, setLoadingState] = useState<
    "updoot-loading" | "downdoot-loading" | "not-loading"
  >(`not-loading`);
  const [, vote] = useVoteMutation();

  return (
    <Flex direction="column" justifyContent="center" alignItems="center" mr={4}>
      <IconButton
        onClick={async () => {
          if (post.voteStatus === 1) {
            return;
          }
          setLoadingState(`updoot-loading`);
          await vote({
            postId: post.id,
            value: 1,
          });
          setLoadingState(`not-loading`);
        }}
        color={post.voteStatus === 1 ? `lime` : undefined}
        isLoading={loadingState === `updoot-loading`}
        aria-label="upvote"
        variant="unstyled"
        size="sm"
        icon={<ChevronUpIcon w={8} h={8} />}
      />
      <Box>{post.points}</Box>
      <IconButton
        onClick={async () => {
          if (post.voteStatus === -1) {
            return;
          }
          setLoadingState(`downdoot-loading`);
          await vote({
            postId: post.id,
            value: -1,
          });
          setLoadingState(`not-loading`);
        }}
        color={post.voteStatus === -1 ? `tomato` : undefined}
        isLoading={loadingState === `downdoot-loading`}
        aria-label="downvote"
        variant="unstyled"
        size="sm"
        icon={<ChevronDownIcon w={8} h={8} />}
      />
    </Flex>
  );
};

export default Updootsection;
