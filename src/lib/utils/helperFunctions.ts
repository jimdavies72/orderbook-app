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
}