'use client';
import { useState, useEffect } from "react";
import { httpRequest } from "@/lib/utils/dataHelpers";
import CommentComponent from "@/components/comments/commentComponent";
import { Comments, Comment } from "@/lib/utils/dataTypes";
import ContainerCard from "@/components/containerCard";

const CommentList = ({
  comments
}: {
  comments: Comments
}) => {

  return (
    <div>
      {comments && comments.map ((comment: Comment, index) => (
        <CommentComponent key={index} comment={comment} />
      ))}
    </div>
  );
};

export default CommentList;
