const capitalize = (uid: string[]) =>
  uid.map((str) => str.charAt(0).toUpperCase() + str.slice(1));

export const getTypeFileName = (uid: string) => {
  const transformations = [capitalize];
  const uids = transformations.reduce(
    (prev, curr) => curr(prev),
    uid.split("_")
  );
  uid = uids.join("");
  return `Type${uid}`;
};

export const getFieldsName = (uid: string) => `${getTypeFileName(uid)}Fields`;
