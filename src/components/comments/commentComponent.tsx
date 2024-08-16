
import { useState, useEffect } from "react";
import { Comment } from "@/lib/utils/dataTypes";
import { getDate } from "@/lib/utils/dataHelpers";

const CommentComponent = ({comment}: {comment: Comment}) => {
  const [cDate, setCDate] = useState<string>("");
  const [uDate, setUDate] = useState<string>("");

  useEffect(() => {
    (async () => {
      if (comment.createdAt) {
        const date = (await getDate(comment.createdAt)).split(" ")[0];
        setCDate(date);
      };
      if (comment.updatedAt) {
        const date = (await getDate(comment.updatedAt)).split(" ")[0];
        setUDate(date);
      };

    })();
  }, []);

  return (    
    <div>
      <p>{comment.comment}</p>
      <p>by: {comment.createdBy}</p>
      <p>created: {cDate}</p>
      <p>updated: {uDate}</p>
    </div>
  );
};

export default CommentComponent
