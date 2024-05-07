export const dropdownVariant = {
  enter: {
    opacity: 1,
    y: 0,
    display: "block",
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
  exit: {
    y: -5,
    opacity: 0,
    transition: {
      duration: 0.25,
      ease: "easeOut",
    },
    transitionEnd: {
      display: "none",
    },
  },
};

export const blinkVariant = {
  hidden: { opacity: 0, top: -100 },
  show: { top: 0, opacity: 1, transition: { ease: "easeIn", duration: 0.18 } },
};
