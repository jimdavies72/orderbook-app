'use client';
import { useState, useEffect } from "react";
import { Comments } from "@/lib/utils/dataTypes";
import { DataTable } from "@/components/comments/data-table";

const CommentList = ({
  showAddButton,
  comments,
  orderId,
  containerId
}: {
  showAddButton: boolean,
  comments: Comments,
  orderId?: string,
  containerId?: string
}) => {

  return (
    <div>
      <DataTable 
        showAddButton={showAddButton}
        orderId={orderId}
        containerId={containerId}
        data={comments} 
      />
    </div>
  );
};

export default CommentList;
