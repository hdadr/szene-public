import Fuse from "fuse.js";

const getFuseOptions = (keys: string[]) => {
  return {
    shouldSort: true,
    //includeScore: true,
    //includeMatches: true,
    //findAllMatches: false,
    minMatchCharLength: 2,
    location: 0,
    threshold: 0.2,
    //distance: 30,
    ignoreLocation: true,
    keys: keys,
  };
};

export const fuseFilter = <T>(items: T[], keys: string[]) => {
  const options = getFuseOptions(keys);
  return new Fuse(items, options);
};
