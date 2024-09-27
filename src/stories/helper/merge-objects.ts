export const mergeObjects = (obj: object) => {
  const keys = Object.keys(obj);
  
  const mergedObject = keys.reduce((acc:object, cur:string) => ({ ...acc, ...(obj[cur] as object) }), {});
  return mergedObject;
};
