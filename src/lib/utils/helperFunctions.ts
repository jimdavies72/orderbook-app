export const isPopulatedObject = (obj: object) => {
  try {
    if (Object.keys(obj).length > 0) {
      return true
    };
    
  } catch (error: any) {
      console.log(error.message);
  };
};

export const getInitials = (name: string): string => {
  let initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  return initials;
};

export const properCase = (str: string): string => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
